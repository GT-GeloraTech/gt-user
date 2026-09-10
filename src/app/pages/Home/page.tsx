"use client";

import { useState, useEffect, useRef } from "react";
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

const PROCESS_STEPS = [
  {
    step: "01",
    title: "DISCOVER",
    desc: "Understand before we build.\nGoals, users & opportunities.",
    image: "/asset/ChatgptImg.png",
    alt: "Abstract purple orbit representing product discovery",
    borderClass: "step-border-discover",
  },
  {
    step: "02",
    title: "DESIGN",
    desc: "Shape ideas into experiences.\nSimple, useful & intuitive.",
    image: "/asset/ChatgptImg2.png",
    alt: "Design interface with pen tool and glowing shapes",
    borderClass: "step-border-design",
  },
  {
    step: "03",
    title: "DEVELOP",
    desc: "Turn concepts into robust, scalable software.\nEngineered for performance & growth.",
    image: "/asset/photoroomImg.png",
    alt: "Code editor and gears representing software development",
    borderClass: "step-border-develop",
  },
  {
    step: "04",
    title: "LAUNCH",
    desc: "Deploy with confidence and accelerate.\nContinuous optimization & scale.",
    image: "/asset/photoroomImg2.png",
    alt: "Rocket launch representing product release",
    borderClass: "step-border-launch",
  },
];

