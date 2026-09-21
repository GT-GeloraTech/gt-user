"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

interface FooterProps {
  showCta?: boolean;
}

const PARTICLES = [
  { left: "7.1%", top: "31.2%", w: 3.5, h: 3.5, bg: "rgba(183, 201, 224, 0.55)", op: 0.52 },
  { left: "6.7%", top: "36.8%", w: 1.5, h: 1.5, bg: "rgba(155, 143, 192, 0.45)", op: 0.15 },
  { left: "5.4%", top: "38.4%", w: 4.0, h: 4.0, bg: "rgba(183, 201, 224, 0.55)", op: 0.64 },
  { left: "60.5%", top: "53.7%", w: 1.5, h: 1.5, bg: "rgba(183, 201, 224, 0.55)", op: 0.4 },
  { left: "43.7%", top: "51.8%", w: 2.9, h: 2.9, bg: "rgba(155, 143, 192, 0.45)", op: 0.6 },
  { left: "2.1%", top: "79.8%", w: 1.9, h: 1.9, bg: "rgba(155, 143, 192, 0.45)", op: 0.24 },
  { left: "76.0%", top: "28.0%", w: 3.7, h: 3.7, bg: "rgba(155, 143, 192, 0.45)", op: 0.56 },
  { left: "9.5%", top: "21.7%", w: 3.2, h: 3.2, bg: "rgba(155, 143, 192, 0.45)", op: 0.43 },
  { left: "93.3%", top: "55.2%", w: 1.2, h: 1.2, bg: "rgba(183, 201, 224, 0.55)", op: 0.18 },
  { left: "98.5%", top: "69.9%", w: 3.0, h: 3.0, bg: "rgba(155, 143, 192, 0.45)", op: 0.64 },
  { left: "26.6%", top: "19.4%", w: 3.9, h: 3.9, bg: "rgba(183, 201, 224, 0.55)", op: 0.61 },
  { left: "26.7%", top: "57.4%", w: 1.8, h: 1.8, bg: "rgba(155, 143, 192, 0.45)", op: 0.12 },
  { left: "14.4%", top: "3.9%", w: 2.7, h: 2.7, bg: "rgba(155, 143, 192, 0.45)", op: 0.28 },
  { left: "86.3%", top: "45.0%", w: 4.0, h: 4.0, bg: "rgba(155, 143, 192, 0.45)", op: 0.64 },
  { left: "30.3%", top: "72.8%", w: 3.2, h: 3.2, bg: "rgba(183, 201, 224, 0.55)", op: 0.42 },
  { left: "92.7%", top: "29.2%", w: 1.9, h: 1.9, bg: "rgba(155, 143, 192, 0.45)", op: 0.57 },
];

