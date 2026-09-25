import { NextResponse } from "next/server";
import { apiError } from "@/lib/api-error";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

function allowedOrigins(): string[] {
  return (process.env.ALLOWED_ORIGIN ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function isAllowedOrigin(request: Request, origin: string): boolean {
  const allowed = allowedOrigins();
  if (allowed.length > 0) {
    return allowed.includes(origin);
  }
  try {
    return origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export function withCors(request: Request, response: NextResponse): NextResponse {
  const origin = request.headers.get("origin");
  if (origin && isAllowedOrigin(request, origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Vary", "Origin");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    response.headers.set("Access-Control-Max-Age", "600");
  }
  return response;
}

export function guardWrite(request: Request, bucket: string): NextResponse | null {
  const origin = request.headers.get("origin");
  const allowList = allowedOrigins();

  if (origin && !isAllowedOrigin(request, origin)) {
    return apiError(403, "Origin is not allowed.");
  }

  if (!origin && allowList.length > 0) {
    return apiError(403, "Origin is not allowed.");
  }

  if (isRateLimited(`${bucket}:${clientIp(request)}`)) {
    return withCors(request, apiError(429, "Too many requests. Please try again later."));
  }

  return null;
}

export function preflight(request: Request): NextResponse {
  const origin = request.headers.get("origin");
  if (!origin || !isAllowedOrigin(request, origin)) {
    return apiError(403, "Origin is not allowed.");
  }
  return withCors(request, new NextResponse(null, { status: 204 }));
}