export default function HomePage() {
  const processContainerRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);
  const totalSteps = PROCESS_STEPS.length;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (processContainerRef.current) {
            const rect = processContainerRef.current.getBoundingClientRect();
            const containerHeight = processContainerRef.current.offsetHeight;
            const windowHeight = window.innerHeight;
            const totalDist = containerHeight - windowHeight;

            if (totalDist > 0) {
              const scrolled = -rect.top;
              const progress = Math.min(Math.max(scrolled / totalDist, 0), 1);
              const stepIdx = Math.min(
                Math.floor(progress * totalSteps),
                totalSteps - 1
              );
              setActiveStepIndex(stepIdx);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [totalSteps]);

  const scrollToStep = (index: number) => {
    if (!processContainerRef.current) return;
    const container = processContainerRef.current;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const totalDist = container.offsetHeight - window.innerHeight;
    const targetY = containerTop + (totalDist * (index / (totalSteps - 1)));
    window.scrollTo({ top: targetY, behavior: "smooth" });
    setActiveStepIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 40 && activeStepIndex < totalSteps - 1) {
      scrollToStep(activeStepIndex + 1);
    } else if (diffX < -40 && activeStepIndex > 0) {
      scrollToStep(activeStepIndex - 1);
    }
    touchStartX.current = null;
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        overflowX: "hidden",
        background: "#f1ecff",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Orbitron:wght@400;700&display=swap');

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
          box-sizing: border-box;
          position: relative;
          width: 100%;
          height: 760px;
          padding-top: clamp(10px, 1.5vw, 18px);
          overflow: hidden;
          background: #0b0916 url('/asset/bg.png') top center / cover no-repeat;
        }

        .hero-title-container {
          position: absolute;
          top: 208px;
          left: 50%;
          z-index: 10;
          display: flex;
          width: min(800px, 90vw);
          flex-direction: column;
          align-items: center;
          transform: translateX(-50%);
          text-align: center;
          pointer-events: none;
          user-select: none;
        }

        .title-line-1,
        .title-line-2 {
          font-family: 'Inter', sans-serif;
          font-size: clamp(46px, 6.95vw, 100px);
          font-weight: 700;
          line-height: 0.82;
          white-space: nowrap;
        }

        .title-line-1 { color: #f4f1ff; }

        .title-line-2 {
          margin-top: 18px;
          background: linear-gradient(90deg, #f4f1ff 6.25%, #b29dff 19.71%, #7049ff 88.94%);
          background-clip: text;
          color: transparent;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .trusted-strip {
          box-sizing: border-box;
          position: relative;
          width: 100%;
          min-height: 110px;
          padding: 7px 0 26px;
          overflow: hidden;
          background: #ffffff;
          border-bottom: 0.8px solid rgba(94, 75, 142, 0.06);
          color: #8c76cd;
        }

        .trusted-label {
          display: block;
          margin: 0 auto 19px;
          color: rgba(116, 87, 188, 0.8);
          font-family: 'Inter', sans-serif;
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 1.1px;
          line-height: 16px;
          text-align: center;
          text-transform: uppercase;
          padding-top: 8px;
        }

        .trusted-track {
          display: flex;
          width: max-content;
          min-width: 100%;
          flex-shrink: 0;
          align-items: center;
          gap: 0;
          animation: trusted-scroll 18s linear infinite;
          animation-play-state: running;
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        .trusted-group {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 52px;
          padding: 0 8px;
          white-space: nowrap;
        }

        .trusted-company {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          color: #8c76cd;
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-size: 13px;
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
          to { transform: translateX(-25%); }
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
          padding: 28px 4vw 80px;
          overflow: hidden;
          background: transparent;
          color: #141415;
        }

        .about-eyebrow {
          box-sizing: border-box;
          position: relative;
          z-index: 1;
          display: flex;
          width: 219px;
          height: 53px;
          margin: 0 auto;
          align-items: center;
          justify-content: center;
          padding: 0;
          border: 0;
          border-radius: 37px;
          background: linear-gradient(90deg, rgba(90, 40, 246, 0) 0%, rgba(241, 236, 255, 0.58) 100%);
          color: #5a28f6;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0;
          line-height: 18px;
          text-shadow: none;
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
          color: #141415;
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
          padding: 38px 0 0 8.13%;
        }

        .about-future .about-percent {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.4;
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
          padding: 36px 32px;
          justify-content: flex-start;
        }

        .about-engineers h3 {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.38;
          color: #ffffff;
        }

        .about-engineers p {
          margin: 10px 0 0 0;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.88);
        }

        /* ─── Modern Process Section ("How We Work") ─── */
        .process-scroll-container {
          position: relative;
          height: 380vh;
          background: #080512;
        }

        .process-sticky-stage {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          background: radial-gradient(circle at 50% 30%, #1c103a 0%, #0c0818 55%, #070510 100%);
          color: #ffffff;
          isolation: isolate;

          --card-w: clamp(330px, 26.5vw, 395px);
          --card-h: clamp(470px, 59vh, 525px);
          --intro-left: clamp(36px, 6.8vw, 92px);
          --intro-w: clamp(280px, 22.5vw, 335px);
        }

        .process-glow-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(850px circle at 62% 32%, rgba(147, 102, 255, 0.16), transparent 70%),
            radial-gradient(650px circle at 26% 68%, rgba(79, 70, 229, 0.12), transparent 60%);
          z-index: 1;
        }

        .process-intro {
          position: absolute;
          left: var(--intro-left);
          top: clamp(80px, 15vh, 150px);
          width: var(--intro-w);
          z-index: 10;
          transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .process-intro.is-hidden {
          opacity: 0;
          transform: translateX(-45px);
          pointer-events: none;
        }

        .process-kicker {
          margin: 0 0 20px 0;
          color: #9d8ec7;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .process-title {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: clamp(38px, 3.6vw, 48px);
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.04em;
          line-height: 1.15;
          color: #ffffff;
        }

        .process-title-accent {
          color: #aa97ea;
          text-shadow: 0 0 20px rgba(170, 151, 234, 0.3);
        }

        .process-description {
          margin: 36px 0 0 0;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.62;
          color: #cfc5eb;
          max-width: 320px;
        }

        .process-number-wrap {
          position: absolute;
          left: var(--intro-left);
          bottom: clamp(16px, 4vh, 38px);
          height: clamp(120px, 16vw, 190px);
          width: clamp(180px, 20vw, 260px);
          z-index: 10;
          pointer-events: none;
        }

        .process-number {
          position: absolute;
          left: 0;
          bottom: 0;
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: clamp(140px, 16vw, 210px);
          font-weight: 700;
          letter-spacing: -0.05em;
          line-height: 0.82;
          color: #dfd7ff;
          transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .process-number.is-active {
          opacity: 1;
          transform: translateY(0);
        }

        .process-number.is-hidden-up {
          opacity: 0;
          transform: translateY(-40px);
        }

        .process-number.is-hidden-down {
          opacity: 0;
          transform: translateY(40px);
        }

        /* Right Rectangle Peek (exact match to target Image 2) */
        .process-card-peek-right {
          position: absolute;
          top: 50%;
          right: clamp(-180px, -8vw, -100px);
          transform: translateY(-50%);
          width: var(--card-w);
          height: var(--card-h);
          border-radius: 24px;
          border: 1.2px solid rgba(255, 255, 255, 0.14);
          background: linear-gradient(135deg, rgba(26, 18, 54, 0.3) 0%, rgba(16, 11, 35, 0.4) 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          opacity: 0.28;
          pointer-events: none;
          z-index: 2;
          box-sizing: border-box;
        }

        /* Left Rectangle Peek (shown on step 2, 3, 4) */
        .process-card-peek-left {
          position: absolute;
          top: 50%;
          left: clamp(-180px, -8vw, -100px);
          transform: translateY(-50%);
          width: var(--card-w);
          height: var(--card-h);
          border-radius: 24px;
          border: 1.2px solid rgba(255, 255, 255, 0.14);
          background: linear-gradient(135deg, rgba(26, 18, 54, 0.3) 0%, rgba(16, 11, 35, 0.4) 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          pointer-events: none;
          z-index: 2;
          box-sizing: border-box;
          transition: opacity 0.5s ease;
        }

        .process-cards-stage {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
        }

        /* Center-aligned card with smooth stacked scroll transitions */
        .process-card {
          position: absolute;
          top: 50%;
          left: 50%;
          width: var(--card-w);
          height: var(--card-h);
          border-radius: 24px;
          box-sizing: border-box;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(26, 18, 54, 0.82) 0%, rgba(16, 11, 35, 0.92) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.68s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.58s cubic-bezier(0.16, 1, 0.3, 1),
                      visibility 0.58s;
          user-select: none;
          pointer-events: auto;
        }

        .process-card.is-active {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, -50%) scale(1);
          z-index: 10;
          pointer-events: auto;
        }

        .process-card.is-passed {
          opacity: 0;
          visibility: hidden;
          transform: translate(-50%, calc(-50% - 32px)) scale(0.95);
          z-index: 5;
          pointer-events: none;
        }

        .process-card.is-incoming {
          opacity: 0;
          visibility: hidden;
          transform: translate(-50%, calc(-50% + 44px)) scale(1.02);
          z-index: 1;
          pointer-events: none;
        }

        /* Glow border styles for the steps */
        .step-border-discover {
          border: 1.5px solid rgba(139, 92, 246, 0.45);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), inset 0 0 24px rgba(139, 92, 246, 0.08);
        }

        .step-border-design {
          border: 2px solid #2874ff;
          box-shadow: 0 0 34px rgba(40, 116, 255, 0.55), 0 24px 60px rgba(0, 0, 0, 0.6), inset 0 0 18px rgba(40, 116, 255, 0.16);
        }

        .step-border-develop {
          border: 2px solid #8b5cf6;
          box-shadow: 0 0 34px rgba(139, 92, 246, 0.55), 0 24px 60px rgba(0, 0, 0, 0.6), inset 0 0 18px rgba(139, 92, 246, 0.16);
        }

        .step-border-launch {
          border: 2px solid #a855f7;
          box-shadow: 0 0 34px rgba(168, 85, 247, 0.55), 0 24px 60px rgba(0, 0, 0, 0.6), inset 0 0 18px rgba(168, 85, 247, 0.16);
        }

        .process-card-image-wrap {
          width: 100%;
          height: 56%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 20px 0;
          box-sizing: border-box;
          position: relative;
        }

        .process-card-image {
          max-width: 86%;
          max-height: 86%;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.35));
        }

        .process-card-content {
          padding: 16px 32px 36px;
          box-sizing: border-box;
        }

        .process-card-content h3 {
          margin: 0 0 12px 0;
          font-family: 'Inter', sans-serif;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #ffffff;
        }

        .process-card-content p {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: 14.5px;
          line-height: 1.55;
          color: #cfc5eb;
        }

        @media (max-width: 1080px) {
          .process-sticky-stage {
            --card-w: clamp(290px, 34vw, 350px);
            --card-h: clamp(450px, 56vh, 490px);
            --card-gap: 24px;
            --intro-left: 28px;
            --intro-w: 260px;
            --intro-gap: 32px;
          }
          .process-number {
            font-size: clamp(110px, 13vw, 150px);
          }
        }

        @media (max-width: 860px) {
          .home-hero { height: 680px; }
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
          /* Process section mobile responsive */
          .process-scroll-container {
            height: 320vh;
          }
          .process-sticky-stage {
            --card-w: min(340px, 86vw);
            --card-h: min(475px, 58vh);
            --intro-left: 20px;
          }
          .process-intro {
            top: 28px;
            left: 20px;
            right: 20px;
            width: auto;
          }
          .process-intro.is-hidden {
            opacity: 0;
            transform: translateY(-20px);
            pointer-events: none;
          }
          .process-kicker {
            margin-bottom: 8px;
            font-size: 13px;
          }
          .process-title {
            font-size: clamp(26px, 7vw, 32px);
          }
          .process-description {
            margin-top: 8px;
            font-size: 13.5px;
            max-width: 100%;
          }
          .process-card {
            top: 52%;
          }
          .process-card-peek-right,
          .process-card-peek-left {
            display: none;
          }
          .process-number-wrap {
            bottom: 14px;
            left: 20px;
            height: 85px;
            width: 140px;
          }
          .process-number {
            font-size: 88px;
          }
        }

        @media (max-width: 560px) {
          .hero-title-container { top: 180px; }
          .title-line-1,
          .title-line-2 { font-size: clamp(32px, 10vw, 54px); }
        }

      `}</style>

      <section className="home-hero" aria-label="Gelora Tech hero">
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
          {[0, 1, 2, 3].map((group) => (
            <div className="trusted-group" key={group} aria-hidden={group !== 0}>
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

      <div
        ref={processContainerRef}
        className={`process-scroll-container step-${activeStepIndex + 1}`}
        aria-label="How we work process"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="process-sticky-stage">
          {/* Subtle atmospheric ambient glow */}
          <div className="process-glow-bg" />

          {/* Left Intro Text (visible in Step 1, smoothly hidden in later steps) */}
          <div className={`process-intro ${activeStepIndex > 0 ? "is-hidden" : ""}`}>
            <p className="process-kicker">HOW WE WORK</p>
            <h2 id="process-heading" className="process-title">
              From idea<br />
              to <span className="process-title-accent">impact.</span>
            </h2>
            <p className="process-description">
              A thoughtful process that turns your vision into scalable digital experiences built for growth
            </p>
          </div>

          {/* Left Rectangle Peek (visible on subsequent steps) */}
          <div
            className="process-card-peek-left"
            style={{ opacity: activeStepIndex > 0 ? 0.28 : 0 }}
            aria-hidden="true"
          />

          {/* Right Rectangle Peek (exact match to target Image 2) */}
          <div
            className="process-card-peek-right"
            aria-hidden="true"
          />

          {/* Giant Number Indicator at Bottom-Left */}
          <div className="process-number-wrap">
            {PROCESS_STEPS.map((s, idx) => (
              <span
                key={s.step}
                className={`process-number ${
                  idx === activeStepIndex
                    ? "is-active"
                    : idx < activeStepIndex
                    ? "is-hidden-up"
                    : "is-hidden-down"
                }`}
                aria-hidden={idx !== activeStepIndex}
              >
                {s.step}
              </span>
            ))}
          </div>

          {/* Centered Stacking Cards Stage */}
          <div className="process-cards-stage">
            {PROCESS_STEPS.map((step, idx) => (
              <article
                key={step.step}
                className={`process-card ${step.borderClass} ${
                  idx === activeStepIndex
                    ? "is-active"
                    : idx < activeStepIndex
                    ? "is-passed"
                    : "is-incoming"
                }`}
                onClick={() => scrollToStep(idx)}
                role="button"
                tabIndex={0}
                aria-label={`Step ${step.step}: ${step.title}`}
                aria-hidden={idx !== activeStepIndex}
              >
                <div className="process-card-image-wrap">
                  <Image
                    className="process-card-image"
                    src={step.image}
                    alt={step.alt}
                    width={340}
                    height={340}
                    priority={idx === 0}
                  />
                </div>
                <div className="process-card-content">
                  <h3>{step.title}</h3>
                  <p>
                    {step.desc.split("\n").map((line, lineIdx) => (
                      <span key={lineIdx}>
                        {line}
                        {lineIdx < step.desc.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
