CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text,
  phone text,
  service_interested_in text,
  project_message text NOT NULL,
  privacy_accepted boolean NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT contact_inquiries_email_or_phone
    CHECK (email IS NOT NULL OR phone IS NOT NULL),
  CONSTRAINT contact_inquiries_privacy_accepted
    CHECK (privacy_accepted = true),
  CONSTRAINT contact_inquiries_first_name_len
    CHECK (char_length(first_name) BETWEEN 1 AND 80),
  CONSTRAINT contact_inquiries_last_name_len
    CHECK (char_length(last_name) BETWEEN 1 AND 80),
  CONSTRAINT contact_inquiries_email_len
    CHECK (email IS NULL OR char_length(email) BETWEEN 3 AND 254),
  CONSTRAINT contact_inquiries_phone_len
    CHECK (phone IS NULL OR char_length(phone) BETWEEN 1 AND 20),
  CONSTRAINT contact_inquiries_service_len
    CHECK (service_interested_in IS NULL OR char_length(service_interested_in) BETWEEN 1 AND 120),
  CONSTRAINT contact_inquiries_message_len
    CHECK (char_length(project_message) BETWEEN 1 AND 4000)
);

CREATE INDEX IF NOT EXISTS contact_inquiries_created_at_idx
  ON contact_inquiries (created_at DESC);

CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY,
  full_name text NOT NULL,
  country_code text NOT NULL DEFAULT '+91',
  phone_number text NOT NULL,
  email text NOT NULL,
  experience text NOT NULL,
  current_ctc_lpa text NOT NULL,
  expected_ctc_lpa text NOT NULL,
  notice_period_days text NOT NULL,
  applying_for text NOT NULL,
  relevant_link text,
  resume_file_name text NOT NULL,
  resume_content_type text NOT NULL,
  resume_file_size_bytes integer NOT NULL,
  resume_file bytea NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT job_applications_full_name_len
    CHECK (char_length(full_name) BETWEEN 1 AND 120),
  CONSTRAINT job_applications_country_code_len
    CHECK (char_length(country_code) BETWEEN 1 AND 8),
  CONSTRAINT job_applications_phone_len
    CHECK (char_length(phone_number) BETWEEN 8 AND 14),
  CONSTRAINT job_applications_email_len
    CHECK (char_length(email) BETWEEN 3 AND 254),
  CONSTRAINT job_applications_experience_len
    CHECK (char_length(experience) BETWEEN 1 AND 80),
  CONSTRAINT job_applications_current_ctc_len
    CHECK (char_length(current_ctc_lpa) BETWEEN 1 AND 40),
  CONSTRAINT job_applications_expected_ctc_len
    CHECK (char_length(expected_ctc_lpa) BETWEEN 1 AND 40),
  CONSTRAINT job_applications_notice_len
    CHECK (char_length(notice_period_days) BETWEEN 1 AND 20),
  CONSTRAINT job_applications_applying_for_len
    CHECK (char_length(applying_for) BETWEEN 1 AND 160),
  CONSTRAINT job_applications_relevant_link_len
    CHECK (relevant_link IS NULL OR char_length(relevant_link) BETWEEN 1 AND 500),
  CONSTRAINT job_applications_resume_name_len
    CHECK (char_length(resume_file_name) BETWEEN 1 AND 255),
  CONSTRAINT job_applications_resume_type
    CHECK (resume_content_type IN (
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )),
  CONSTRAINT job_applications_resume_size
    CHECK (resume_file_size_bytes BETWEEN 1 AND 4194304),
  CONSTRAINT job_applications_resume_bytes
    CHECK (octet_length(resume_file) = resume_file_size_bytes)
);

CREATE INDEX IF NOT EXISTS job_applications_created_at_idx
  ON job_applications (created_at DESC);

ALTER TABLE job_applications DROP CONSTRAINT IF EXISTS job_applications_resume_size;
ALTER TABLE job_applications ADD CONSTRAINT job_applications_resume_size
  CHECK (resume_file_size_bytes BETWEEN 1 AND 4194304);
