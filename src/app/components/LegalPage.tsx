"use client";

import { useEffect, useState } from "react";
import Footer from "@/app/components/Footer";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
  after?: string[];
};

type LegalPageProps = {
  title: string;
  leads: string[];
  sections: LegalSection[];
};

export default function LegalPage({ title, leads, sections }: LegalPageProps) {
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
      { rootMargin: "-120px 0px -55% 0px", threshold: [0.15, 0.4, 0.7] },
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

  return (
    <main className="terms-page">
      <style>{`
        .terms-page {
          min-height: 100vh;
          width: 100%;
          background: #ffffff;
          color: #1c1730;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .terms-wrap {
          width: 100%;
          margin: 0;
          padding: 120px clamp(28px, 3vw, 56px) 88px;
          display: grid;
          grid-template-columns: minmax(260px, 320px) minmax(0, 860px);
          justify-content: start;
          gap: clamp(36px, 4vw, 72px);
          align-items: start;
        }
        .terms-nav {
          position: sticky;
          top: 108px;
          max-height: calc(100vh - 132px);
          overflow: auto;
          padding-right: 8px;
          scrollbar-width: thin;
          scrollbar-color: rgba(116, 79, 231, 0.35) transparent;
        }
        .terms-nav-label {
          margin: 0 0 16px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #744FE7;
        }
        .terms-nav-list {
          list-style: none;
          margin: 0;
          padding: 0 0 0 14px;
          border-left: 3px solid #E4DCF8;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .terms-nav-btn {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          border-radius: 8px;
          padding: 8px 12px;
          font-family: inherit;
          font-size: 14px;
          line-height: 1.35;
          font-weight: 400;
          color: #5C5674;
          cursor: pointer;
        }
        .terms-nav-btn:hover {
          color: #744FE7;
          background: rgba(116, 79, 231, 0.06);
        }
        .terms-nav-btn.active {
          color: #744FE7;
          font-weight: 600;
          background: rgba(116, 79, 231, 0.1);
        }
        .terms-intro {
          margin-bottom: 36px;
        }
        .terms-kicker {
          margin: 0 0 10px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #744FE7;
        }
        .terms-title {
          margin: 0 0 16px;
          font-size: clamp(32px, 4vw, 44px);
          line-height: 1.12;
          letter-spacing: -0.02em;
          font-weight: 700;
          color: #14121c;
        }
        .terms-lead {
          margin: 0 0 12px;
          font-size: 16.5px;
          line-height: 1.7;
          color: #3A3555;
        }
        .terms-section {
          scroll-margin-top: 112px;
          padding: 28px 0 8px;
          border-top: 1px solid #E8E2F6;
        }
        .terms-section h2 {
          margin: 0 0 14px;
          font-size: 22px;
          line-height: 1.3;
          font-weight: 700;
          color: #744FE7;
        }
        .terms-section p {
          margin: 0 0 14px;
          font-size: 16px;
          line-height: 1.75;
          color: #2E2A3D;
        }
        .terms-section ul {
          margin: 0 0 16px;
          padding: 0 0 0 20px;
        }
        .terms-section li {
          margin: 0 0 8px;
          font-size: 16px;
          line-height: 1.6;
          color: #2E2A3D;
        }
        @media (max-width: 860px) {
          .terms-wrap {
            grid-template-columns: 1fr;
            justify-content: stretch;
            gap: 28px;
            padding: 112px 20px 72px;
          }
          .terms-nav {
            position: static;
            max-height: none;
            overflow: visible;
            padding-right: 0;
          }
          .terms-nav-list {
            flex-direction: row;
            flex-wrap: nowrap;
            overflow-x: auto;
            gap: 8px;
            border-left: none;
            padding: 0 0 4px;
          }
          .terms-nav-btn {
            width: auto;
            white-space: nowrap;
            border: 1px solid #E4DCF8;
            padding: 8px 14px;
          }
        }
      `}</style>

      <div className="terms-wrap">
        <nav className="terms-nav" aria-label="On this page">
          <p className="terms-nav-label">On this page</p>
          <ul className="terms-nav-list">
            {sections.map((section, index) => (
              <li key={section.id}>
                <button
                  type="button"
                  className={`terms-nav-btn${activeId === section.id ? " active" : ""}`}
                  onClick={() => scrollToSection(section.id)}
                >
                  {index + 1}. {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <article>
          <header className="terms-intro">
            <p className="terms-kicker">Gelora Tech</p>
            <h1 className="terms-title">{title}</h1>
            {leads.map((lead) => (
              <p key={lead} className="terms-lead">
                {lead}
              </p>
            ))}
          </header>

          {sections.map((section, index) => (
            <section key={section.id} id={section.id} className="terms-section" aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`}>
                {index + 1}. {section.title}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list ? (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {section.after?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>
      </div>
      <Footer showCta={false} />
    </main>
  );
}
