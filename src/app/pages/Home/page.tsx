"use client";

import Image from "next/image";
import Header from "@/app/components/Header";

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
  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundImage: "url('/asset/bg.png')",
        backgroundPosition: "top center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
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
          background: linear-gradient(90deg, #F4F1FF 6.25%, #B29DFF 19.71%, #7049FF 88.94%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          white-space: nowrap;
        }

        .title-growth {
          color: inherit;
        }

        /* ─── Glassmorphism Fan Cards with Edge-Bleed ─── */
        .home-glass-card {
          box-sizing: border-box;
          position: absolute;
          width: 360px;
          height: 430px;
          opacity: 0.8;
          background: linear-gradient(161.1deg, rgba(111, 174, 255, 0.15) 3.78%, rgba(252, 253, 255, 0) 95.82%), radial-gradient(50% 50% at 50% 50%, rgba(121, 92, 255, 0.28) 0%, rgba(254, 254, 255, 0) 100%), linear-gradient(159.62deg, rgba(32, 35, 74, 0.82) 3.32%, rgba(70, 52, 138, 0.72) 96.94%);
          border: 1px solid rgba(191, 239, 255, 0.3);
          backdrop-filter: blur(21px);
          -webkit-backdrop-filter: blur(21px);
          border-radius: 50px;
          padding: 36px 30px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: inset -5px -5px 250px rgba(255, 255, 255, 0.02), 0 14px 35px rgba(98, 80, 255, 0.25);
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
          height: 70%;
          background: radial-gradient(ellipse at 50% 100%, rgba(98, 80, 255, 0.5) 0%, rgba(124, 77, 255, 0) 75%);
          pointer-events: none;
        }

        .home-glass-card:hover {
          border-color: rgba(214, 238, 255, 0.65);
        }

        /* 1. Web Development (Bleeds off Left Edge) */
        .home-card-1 {
          left: calc(50% - 180px - 720px);
          top: 300px;
          transform: matrix(0.94, 0.34, -0.37, 0.93, 0, 0);
          z-index: 15;
        }
        .home-card-1:hover {
          transform: matrix(0.94, 0.34, -0.37, 0.93, 0, -12) scale(1.03);
          z-index: 25;
        }

        /* 2. Mobile Applications (Mid Left) */
        .home-card-2 {
          left: calc(50% - 180px - 360px);
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
          left: calc(50% - 180px);
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
          left: calc(50% - 180px + 360px);
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
          left: calc(50% - 180px + 720px);
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
          font-weight: 500;
          font-size: 26px;
          line-height: 30px;
          color: #ffffff;
          margin: 0 0 14px 0;
          white-space: pre-line;
        }

        .card-desc-txt {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 21px;
          color: #c7c1de;
          margin: 0;
          max-width: 210px;
        }

        .home-hero {
          position: relative;
          width: 100%;
          height: clamp(700px, 50vw, 740px);
          flex: 0 0 clamp(700px, 50vw, 740px);
        }

        .trusted-strip {
          box-sizing: border-box;
          position: relative;
          width: 100%;
          min-height: 110px;
          padding: 7px 0 26px;
          overflow: hidden;
          background: transparent;
          border-bottom: 0.8px solid rgba(94, 75, 142, 0.06);
          color: #8c76cd;
        }

        .trusted-label {
          display: block;
          margin: 0 auto 19px;
          color: rgba(116, 87, 188, 0.8);
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.1px;
          line-height: 16px;
          text-align: center;
          text-transform: uppercase;
        }

        .trusted-track {
          display: flex;
          width: max-content;
          min-width: 100%;
          align-items: center;
          gap: 0;
          animation: trusted-scroll 28s linear infinite;
        }

        .trusted-group {
          display: flex;
          align-items: center;
          gap: 52px;
          padding: 0 36px;
          white-space: nowrap;
        }

        .trusted-company {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          color: #8c76cd;
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 600;
          line-height: 22px;
        }

        .trusted-company::before {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #7c67bd;
          content: '';
          flex: 0 0 4px;
        }

        @keyframes trusted-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .about-section {
          box-sizing: border-box;
          position: relative;
          width: 100%;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 760px;
          padding: 44px 4vw 80px;
          overflow: hidden;
          background: transparent;
          color: #141415;
        }

        .about-eyebrow {
          position: relative;
          z-index: 1;
          width: fit-content;
          margin: 0 auto;
          padding: 13px 24px;
          border: 1px solid rgba(218, 207, 255, 0.35);
          border-radius: 999px;
          background: rgba(107, 78, 196, 0.22);
          box-shadow: 0 8px 24px rgba(62, 40, 142, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.18);
          color: #f4f1ff;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.01em;
          line-height: 18px;
          text-shadow: 0 1px 8px rgba(43, 24, 110, 0.8);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .about-eyebrow:hover {
          border-color: rgba(230, 223, 255, 0.65);
          background: rgba(125, 94, 222, 0.32);
          transform: translateY(-2px);
        }

        .about-heading {
          position: relative;
          z-index: 1;
          max-width: 700px;
          margin: 27px auto 38px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(40px, 3.48vw, 50px);
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.08;
          text-align: center;
          color: #f4f1ff;
        }

        .about-heading-accent { color: #5a28f6; }

        .about-mosaic {
          box-sizing: border-box;
          position: relative;
          display: flex;
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          gap: 22px;
          align-items: stretch;
        }

        .about-mosaic-main {
          flex: 1 1 0%;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .about-row {
          display: flex;
          width: 100%;
          gap: 22px;
          height: 225px;
        }

        .about-tile {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          box-shadow: 0 12px 30px rgba(94, 75, 142, 0.15);
        }

        .about-tile img { object-fit: cover; }

        /* Row 1: Future-Ready is wide (~65%), Code is narrow (~35%) */
        .about-future {
          flex: 1.88 1 0%;
          min-width: 0;
        }
        .about-code {
          flex: 1 1 0%;
          min-width: 0;
        }

        /* Row 2: Paper is reduced width (~49%), Engineers is wider (~51%) */
        .about-paper {
          flex: 0.98 1 0%;
          min-width: 0;
        }
        .about-engineers {
          flex: 1.02 1 0%;
          min-width: 0;
        }

        /* Column on right: Analytics card spanning full height */
        .about-analytics {
          flex: 0 0 clamp(220px, 22%, 260px);
          min-width: 0;
        }

        /* Content overlays */
        .tile-content {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
        }

        /* Future-Ready: align 100% and Future-Ready exactly with baked-in text */
        .about-future .tile-content {
          padding: 28px 0 0 8.13%;
        }

        .about-future .about-percent {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.2;
          color: #141415;
          margin: 0 0 6px 0;
        }

        .about-future h3 {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: 23px;
          font-weight: 700;
          line-height: 1.2;
          color: #ffffff;
        }

        /* Engineers tile content */
        .about-engineers .tile-content {
          padding: 26px 30px;
          justify-content: flex-start;
        }

        .about-engineers h3 {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.25;
          color: #ffffff;
        }

        .about-engineers p {
          margin: 10px 0 0 0;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.88);
        }

        @media (max-width: 860px) {
          .home-hero { height: 760px; flex-basis: 760px; }
          .trusted-strip { min-height: 92px; padding-bottom: 27px; }
          .trusted-label { margin-bottom: 14px; font-size: 9px; }
          .trusted-group { gap: 28px; padding: 0 20px; }
          .trusted-company { font-size: 14px; }
          .about-section { min-height: auto; padding: 42px 20px 60px; }
          .about-heading { margin: 24px auto 32px; font-size: clamp(34px, 9vw, 48px); }
          .about-mosaic {
            flex-direction: column;
            gap: 16px;
          }
          .about-mosaic-main {
            gap: 16px;
          }
          .about-row {
            flex-direction: column;
            height: auto;
            gap: 16px;
          }
          .about-tile { min-height: 220px; }
          .about-analytics {
            width: 100%;
            min-height: 300px;
            flex: auto;
          }
          .about-future .tile-content { padding: 24px; }
          .about-engineers .tile-content { padding: 24px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .trusted-track { animation: none; }
        }
      `}</style>

      <section className="home-hero" aria-label="Gelora Tech hero">
        {/* Top Header - Full Width */}
        <Header activeTab="Home" />

        {/* Canvas Container for Background & Cards */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%) scale(min(1.35, calc(99vw / 1440px), calc(99vh / 1024px)))",
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
      </section>

      <section className="trusted-strip" aria-label="Trusted by growing companies">
        <span className="trusted-label">Trusted by growing companies</span>
        <div className="trusted-track">
          {[0, 1].map((group) => (
            <div className="trusted-group" key={group} aria-hidden={group === 1}>
              {['ScootyonRent', 'BellyBento', 'Brajmarg', 'Chopdi', 'Ticketing Solution', 'Raibar', 'RSG'].map((company) => (
                <span className="trusted-company" key={`${group}-${company}`}>{company}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-heading">
        <div className="about-eyebrow">About Gelora Tech</div>
        <h2 id="about-heading" className="about-heading">
          We turn complex ideas into<br />
          <span className="about-heading-accent">digital experiences</span><br />
          people remember.
        </h2>
        <div className="about-mosaic">
          {/* Left Area: 2 Rows */}
          <div className="about-mosaic-main">
            {/* Row 1: Future-Ready (wide) + Code Editor (compact) */}
            <div className="about-row">
              <div className="about-tile about-future">
                <Image src="/asset/FutureReady.png" alt="" fill sizes="(max-width: 760px) 100vw, 50vw" priority />
                <div className="tile-content">
                  <span className="about-percent">100%</span>
                  <h3>Future-Ready</h3>
                </div>
              </div>

              <div className="about-tile about-code">
                <Image src="/asset/vsCodeTheme.png" alt="Code editor on a screen" fill sizes="(max-width: 760px) 100vw, 25vw" />
              </div>
            </div>

            {/* Row 2: Paper Sketches (reduced width) + Engineers (wider) */}
            <div className="about-row">
              <div className="about-tile about-paper">
                <Image src="/asset/paperImg.png" alt="Product design sketches" fill sizes="(max-width: 760px) 100vw, 35vw" />
              </div>

              <div className="about-tile about-engineers">
                <Image src="/asset/buildByEngBg.png" alt="" fill sizes="(max-width: 760px) 100vw, 35vw" />
                <div className="tile-content">
                  <h3>Built by Engineers.<br />Shaped by Designers.</h3>
                  <p>Where smart technology meets thoughtful design to create experiences that work beautifully.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Analytics spanning full height */}
          <div className="about-tile about-analytics">
            <Image src="/asset/computerImg.png" alt="Analytics dashboard interface" fill sizes="(max-width: 760px) 100vw, 25vw" />
          </div>
        </div>
      </section>
    </main>
  );
}
