import type { FieldErrors } from "@/lib/api-error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_RESUME_BYTES = 4 * 1024 * 1024;

const RESUME_TYPES = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
} as const;

type ResumeExt = keyof typeof RESUME_TYPES;

export type ApplicationInput = {
  fullName: string;
  phoneNumber: string;
  email: string;
  experience: string;
  currentCtcLpa: string;
  expectedCtcLpa: string;
  noticePeriodDays: string;
  applyingFor: string;
  relevantLink: string | null;
  resumeFileName: string;
  resumeContentType: string;
  resumeBytes: Buffer;
};

function text(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function extensionOf(fileName: string): ResumeExt | null {
  const ext = fileName.toLowerCase().split(".").pop();
  if (ext === "pdf" || ext === "doc" || ext === "docx") return ext;
  return null;
}

function matchesMagic(bytes: Buffer, ext: ResumeExt): boolean {
  if (bytes.length < 4) return false;
  if (ext === "pdf") return bytes.subarray(0, 4).toString("utf8") === "%PDF";
  if (ext === "doc") {
    return bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0;
  }
  return bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04;
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function validateApplication(form: FormData): Promise<{
  data?: ApplicationInput;
  fieldErrors?: FieldErrors;
  status?: number;
}> {
  const fieldErrors: FieldErrors = {};

  const fullName = text(form, "fullName");
  const phoneNumber = text(form, "phone").replace(/[\s-]/g, "");
  const email = text(form, "email");
  const experience = text(form, "experience");
  const currentCtcLpa = text(form, "currentCtc");
  const expectedCtcLpa = text(form, "expectedCtc");
  const noticePeriodDays = text(form, "noticePeriod");
  const applyingFor = text(form, "applyingFor");
  const relevantLink = text(form, "relevantLink");

  if (!fullName || fullName.length > 120) {
    fieldErrors.fullName = "Full Name is required (max 120 characters).";
  }
  if (!/^\d{8,14}$/.test(phoneNumber)) {
    fieldErrors.phone = "Enter a valid phone number.";
  }
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }
  if (!experience || experience.length > 80) {
    fieldErrors.experience = "Experience is required (max 80 characters).";
  }
  if (!currentCtcLpa || currentCtcLpa.length > 40) {
    fieldErrors.currentCtc = "Current CTC is required (max 40 characters).";
  }
  if (!expectedCtcLpa || expectedCtcLpa.length > 40) {
    fieldErrors.expectedCtc = "Expected CTC is required (max 40 characters).";
  }
  if (!noticePeriodDays || noticePeriodDays.length > 20) {
    fieldErrors.noticePeriod = "Notice Period is required (max 20 characters).";
  }
  if (!applyingFor || applyingFor.length > 160) {
    fieldErrors.applyingFor = "Applying For is required (max 160 characters).";
  }
  if (relevantLink && (relevantLink.length > 500 || !isHttpUrl(relevantLink))) {
    fieldErrors.relevantLink = "Enter a valid http or https link.";
  }

  const resume = form.get("resume");
  let resumeBytes: Buffer | null = null;
  let resumeFileName = "";
  let resumeContentType = "";

  if (!(resume instanceof File) || resume.size === 0) {
    fieldErrors.resume = "Resume (PDF, DOC, or DOCX up to 4MB) is required.";
  } else if (resume.size > MAX_RESUME_BYTES) {
    return {
      status: 413,
      fieldErrors: {
        resume: "File size exceeds 4MB limit. Please choose a smaller file.",
      },
    };
  } else {
    const ext = extensionOf(resume.name);
    if (!ext) {
      fieldErrors.resume = "Invalid file format. Please upload PDF, DOC, or DOCX only.";
    } else {
      const bytes = Buffer.from(await resume.arrayBuffer());
      if (!matchesMagic(bytes, ext)) {
        fieldErrors.resume = "The file content does not match a PDF, DOC, or DOCX resume.";
      } else {
        resumeBytes = bytes;
        resumeFileName = resume.name.replace(/[^\w.\- ()]/g, "_").slice(0, 255);
        resumeContentType = RESUME_TYPES[ext];
      }
    }
  }

  if (Object.keys(fieldErrors).length > 0 || !resumeBytes) {
    return { fieldErrors };
  }

  return {
    data: {
      fullName,
      phoneNumber,
      email,
      experience,
      currentCtcLpa,
      expectedCtcLpa,
      noticePeriodDays,
      applyingFor,
      relevantLink: relevantLink || null,
      resumeFileName,
      resumeContentType,
      resumeBytes,
    },
  };
}
