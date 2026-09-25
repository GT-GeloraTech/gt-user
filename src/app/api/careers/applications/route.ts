import { apiError, apiOk } from "@/lib/api-error";
import { guardWrite, preflight, withCors } from "@/lib/cors";
import { insertJobApplication } from "@/db";
import { validateApplication } from "@/lib/validate-application";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 5 * 1024 * 1024;

export function OPTIONS(request: Request) {
  return preflight(request);
}

export async function POST(request: Request) {
  const blocked = guardWrite(request, "career");
  if (blocked) return blocked;

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return withCors(
      request,
      apiError(413, "File size exceeds 4MB limit. Please choose a smaller file.", {
        resume: "File size exceeds 4MB limit. Please choose a smaller file.",
      }),
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return withCors(request, apiError(400, "Invalid request.", { form: "Request must be form data." }));
  }

  const { data, fieldErrors, status } = await validateApplication(form);
  if (!data || fieldErrors) {
    return withCors(
      request,
      apiError(
        status ?? 400,
        fieldErrors?.resume ?? "Please check the form and try again.",
        fieldErrors,
      ),
    );
  }

  try {
    const id = await insertJobApplication(data);
    return withCors(request, apiOk(id));
  } catch (error) {
    console.error("job application insert failed");
    if (error instanceof Error && error.message === "DATABASE_URL is not set") {
      return withCors(request, apiError(500, "Applications are temporarily unavailable."));
    }
    return withCors(request, apiError(500, "Something went wrong. Please try again."));
  }
}
