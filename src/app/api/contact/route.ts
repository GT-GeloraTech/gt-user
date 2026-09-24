import { apiError, apiOk } from "@/lib/api-error";
import { guardWrite, preflight, withCors } from "@/lib/cors";
import { insertContactInquiry } from "@/db";
import { validateContact } from "@/lib/validate-contact";

export const runtime = "nodejs";

export function OPTIONS(request: Request) {
  return preflight(request);
}

export async function POST(request: Request) {
  const blocked = guardWrite(request, "contact");
  if (blocked) return blocked;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return withCors(request, apiError(400, "Invalid request.", { form: "Request body must be JSON." }));
  }

  const { data, fieldErrors } = validateContact(body);
  if (!data || fieldErrors) {
    return withCors(
      request,
      apiError(400, fieldErrors?.contact ?? "Please check the form and try again.", fieldErrors),
    );
  }

  try {
    const id = await insertContactInquiry(data);
    return withCors(request, apiOk(id));
  } catch (error) {
    console.error("contact insert failed");
    if (error instanceof Error && error.message === "DATABASE_URL is not set") {
      return withCors(request, apiError(500, "Contact form is temporarily unavailable."));
    }
    return withCors(request, apiError(500, "Something went wrong. Please try again."));
  }
}
