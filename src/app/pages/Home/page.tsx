"use client";

import Header from "@/app/components/Header";
import { useEffect, useState } from "react";

const CARDS_DATA = [
  {
    id: "web",
    title: "Web\nDevelopment",
    desc: "Scalable, high-performance web applications.",
    className: "home-card-1",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EBE6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: "mobile",
    title: "Mobile\nApplications",
    desc: "Native & cross-platform apps for iOS & Android.",
    className: "home-card-2",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EBE6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <circle cx="9.5" cy="7" r="0.9" fill="#EBE6FF" />
        <circle cx="14.5" cy="7" r="0.9" fill="#EBE6FF" />
        <circle cx="9.5" cy="11" r="0.9" fill="#EBE6FF" />
        <circle cx="14.5" cy="11" r="0.9" fill="#EBE6FF" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    ),
  },
  {
    id: "cloud",
    title: "Cloud\nSolutions",
    desc: "Secure, scalable and reliable cloud infrastructure.",
    className: "home-card-3",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EBE6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        <polyline points="10 14 12 12 14 14" />
        <line x1="12" y1="12" x2="12" y2="17" />
      </svg>
    ),
  },
  {
    id: "ai",
    title: "AI\nAutomation",
    desc: "Intelligent automation that optimizes processes.",
    className: "home-card-4",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EBE6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
        <path d="M5 3v4M3 5h4" />
      </svg>
    ),
  },
  {
    id: "cyber",
    title: "Cybersecurity",
    desc: "Protecting your systems and data with advanced security.",
    className: "home-card-5",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EBE6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="11" r="2" fill="#EBE6FF" />
        <path d="M12 13v3" strokeWidth="2.2" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const sx = window.innerWidth / 1440;
      const sy = window.innerHeight / 1024;
      setScale(Math.min(sx, sy, 1.35) * 0.99);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "linear-gradient(117.25deg, #0B0916 20.9%, rgba(25, 13, 70, 0.8) 48.45%, #0A0815 77.43%)",
        paddingTop: "24px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Orbitron:wght@400;700&display=swap');

        /* ─── Hero Headline (Exact Figma Spec) ─── */
        .hero-title-container {
          position: absolute;
          width: 800px;
          left: calc(50% - 800px/2 + 4px);
          top: 208px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          z-index: 10;
          pointer-events: none;
          user-select: none;
        }

        .title-line-1 {
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: 100px;
          line-height: 82px;
          color: #F4F1FF;
          text-shadow: none;
          white-space: nowrap;
        }

        .title-line-2 {
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: 100px;
          line-height: 82px;
          margin-top: 18px;
          color: #F4F1FF;
          text-shadow: none;
          white-space: nowrap;
        }

        .title-growth {
          color: #8C67FE;
          text-shadow: none;
        }

        /* ─── Glassmorphism Fan Cards with Edge-Bleed ─── */
        .home-glass-card {
          box-sizing: border-box;
          position: absolute;
          width: 370px;
          background: rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(191, 239, 255, 0.3);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 44px;
          padding: 36px 30px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: none;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1),
                      border-color 0.35s ease;
        }

        /* Bottom Radiant Violet Beam Glow */
        .home-glass-card::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 55%;
          background: radial-gradient(ellipse at 50% 100%, rgba(168, 85, 247, 0.58) 0%, rgba(124, 77, 255, 0) 75%);
          pointer-events: none;
        }

        .home-glass-card:hover {
          border-color: rgba(214, 238, 255, 0.65);
        }

        /* 1. Web Development (Bleeds off Left Edge) */
        .home-card-1 {
          height: 520px;
          left: calc(50% - 185px - 720px);
          top: 300px;
          transform: rotate(21.27deg);
          z-index: 15;
        }
        .home-card-1:hover {
          transform: rotate(21.27deg) translateY(-12px) scale(1.03);
          z-index: 25;
        }

        /* 2. Mobile Applications (Mid Left) */
        .home-card-2 {
          height: 500px;
          left: calc(50% - 185px - 360px);
          top: 425px;
          transform: rotate(-11.3deg);
          z-index: 18;
        }
        .home-card-2:hover {
          transform: rotate(-11.3deg) translateY(-12px) scale(1.03);
          z-index: 25;
        }

        /* 3. Cloud Solutions (Center Upright) */
        .home-card-3 {
          height: 550px;
          left: calc(50% - 185px);
          top: 365px;
          transform: rotate(0deg);
          z-index: 20;
        }
        .home-card-3:hover {
          transform: rotate(0deg) translateY(-12px) scale(1.03);
          z-index: 25;
        }

        /* 4. AI Automation (Mid Right) */
        .home-card-4 {
          height: 500px;
          left: calc(50% - 185px + 360px);
          top: 425px;
          transform: rotate(10.63deg);
          z-index: 17;
        }
        .home-card-4:hover {
          transform: rotate(10.63deg) translateY(-12px) scale(1.03);
          z-index: 25;
        }

        /* 5. Cybersecurity (Bleeds off Right Edge) */
        .home-card-5 {
          height: 530px;
          left: calc(50% - 185px + 720px);
          top: 340px;
          transform: rotate(-19deg);
          z-index: 14;
        }
        .home-card-5:hover {
          transform: rotate(-19deg) translateY(-12px) scale(1.03);
          z-index: 25;
        }

        /* Card Icon */
        .card-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 26px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
          box-shadow: none;
          flex-shrink: 0;
        }

        .card-title-txt {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 26px;
          line-height: 1.15;
          color: #ffffff;
          margin: 0 0 14px 0;
          white-space: pre-line;
        }

        .card-desc-txt {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 15px;
          line-height: 1.4;
          color: #c7c1de;
          margin: 0;
          max-width: 270px;
        }
      `}</style>

      {/* Top Header - Full Width */}
      <Header activeTab="Home" />

      {/* Canvas Container for Background & Cards */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: `translateX(-50%) scale(${scale})`,
          width: "1440px",
          height: "1024px",
          transformOrigin: "top center",
          pointerEvents: "auto",
        }}
      >
        {/* Ellipse 12 Background */}
        <div
          style={{
            position: "absolute",
            width: "1712px",
            height: "1070px",
            left: "calc(50% - 856px)",
            top: "-23px",
            background: "radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, rgba(191, 239, 255, 0.8) 25%, rgba(160, 109, 255, 0.35) 60%, rgba(160, 109, 255, 0) 100%)",
            mixBlendMode: "difference",
            opacity: 0.05,
            pointerEvents: "none",
          }}
        />

        {/* Hero Headline */}
        <div className="hero-title-container">
          <span className="title-line-1">Digital Solutions</span>
          <span className="title-line-2">
            That Drive <span className="title-growth">Growth</span>
          </span>
        </div>

        {/* 5 Glass Fan Cards */}
        {CARDS_DATA.map((card) => (
          <div key={card.id} className={`home-glass-card ${card.className}`}>
            <div className="card-icon-wrap">{card.icon}</div>
            <h3 className="card-title-txt">{card.title}</h3>
            <p className="card-desc-txt">{card.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
