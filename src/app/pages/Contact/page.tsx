"use client";

import { useState } from "react";
import Footer from "@/app/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    agreed: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <main className="contact-main">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');

        /* ──────────────────────────────────────────
         * Base
         * ────────────────────────────────────────── */
        .contact-main {
          min-height: 100vh;
          width: 100%;
          background: #080415;
          position: relative;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* Ambient glow behind hero */
        .contact-bg-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(1400px, 100vw);
          height: 820px;
          background: radial-gradient(
            ellipse 65% 55% at 50% 30%,
            rgba(100, 60, 210, 0.28) 0%,
            rgba(45, 20, 110, 0.18) 45%,
            rgba(8, 4, 21, 0) 75%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* ──────────────────────────────────────────
         * HERO (dark section)
         * ────────────────────────────────────────── */
        .contact-hero-section {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: clamp(120px, 14vh, 145px) 24px clamp(145px, 16vh, 168px);
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
          text-align: center;
        }
          
        /* Title — same as About/Product pages */
        .contact-title {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: clamp(26px, 3vw, 60px);
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: #FFFFFF;
        }
        .contact-title-line1 { color: #FFFFFF; }
        .contact-title-line2 {
          margin-top: clamp(4px, 0.8vh, 8px);
          background: linear-gradient(90deg, #FFFFFF 0%, #E2D7FC 20%, #B69AFA 46%, #8860F2 72%, #6234E2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
        }

        /* Description — same as About/Product pages */
        .contact-desc {
          margin: 20px auto 0;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: clamp(14px, 1.2vw, 17px);
          line-height: 1.6;
          color: #FFFFFF;
          text-align: center;
          max-width: 620px;
          opacity: 0.92;
          position: relative;
          z-index: 5;
        }

        /* ──────────────────────────────────────────
         * LIGHT SECTION (cards + form)
         * ────────────────────────────────────────── */
        .contact-light-section {
          position: relative;
          z-index: 5;
          width: 100%;
          background: #F0ECFD;
          flex: 1;
          box-sizing: border-box;
        }

        /* Overlapping Cards Container */
        .contact-cards-wrapper {
          width: 100%;
          max-width: 1100px;
          margin: -72px auto 0;
          padding: 0 32px;
          box-sizing: border-box;
          position: relative;
          z-index: 10;
        }

        .contact-cards-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 50px;
        }

        /* Figma: background #F4F0FF, shadow 0px 4px 25.6px -3px rgba(0,0,0,0.25), border-radius 20px */
        .contact-info-card {
          background: #F4F0FF;
          box-shadow: 0px 4px 25.6px -3px rgba(0, 0, 0, 0.25);
          border-radius: 20px;
          min-height: 145px;
          padding: 24px 24px;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 18px;
          box-sizing: border-box;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .contact-info-card:hover {
          transform: translateY(-3px);
          box-shadow: 0px 8px 32px -3px rgba(0, 0, 0, 0.28);
        }

        .contact-card-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #8B63FF;
        }

        .contact-card-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
          min-width: 0;
        }

        /* Figma: font-weight 500, font-size 20px, line-height 44px, color #000 */
        .contact-card-label {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 1.2;
          color: #111111;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
        }

        .contact-card-value {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 18px;
          line-height: 1.4;
          color: #000000;
          margin: 0;
          text-decoration: none;
          display: block;
          transition: color 0.2s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .contact-card-value-link {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        a.contact-card-value:hover { color: #744FE7; }

        /* Inner Body Container — expanded to reduce left/right space around Start Conversation and Form */
        .contact-light-inner {
          width: 100%;
          max-width: 1340px;
          margin: 0 auto;
          padding: clamp(60px, 7vh, 76px) 24px 80px;
          box-sizing: border-box;
        }

        /* ──────────────────────────────────────────
         * TWO-COLUMN: Left info + Right form
         * ────────────────────────────────────────── */
        .contact-body-grid {
          display: grid;
          grid-template-columns: minmax(360px, 460px) 1fr;
          gap: 36px;
          align-items: start;
          margin-top: 25px;
        }

        /* Left column */
        .contact-left-col {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Figma: background rgba(140,132,166,0.21), border-radius 109px  */
        .contact-conv-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(140, 132, 166, 0.21);
          border-radius: 109px;
          padding: 9px 18px;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 12px;
          color: #3A3555;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 22px;
          align-self: flex-start;
          user-select: none;
        }
        .contact-conv-badge-star {
          font-size: 13px;
          color: #8B63FF;
        }

        /* Figma: font-weight 700, font-size 44px, color rgba(11,11,11,0.87), capitalize */
        .contact-build-title {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: clamp(28px, 3.2vw, 40px);
          line-height: 1.18;
          color: #111111;
          margin: 0 0 18px 0;
        }

        /* Figma: font-weight 400, font-size 22px, line-height 33px, color rgba(17,16,21,0.83) */
        .contact-build-desc {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 16.5px;
          line-height: 1.6;
          color: #333333;
          margin: 0;
          max-width: 450px;
          letter-spacing: -0.3px;
        }

        /* ──────────────────────────────────────────
         * FORM — Right column
         * ────────────────────────────────────────── */
        .contact-form-col {
          display: flex;
          flex-direction: column;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        /* Reduced input height to 52px, font-size to 14px per user request */
        .contact-field {
          width: 100%;
          box-sizing: border-box;
          background: rgba(140, 132, 166, 0.21);
          border: none;
          border-radius: 6px;
          height: 52px;
          padding: 0 18px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #111111;
          outline: none;
          transition: background 0.2s ease, box-shadow 0.2s ease;
        }
        .contact-field::placeholder {
          color: rgba(17, 16, 21, 0.45);
        }
        .contact-field:focus {
          background: rgba(140, 132, 166, 0.32);
          box-shadow: 0 0 0 2px rgba(153, 120, 255, 0.4);
        }

        /* Reduced textarea height to 150px per user request */
        .contact-textarea {
          width: 100%;
          box-sizing: border-box;
          background: rgba(140, 132, 166, 0.21);
          border: none;
          border-radius: 6px;
          height: 150px;
          padding: 16px 18px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #111111;
          outline: none;
          resize: vertical;
          min-height: 120px;
          transition: background 0.2s ease, box-shadow 0.2s ease;
        }
        .contact-textarea::placeholder {
          color: rgba(17, 16, 21, 0.45);
        }
        .contact-textarea:focus {
          background: rgba(140, 132, 166, 0.32);
          box-shadow: 0 0 0 2px rgba(153, 120, 255, 0.4);
        }

        /* Checkbox row */
        .contact-checkbox-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 2px;
        }
        .contact-checkbox {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          margin-top: 2px;
          accent-color: #8B63FF;
          cursor: pointer;
        }
        /* Figma: font-weight 400, font-size 13px, color #000 */
        .contact-checkbox-label {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 12.5px;
          line-height: 1.55;
          color: #111111;
          cursor: pointer;
        }
        .contact-checkbox-label a {
          color: #744FE7;
          text-decoration: underline;
        }

        /* Reduced button height to 52px and font-size to 15px per user request */
        .contact-submit-btn {
          width: 100%;
          height: 52px;
          background: #8B63FF;
          border-radius: 6px;
          border: none;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 15px;
          color: #FFFFFF;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
          box-shadow: 0 4px 18px rgba(139, 99, 255, 0.32);
          margin-top: 6px;
          letter-spacing: 0.01em;
        }
        .contact-submit-btn:hover {
          background: #7A4DF2;
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(139, 99, 255, 0.42);
        }
        .contact-submit-btn:active {
          transform: translateY(0);
        }
        .contact-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Success box */
        .contact-success-box {
          padding: 28px 24px;
          border-radius: 10px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          text-align: center;
        }
        .contact-success-title {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0F9B6E;
          margin: 0 0 8px 0;
        }
        .contact-success-desc {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: rgba(17, 16, 21, 0.75);
          line-height: 1.6;
          margin: 0;
        }

        /* ──────────────────────────────────────────
         * RESPONSIVE
         * ────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .contact-cards-wrapper {
            padding: 0 24px;
            margin-top: -60px;
          }
          .contact-light-inner {
            padding: 48px 24px 70px;
          }
          .contact-body-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .contact-build-desc {
            max-width: 100%;
          }
        }

        @media (max-width: 780px) {
          .contact-hero-section {
            padding-bottom: 95px;
          }
          .contact-cards-wrapper {
            margin-top: -45px;
          }
          .contact-cards-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .contact-info-card {
            min-height: 110px;
            padding: 20px 22px;
          }
        }

        @media (max-width: 540px) {
          .contact-cards-wrapper {
            padding: 0 16px;
            margin-top: -35px;
          }
          .contact-light-inner {
            padding: 36px 16px 60px;
          }
          .contact-form-row {
            grid-template-columns: 1fr;
          }
          .contact-card-value {
            font-size: 16px;
            white-space: normal;
          }
        }
      `}</style>

      {/* Ambient glow */}
      <div className="contact-bg-glow" aria-hidden="true" />

      {/* ── HERO SECTION (dark background) ── */}
      <section className="contact-hero-section" aria-label="Contact Us Hero">

        {/* Title — same font size & style as About/Product pages */}
        <h1 className="contact-title">
          <span className="contact-title-line1">Let&apos;s talk about your</span>
          <span className="contact-title-line2">next big idea.</span>
        </h1>

        {/* Description — same font size & style as About/Product pages */}
        <p className="contact-desc">
          Have a project in mind or looking for the right team to bring it to life?
          <br />
          We&apos;d love to hear from you.
        </p>
      </section>

      {/* ── LIGHT SECTION (cards + form) ── */}
      <div className="contact-light-section">

        {/* ── THREE FLOATING INFO CARDS (Overlapping boundary) ── */}
        <div className="contact-cards-wrapper">
          <div className="contact-cards-row" aria-label="Contact Information">

            {/* CALL US */}
            <div className="contact-info-card">
              <div className="contact-card-icon-box">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="14" y1="10" x2="21" y2="3" />
                </svg>
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">CALL US</span>
                <a href="tel:+917976143735" className="contact-card-value">+91 - 7976143735</a>
              </div>
            </div>

            {/* EMAIL US */}
            <div className="contact-info-card">
              <div className="contact-card-icon-box">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">EMAIL US</span>
                <a href="mailto:hello@geloratech.com" className="contact-card-value contact-card-value-link">hello@geloratech.com</a>
              </div>
            </div>

            {/* BASED */}
            <div className="contact-info-card">
              <div className="contact-card-icon-box">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">BASED</span>
                <span className="contact-card-value">Udaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BODY: Left col + Right form ── */}
        <div className="contact-light-inner">
          <div className="contact-body-grid">

            {/* LEFT COLUMN */}
            <div className="contact-left-col">
              {/* Figma badge: background rgba(140,132,166,0.21), border-radius 109px */}
              <div className="contact-conv-badge">
                <span className="contact-conv-badge-star">✦</span>
                <span>START A CONVERSATION</span>
              </div>

              {/* Figma: font-weight 700, font-size 44px, color rgba(11,11,11,0.87) */}
              <h2 className="contact-build-title">Let&apos;s Build Together</h2>

              {/* Figma: font-weight 400, font-size 22px, line-height 33px, color rgba(17,16,21,0.83) */}
              <p className="contact-build-desc">
                Tell us what you&apos;re thinking. Whether you have a clear vision or just an idea waiting to take shape, share it with us. We&apos;ll help you explore what&apos;s possible.
              </p>
            </div>

            {/* RIGHT COLUMN — FORM */}
            <div className="contact-form-col">
              {isSubmitted ? (
                <div className="contact-success-box">
                  <h4 className="contact-success-title">Thank you for reaching out!</h4>
                  <p className="contact-success-desc">
                    We&apos;ve received your message and will get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  {/* First Name + Last Name */}
                  <div className="contact-form-row">
                    <input
                      id="contact-first-name"
                      type="text"
                      required
                      placeholder="First Name"
                      className="contact-field"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                    <input
                      id="contact-last-name"
                      type="text"
                      required
                      placeholder="Last Name"
                      className="contact-field"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>

                  {/* Email Address */}
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="Email Address"
                    className="contact-field"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />

                  {/* Phone + Service */}
                  <div className="contact-form-row">
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="Phone Number"
                      className="contact-field"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <input
                      id="contact-service"
                      type="text"
                      placeholder="Service Interested In"
                      className="contact-field"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    />
                  </div>

                  {/* Project Description */}
                  <textarea
                    id="contact-msg"
                    required
                    placeholder="Tell Us About Your Project"
                    className="contact-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />

                  {/* Checkbox */}
                  <div className="contact-checkbox-row">
                    <input
                      id="contact-agree"
                      type="checkbox"
                      className="contact-checkbox"
                      checked={formData.agreed}
                      onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                    />
                    <label htmlFor="contact-agree" className="contact-checkbox-label">
                      I agree to be contacted by Gelora Tech regarding my enquiry and accept the{" "}
                      <a href="/privacy">Privacy Policy</a> and{" "}
                      <a href="/terms">Terms &amp; Conditions</a>.
                    </label>
                  </div>

                  {/* Submit button: reduced height to 52px and font size to 15px */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.agreed}
                    className="contact-submit-btn"
                  >
                    {isSubmitting ? "Sending..." : (
                      <>
                        <span>Send Message</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer on light background — no CTA card */}
        <Footer showCta={false} />
      </div>
    </main>
  );
}

