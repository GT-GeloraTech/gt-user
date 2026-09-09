"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "./Header";

interface SplashScreenProps {
  onComplete?: () => void;
}

// Stage 1 to 4: Pixel formation IDs
const STAGE_1_PIXELS = ["154", "159", "160", "161", "162", "163", "155", "156"] as const;
const STAGE_2_PIXELS = ["164", "165", "166", "167"] as const;
const STAGE_3_PIXELS = ["168", "169", "170", "171"] as const;
const STAGE_4_PIXELS = ["172", "173", "174", "175", "176", "177"] as const;

// Staggered Timeline (ms)
const T_PIXELS_1 = 300;   // Stage 1: Central cluster pops
const T_PIXELS_2 = 750;   // Stage 2: Arc climbs up right
const T_PIXELS_3 = 1200;  // Stage 3: Arc curves down right
const T_PIXELS_4 = 1650;  // Stage 4: Loop closes
const T_SOLID_LOGO = 2200; // Stage 5: Solid Logo reveals & glows
const T_FAN_OUT = 3200;    // Stage 6: Smoothly fans out one by one into Neutral Hero
const T_ILLUMINATE = 4600; // Stage 7: Powers on into glowing Illuminated state
const T_FINISH = 6200;     // Done -> Signal completion

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [stage, setStage] = useState(0);
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

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), T_PIXELS_1),
      setTimeout(() => setStage(2), T_PIXELS_2),
      setTimeout(() => setStage(3), T_PIXELS_3),
      setTimeout(() => setStage(4), T_PIXELS_4),
      setTimeout(() => setStage(5), T_SOLID_LOGO),
      setTimeout(() => setStage(6), T_FAN_OUT),
      setTimeout(() => setStage(7), T_ILLUMINATE),
      setTimeout(() => {
        if (onComplete) onComplete();
      }, T_FINISH),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const isHero = stage >= 6;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(117.25deg, #0B0916 20.9%, rgba(25, 13, 70, 0.8) 48.45%, #0A0815 77.43%)",
      }}
      aria-hidden="true"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Orbitron:wght@400;700&display=swap');

        /* ─── Pixels Animation ─── */
        @keyframes px-enter {
          0%   { opacity: 0; transform: scale(0.2) translateY(6px); }
          65%  { opacity: 1; transform: scale(1.15) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* ─── Solid Logo Reveal ─── */
        @keyframes logo-reveal {
          0%   { opacity: 0; transform: scale(0.92); filter: drop-shadow(0 0 0px transparent); }
          60%  { opacity: 1; transform: scale(1.03); filter: drop-shadow(0 0 35px rgba(116, 79, 231, 0.95)) drop-shadow(0 0 60px rgba(145, 200, 230, 0.7)); }
          100% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 18px rgba(116, 79, 231, 0.8)) drop-shadow(0 0 35px rgba(145, 200, 230, 0.5)); }
        }

        @keyframes logo-ambient-glow {
          0%   { filter: drop-shadow(0 0 16px rgba(116, 79, 231, 0.75)) drop-shadow(0 0 30px rgba(145, 200, 230, 0.4)); transform: translateY(0px); }
          100% { filter: drop-shadow(0 0 24px rgba(116, 79, 231, 0.95)) drop-shadow(0 0 45px rgba(145, 200, 230, 0.65)); transform: translateY(-4px); }
        }

        /* ─── One-by-One Staggered Fan Card Glide-in ─── */
        @keyframes card-fan-glide {
          0% {
            opacity: 0;
            transform: translate(calc(50% - 155px - var(--target-left)), calc(375px - var(--target-top))) scale(0.6) rotate(0deg);
            filter: blur(8px);
          }
          70% {
            opacity: 1;
            transform: translate(0, 0) scale(1.02) rotate(var(--target-rot));
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(var(--target-rot));
            filter: blur(0px);
          }
        }

        @keyframes header-drop {
          0%   { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes title-fade {
          0%   { opacity: 0; transform: scale(0.96) translateY(12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* ─── Pixel Utilities ─── */
        .sp {
          position: absolute;
          opacity: 0;
          border-radius: 2px;
          animation: px-enter 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.2) forwards;
        }

        /* Stage 1 */
        .r-154 { width: 19px; height: 18px; left: 619px; top: 454px; background: #B1A2FE; animation-delay: 0.04s; }
        .r-159 { width: 19px; height: 18px; left: 584px; top: 492px; background: #B1A2FE; animation-delay: 0.08s; }
        .r-160 { width: 19px; height: 18px; left: 679px; top: 447px; background: #91C8E6; animation-delay: 0.12s; }
        .r-161 { width: 19px; height: 18px; left: 643px; top: 474px; background: #744FE7; animation-delay: 0.16s; }
        .r-162 { width: 11px; height: 10px; left: 646px; top: 400px; background: #744FE7; animation-delay: 0.20s; }
        .r-163 { width: 19px; height: 18px; left: 666px; top: 379px; background: #B1A2FE; animation-delay: 0.24s; }
        .r-155 { width: 19px; height: 18px; left: 643px; top: 429px; background: #91C8E6; animation-delay: 0.28s; }
        .r-156 { width: 19px; height: 18px; left: 607px; top: 443px; background: #744FE7; animation-delay: 0.32s; }

        /* Stage 2 */
        .r-164 { width: 22px; height: 21px; left: 687px; top: 363px; background: #744FE7; animation-delay: 0.05s; }
        .r-165 { width: 21px; height: 21px; left: 712px; top: 363px; background: #744FE7; animation-delay: 0.10s; }
        .r-166 { width: 28px; height: 21px; left: 733px; top: 384px; background: #75A5F9; transform: scaleY(-1); animation-delay: 0.15s; }
        .r-167 { width: 21px; height: 18px; left: 761px; top: 370px; background: #75A5F9; animation-delay: 0.20s; }

        /* Stage 3 */
        .r-168 { width: 22px; height: 21px; left: 773px; top: 404px; background: #744FE7; animation-delay: 0.05s; }
        .r-169 { width: 21px; height: 21px; left: 784px; top: 430px; background: #91C8E6; animation-delay: 0.10s; }
        .r-170 { width: 21px; height: 24px; left: 792px; top: 457px; background: #B1A2FE; animation-delay: 0.15s; }
        .r-171 { width: 22px; height: 21px; left: 788px; top: 485px; background: #744FE7; animation-delay: 0.20s; }

        /* Stage 4 */
        .r-172 { width: 21px; height: 21px; left: 773px; top: 512px; background: #744FE7; animation-delay: 0.04s; }
        .r-173 { width: 21px; height: 18px; left: 750px; top: 533px; background: #75A5F9; animation-delay: 0.08s; }
        .r-174 { width: 28px; height: 21px; left: 724px; top: 545px; background: #75A5F9; transform: scaleY(-1); animation-delay: 0.12s; }
        .r-175 { width: 22px; height: 21px; left: 698px; top: 545px; background: #744FE7; animation-delay: 0.16s; }
        .r-176 { width: 21px; height: 24px; left: 668px; top: 525px; background: #B1A2FE; animation-delay: 0.20s; }
        .r-177 { width: 21px; height: 21px; left: 643px; top: 505px; background: #91C8E6; animation-delay: 0.24s; }

        /* Stage 5 Center Logo */
        .solid-logo-container {
          position: absolute;
          width: 165px;
          height: 195px;
          left: 638px;
          top: 364px;
          animation: logo-reveal 0.7s cubic-bezier(0.2, 0.9, 0.3, 1.1) forwards,
                     logo-ambient-glow 2.5s 0.7s ease-in-out infinite alternate;
          z-index: 30;
        }
        .solid-logo-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }

        .lp { position: absolute; border-radius: 2px; }
        .lp-86  { width: 21px; height: 21px; left: 21px;  top: 42px;  background: #E1DAF6; }
        .lp-87  { width: 27px; height: 21px; left: 21px;  top: 132px; background: #D0ECFB; transform: scaleY(-1); }
        .lp-150 { width: 24px; height: 21px; left: 48px;  top: 63px;  background: #D0ECFB; }
        .lp-151 { width: 21px; height: 24px; left: 27px;  top: 84px;  background: #9B8FC0; }
        .lp-152 { width: 18px; height: 12px; left: 9px;   top: 72px;  background: #C9BFE6; }
        .lp-153 { width: 21px; height: 18px; left: -12px; top: 120px; background: #E1DAF6; }
        .lp-154 { width: 21px; height: 18px; left: -15px; top: 45px;  background: #D0ECFB; }

        /* ─── Hero Container ─── */
        .hero-main {
          position: absolute;
          inset: 0;
        }

        /* Hero Headline  */
        .hero-title-wrap {
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
          animation: title-fade 0.8s 0.15s cubic-bezier(0.2, 0.9, 0.3, 1) both;
        }
        .hero-title-1 {
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: 100px;
          line-height: 82px;
          color: #F4F1FF;
          text-shadow: none;
          white-space: nowrap;
        }
        .hero-title-2 {
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
        .hero-title-growth {
          color: #8C67FE;
          text-shadow: none;
        }

        /* ─── 5 Fan Cards (Wide Edge-Bleed Spread) ─── */
        .fan-card {
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
          transition: transform 0.3s ease;
        }

        /* Bottom Radiant Violet Beam Glow */
        .fan-card::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 55%;
          background: radial-gradient(ellipse at 50% 100%, rgba(168, 85, 247, 0.58) 0%, rgba(124, 77, 255, 0) 75%);
          pointer-events: none;
        }

        /* 1. Web Development (Bleeds off Left Edge) */
        .fc1 {
          --target-left: calc(50% - 185px - 720px);
          --target-top: 300px;
          --target-rot: 21.27deg;
          height: 520px;
          left: var(--target-left);
          top: var(--target-top);
          transform: rotate(21.27deg);
          z-index: 15;
          animation: card-fan-glide 0.85s 0.05s cubic-bezier(0.18, 0.9, 0.3, 1) both;
        }

        /* 2. Mobile Applications (Mid Left) */
        .fc2 {
          --target-left: calc(50% - 185px - 360px);
          --target-top: 425px;
          --target-rot: -11.3deg;
          height: 500px;
          left: var(--target-left);
          top: var(--target-top);
          transform: rotate(-11.3deg);
          z-index: 18;
          animation: card-fan-glide 0.85s 0.16s cubic-bezier(0.18, 0.9, 0.3, 1) both;
        }

        /* 3. Cloud Solutions (Center) */
        .fc3 {
          --target-left: calc(50% - 185px);
          --target-top: 365px;
          --target-rot: 0deg;
          height: 550px;
          left: var(--target-left);
          top: var(--target-top);
          transform: rotate(0deg);
          z-index: 20;
          animation: card-fan-glide 0.85s 0.27s cubic-bezier(0.18, 0.9, 0.3, 1) both;
        }

        /* 4. AI Automation (Mid Right) */
        .fc4 {
          --target-left: calc(50% - 185px + 360px);
          --target-top: 425px;
          --target-rot: 10.63deg;
          height: 500px;
          left: var(--target-left);
          top: var(--target-top);
          transform: rotate(10.63deg);
          z-index: 17;
          animation: card-fan-glide 0.85s 0.38s cubic-bezier(0.18, 0.9, 0.3, 1) both;
        }

        /* 5. Cybersecurity (Bleeds off Right Edge) */
        .fc5 {
          --target-left: calc(50% - 185px + 720px);
          --target-top: 340px;
          --target-rot: -19deg;
          height: 530px;
          left: var(--target-left);
          top: var(--target-top);
          transform: rotate(-19deg);
          z-index: 14;
          animation: card-fan-glide 0.85s 0.49s cubic-bezier(0.18, 0.9, 0.3, 1) both;
        }

        .fc-icon {
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
        .fc-title {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 26px;
          line-height: 1.15;
          color: #fff;
          margin: 0 0 14px 0;
        }
        .fc-desc {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 15px;
          line-height: 1.4;
          color: #c7c1de;
          margin: 0;
          max-width: 270px;
        }
      `}</style>

      {/* Scaled Canvas Container */}
      <div
        style={{
          position: "absolute",
          width: "1440px",
          height: "1024px",
          transformOrigin: "center center",
          transform: `scale(${scale})`,
          transition: "transform 0.25s ease-out",
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

        {/* ─── STAGE 1–4: Progressive Pixel Ring Formation ─── */}
        {stage >= 1 && stage < 5 && (
          <div style={{ position: "absolute", inset: 0 }}>
            {STAGE_1_PIXELS.map((id) => (
              <span key={id} className={`sp r-${id}`} />
            ))}
            {stage >= 2 &&
              STAGE_2_PIXELS.map((id) => (
                <span key={id} className={`sp r-${id}`} />
              ))}
            {stage >= 3 &&
              STAGE_3_PIXELS.map((id) => (
                <span key={id} className={`sp r-${id}`} />
              ))}
            {stage >= 4 &&
              STAGE_4_PIXELS.map((id) => (
                <span key={id} className={`sp r-${id}`} />
              ))}
          </div>
        )}

        {/* ─── STAGE 5: Solid Glowing Center Logo ─── */}
        {stage === 5 && (
          <div className="solid-logo-container">
            <Image
              src="/asset/logo.png"
              alt="Gelora Tech"
              width={165}
              height={195}
              priority
              className="solid-logo-img"
            />
            <span className="lp lp-86" />
            <span className="lp lp-87" />
            <span className="lp lp-150" />
            <span className="lp lp-151" />
            <span className="lp lp-152" />
            <span className="lp lp-153" />
            <span className="lp lp-154" />
          </div>
        )}

        {/* ─── STAGE 6 & 7: Hero Unfurl ─── */}
        {isHero && (
          <div className="hero-main">
            {/* Header */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 24, zIndex: 50, animation: "header-drop 0.8s cubic-bezier(0.2, 0.9, 0.3, 1) forwards" }}>
              <Header activeTab="Home" />
            </div>

            {/* Headline (Crisp Single Layer) */}
            <div className="hero-title-wrap">
              <span className="hero-title-1">Digital Solutions</span>
              <span className="hero-title-2">
                That Drive <span className="hero-title-growth">Growth</span>
              </span>
            </div>

            {/* 5 Fan Cards (Gliding into edge-bleed position one-by-one) */}
            {/* Card 1: Web Development */}
            <div className="fan-card fc1">
              <div className="fc-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EBE6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="fc-title">Web<br />Development</h3>
              <p className="fc-desc">Scalable, high-performance web applications.</p>
            </div>

            {/* Card 2: Mobile Applications */}
            <div className="fan-card fc2">
              <div className="fc-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EBE6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="3" />
                  <circle cx="9.5" cy="7" r="0.9" fill="#EBE6FF" />
                  <circle cx="14.5" cy="7" r="0.9" fill="#EBE6FF" />
                  <circle cx="9.5" cy="11" r="0.9" fill="#EBE6FF" />
                  <circle cx="14.5" cy="11" r="0.9" fill="#EBE6FF" />
                  <line x1="9" y1="17" x2="15" y2="17" />
                </svg>
              </div>
              <h3 className="fc-title">Mobile<br />Applications</h3>
              <p className="fc-desc">Native &amp; cross-platform apps for iOS &amp; Android.</p>
            </div>

            {/* Card 3: Cloud Solutions */}
            <div className="fan-card fc3">
              <div className="fc-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EBE6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                  <polyline points="10 14 12 12 14 14" />
                  <line x1="12" y1="12" x2="12" y2="17" />
                </svg>
              </div>
              <h3 className="fc-title">Cloud<br />Solutions</h3>
              <p className="fc-desc">Secure, scalable and reliable cloud infrastructure.</p>
            </div>

            {/* Card 4: AI Automation */}
            <div className="fan-card fc4">
              <div className="fc-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EBE6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
                  <path d="M5 3v4M3 5h4" />
                </svg>
              </div>
              <h3 className="fc-title">AI<br />Automation</h3>
              <p className="fc-desc">Intelligent automation that optimizes processes.</p>
            </div>

            {/* Card 5: Cybersecurity */}
            <div className="fan-card fc5">
              <div className="fc-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EBE6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <circle cx="12" cy="11" r="2" fill="#EBE6FF" />
                  <path d="M12 13v3" strokeWidth="2.2" />
                </svg>
              </div>
              <h3 className="fc-title">Cybersecurity</h3>
              <p className="fc-desc">Protecting your systems and data with advanced security.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
