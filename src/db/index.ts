import { neon } from "@neondatabase/serverless";
import type { ContactInput } from "@/lib/validate-contact";
import type { ApplicationInput } from "@/lib/validate-application";

function sqlClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }
  return neon(databaseUrl);
}

export async function insertContactInquiry(input: ContactInput): Promise<string> {
  const id = crypto.randomUUID();
  const sql = sqlClient();
  await sql`
    INSERT INTO contact_inquiries (
      id,
      first_name,
      last_name,
      email,
      phone,
      service_interested_in,
      project_message,
      privacy_accepted
    ) VALUES (
      ${id}::uuid,
      ${input.firstName},
      ${input.lastName},
      ${input.email},
      ${input.phone},
      ${input.service},
      ${input.message},
      true
    )
  `;
  return id;
}

export async function insertJobApplication(input: ApplicationInput): Promise<string> {
  const id = crypto.randomUUID();
  const resumeBase64 = input.resumeBytes.toString("base64");
  const sql = sqlClient();
  await sql`
    INSERT INTO job_applications (
      id,
      full_name,
      country_code,
      phone_number,
      email,
      experience,
      current_ctc_lpa,
      expected_ctc_lpa,
      notice_period_days,
      applying_for,
      relevant_link,
      resume_file_name,
      resume_content_type,
      resume_file_size_bytes,
      resume_file
    ) VALUES (
      ${id}::uuid,
      ${input.fullName},
      '+91',
      ${input.phoneNumber},
      ${input.email},
      ${input.experience},
      ${input.currentCtcLpa},
      ${input.expectedCtcLpa},
      ${input.noticePeriodDays},
      ${input.applyingFor},
      ${input.relevantLink},
      ${input.resumeFileName},
      ${input.resumeContentType},
      ${input.resumeBytes.length},
      decode(${resumeBase64}, 'base64')
    )
  `;
  return id;
}