export default function Footer({ showCta = true }: FooterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavToTop = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";

      if (pathname === href) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        router.push(href);
        setTimeout(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }, 40);
      }
    },
    [pathname, router]
  );

  return (
    <div className="gt-bottom-section">
      <style>{`
        /* ─── Bottom Section Container ─── */
        .gt-bottom-section {
          position: relative;
          width: 100%;
          align-self: stretch;
          box-sizing: border-box;
        }

        /* ─── CTA Wrapper (Rectangle 190) ─── */
        .gt-cta-wrapper {
          position: relative;
          width: 100%;
          min-height: 640px;
          background: linear-gradient(180deg, #E9E1FF 0%, #CDC2EA 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(60px, 7vw, 105px) clamp(16px, 3vw, 32px);
          box-sizing: border-box;
          overflow: hidden;
        }

        /* ─── CTA Card (Frame) ─── */
        .gt-cta-card {
          position: relative;
          width: 100%;
          max-width: 1070.4px;
          min-height: 493px;
          background: linear-gradient(135deg, #3D2D6E 0%, #5E4B8E 30%, #7B6BA5 65%, #9FC4D8 100%);
          border-radius: 32px;
          box-shadow: 0 24px 60px rgba(61, 45, 110, 0.28);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(48px, 6vw, 68px) clamp(24px, 4vw, 56px);
          box-sizing: border-box;
          text-align: center;
        }

        .gt-cta-circle-glow {
          position: absolute;
          width: 280px;
          height: 280px;
          right: -40px;
          top: -70px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 140px;
          pointer-events: none;
        }

        .gt-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .gt-cta-badge {
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 31px;
          padding: 0 18px;
          background: rgba(255, 255, 255, 0.13);
          border: 0.8px solid rgba(255, 255, 255, 0.22);
          border-radius: 100px;
          margin-bottom: 24px;
          user-select: none;
        }
        .gt-cta-badge-text {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 13px;
          line-height: 20px;
          color: #FFFFFF;
        }

        .gt-cta-headline {
          margin: 0 0 18px 0;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: clamp(34px, 4.4vw, 54px);
          line-height: 1.15;
          text-align: center;
          color: #FFFFFF;
          letter-spacing: -0.02em;
        }

        .gt-cta-subtext {
          margin: 0 0 34px 0;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: clamp(14.5px, 1.3vw, 17px);
          line-height: 28px;
          text-align: center;
          color: rgba(255, 255, 255, 0.68);
          max-width: 440px;
        }

        .gt-cta-btns {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .gt-cta-talk-btn {
          box-sizing: border-box;
          height: 54px;
          min-width: 160px;
          padding: 4px 4px 4px 24px;
          background: #FFFFFF;
          box-shadow: 0px 4px 20px rgba(94, 75, 142, 0.34), inset 0px 1px 0px rgba(255, 255, 255, 0.14);
          border-radius: 100px;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .gt-cta-talk-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0px 8px 26px rgba(94, 75, 142, 0.45);
        }
        .gt-cta-talk-text {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 15px;
          line-height: 21px;
          color: #744FE7;
          white-space: nowrap;
        }
        .gt-cta-arrow-box {
          width: 46px;
          height: 46px;
          background: #E5DCFF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, transform 0.2s ease;
          flex-shrink: 0;
        }
        .gt-cta-talk-btn:hover .gt-cta-arrow-box {
          background: #dacaff;
          transform: translateX(2px);
        }

        .gt-cta-explore-btn {
          box-sizing: border-box;
          height: 54px;
          min-width: 165px;
          padding: 0 28px;
          background: rgba(255, 255, 255, 0.1);
          border: 0.8px solid rgba(255, 255, 255, 0.25);
          border-radius: 100px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 15px;
          line-height: 22px;
          color: #FFFFFF;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: background 0.22s ease, transform 0.22s ease, border-color 0.22s ease;
          white-space: nowrap;
        }
        .gt-cta-explore-btn:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        /* ─── Footer Root ─── */
        .gt-footer-root {
          position: relative;
          width: 100%;
          background: radial-gradient(90% 125% at 50% 0%, #1e0d3e 0%, #130728 52%, #0b0318 100%);
          border-top: 1px solid rgba(167, 139, 250, 0.16);
          overflow: hidden;
          box-sizing: border-box;
        }

        /* Inner container */
        .gt-footer-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 68px clamp(24px, 6.8vw, 75px) 0;
          box-sizing: border-box;
        }

        /* 4 Columns Grid */
        .gt-footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1.15fr 1.35fr;
          gap: clamp(24px, 3.5vw, 48px);
          padding-bottom: 24px;
        }

        .gt-footer-brand-wrap {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
        }
        .gt-footer-logo-img {
          width: 68px;
          height: 68px;
          object-fit: contain;
          filter: drop-shadow(0 0 14px rgba(147, 95, 238, 0.8));
        }
        .gt-footer-brand-text {
          width: 170px;
          height: auto;
          margin-left: 2px;
          object-fit: contain;
        }

        .gt-footer-brand-desc {
          margin: 22px 0 0 0;
          font-family: 'Inter', sans-serif;
          font-size: 14.5px;
          line-height: 1.55;
          color: rgba(225, 218, 245, 0.78);
          max-width: 300px;
        }

        .gt-footer-col-title {
          margin: 0 0 22px 0;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 18.5px;
          line-height: 18px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #9B82F3;
        }

        .gt-footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .gt-footer-links-list a {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          line-height: 1.4;
          color: rgba(225, 218, 245, 0.85);
          text-decoration: none;
          transition: color 0.2s ease;
          display: inline-block;
        }
        .gt-footer-links-list a:hover {
          color: #ffffff;
        }

        .gt-footer-contacts-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .gt-footer-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          line-height: 1.4;
          color: rgba(225, 218, 245, 0.85);
          text-decoration: none;
        }
        .gt-footer-contact-item svg {
          flex-shrink: 0;
        }
        .gt-footer-contact-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .gt-footer-contact-text {
          display: flex;
          flex-direction: column;
        }
        .gt-footer-contact-label {
          display: none;
        }
        .gt-footer-email-link {
          color: rgba(225, 218, 245, 0.85);
          text-decoration: underline;
          text-underline-offset: 3.5px;
          transition: color 0.2s ease;
        }
        .gt-footer-email-link:hover {
          color: #ffffff;
        }

        /* ─── GELORA watermark: spanning full width below grid, overlapping bottom bar ─── */
        .gt-footer-watermark-wrap {
          position: relative;
          width: 100%;
          height: clamp(120px, 18vw, 240px);
          margin-top: 14px;
          margin-bottom: -58px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          pointer-events: none;
          user-select: none;
          overflow: hidden;
          z-index: 1;
        }
        .gt-footer-watermark {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 800;
          font-size: clamp(84px, 17.5vw, 240px);
          line-height: 0.84;
          letter-spacing: clamp(0.04em, 1.2vw, 0.08em);
          color: rgba(147, 95, 238, 0.088);
          white-space: nowrap;
          margin-bottom: -0.04em;
          display: block;
          text-align: center;
          width: 100%;
        }

        /* Bottom Bar */
        .gt-footer-bottom-wrap {
          position: relative;
          z-index: 2;
          width: 100%;
          box-sizing: border-box;
        }
        .gt-footer-bottom {
          position: relative;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          box-sizing: border-box;
          padding: 0 clamp(24px, 6.8vw, 75px) 28px;
          border-top: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          color: rgba(215, 206, 240, 0.65);
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
        }
        .gt-footer-bottom p {
          margin: 0;
          line-height: 1.5;
        }
        .gt-footer-legal-links {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .gt-footer-legal-links a {
          color: rgba(215, 206, 240, 0.65);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .gt-footer-legal-links a:hover {
          color: #ffffff;
        }

        /* ── Responsive ── */
        /* Hide large GELORA watermark on mobile and tablet */
        @media (max-width: 1024px) {
          .gt-footer-watermark-wrap {
            display: none !important;
          }
          .gt-footer-bottom-wrap {
            border-top: 1px solid rgba(167, 139, 250, 0.12);
            padding-top: 24px;
            margin-top: 24px;
          }
        }

        @media (max-width: 960px) {
          .gt-footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
        }

        @media (max-width: 640px) {
          .gt-footer-inner {
            padding: 42px 20px 0;
          }
          .gt-cta-wrapper {
            min-height: auto;
            padding: 38px 16px;
          }
          .gt-cta-card {
            min-height: auto;
            border-radius: 24px;
            padding: 34px 18px;
          }
          .gt-cta-headline {
            font-size: clamp(24px, 6.8vw, 34px);
            line-height: 1.2;
            margin-bottom: 12px;
          }
          .gt-cta-subtext {
            font-size: 13.5px;
            line-height: 22px;
            margin-bottom: 22px;
          }
          .gt-cta-btns {
            flex-direction: column;
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
            gap: 12px;
          }
          .gt-cta-talk-btn {
            width: 100%;
            height: 48px;
            justify-content: center;
            gap: 10px;
            padding: 4px 14px;
          }
          .gt-cta-explore-btn {
            width: 100%;
            height: 48px;
            justify-content: center;
          }

          /* ── Mobile Footer Grid: 2-column layout for navigation, full-width brand and contact ── */
          .gt-footer-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 26px 18px;
            padding-bottom: 20px;
          }

          /* Brand Section */
          .gt-footer-col-brand {
            grid-column: 1 / -1;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
          .gt-footer-brand-wrap {
            gap: 10px;
          }
          .gt-footer-logo-img {
            width: 46px;
            height: 46px;
          }
          .gt-footer-brand-text {
            width: 132px;
          }
          .gt-footer-brand-desc {
            margin: 12px 0 0 0;
            font-size: 13px;
            line-height: 1.55;
            color: rgba(225, 218, 245, 0.72);
            max-width: 100%;
          }

          /* Navigation: Explore & Services side-by-side */
          .gt-footer-col-explore {
            grid-column: 1 / 2;
          }
          .gt-footer-col-services {
            grid-column: 2 / 3;
          }
          .gt-footer-col-title {
            font-size: 12.5px;
            font-weight: 700;
            letter-spacing: 0.12em;
            margin: 0 0 14px 0;
            color: #b69afa;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .gt-footer-col-title::after {
            content: '';
            display: inline-block;
            width: 14px;
            height: 1.5px;
            background: rgba(182, 154, 250, 0.45);
            border-radius: 2px;
          }
          .gt-footer-links-list {
            gap: 10px;
          }
          .gt-footer-links-list a {
            font-size: 13.5px;
            line-height: 1.35;
            padding: 3px 0;
            color: rgba(235, 230, 252, 0.82);
            display: inline-flex;
            align-items: center;
            transition: color 0.15s ease, transform 0.15s ease;
          }
          .gt-footer-links-list a:active {
            color: #ffffff;
            transform: translateX(3px);
          }

          /* Contact Column */
          .gt-footer-col-contact {
            grid-column: 1 / -1;
            padding-top: 18px;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }
          .gt-footer-contacts-list {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .gt-footer-contact-item {
            background: rgba(255, 255, 255, 0.035);
            border: 1px solid rgba(167, 139, 250, 0.16);
            border-radius: 14px;
            padding: 10px 14px;
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
          }
          .gt-footer-contact-item:active {
            background: rgba(167, 139, 250, 0.14);
            border-color: rgba(167, 139, 250, 0.4);
            transform: scale(0.99);
          }
          .gt-footer-contact-icon {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: rgba(147, 95, 238, 0.18);
            border: 1px solid rgba(167, 139, 250, 0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .gt-footer-contact-text {
            display: flex;
            flex-direction: column;
            gap: 1px;
            min-width: 0;
          }
          .gt-footer-contact-label {
            display: block;
            font-size: 10.5px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(182, 154, 250, 0.75);
            font-weight: 600;
          }
          .gt-footer-contact-text span:not(.gt-footer-contact-label),
          .gt-footer-email-link {
            font-size: 13.5px;
            color: rgba(245, 242, 255, 0.95);
            font-weight: 500;
            text-decoration: none;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          /* Bottom Bar */
          .gt-footer-bottom-wrap {
            border-top: 1px solid rgba(167, 139, 250, 0.12);
            padding-top: 18px;
            margin-top: 10px;
          }
          .gt-footer-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 12px;
            padding: 0 20px 28px;
          }
          .gt-footer-bottom p {
            font-size: 12px;
            color: rgba(215, 206, 240, 0.6);
          }
          .gt-footer-legal-links {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 14px;
            font-size: 12px;
          }
          .gt-footer-legal-links a {
            color: rgba(215, 206, 240, 0.75);
          }
        }
      `}</style>

      {/* ─── CTA Card Section ─── */}
      {showCta && (
        <section className="gt-cta-wrapper" aria-label="Let's build something remarkable">
          <div className="gt-cta-card">
            <div className="gt-cta-circle-glow" aria-hidden="true" />

            {PARTICLES.map((pt, idx) => (
              <div
                key={idx}
                className="gt-particle"
                style={{
                  left: pt.left,
                  top: pt.top,
                  width: `${pt.w}px`,
                  height: `${pt.h}px`,
                  background: pt.bg,
                  opacity: pt.op,
                }}
                aria-hidden="true"
              />
            ))}

            <div className="gt-cta-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
              <span className="gt-cta-badge-text">Ready to build something great?</span>
            </div>

            <h2 className="gt-cta-headline">
              Let&apos;s build something<br />remarkable.
            </h2>

            <p className="gt-cta-subtext">
              Tell us about your project. We respond within one<br />business day.
            </p>

            <div className="gt-cta-btns">
              <Link href="/contact" className="gt-cta-talk-btn" onClick={(e) => handleNavToTop(e, "/contact")}>
                <span className="gt-cta-talk-text">Let&apos;s Talk</span>
                <div className="gt-cta-arrow-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#744FE7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>
              <Link href="/services" className="gt-cta-explore-btn" onClick={(e) => handleNavToTop(e, "/services")}>
                Explore Services
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── Footer Section ─── */}
      <footer className="gt-footer-root">
        <div className="gt-footer-inner">
          {/* 4-column grid */}
          <div className="gt-footer-grid">
            {/* Brand */}
            <div className="gt-footer-col gt-footer-col-brand">
              <Link
                href="/"
                className="gt-footer-brand-wrap"
                onClick={(e) => handleNavToTop(e, "/")}
                aria-label="Gelora Tech Home"
              >
                <Image src="/asset/logo.png" alt="Gelora Tech" width={58} height={58} className="gt-footer-logo-img" />
                <Image src="/asset/gtText.png" alt="Gelora Tech" width={162} height={42} className="gt-footer-brand-text" />
              </Link>
              <p className="gt-footer-brand-desc">
                Strategy, design, and technology<br />working together to create impact.
              </p>
            </div>

            {/* EXPLORE */}
            <div className="gt-footer-col gt-footer-col-explore">
              <h4 className="gt-footer-col-title">EXPLORE</h4>
              <ul className="gt-footer-links-list">
                <li><Link href="/" onClick={(e) => handleNavToTop(e, "/")}>Home</Link></li>
                <li><Link href="/services" onClick={(e) => handleNavToTop(e, "/services")}>Services</Link></li>
                <li><Link href="/product" onClick={(e) => handleNavToTop(e, "/product")}>Products</Link></li>
                <li><Link href="/about" onClick={(e) => handleNavToTop(e, "/about")}>About</Link></li>
                <li><Link href="/careers" onClick={(e) => handleNavToTop(e, "/careers")}>Careers</Link></li>
              </ul>
            </div>

            {/* SERVICES */}
            <div className="gt-footer-col gt-footer-col-services">
              <h4 className="gt-footer-col-title">SERVICES</h4>
              <ul className="gt-footer-links-list">
                <li><Link href="/services" onClick={(e) => handleNavToTop(e, "/services")}>Web Development</Link></li>
                <li><Link href="/services" onClick={(e) => handleNavToTop(e, "/services")}>Mobile Applications</Link></li>
                <li><Link href="/services" onClick={(e) => handleNavToTop(e, "/services")}>Cloud Solutions</Link></li>
                <li><Link href="/services" onClick={(e) => handleNavToTop(e, "/services")}>AI Automation</Link></li>
                <li><Link href="/services" onClick={(e) => handleNavToTop(e, "/services")}>Cybersecurity</Link></li>
              </ul>
            </div>

            {/* LET'S CONNECT */}
            <div className="gt-footer-col gt-footer-col-contact">
              <h4 className="gt-footer-col-title">LET&apos;S CONNECT</h4>
              <div className="gt-footer-contacts-list">
                <a href="mailto:hello@geloratech.com" className="gt-footer-contact-item">
                  <div className="gt-footer-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B69AFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div className="gt-footer-contact-text">
                    <span className="gt-footer-contact-label">Email Us</span>
                    <span className="gt-footer-email-link">hello@geloratech.com</span>
                  </div>
                </a>
                <a href="tel:+917976143735" className="gt-footer-contact-item">
                  <div className="gt-footer-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B69AFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="gt-footer-contact-text">
                    <span className="gt-footer-contact-label">Call Us</span>
                    <span>+91 - 7976143735</span>
                  </div>
                </a>
                <div className="gt-footer-contact-item">
                  <div className="gt-footer-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B69AFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="gt-footer-contact-text">
                    <span className="gt-footer-contact-label">Location</span>
                    <span>Udaipur, Rajasthan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GELORA watermark — spanning full width below the grid */}
        <div className="gt-footer-watermark-wrap" aria-hidden="true">
          <span className="gt-footer-watermark">G E L O R A</span>
        </div>

        {/* Bottom bar — spanning edge to edge matching Figma design */}
        <div className="gt-footer-bottom-wrap">
          <div className="gt-footer-bottom">
            <p>© 2026 Gelora Tech. All Rights Reserved.</p>
            <div className="gt-footer-legal-links">
              <Link href="/privacy">Privacy Policy</Link>
              <span>·</span>
              <Link href="/terms">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
