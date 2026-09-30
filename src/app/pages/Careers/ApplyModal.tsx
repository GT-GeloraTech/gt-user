'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CountryPhoneInput, { validatePhoneForCountry } from '@/app/components/CountryPhoneInput';
import type { CountryCode } from 'libphonenumber-js';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: string;
}

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024;

export default function ApplyModal({ isOpen, onClose, defaultRole = '' }: ApplyModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    experience: '',
    currentCtc: '',
    expectedCtc: '',
    noticePeriod: '',
    applyingFor: defaultRole,
    relevantLink: '',
  });

  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('IN');
  const [countryDialCode, setCountryDialCode] = useState('+91');

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Reset form and close modal
  const handleClose = useCallback(() => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      experience: '',
      currentCtc: '',
      expectedCtc: '',
      noticePeriod: '',
      applyingFor: defaultRole,
      relevantLink: '',
    });
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setErrors({});
    setSelectedCountry('IN');
    setCountryDialCode('+91');
    onClose();
  }, [defaultRole, onClose]);

  // Sync defaultRole when prop updates
  useEffect(() => {
    if (defaultRole) {
      setFormData((prev) => ({ ...prev, applyingFor: defaultRole }));
    }
  }, [defaultRole]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose]);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChange = (field: string, value: string) => {
    let sanitized = value;
    if (field === 'fullName') {
      // Disallow numbers and symbols
      sanitized = value.replace(/[^a-zA-Z\s'-]/g, '');
    } else if (field === 'phone') {
      // Disallow non-digits and allow 10 digits only
      sanitized = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData((prev) => ({ ...prev, [field]: sanitized }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const processResumeFile = (file: File | null) => {
    if (!file) return;

    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      setResumeFile(null);
      setErrors((prev) => ({
        ...prev,
        resume: 'Invalid file format. Please upload PDF, DOC, or DOCX only.',
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setResumeFile(null);
      setErrors((prev) => ({
        ...prev,
        resume: 'File size exceeds 4MB limit. Please choose a smaller file.',
      }));
      return;
    }

    setResumeFile(file);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.resume;
      return next;
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processResumeFile(file);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processResumeFile(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = 'Full Name can only contain letters';
    }

    const phoneError = validatePhoneForCountry(formData.phone, selectedCountry);
    if (phoneError) {
      newErrors.phone = phoneError;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience is required';
    }

    if (!formData.currentCtc.trim()) {
      newErrors.currentCtc = 'Current CTC is required';
    }

    if (!formData.expectedCtc.trim()) {
      newErrors.expectedCtc = 'Expected CTC is required';
    }

    if (!formData.noticePeriod.trim()) {
      newErrors.noticePeriod = 'Notice Period is required';
    }

    if (!formData.applyingFor.trim()) {
      newErrors.applyingFor = 'Applying For is required';
    }

    if (!resumeFile) {
      newErrors.resume = 'Resume (PDF, DOC, DOCX up to 4MB) is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !resumeFile || isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const body = new FormData();
      body.set("fullName", formData.fullName);
      body.set("countryCode", countryDialCode);
      body.set("phone", formData.phone);
      body.set("email", formData.email);
      body.set("experience", formData.experience);
      body.set("currentCtc", formData.currentCtc);
      body.set("expectedCtc", formData.expectedCtc);
      body.set("noticePeriod", formData.noticePeriod);
      body.set("applyingFor", formData.applyingFor);
      body.set("relevantLink", formData.relevantLink);
      body.set("resume", resumeFile);
      const response = await fetch("/api/careers/applications", {
        method: "POST",
        body,
      });
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; fieldErrors?: Record<string, string> }
        | null;
      if (!response.ok || !payload?.ok) {
        if (payload?.fieldErrors) {
          setErrors(payload.fieldErrors);
        } else {
          setErrors({ resume: payload?.error || "Something went wrong. Please try again." });
        }
        return;
      }
      setSubmitted(true);
    } catch {
      setErrors({ resume: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <>
      <style>{`
        .apply-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1000001;
          background: rgba(10, 8, 24, 0.72);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          box-sizing: border-box;
          animation: overlayFadeIn 0.22s ease;
        }
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ─── Flip Container ─── */
        .apply-flip-scene {
          perspective: 1200px;
          -webkit-perspective: 1200px;
          width: 100%;
          max-width: 719px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: panelSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes panelSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .apply-flip-card {
          position: relative;
          width: 100%;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          transition: transform 0.72s cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }
        .apply-flip-card.is-flipped {
          transform: rotateY(180deg);
          -webkit-transform: rotateY(180deg);
        }

        .apply-flip-front,
        .apply-flip-back,
        .apply-panel,
        .apply-success-box {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .apply-flip-front {
          display: flex;
          flex-direction: column;
          width: 100%;
          position: relative;
          z-index: 2;
          transition: opacity 0.2s 0.22s, visibility 0s 0.36s;
        }
        .apply-flip-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform: rotateY(180deg);
          -webkit-transform: rotateY(180deg);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          transition: opacity 0.2s 0.22s, visibility 0s 0.36s;
        }

        .apply-flip-card.is-flipped .apply-flip-front {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          z-index: 1;
        }
        .apply-flip-card:not(.is-flipped) .apply-flip-back {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .apply-flip-card.is-flipped .apply-flip-back {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          z-index: 5;
        }
        .apply-flip-card:not(.is-flipped) .apply-flip-front {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          z-index: 5;
        }

        .apply-panel {
          position: relative;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          background: #F4F0FF;
          border-radius: 24px;
          box-sizing: border-box;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
          overflow: hidden;
        }

        /* ─── Fixed Header ─── */
        .apply-modal-header {
          padding: 22px 34px 14px;
          background: #F4F0FF;
          flex-shrink: 0;
          border-bottom: 1px solid rgba(116, 79, 231, 0.12);
          z-index: 2;
        }
        .apply-header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2px;
        }
        .apply-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .apply-title-icon {
          color: #141415;
          flex-shrink: 0;
        }
        .apply-title {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 24px;
          line-height: 34px;
          letter-spacing: 0.02em;
          color: #141415;
        }
        .apply-close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #9086A8;
          padding: 6px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, color 0.2s ease;
          flex-shrink: 0;
        }
        .apply-close-btn:hover {
          background: rgba(116, 79, 231, 0.1);
          color: #744FE7;
        }
        .apply-subtitle {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 13.5px;
          line-height: 20px;
          letter-spacing: 0.02em;
          color: rgba(46, 46, 47, 0.71);
          margin: 0;
        }

        /* ─── Scrollable Body ─── */
        .apply-modal-body {
          padding: 16px 34px 16px;
          overflow-y: auto;
          flex: 1;
          display: flex;
          flex-direction: column;
          scrollbar-width: thin;
          scrollbar-color: rgba(116, 79, 231, 0.28) transparent;
        }
        .apply-modal-body::-webkit-scrollbar {
          width: 5px;
        }
        .apply-modal-body::-webkit-scrollbar-thumb {
          background: rgba(116, 79, 231, 0.28);
          border-radius: 4px;
        }

        .apply-field-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 12px;
        }
        .apply-field-row {
          display: flex;
          gap: 14px;
          width: 100%;
        }

        .apply-label {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 14px;
          line-height: 18px;
          color: #744FE7;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
        }
        .apply-required {
          color: #E53935;
          margin-left: 3px;
          font-weight: 700;
        }
        .apply-input {
          box-sizing: border-box;
          width: 100%;
          height: 46px;
          border: 1px solid rgba(178, 178, 178, 0.85);
          border-radius: 9px;
          background: #FFFFFF;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 13.5px;
          letter-spacing: 0.02em;
          color: #141415;
          padding: 0 16px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          outline: none;
        }
        .apply-input::placeholder {
          color: rgba(46, 46, 47, 0.45);
        }
        .apply-input:focus {
          border-color: #744FE7;
          box-shadow: 0 0 0 3px rgba(116, 79, 231, 0.12);
        }
        .apply-input.input-error {
          border-color: #E53935 !important;
          background: #FFFDFD;
        }
        .apply-input:-webkit-autofill,
        .apply-input:-webkit-autofill:hover,
        .apply-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #FFFFFF inset !important;
          -webkit-text-fill-color: #141415 !important;
          border-color: #744FE7 !important;
          transition: background-color 9999s ease-in-out 0s;
        }
        .apply-error-text {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: #E53935;
          margin-top: 4px;
          line-height: 14px;
          font-weight: 500;
        }

        .apply-phone-row {
          display: flex;
          gap: 8px;
          width: 100%;
        }
        .apply-phone-flag {
          box-sizing: border-box;
          height: 46px;
          min-width: 86px;
          border: 1px solid rgba(178, 178, 178, 0.85);
          border-radius: 9px;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: #744FE7;
          padding: 0 10px;
          flex-shrink: 0;
          user-select: none;
        }

        .apply-resume-label {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 14px;
          line-height: 18px;
          color: #744FE7;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
        }
        .apply-dropzone {
          box-sizing: border-box;
          width: 100%;
          height: 120px;
          background: rgba(227, 217, 255, 0.22);
          border: 1.5px dashed rgba(142, 108, 247, 0.55);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .apply-dropzone.dragging, .apply-dropzone:hover {
          background: rgba(227, 217, 255, 0.45);
          border-color: #744FE7;
        }
        .apply-dropzone.dropzone-error {
          border-color: #E53935 !important;
          background: rgba(229, 57, 53, 0.04);
        }
        .apply-dropzone-icon {
          color: #744FE7;
        }
        .apply-dropzone-title {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.02em;
          color: #141415;
          margin: 0;
        }
        .apply-dropzone-hint {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 9.5px;
          letter-spacing: 0.02em;
          color: rgba(107, 114, 128, 0.75);
          margin: 0;
        }
        .apply-browse-btn {
          box-sizing: border-box;
          height: 26px;
          padding: 0 14px;
          border: 1.5px solid #9A79FF;
          border-radius: 7px;
          background: #FFFFFF;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 10.5px;
          color: #744FE7;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
          margin-top: 2px;
        }
        .apply-browse-btn:hover {
          background: #744FE7;
          color: #FFFFFF;
        }
        .apply-file-name {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #744FE7;
          font-weight: 600;
          margin: 0;
          max-width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* ─── Fixed Footer ─── */
        .apply-modal-footer {
          padding: 14px 34px 18px;
          background: #F4F0FF;
          flex-shrink: 0;
          border-top: 1px solid rgba(116, 79, 231, 0.12);
          box-shadow: 0 -6px 20px rgba(116, 79, 231, 0.06);
          z-index: 2;
        }
        .apply-submit-btn {
          box-sizing: border-box;
          width: 100%;
          height: 48px;
          background: #8963FF;
          border: 1px solid #744FE7;
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 16px;
          letter-spacing: 0.02em;
          color: #FFFFFF;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.22s ease, box-shadow 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .apply-submit-btn:hover {
          background: #7A52F5;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(116, 79, 231, 0.35);
        }
        .apply-disclaimer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 10.5px;
          line-height: 15px;
          letter-spacing: 0.02em;
          color: #737171;
          margin-top: 8px;
          margin-bottom: 0;
          text-align: center;
          width: 100%;
        }

        /* ─── Flip Back: Success Card ─── */
        .apply-success-box {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 480px;
          background: #F4F0FF;
          border-radius: 24px;
          border: 1.5px solid rgba(139, 99, 255, 0.22);
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 48px 36px;
          box-sizing: border-box;
          gap: 18px;
        }
        .apply-success-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(139, 99, 255, 0.10);
          border: 1px solid rgba(139, 99, 255, 0.20);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #744FE7;
          transition: background 0.2s ease, transform 0.2s ease, color 0.2s ease;
          flex-shrink: 0;
        }
        .apply-success-close:hover {
          background: rgba(139, 99, 255, 0.18);
          transform: scale(1.08);
          color: #5F35E2;
        }
        .apply-success-icon-ring {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8B63FF 0%, #6234E2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 0 14px rgba(139, 99, 255, 0.12);
          animation: applySuccessPulse 2.2s ease-in-out infinite;
        }
        @keyframes applySuccessPulse {
          0%, 100% { box-shadow: 0 0 0 14px rgba(139, 99, 255, 0.12); }
          50%       { box-shadow: 0 0 0 22px rgba(139, 99, 255, 0.05); }
        }
        .apply-success-title {
          font-family: 'Inter', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #141415;
          margin: 0;
          line-height: 1.25;
        }
        .apply-success-desc {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: rgba(46, 46, 47, 0.75);
          line-height: 1.65;
          margin: 0;
          max-width: 440px;
        }

        @media (max-width: 600px) {
          .apply-panel {
            max-height: 94vh;
            border-radius: 18px;
          }
          .apply-success-box {
            border-radius: 18px;
            padding: 36px 20px;
            gap: 14px;
            min-height: 380px;
          }
          .apply-success-title {
            font-size: 20px;
          }
          .apply-success-desc {
            font-size: 13.5px;
          }
          .apply-modal-header {
            padding: 16px 18px 12px;
          }
          .apply-modal-body {
            padding: 14px 18px 14px;
          }
          .apply-modal-footer {
            padding: 12px 18px 16px;
          }
          .apply-title {
            font-size: 20px;
            line-height: 28px;
          }
          .apply-field-row {
            flex-direction: column !important;
            gap: 0 !important;
          }
          .apply-field-row .apply-field-group {
            flex: 1 1 100% !important;
            width: 100% !important;
          }
        }
      `}</style>

      <div
        className="apply-overlay"
        ref={overlayRef}
        onClick={(e) => {
          if (e.target === overlayRef.current) handleClose();
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Apply for a Position"
      >
        <div className="apply-flip-scene">
          <div className={`apply-flip-card${submitted ? ' is-flipped' : ''}`}>
            {/* FRONT FACE: Form Panel */}
            <div className="apply-flip-front">
              <form className="apply-panel" onSubmit={handleSubmit} noValidate>
                {/* Fixed Header */}
                <div className="apply-modal-header">
                  <div className="apply-header-top">
                    <div className="apply-title-row">
                      <svg
                        className="apply-title-icon"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <h2 className="apply-title">Apply for a Position</h2>
                    </div>
                    <button
                      type="button"
                      className="apply-close-btn"
                      onClick={handleClose}
                      aria-label="Close modal"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  <p className="apply-subtitle">
                    Tell us a little about yourself. It only takes a minute.
                  </p>
                </div>

                {/* Scrollable Body */}
                <div className="apply-modal-body">
                  {/* Row 1: Full Name + Phone Number */}
                  <div className="apply-field-row">
                    <div className="apply-field-group" style={{ flex: 1 }}>
                      <label className="apply-label" htmlFor="apply-fullname">
                        Full Name <span className="apply-required">*</span>
                      </label>
                      <input
                        id="apply-fullname"
                        type="text"
                        className={`apply-input${errors.fullName ? ' input-error' : ''}`}
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                      />
                      {errors.fullName && <span className="apply-error-text">{errors.fullName}</span>}
                    </div>

                    <div className="apply-field-group" style={{ flex: 1 }}>
                      <label className="apply-label" htmlFor="apply-phone">
                        Phone Number <span className="apply-required">*</span>
                      </label>
                      <CountryPhoneInput
                        id="apply-phone"
                        value={formData.phone}
                        onChange={(nationalNumber, _full, country) => {
                          setFormData((prev) => ({ ...prev, phone: nationalNumber }));
                          setSelectedCountry(country.code);
                          setCountryDialCode(country.dialCode);
                          if (errors.phone) {
                            setErrors((prev) => {
                              const next = { ...prev };
                              delete next.phone;
                              return next;
                            });
                          }
                        }}
                        selectedCountry={selectedCountry}
                        onCountryChange={(country) => {
                          setSelectedCountry(country.code);
                          setCountryDialCode(country.dialCode);
                        }}
                        error={errors.phone}
                        variant="modal"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email Address (60%) + Experience (40%) in one row */}
                  <div className="apply-field-row">
                    <div className="apply-field-group" style={{ flex: '0 0 calc(60% - 7px)' }}>
                      <label className="apply-label" htmlFor="apply-email">
                        Email Address <span className="apply-required">*</span>
                      </label>
                      <input
                        id="apply-email"
                        type="email"
                        className={`apply-input${errors.email ? ' input-error' : ''}`}
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                      {errors.email && <span className="apply-error-text">{errors.email}</span>}
                    </div>

                    <div className="apply-field-group" style={{ flex: '0 0 calc(40% - 7px)' }}>
                      <label className="apply-label" htmlFor="apply-exp">
                        Experience <span className="apply-required">*</span>
                      </label>
                      <input
                        id="apply-exp"
                        type="text"
                        className={`apply-input${errors.experience ? ' input-error' : ''}`}
                        placeholder="Experience"
                        value={formData.experience}
                        onChange={(e) => handleChange('experience', e.target.value)}
                      />
                      {errors.experience && <span className="apply-error-text">{errors.experience}</span>}
                    </div>
                  </div>

                  {/* Row 3: Current CTC (50%) + Expected CTC (50%) in one row */}
                  <div className="apply-field-row">
                    <div className="apply-field-group" style={{ flex: 1 }}>
                      <label className="apply-label" htmlFor="apply-current-ctc">
                        Current CTC (in LPA) <span className="apply-required">*</span>
                      </label>
                      <input
                        id="apply-current-ctc"
                        type="text"
                        className={`apply-input${errors.currentCtc ? ' input-error' : ''}`}
                        placeholder="Enter your Current CTC"
                        value={formData.currentCtc}
                        onChange={(e) => handleChange('currentCtc', e.target.value)}
                      />
                      {errors.currentCtc && <span className="apply-error-text">{errors.currentCtc}</span>}
                    </div>

                    <div className="apply-field-group" style={{ flex: 1 }}>
                      <label className="apply-label" htmlFor="apply-expected-ctc">
                        Expected CTC (in LPA)<span className="apply-required">*</span>
                      </label>
                      <input
                        id="apply-expected-ctc"
                        type="text"
                        className={`apply-input${errors.expectedCtc ? ' input-error' : ''}`}
                        placeholder="Enter your Expected CTC"
                        value={formData.expectedCtc}
                        onChange={(e) => handleChange('expectedCtc', e.target.value)}
                      />
                      {errors.expectedCtc && <span className="apply-error-text">{errors.expectedCtc}</span>}
                    </div>
                  </div>

                  {/* Row 4: Notice Period (30%) + Applying For (70%) in one row */}
                  <div className="apply-field-row">
                    <div className="apply-field-group" style={{ flex: '0 0 calc(30% - 7px)' }}>
                      <label className="apply-label" htmlFor="apply-notice">
                        Notice Period (in days)<span className="apply-required">*</span>
                      </label>
                      <input
                        id="apply-notice"
                        type="text"
                        className={`apply-input${errors.noticePeriod ? ' input-error' : ''}`}
                        placeholder="e.g. 30 "
                        value={formData.noticePeriod}
                        onChange={(e) => handleChange('noticePeriod', e.target.value)}
                      />
                      {errors.noticePeriod && <span className="apply-error-text">{errors.noticePeriod}</span>}
                    </div>

                    <div className="apply-field-group" style={{ flex: '0 0 calc(70% - 7px)' }}>
                      <label className="apply-label" htmlFor="apply-position">
                        Applying For <span className="apply-required">*</span>
                      </label>
                      <input
                        id="apply-position"
                        type="text"
                        className={`apply-input${errors.applyingFor ? ' input-error' : ''}`}
                        placeholder="Enter name of Position / Department"
                        value={formData.applyingFor}
                        onChange={(e) => handleChange('applyingFor', e.target.value)}
                      />
                      {errors.applyingFor && <span className="apply-error-text">{errors.applyingFor}</span>}
                    </div>
                  </div>

                  {/* Row 5: Relevant Link (optional) */}
                  <div className="apply-field-group">
                    <label className="apply-label" htmlFor="apply-link">
                      Relevant Link{' '}
                    </label>
                    <input
                      id="apply-link"
                      type="url"
                      className="apply-input"
                      placeholder="Paste LinkedIn, portfolio, GitHub or other relevant link"
                      value={formData.relevantLink}
                      onChange={(e) => handleChange('relevantLink', e.target.value)}
                    />
                  </div>

                  {/* Row 6: Resume Upload */}
                  <div className="apply-field-group" style={{ marginBottom: 4 }}>
                    <div className="apply-resume-label">
                      Resume <span className="apply-required">*</span>
                    </div>
                    <div
                      className={`apply-dropzone${isDragging ? ' dragging' : ''}${errors.resume ? ' dropzone-error' : ''}`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      role="button"
                      tabIndex={0}
                      aria-label="Upload resume"
                    >
                      <svg
                        className="apply-dropzone-icon"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#744FE7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                        <polyline points="16 12 12 8 8 12" />
                        <line x1="12" y1="8" x2="12" y2="18" />
                      </svg>
                      {resumeFile ? (
                        <p className="apply-file-name">{resumeFile.name}</p>
                      ) : (
                        <>
                          <p className="apply-dropzone-title">Upload your resume</p>
                          <p className="apply-dropzone-hint">PDF, DOC or DOCX (Max. 4MB)</p>
                        </>
                      )}
                      <button
                        type="button"
                        className="apply-browse-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                      >
                        Browse File
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                    </div>
                    {errors.resume && <span className="apply-error-text">{errors.resume}</span>}
                  </div>
                </div>

                {/* Fixed Footer */}
                <div className="apply-modal-footer">
                  <button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    className="apply-submit-btn"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>

                  <div className="apply-disclaimer">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#737171"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0 }}
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>By submitting, you agree to be contacted regarding your application</span>
                  </div>
                </div>
              </form>
            </div>

            {/* BACK FACE: Success Screen */}
            <div className="apply-flip-back">
              <div className="apply-success-box">
                {/* Close button */}
                <button
                  type="button"
                  className="apply-success-close"
                  aria-label="Close success message"
                  onClick={handleClose}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Animated checkmark ring */}
                <div className="apply-success-icon-ring" aria-hidden="true">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                {/* Meaningful Title */}
                <h3 className="apply-success-title">Thank you for applying!</h3>

                {/* Meaningful Description */}
                <p className="apply-success-desc">
                  We&apos;ve received your application and our team will reach out to you shortly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

