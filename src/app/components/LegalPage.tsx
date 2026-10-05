"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
  after?: string[];
};

type LegalPageProps = {
  title: string;
  subtitle?: string;
  leads?: string[];
  sections: LegalSection[];
};

export default function LegalPage({ title, subtitle, leads, sections }: LegalPageProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-80px 0px -55% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    elements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    setActiveId(id);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  const displaySubtitle =
    subtitle ||
    (leads && leads.length > 0 ? leads[0] : "");

  return (
    <div className="legal-page-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .legal-page-root {
          min-height: 100vh;
          width: 100%;
          background: #F8FAFD;
          color: #0F172A;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          display: flex;
          flex-direction: column;
        }

        /* ── Top Hero Banner (Standard Gelora Tech Brand Theme) ── */
        .legal-hero {
          position: relative;
          width: 100%;
          background: #080415 url('/asset/bg.png') top center / cover no-repeat;
          padding: clamp(24px, 3.5vh, 36px) clamp(20px, 4vw, 64px) clamp(44px, 6vh, 68px);
          box-sizing: border-box;
          overflow: hidden;
        }

        .legal-hero-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 80% 70% at 50% 30%,
            rgba(116, 79, 231, 0.35) 0%,
            rgba(49, 87, 255, 0.22) 50%,
            transparent 85%
          ),
          linear-gradient(
            135deg,
            rgba(8, 4, 21, 0.94) 0%,
            rgba(13, 10, 36, 0.85) 45%,
            rgba(26, 20, 78, 0.78) 75%,
            rgba(49, 87, 255, 0.28) 100%
          );
          pointer-events: none;
        }

        .legal-hero-top {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1360px;
          margin: 0 auto;
        }

        .legal-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          text-decoration: none;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          cursor: pointer;
        }

        .legal-back-btn:hover {
          background: rgba(255, 255, 255, 0.22);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateX(-2px);
          color: #FFFFFF;
        }

        .legal-back-arrow {
          transition: transform 0.2s ease;
        }

        .legal-back-btn:hover .legal-back-arrow {
          transform: translateX(-2px);
        }

        .legal-hero-center {
          position: relative;
          z-index: 2;
          max-width: 820px;
          margin: clamp(16px, 2.5vh, 28px) auto 0;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .legal-hero-title {
          margin: 0 0 12px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(32px, 4.4vw, 52px);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: #FFFFFF;
        }

        .legal-hero-subtitle {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: clamp(14px, 1.15vw, 16.5px);
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.88);
          max-width: 700px;
        }

        /* ── Main Content Body ── */
        .legal-body {
          width: 100%;
          background: #F8FAFD;
          flex: 1;
          padding: clamp(32px, 4vw, 56px) clamp(20px, 4vw, 64px) clamp(64px, 8vh, 100px);
          box-sizing: border-box;
        }

        .legal-container {
          max-width: 1360px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(260px, 300px) minmax(0, 1fr);
          gap: clamp(24px, 3vw, 44px);
          align-items: start;
        }

        /* ── Left Sidebar (CONTENTS) ── */
        .legal-sidebar {
          position: sticky;
          top: 32px;
          max-height: calc(100vh - 64px);
        }

        .legal-nav-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 20px 16px;
          box-shadow: 0 2px 12px rgba(15, 23, 42, 0.03);
          max-height: calc(100vh - 64px);
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(116, 79, 231, 0.25) transparent;
        }

        .legal-nav-label {
          margin: 0 0 14px 10px;
          font-family: 'Inter', sans-serif;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #3157FF;
        }

        .legal-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .legal-nav-item-wrap {
          width: 100%;
        }

        .legal-nav-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          background: transparent;
          border: none;
          border-left: 3px solid transparent;
          border-radius: 8px;
          padding: 9px 12px;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          line-height: 1.4;
          font-weight: 500;
          color: #475569;
          cursor: pointer;
          transition: all 0.16s ease;
          gap: 10px;
        }

        .legal-nav-btn:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .legal-nav-btn.active {
          background: #EFF6FF;
          color: #1D4ED8;
          font-weight: 600;
          border-left-color: #3157FF;
        }

        .legal-nav-text {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .legal-nav-chevron {
          font-size: 17px;
          line-height: 1;
          color: #3157FF;
          opacity: 0;
          transition: opacity 0.16s ease, transform 0.16s ease;
        }

        .legal-nav-btn.active .legal-nav-chevron {
          opacity: 1;
          transform: translateX(1px);
        }

        /* ── Right Content Card ── */
        .legal-content-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: clamp(28px, 4vw, 48px);
          box-shadow: 0 4px 24px rgba(15, 23, 42, 0.04);
          box-sizing: border-box;
        }

        .legal-leads-box {
          margin-bottom: 28px;
          padding-bottom: 24px;
          border-bottom: 1px solid #F1F5F9;
        }

        .legal-lead-text {
          margin: 0 0 12px;
          font-size: 15.5px;
          line-height: 1.75;
          color: #334155;
        }

        .legal-lead-text:last-child {
          margin-bottom: 0;
        }

        .legal-section {
          scroll-margin-top: 40px;
          padding: 28px 0 12px;
          border-top: 1px solid #F1F5F9;
        }

        .legal-section:first-of-type {
          border-top: none;
          padding-top: 0;
        }

        .legal-section-title {
          margin: 0 0 16px;
          font-family: 'Inter', sans-serif;
          font-size: 20px;
          line-height: 1.35;
          font-weight: 700;
          color: #0F172A;
        }

        .legal-section-p {
          margin: 0 0 14px;
          font-size: 15px;
          line-height: 1.75;
          color: #334155;
        }

        .legal-section-list {
          margin: 0 0 16px;
          padding-left: 22px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .legal-section-li {
          font-size: 15px;
          line-height: 1.65;
          color: #334155;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .legal-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .legal-sidebar {
            position: static;
            max-height: none;
          }

          .legal-nav-card {
            padding: 12px 14px;
            max-height: none;
            overflow: visible;
          }

          .legal-nav-label {
            margin: 0 0 8px 4px;
          }

          .legal-nav-list {
            flex-direction: row;
            flex-wrap: nowrap;
            overflow-x: auto;
            gap: 8px;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
          }

          .legal-nav-item-wrap {
            width: auto;
            flex-shrink: 0;
          }

          .legal-nav-btn {
            width: auto;
            white-space: nowrap;
            border-left: 1px solid #E2E8F0;
            border: 1px solid #E2E8F0;
            border-radius: 9999px;
            padding: 8px 16px;
          }

          .legal-nav-btn.active {
            border-color: #3157FF;
            background: #EFF6FF;
          }

          .legal-nav-chevron {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .legal-hero {
            padding: 20px 16px 40px;
          }

          .legal-hero-title {
            font-size: 28px;
          }

          .legal-body {
            padding: 20px 14px 56px;
          }

          .legal-content-card {
            padding: 22px 16px;
            border-radius: 16px;
          }

          .legal-section-title {
            font-size: 18px;
          }
        }
      `}</style>

      {/* ── Top Hero Banner ── */}
      <header className="legal-hero">
        <div className="legal-hero-glow" aria-hidden="true" />
        <div className="legal-hero-top">
          <Link href="/" className="legal-back-btn" aria-label="Back to Home">
            <svg className="legal-back-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="legal-hero-center">
          <h1 className="legal-hero-title">{title}</h1>
          {displaySubtitle ? (
            <p className="legal-hero-subtitle">{displaySubtitle}</p>
          ) : null}
        </div>
      </header>

      {/* ── Main Content Body ── */}
      <div className="legal-body">
        <div className="legal-container">
          {/* Left Table of Contents */}
          <aside className="legal-sidebar">
            <nav className="legal-nav-card" aria-label="Table of contents">
              <p className="legal-nav-label">CONTENTS</p>
              <ul className="legal-nav-list">
                {sections.map((section, index) => {
                  const isActive = activeId === section.id;
                  return (
                    <li key={section.id} className="legal-nav-item-wrap">
                      <button
                        type="button"
                        className={`legal-nav-btn ${isActive ? "active" : ""}`}
                        onClick={() => scrollToSection(section.id)}
                      >
                        <span className="legal-nav-text">
                          {index + 1}. {section.title}
                        </span>
                        <span className="legal-nav-chevron" aria-hidden="true">›</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Right Main Content Card */}
          <main className="legal-content-card">
            {leads && leads.length > 1 ? (
              <div className="legal-leads-box">
                {leads.slice(1).map((lead, i) => (
                  <p key={i} className="legal-lead-text">{lead}</p>
                ))}
              </div>
            ) : null}

            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="legal-section"
                aria-labelledby={`${section.id}-title`}
              >
                <h2 id={`${section.id}-title`} className="legal-section-title">
                  {index + 1}. {section.title}
                </h2>
                {section.paragraphs?.map((paragraph, pIdx) => (
                  <p key={pIdx} className="legal-section-p">{paragraph}</p>
                ))}
                {section.list && section.list.length > 0 ? (
                  <ul className="legal-section-list">
                    {section.list.map((item, itemIdx) => (
                      <li key={itemIdx} className="legal-section-li">{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.after?.map((paragraph, aIdx) => (
                  <p key={aIdx} className="legal-section-p">{paragraph}</p>
                ))}
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
