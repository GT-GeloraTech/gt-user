"use client";

import { useState } from "react";
import ApplyModal from "./ApplyModal";

interface FullStackDeveloperProps {
  onBack?: () => void;
}

export default function FullStackDeveloperPage({ onBack }: FullStackDeveloperProps = {}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="fsd-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&display=swap');

        .fsd-shell {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: #F4F0FD;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          color: #111016;
        }

        .fsd-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(103, 66, 234, 0.08);
          border: 1px solid rgba(103, 66, 234, 0.22);
          border-radius: 9999px;
          padding: 8px 18px;
          margin-bottom: 24px;
          color: #6742EA;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .fsd-back-btn:hover {
          background: #6742EA;
          color: #FFFFFF;
          border-color: #6742EA;
          transform: translateX(-3px);
        }

        /* Wide container matching the Figma canvas proportions */
        .fsd-wrap {
          width: 100%;
          max-width: 1420px;
          margin: 0 auto;
          padding: 84px clamp(24px, 3.5vw, 56px) 96px;
          box-sizing: border-box;
          flex: 1;
        }

        /* HERO SECTION */
        .fsd-hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(24px, 3.5vw, 64px);
          margin-bottom: clamp(48px, 6vh, 68px);
        }
        .fsd-hero-left {
          flex: 1 1 auto;
          min-width: 0;
        }

        .fsd-badge {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #572ED7;
          margin-bottom: 14px;
        }
        .fsd-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #572ED7;
          flex-shrink: 0;
        }

        .fsd-title {
          margin: 0 0 18px 0;
          font-size: clamp(38px, 4.4vw, 68px);
          font-weight: 700;
          line-height: 1.06;
          letter-spacing: -0.025em;
          color: #111016;
          white-space: nowrap;
        }

        .fsd-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 22px;
        }
        .fsd-tag {
          padding: 6px 22px;
          border-radius: 9999px;
          background: #E5DEF8;
          font-size: 14px;
          font-weight: 500;
          color: #572ED7;
          user-select: none;
          border: none;
        }

        .fsd-hero-desc {
          margin: 0 0 28px 0;
          font-size: clamp(14.5px, 1.08vw, 15.5px);
          line-height: 1.7;
          color: #504C64;
          max-width: 510px;
        }

        .fsd-apply-hero {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          height: 48px;
          padding: 0 30px;
          border-radius: 9999px;
          background: #6742EA;
          border: none;
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(103, 66, 234, 0.28);
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .fsd-apply-hero:hover {
          background: #5633D6;
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(103, 66, 234, 0.38);
        }
        .fsd-apply-hero svg {
          transition: transform 0.2s ease;
        }
        .fsd-apply-hero:hover svg {
          transform: translateX(3px);
        }

        /* HERO ILLUSTRATION */
        .fsd-hero-art {
          flex: 0 0 auto;
          width: clamp(300px, 34vw, 470px);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .fsd-art-svg {
          width: 100%;
          height: auto;
          overflow: visible;
        }

        /* SECTIONS WITH DIVIDER LINES */
        .fsd-sections {
          display: flex;
          flex-direction: column;
          width: 100%;
          border-top: 1px solid rgba(116, 79, 231, 0.16);
        }

        .fsd-row {
          padding: clamp(36px, 4.5vh, 48px) 0;
          border-bottom: 1px solid rgba(116, 79, 231, 0.16);
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: clamp(24px, 3.5vw, 60px);
          align-items: start;
        }

        .fsd-row-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .fsd-icon-wrap {
          position: relative;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #EBE4FA;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #6742EA;
        }

        .fsd-sparkle-decor {
          position: absolute;
          top: -14px;
          left: 3px;
          pointer-events: none;
        }

        .fsd-row-title {
          margin: 0;
          font-size: clamp(20px, 1.65vw, 23px);
          font-weight: 700;
          line-height: 1.25;
          color: #111016;
          letter-spacing: -0.015em;
        }

        .fsd-row-right {
          padding-top: 4px;
        }

        .fsd-p {
          margin: 0 0 20px 0;
          font-size: clamp(14.5px, 1.05vw, 15.5px);
          line-height: 1.74;
          color: #4E4A63;
        }
        .fsd-p:last-child {
          margin-bottom: 0;
        }

        .fsd-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .fsd-list-item {
          display: flex;
          align-items: baseline;
          font-size: clamp(14.5px, 1.05vw, 15.5px);
          line-height: 1.66;
          color: #4E4A63;
        }
        .fsd-list-num {
          flex-shrink: 0;
          margin-right: 8px;
          color: #4E4A63;
          font-weight: 400;
          white-space: nowrap;
        }

        /* SKILLS CHIPS */
        .fsd-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 14px;
          max-width: 660px;
        }
        .fsd-chip {
          padding: 8px 26px;
          border-radius: 9999px;
          border: 1.5px solid #8465E8;
          background: transparent;
          font-size: 14px;
          font-weight: 500;
          color: #572ED7;
          user-select: none;
          cursor: default;
          transition: all 0.2s ease;
        }
        .fsd-chip:hover {
          background: rgba(103, 66, 234, 0.08);
          border-color: #6742EA;
        }

        /* PERKS (3 COLUMNS) */
        .fsd-perks {
          display: flex;
          align-items: flex-start;
          width: 100%;
        }
        .fsd-perk {
          flex: 1 1 0;
          padding-right: 32px;
        }
        .fsd-perk:not(:last-child) {
          border-right: 1px solid rgba(116, 79, 231, 0.2);
          margin-right: 32px;
        }
        .fsd-perk-num {
          display: block;
          font-size: 21px;
          font-weight: 500;
          color: #6742EA;
          margin-bottom: 11px;
          line-height: 1.2;
        }
        .fsd-perk-text {
          margin: 0;
          font-size: clamp(14px, 1vw, 15px);
          line-height: 1.65;
          color: #4E4A63;
        }

        /* BOTTOM CTA CARD */
        .fsd-cta {
          margin-top: clamp(48px, 6vh, 64px);
          padding: clamp(32px, 4vw, 48px) clamp(28px, 4vw, 52px);
          border-radius: 20px;
          background: rgba(243, 239, 255, 0.6);
          border: 1px solid rgba(116, 79, 231, 0.18);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          position: relative;
        }
        .fsd-cta-corner-arrow {
          position: absolute;
          top: 26px;
          right: 30px;
          color: #6742EA;
          opacity: 0.22;
          pointer-events: none;
        }
        .fsd-cta-left {
          max-width: 540px;
        }
        .fsd-cta-heading {
          margin: 0 0 10px 0;
          font-size: clamp(28px, 3.2vw, 38px);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #111016;
        }
        .fsd-cta-italic {
          font-style: italic;
          font-weight: 400;
          color: #6742EA;
        }
        .fsd-cta-sub {
          margin: 0;
          font-size: clamp(14px, 1vw, 15px);
          line-height: 1.66;
          color: #504C64;
        }
        .fsd-cta-btn {
          flex-shrink: 0;
          height: 48px;
          padding: 0 32px;
          border-radius: 9999px;
          background: #6742EA;
          border: none;
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 6px 20px rgba(103, 66, 234, 0.26);
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .fsd-cta-btn:hover {
          background: #5633D6;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(103, 66, 234, 0.36);
        }

        /* RESPONSIVE */
        @media (max-width: 1150px) {
          .fsd-title {
            white-space: normal;
            font-size: clamp(34px, 5vw, 54px);
          }
        }

        @media (max-width: 960px) {
          .fsd-hero {
            flex-direction: column;
            align-items: flex-start;
          }
          .fsd-hero-art {
            width: 100%;
            max-width: 400px;
            margin: 10px auto 0;
          }
          .fsd-row {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .fsd-cta {
            flex-direction: column;
            align-items: flex-start;
          }
          .fsd-cta-btn {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 640px) {
          .fsd-perks {
            flex-direction: column;
            gap: 22px;
          }
          .fsd-perk {
            border-right: none !important;
            margin-right: 0 !important;
            padding-right: 0;
            padding-bottom: 22px;
            border-bottom: 1px solid rgba(116, 79, 231, 0.16);
          }
          .fsd-perk:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
          .fsd-apply-hero {
            width: 100%;
            justify-content: center;
          }
          .fsd-chips {
            gap: 10px;
          }
          .fsd-chip {
            padding: 7px 20px;
            font-size: 13.5px;
          }
        }
      `}</style>

      <div className="fsd-wrap">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="fsd-back-btn"
            aria-label="Back to all opportunities"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to all opportunities</span>
          </button>
        )}

        {/* HERO SECTION */}
        <div className="fsd-hero">
          <div className="fsd-hero-left">
            <div className="fsd-badge">
              <span className="fsd-badge-dot" />
              CURRENT OPPORTUNITY
            </div>
            <h1 className="fsd-title">Full Stack Developer</h1>
            <div className="fsd-tags">
              <span className="fsd-tag">Development</span>
              <span className="fsd-tag">Full-time</span>
            </div>
            <p className="fsd-hero-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button type="button" className="fsd-apply-hero" onClick={() => setIsModalOpen(true)}>
              Apply for this role
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* SVG ILLUSTRATION */}
          <div className="fsd-hero-art" aria-hidden="true">
            <svg className="fsd-art-svg" viewBox="0 0 490 380" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer Orbit Path */}
              <ellipse
                cx="255"
                cy="195"
                rx="195"
                ry="120"
                stroke="#6742EA"
                strokeWidth="1.2"
                strokeDasharray="4 6"
                opacity="0.32"
                transform="rotate(-8 255 195)"
              />
              {/* Inner Orbit Path */}
              <ellipse
                cx="255"
                cy="195"
                rx="165"
                ry="95"
                stroke="#7B57E8"
                strokeWidth="1"
                strokeDasharray="3 5"
                opacity="0.22"
                transform="rotate(16 255 195)"
              />

              {/* Orbit Dots */}
              <circle cx="85" cy="205" r="4.5" fill="#6742EA" />
              <circle cx="430" cy="180" r="4" fill="#6742EA" />
              <circle cx="320" cy="85" r="4" fill="#6742EA" />
              <circle cx="180" cy="305" r="4" fill="#6742EA" />
              <circle cx="445" cy="245" r="3.5" fill="#6742EA" />

              {/* Browser Card Shadow */}
              <rect x="125" y="90" width="280" height="210" rx="16" fill="rgba(103, 66, 234, 0.05)" />

              {/* Main Browser Window */}
              <rect x="120" y="85" width="280" height="210" rx="16" fill="#FFFFFF" />
              <rect x="120" y="85" width="280" height="210" rx="16" stroke="rgba(103, 66, 234, 0.18)" strokeWidth="1.2" />

              {/* Browser Header Top Bar */}
              <path d="M120 101C120 92.1634 127.163 85 136 85H384C392.837 85 400 92.1634 400 101V122H120V101Z" fill="#F4F0FD" />
              <line x1="120" y1="122" x2="400" y2="122" stroke="rgba(103, 66, 234, 0.12)" strokeWidth="1" />

              {/* Header 3 Dots */}
              <circle cx="138" cy="103.5" r="4" fill="#C2B2F8" />
              <circle cx="150" cy="103.5" r="4" fill="#D6CAFA" />
              <circle cx="162" cy="103.5" r="4" fill="#EAE2FC" />

              {/* Inner Code Card on Left */}
              <rect x="142" y="140" width="82" height="76" rx="13" fill="#EDE7FC" stroke="rgba(103, 66, 234, 0.2)" strokeWidth="1.2" />
              <text x="183" y="186" fontFamily="'Inter', monospace" fontSize="22" fontWeight="700" fill="#6742EA" textAnchor="middle">&lt;/&gt;</text>

              {/* Code Lines on Right */}
              <rect x="240" y="146" width="118" height="7" rx="3.5" fill="#DCD3FA" opacity="0.8" />
              <rect x="240" y="162" width="94" height="7" rx="3.5" fill="#DDD4FA" opacity="0.6" />
              <rect x="240" y="177" width="62" height="8" rx="4" fill="#7C57E8" />
              <rect x="240" y="193" width="124" height="7" rx="3.5" fill="#E4DCFC" opacity="0.9" />


              <circle cx="147" cy="242" r="3" fill="#6742EA" opacity="0.6" />
              <rect x="157" y="238.5" width="76" height="7" rx="3.5" fill="#D8CEFA" />
              <rect x="142" y="255" width="190" height="7" rx="3.5" fill="#E8E2FC" />


              <g filter="drop-shadow(0 6px 14px rgba(103, 66, 234, 0.12))">
                <rect x="54" y="170" width="58" height="42" rx="12" fill="#FFFFFF" stroke="rgba(103, 66, 234, 0.22)" strokeWidth="1.2" />
                <text x="83" y="196" fontFamily="'Inter', monospace" fontSize="13" fontWeight="600" fill="#6742EA" textAnchor="middle">{"{...}"}</text>
              </g>

              <g filter="drop-shadow(0 6px 14px rgba(103, 66, 234, 0.12))">
                <rect x="396" y="152" width="54" height="42" rx="12" fill="#FFFFFF" stroke="rgba(103, 66, 234, 0.22)" strokeWidth="1.2" />
                <text x="423" y="178" fontFamily="'Inter', sans-serif" fontSize="15" fontWeight="700" fill="#6742EA" textAnchor="middle">JS</text>
              </g>

              <g filter="drop-shadow(0 6px 14px rgba(103, 66, 234, 0.12))">
                <rect x="378" y="254" width="50" height="38" rx="12" fill="#FFFFFF" stroke="rgba(103, 66, 234, 0.22)" strokeWidth="1.2" />
                <circle cx="395" cy="273" r="2.5" fill="#6742EA" />
                <circle cx="403" cy="273" r="2.5" fill="#6742EA" />
                <circle cx="411" cy="273" r="2.5" fill="#6742EA" />
              </g>
            </svg>
          </div>
        </div>

        {/* DETAILED SECTIONS */}
        <div className="fsd-sections">

          {/* 1. About the Role */}
          <section className="fsd-row" aria-labelledby="fsd-about">
            <div className="fsd-row-left">
              <div className="fsd-icon-wrap" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6742EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h2 id="fsd-about" className="fsd-row-title">About the Role</h2>
            </div>
            <div className="fsd-row-right">
              <p className="fsd-p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="fsd-p">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
            </div>
          </section>

          {/* 2. What You'll Do */}
          <section className="fsd-row" aria-labelledby="fsd-duties">
            <div className="fsd-row-left">
              <div className="fsd-icon-wrap" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6742EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h2 id="fsd-duties" className="fsd-row-title">What You&apos;ll Do</h2>
            </div>
            <div className="fsd-row-right">
              <div className="fsd-list">
                {[
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
                  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
                  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
                  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
                ].map((item, i) => (
                  <div key={i} className="fsd-list-item">
                    <span className="fsd-list-num">{String(i + 1).padStart(2, "0")} — </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. What We're Looking For */}
          <section className="fsd-row" aria-labelledby="fsd-looking">
            <div className="fsd-row-left">
              <div className="fsd-icon-wrap" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6742EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h2 id="fsd-looking" className="fsd-row-title">
                What We&apos;re<br />Looking For
              </h2>
            </div>
            <div className="fsd-row-right">
              <div className="fsd-list">
                {[
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
                  "Experience with relevant tools and technologies in similar role.",
                  "Strong problem-solving skills and attention to detail.",
                  "Excellent communication and teamwork abilities.",
                ].map((item, i) => (
                  <div key={i} className="fsd-list-item">
                    <span className="fsd-list-num">{String(i + 1).padStart(2, "0")} — </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Skills & Experience */}
          <section className="fsd-row" aria-labelledby="fsd-skills">
            <div className="fsd-row-left">
              <div className="fsd-icon-wrap" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6742EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h2 id="fsd-skills" className="fsd-row-title">
                Skills &amp;<br />Experience
              </h2>
            </div>
            <div className="fsd-row-right">
              <div className="fsd-chips">
                {[
                  "Lorem Ipsum",
                  "Lorem Ipsum",
                  "Lorem Ipsum",
                  "Lorem Ipsum",
                  "Lorem Ipsum",
                  "Lorem Ipsum",
                  "Lorem Ipsum",
                ].map((skill, index) => (
                  <span key={index} className="fsd-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* 5. What You'll Get */}
          <section className="fsd-row" aria-labelledby="fsd-perks">
            <div className="fsd-row-left">
              <div className="fsd-icon-wrap" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6742EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h2 id="fsd-perks" className="fsd-row-title">
                What You&apos;ll Get
              </h2>
            </div>
            <div className="fsd-row-right">
              <div className="fsd-perks">
                {[
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                ].map((text, i) => (
                  <div key={i} className="fsd-perk">
                    <span className="fsd-perk-num">01</span>
                    <p className="fsd-perk-text">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* BOTTOM CTA CARD */}
        <div className="fsd-cta">

          <div className="fsd-cta-left">
            <h2 className="fsd-cta-heading">
              {"Think you're a "}
              <span className="fsd-cta-italic">good fit?</span>
            </h2>
            <p className="fsd-cta-sub">
              {"We'd love to hear from you. Tell us what you can bring to the team and let's build something great together."}
            </p>
          </div>
          <button type="button" className="fsd-cta-btn" onClick={() => setIsModalOpen(true)}>
            Apply for this role
          </button>
        </div>
      </div>

      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultRole="Full Stack Developer"
      />
    </main>
  );
}
