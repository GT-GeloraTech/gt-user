import type { FieldErrors } from "@/lib/api-error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d][\d\s-]{6,18}\d$/;

export type ContactInput = {
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  service: string | null;
  message: string;
};

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContact(body: unknown): {
  data?: ContactInput;
  fieldErrors?: FieldErrors;
} {
  if (!body || typeof body !== "object") {
    return { fieldErrors: { form: "Invalid request." } };
  }

  const record = body as Record<string, unknown>;
  const fieldErrors: FieldErrors = {};

  const firstName = asTrimmedString(record.firstName);
  const lastName = asTrimmedString(record.lastName);
  const emailRaw = asTrimmedString(record.email);
  const phoneRaw = asTrimmedString(record.phone);
  const serviceRaw = asTrimmedString(record.service);
  const message = asTrimmedString(record.message);

  if (record.agreed !== true) {
    fieldErrors.agreed = "Please accept the privacy policy to continue.";
  }
  if (!firstName || firstName.length > 80) {
    fieldErrors.firstName = "First name is required (max 80 characters).";
  }
  if (!lastName || lastName.length > 80) {
    fieldErrors.lastName = "Last name is required (max 80 characters).";
  }
  if (!message || message.length > 4000) {
    fieldErrors.message = "Please tell us about your project (max 4000 characters).";
  }
  if (serviceRaw.length > 120) {
    fieldErrors.service = "Service must be 120 characters or fewer.";
  }

  if (!emailRaw && !phoneRaw) {
    fieldErrors.contact = "Please enter at least your Email Address or Phone Number.";
  }
  if (emailRaw && (emailRaw.length > 254 || !EMAIL_PATTERN.test(emailRaw))) {
    fieldErrors.email = "Enter a valid email address.";
  }

  const phoneCompact = phoneRaw.replace(/\s/g, "");
  if (
    phoneRaw &&
    (phoneCompact.length < 8 ||
      phoneCompact.length > 20 ||
      !PHONE_PATTERN.test(phoneRaw))
  ) {
    fieldErrors.phone = "Enter a valid phone number.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  return {
    data: {
      firstName,
      lastName,
      email: emailRaw || null,
      phone: phoneRaw || null,
      service: serviceRaw || null,
      message,
    },
  };
}
