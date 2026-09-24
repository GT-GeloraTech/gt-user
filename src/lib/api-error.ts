import { NextResponse } from "next/server";

export type FieldErrors = Record<string, string>;

export function apiError(
  status: number,
  error: string,
  fieldErrors?: FieldErrors,
) {
  return NextResponse.json(
    fieldErrors ? { ok: false, error, fieldErrors } : { ok: false, error },
    { status },
  );
}

export function apiOk(id: string) {
  return NextResponse.json({ ok: true, id });
}
