"use client";

import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useState, useRef, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────
 * Services card data matching user images exactly
 * ───────────────────────────────────────── */
const SERVICES_CARDS = [
  {
    num: "01",
    title: "WEB DEVELOPMENT",
    desc: "Fast, scalable websites built to perform, engage, and grow with your business.",
    tags: "Custom Websites · Web Applications ·\nE-commerce · CMS Development",
  },
  {
    num: "02",
    title: "MOBILE APPLICATIONS",
    desc: "Intuitive, high-performing mobile experiences designed for every screen and every user.",
    tags: "iOS · Android · Cross-Platform\n· UI/UX Design",
  },
  {
    num: "03",
    title: "CLOUD SOLUTIONS",
    desc: "Secure, scalable cloud infrastructure built to keep your business connected, flexible, and ready to grow.",
    tags: "Cloud Infrastructure · Migration\n· DevOps · Scalability",
  },
  {
    num: "04",
    title: "AI AUTOMATION",
    desc: "Smart automation that simplifies workflows, reduces manual effort, and helps your business move faster.",
    tags: "AI Integration · Workflow Automation\n· Intelligent Systems · Optimization",
  },
  {
    num: "05",
    title: "CYBERSECURITY",
    desc: "Protecting your digital systems, data, and infrastructure from evolving threats with security built into every layer.",
    tags: "Threat Protection · Data Security\n· Risk Assessment · Secure Infrastructure",
  },
];

/* Total steps inside the deck section:
 * Step 0–2 → "OUR SERVICES" title shrinks from 150px → 70px
 * Step 3–7 → cards flip one by one (cards 0–4) */
const TITLE_STEPS = 3;   // steps 0,1,2 for title
const CARD_STEPS = SERVICES_CARDS.length; // 5 cards
const TOTAL_STEPS = TITLE_STEPS + CARD_STEPS; // 8 total

export default function ServicesPage() {
  /* ── refs & state ── */
  const deckRef = useRef<HTMLElement>(null);
  const isLockedRef = useRef(false);
  const isUnlockingRef = useRef(false);
  const prevScrollY = useRef(0);
  const wheelCooldown = useRef(false);
  const activeStepRef = useRef(0);
  const touchStartY = useRef<number | null>(null);

  const [isLocked, setIsLocked] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  /* card index = activeStep - TITLE_STEPS (only valid when activeStep >= TITLE_STEPS) */
  const cardIndex = Math.max(0, activeStep - TITLE_STEPS);

  /* title font-size by step - fluid clamping prevents clipping on smaller viewports */
  const titleFontSizes = [
    "clamp(64px, 8.5vw, 135px)",
    "clamp(50px, 6.8vw, 100px)",
    "clamp(38px, 5.2vw, 76px)",
    "clamp(28px, 3.8vw, 58px)",
  ];
  // clamp to step 0-3 (step 3+ shows cards but title is pinned at 58px)
  const titleSizeStep = Math.min(activeStep, TITLE_STEPS);
  const titleFontSize = titleFontSizes[titleSizeStep];
  const titleAtTop = activeStep >= TITLE_STEPS;
  const [titleSettled, setTitleSettled] = useState(false);

  /* Title must be placed at top position before below cards enter */
  useEffect(() => {
    if (activeStep >= TITLE_STEPS) {
      if (activeStep > TITLE_STEPS) {
        setTitleSettled(true);
        return;
      }
      // Wait for title's 1.35s smooth transition to completely lock into top position
      const timer = setTimeout(() => {
        setTitleSettled(true);
      }, 1250);
      return () => clearTimeout(timer);
    } else {
      setTitleSettled(false);
    }
  }, [activeStep]);

  /* ── Mobile/Tablet Carousel state ── */
  const [mobileIdx, setMobileIdx] = useState(0);
  const mobileCarouselTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const mobileTouchStartX = useRef<number | null>(null);

  const resetMobileTimer = useCallback(() => {
    if (mobileCarouselTimer.current) clearInterval(mobileCarouselTimer.current);
    mobileCarouselTimer.current = setInterval(() => {
      setMobileIdx((prev) => (prev + 1) % SERVICES_CARDS.length);
    }, 3500);
  }, []);

  useEffect(() => {
    resetMobileTimer();
    return () => {
      if (mobileCarouselTimer.current) clearInterval(mobileCarouselTimer.current);
    };
  }, [resetMobileTimer]);

  const onMobileTouchStart = (e: React.TouchEvent) => {
    mobileTouchStartX.current = e.touches[0].clientX;
  };

  const onMobileTouchEnd = (e: React.TouchEvent) => {
    if (mobileTouchStartX.current === null) return;
    const diff = mobileTouchStartX.current - e.changedTouches[0].clientX;
    mobileTouchStartX.current = null;
    if (Math.abs(diff) < 35) return;
    if (diff > 0) {
      setMobileIdx((prev) => (prev + 1) % SERVICES_CARDS.length);
    } else {
      setMobileIdx((prev) => (prev - 1 + SERVICES_CARDS.length) % SERVICES_CARDS.length);
    }
    resetMobileTimer();
  };

  /* ── lock / unlock ── */
  const lockDeck = useCallback((stepIdx: number, targetTop?: number) => {
    if (typeof window !== "undefined" && window.innerWidth <= 1024) return;
    if (isLockedRef.current) return;
    isLockedRef.current = true;
    setIsLocked(true);
    activeStepRef.current = stepIdx;
    setActiveStep(stepIdx);
    document.documentElement.classList.add('viewport-locked');
    if (typeof targetTop === "number") {
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }
  }, []);

  const unlockDeck = useCallback((direction: "down" | "up") => {
    if (!isLockedRef.current) return;
    isLockedRef.current = false;
    setIsLocked(false);
    isUnlockingRef.current = true;
    document.documentElement.classList.remove('viewport-locked');

    const offsetTop = deckRef.current ? deckRef.current.offsetTop : window.scrollY;
    if (direction === "down") {
      // Scroll past section into content below
      window.scrollTo({ top: offsetTop + window.innerHeight * 0.45, behavior: "smooth" });
    } else {
      // Scroll smoothly back to the top of the deck section
      window.scrollTo({ top: Math.max(0, offsetTop - 120), behavior: "smooth" });
    }
    setTimeout(() => {
      isUnlockingRef.current = false;
      prevScrollY.current = window.scrollY;
    }, 850);
  }, []);

  const goToStep = useCallback((idx: number) => {
    activeStepRef.current = idx;
    setActiveStep(idx);
  }, []);

  /* ── event listeners ── */
  useEffect(() => {
    prevScrollY.current = window.scrollY;

    const onResize = () => {
      if (typeof window !== "undefined" && window.innerWidth <= 1024 && isLockedRef.current) {
        isLockedRef.current = false;
        setIsLocked(false);
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
    };

    const onScroll = () => {
      if (typeof window !== "undefined" && window.innerWidth <= 1024) return;
      if (isLockedRef.current || isUnlockingRef.current) return;
      if (!deckRef.current) return;

      const curY = window.scrollY;
      const scrollingDown = curY >= prevScrollY.current;
      prevScrollY.current = curY;

      const rect = deckRef.current.getBoundingClientRect();
      const targetTop = rect.top + window.scrollY;

      if (scrollingDown) {
        if (rect.top <= 40 && rect.top >= -120) {
          lockDeck(0, targetTop);
        }
      } else {
        if (rect.bottom >= window.innerHeight - 40 && rect.bottom <= window.innerHeight + 120) {
          lockDeck(TOTAL_STEPS - 1, targetTop);
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (typeof window !== "undefined" && window.innerWidth <= 1024) return;
      if (!isLockedRef.current) return;
      e.preventDefault();

      const goingDown = e.deltaY > 0;
      const cur = activeStepRef.current;

      if (wheelCooldown.current) return;
      wheelCooldown.current = true;
      // Allow extra time when entering step 3 so the title settles at top and cards smoothly enter before next wheel
      const cooldownTime = (goingDown && cur === TITLE_STEPS - 1) ? 1700 : 1000;
      setTimeout(() => { wheelCooldown.current = false; }, cooldownTime);

      if (goingDown) {
        if (cur < TOTAL_STEPS - 1) goToStep(cur + 1);
        else unlockDeck("down");
      } else {
        if (cur > 0) goToStep(cur - 1);
        else unlockDeck("up");
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (typeof window !== "undefined" && window.innerWidth <= 1024) return;
      if (!isLockedRef.current) return;
      if (wheelCooldown.current) return;
      const cur = activeStepRef.current;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        wheelCooldown.current = true;
        const cooldownTime = cur === TITLE_STEPS - 1 ? 1700 : 1000;
        setTimeout(() => { wheelCooldown.current = false; }, cooldownTime);
        if (cur < TOTAL_STEPS - 1) goToStep(cur + 1);
        else unlockDeck("down");
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        wheelCooldown.current = true;
        setTimeout(() => { wheelCooldown.current = false; }, 1000);
        if (cur > 0) goToStep(cur - 1);
        else unlockDeck("up");
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [goToStep, lockDeck, unlockDeck]);

  /* ── touch (desktop fallback) ── */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    touchStartY.current = null;
    if (Math.abs(diff) < 40) return;
    const cur = activeStepRef.current;
    if (diff > 0) {
      if (cur < TOTAL_STEPS - 1) goToStep(cur + 1);
    } else {
      if (cur > 0) goToStep(cur - 1);
    }
  };

  /* ── 5 stacked layer dimensions matching target design exactly ── */
  const STACK_LAYERS = [
    { widthPct: 100, topOffset: 0, spinePct: 18 },
    { widthPct: 94.15, topOffset: 36, spinePct: 18 },
    { widthPct: 87.40, topOffset: 72, spinePct: 18 },
    { widthPct: 80.89, topOffset: 108, spinePct: 18 },
    { widthPct: 74.63, topOffset: 144, spinePct: 18 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');

        /* ─────────── Page shell ─────────── */
        .services-main {
          min-height: 100vh;
          width: 100%;
          background: #080415;
          position: relative;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        /* Ambient Glow Backgrounds */
        .services-bg-glow {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: min(1300px, 100vw);
          height: 850px;
          background: radial-gradient(ellipse 65% 55% at 50% 32%, rgba(100, 60, 210, 0.28) 0%, rgba(45, 20, 110, 0.18) 45%, rgba(8, 4, 21, 0) 75%);
          pointer-events: none;
          z-index: 1;
        }
        .services-bg-glow-bottom {
          position: absolute;
          bottom: 200px; left: 50%;
          transform: translateX(-50%);
          width: min(900px, 90vw);
          height: 380px;
          background: radial-gradient(ellipse 60% 40% at 50% 60%, rgba(116, 79, 231, 0.25) 0%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
          z-index: 1;
        }

        /* ─────────── Hero viewport screen ─────────── */
        .services-hero-screen {
          box-sizing: border-box;
          position: relative;
          width: 100%;
          min-height: 100vh;
          max-height: 1080px;
          padding-top: clamp(60px, 9vh, 100px);
          padding-bottom: clamp(30px, 5vh, 60px);
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          z-index: 2;
        }

        .services-hero {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 48px);
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
          flex-shrink: 0;
        }

        .services-eyebrow {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: clamp(10px, 1.1vw, 12px);
          line-height: 1.4;
          letter-spacing: 0.25em;
          color: #B09DEA;
          text-transform: uppercase;
          text-align: center;
          margin-top: 0;
          margin-bottom: clamp(10px, 1.8vh, 18px);
          display: flex;
          align-items: center;
          gap: 12px;
          user-select: none;
        }
        .services-dot {
          color: #B09DEA;
          font-size: 0.6em;
          opacity: 0.75;
        }

        .services-title { margin: 0; text-align: center; display: flex; flex-direction: column; align-items: center; }
        .services-title-top {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: clamp(26px, 3vw, 60px);
          line-height: 1.05;
          color: #F4F1FF;
          letter-spacing: -0.02em;
          max-width: min(720px, 92vw);
        }
        .services-title-gradient {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: clamp(26px, 3vw, 60px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-top: clamp(6px, 1vh, 12px);
          background: linear-gradient(90deg, #FFFFFF 15%, #B09DEA 55%, #744FE7 88%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          max-width: min(1067px, 94vw);
        }
        .services-desc {
          margin: clamp(14px, 2.6vh, 26px) auto 0;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: clamp(13px, 1.2vw, 17px);
          line-height: 1.6;
          color: #FFFFFF;
          text-align: center;
          max-width: min(680px, 88vw);
          opacity: 0.92;
        }

        .services-graphic-wrapper {
          position: absolute;
          bottom: clamp(0px, 0vh, 2px);
          left: 50%;
          transform: translateX(-50%);
          width: min(2620px, 100vw);
          height: clamp(380px, 58vh, 680px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          pointer-events: none;
          z-index: 1;
        }
        .services-graphic-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: bottom center;
          filter: drop-shadow(0 0 45px rgba(116, 79, 231, 0.5));
          user-select: none;
          pointer-events: none;
        }
        .services-pedestal-glow {
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: min(820px, 80vw);
          height: 120px;
          background: radial-gradient(ellipse 50% 40% at 50% 85%, rgba(160,120,255,0.5) 0%, rgba(116,79,231,0.24) 40%, transparent 75%);
          filter: blur(20px);
          pointer-events: none;
          z-index: -1;
        }

        /* ─────────── Desktop Deck section ─────────── */
        .services-deck-section {
          box-sizing: border-box;
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 700px;
          overflow: hidden;
          background: #F1ECFF;
          border-bottom: 0.8px solid rgba(94, 75, 142, 0.06);
          box-shadow: inset 1px 9px 28.2px 14px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }

        /* Deck header (Title + Subtitle unified container) */
        .deck-header {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
          user-select: none;
          pointer-events: none;
          transition:
            top       1.35s cubic-bezier(0.22, 1, 0.36, 1),
            transform 1.35s cubic-bezier(0.22, 1, 0.36, 1),
            opacity   0.75s ease;
        }

        .deck-header.title-at-top {
          top: clamp(22px, 3.4vh, 38px);
          transform: translate(-50%, 0);
        }

        .deck-title {
          font-family: 'Inter', sans-serif;
          font-weight: 900;
          color: #432A8E;
          line-height: 1.1;
          text-align: center;
          white-space: nowrap;
          letter-spacing: -0.01em;
          transition: font-size 1.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .deck-subtitle {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: clamp(12px, 1.25vw, 17px);
          line-height: 1.4;
          letter-spacing: 0.22em;
          color: #8069C8;
          text-align: center;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: clamp(8px, 1.2vh, 14px);
          transition: opacity 0.75s ease 0.2s, transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
        }

        .deck-subtitle-line {
          display: inline-block;
          width: 32px;
          height: 1.5px;
          background: #432A8E;
          flex-shrink: 0;
        }

        /* Card stack area */
        .deck-cards-area {
          position: absolute;
          left: 50%;
          z-index: 5;
          width: min(1140px, 86vw);
          height: clamp(580px, 66vh, 700px);
          transition:
            top       1.35s cubic-bezier(0.22, 1, 0.36, 1),
            transform 1.25s cubic-bezier(0.22, 1, 0.36, 1),
            opacity   0.95s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Responsive adjustments preserving full card height */
        @media (max-height: 840px) and (min-width: 1025px) {
          .deck-header.title-at-top {
            top: 14px;
          }
          .deck-card-layer {
            height: clamp(430px, 53vh, 490px) !important;
          }
        }
        @media (max-height: 720px) and (min-width: 1025px) {
          .deck-header.title-at-top {
            top: 10px;
          }
          .deck-card-layer {
            height: clamp(390px, 50vh, 450px) !important;
          }
        }

        /* Individual stacked card with increased height */
        .deck-card-layer {
          position: absolute;
          left: 50%;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          box-sizing: border-box;
          border-radius: 20px;
          border: 2.5px solid #6D51C6;
          background: #100D1F;
          overflow: hidden;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          transition:
            top       1.25s cubic-bezier(0.22, 1, 0.36, 1),
            width     1.25s cubic-bezier(0.22, 1, 0.36, 1),
            height    1.25s cubic-bezier(0.22, 1, 0.36, 1),
            transform 1.25s cubic-bezier(0.22, 1, 0.36, 1),
            opacity   0.75s ease;
        }

        .deck-card-body {
          flex: 1;
          background: #100D1F;
          box-sizing: border-box;
          padding: clamp(38px, 4.2vw, 56px) clamp(38px, 4.5vw, 62px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .deck-card-spine {
          flex-shrink: 0;
          background: linear-gradient(180deg, #1C163A 0%, #2F2160 22%, #493888 48%, #6464B0 74%, #7C89C7 100%);
          border-left: 1.5px solid rgba(109, 81, 198, 0.5);
          box-sizing: border-box;
        }

        .deck-card-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
        }

        .deck-card-main {
          display: flex;
          flex-direction: column;
        }

        .deck-card-num {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: clamp(15px, 1.3vw, 18px);
          letter-spacing: 0.2em;
          color: #E9E2FF;
          line-height: 1;
          margin-bottom: clamp(16px, 2.4vh, 28px);
        }
        .deck-card-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(32px, 3.8vw, 56px);
          color: #FFFFFF;
          line-height: 1.1;
          letter-spacing: 0.01em;
          margin-bottom: clamp(16px, 2.2vh, 26px);
        }
        .deck-card-desc {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: clamp(15px, 1.4vw, 20px);
          line-height: 1.55;
          letter-spacing: 0.02em;
          color: rgba(255, 255, 255, 0.88);
          max-width: 640px;
        }
        .deck-card-tags {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: clamp(13px, 1.15vw, 16px);
          line-height: 1.6;
          letter-spacing: 0.02em;
          color: rgba(255, 255, 255, 0.45);
          white-space: pre-line;
        }

        /* Progress dots (desktop) */
        .deck-dots {
          position: absolute;
          bottom: clamp(12px, 2vh, 26px);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 25;
        }
        .deck-dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          background: rgba(67, 42, 142, 0.25);
          transition: background 0.3s, transform 0.3s;
          cursor: pointer;
          border: none;
          padding: 0;
        }
        .deck-dot.active {
          background: #432A8E;
          transform: scale(1.4);
        }

        /* ─────────── Mobile / Tablet Carousel (<= 1024px) ─────────── */
        .svc-carousel-section {
          display: none;
        }

        @media (max-width: 1024px) {
          .services-hero-screen { padding-top: clamp(88px, 12vh, 130px); height: auto; min-height: auto; padding-bottom: 30px; }
          .services-graphic-wrapper { position: relative; bottom: auto; left: auto; transform: none; height: clamp(220px, 50vw, 360px); margin-top: 16px; }
          .services-eyebrow { margin-top: 0; margin-bottom: 12px; }

          /* Hide desktop deck on mobile/tablet */
          .services-deck-section {
            display: none !important;
          }

          /* Show mobile carousel section */
          .svc-carousel-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            box-sizing: border-box;
            background: #F1ECFF;
            border-bottom: 0.8px solid rgba(94, 75, 142, 0.06);
            box-shadow: inset 1px 9px 28.2px 14px rgba(0, 0, 0, 0.25);
            padding: clamp(40px, 6vh, 60px) 20px clamp(44px, 7vh, 68px);
            position: relative;
            z-index: 5;
            overflow: hidden;
          }

          .svc-carousel-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: clamp(26px, 4vh, 38px);
            text-align: center;
          }

          .svc-carousel-title {
            font-family: 'Inter', sans-serif;
            font-weight: 900;
            font-size: clamp(28px, 6vw, 44px);
            color: #432A8E;
            line-height: 1.1;
            margin: 0;
            letter-spacing: -0.01em;
          }

          .svc-carousel-subtitle {
            font-family: 'Inter', sans-serif;
            font-weight: 400;
            font-size: clamp(10px, 2.2vw, 13px);
            line-height: 1.4;
            letter-spacing: 0.16em;
            color: #8069C8;
            margin-top: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .svc-subtitle-line {
            display: inline-block;
            width: 20px;
            height: 1.5px;
            background: #432A8E;
            flex-shrink: 0;
          }

          .svc-carousel-track {
            position: relative;
            width: min(440px, 90vw);
            height: clamp(380px, 54vh, 460px);
            margin: 0 auto;
          }

          .svc-carousel-card {
            position: absolute;
            inset: 0;
            box-sizing: border-box;
            border-radius: 20px;
            border: 2.5px solid #6D51C6;
            background: #100D1F;
            box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
            overflow: hidden;
            opacity: 0;
            transform: translateX(60px) scale(0.94);
            transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.25, 0.86, 0.25, 1);
            pointer-events: none;
            display: flex;
          }

          .svc-carousel-card.active {
            opacity: 1;
            transform: translateX(0) scale(1);
            pointer-events: auto;
          }

          .svc-carousel-card.prev-card {
            opacity: 0;
            transform: translateX(-60px) scale(0.94);
          }

          .svc-card-inner {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 100%;
            align-items: stretch;
          }

          .svc-card-body {
            flex: 1;
            padding: clamp(24px, 4.5vw, 36px) clamp(20px, 4vw, 32px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
            overflow: hidden;
          }

          .svc-card-spine {
            width: 17%;
            flex-shrink: 0;
            background: linear-gradient(180deg, #1C163A 0%, #2F2160 22%, #493888 48%, #6464B0 74%, #7C89C7 100%);
            border-left: 1.5px solid rgba(109, 81, 198, 0.5);
          }

          .svc-card-num {
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            font-size: 15px;
            letter-spacing: 0.2em;
            color: #E9E2FF;
            line-height: 1;
            margin-bottom: 12px;
          }

          .svc-card-title {
            font-family: 'Inter', sans-serif;
            font-weight: 800;
            font-size: clamp(22px, 5vw, 30px);
            color: #FFFFFF;
            line-height: 1.15;
            letter-spacing: 0.01em;
            margin: 0 0 12px;
          }

          .svc-card-desc {
            font-family: 'Inter', sans-serif;
            font-weight: 400;
            font-size: clamp(13px, 3vw, 15px);
            line-height: 1.5;
            color: rgba(255, 255, 255, 0.88);
            margin: 0 0 16px;
          }

          .svc-card-tags {
            font-family: 'Inter', sans-serif;
            font-weight: 400;
            font-size: clamp(11px, 2.6vw, 13px);
            line-height: 1.55;
            color: rgba(255, 255, 255, 0.45);
            white-space: pre-line;
          }

          .svc-carousel-dots {
            display: flex;
            gap: 9px;
            align-items: center;
            justify-content: center;
            margin-top: clamp(22px, 3.5vh, 32px);
          }

          .svc-carousel-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(67, 42, 142, 0.25);
            transition: background 0.25s, transform 0.25s;
            cursor: pointer;
            border: none;
            padding: 0;
          }

          .svc-carousel-dot.active {
            background: #432A8E;
            transform: scale(1.4);
          }
        }

        @media (max-width: 480px) {
          .services-eyebrow { font-size: 11px; letter-spacing: 0.14em; margin-top: 20px; }
          .services-desc { font-size: 13px; }
          .svc-carousel-track {
            width: min(340px, 88vw);
            height: 390px;
          }
          .svc-card-body {
            padding: 22px 18px;
          }
        }
      `}</style>

      <main className="services-main">
        {/* Glow backgrounds */}
        <div className="services-bg-glow" aria-hidden="true" />
        <div className="services-bg-glow-bottom" aria-hidden="true" />

        {/* ── Hero Viewport Screen ── */}
        <div className="services-hero-screen">
          <div style={{ height: "64px" }} aria-hidden="true" />

          <section className="services-hero" aria-labelledby="services-hero-heading">
            <h1 id="services-hero-heading" className="services-title">
              <span className="services-title-top">Your idea has</span>
              <span className="services-title-gradient">more than one way forward</span>
            </h1>
            <p className="services-desc">
              From web and mobile development to AI, cloud, and beyond,
              we build the technology that moves your business forward.
            </p>
          </section>

          <div className="services-graphic-wrapper">
            <div className="services-pedestal-glow" aria-hidden="true" />
            <Image
              src="/asset/serviceImg.png"
              alt="Services Technology Network Illustration"
              width={1387}
              height={555}
              priority
              className="services-graphic-img"
            />
          </div>
        </div>

        {/* ── Desktop Stacked Deck Section (hidden on <= 1024px) ── */}
        <section
          ref={deckRef}
          className="services-deck-section"
          aria-label="Our Services"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Deck Header: Centered on initial steps, pinned to top on Card 01, hidden on subsequent cards */}
          <div
            className={`deck-header${titleAtTop ? " title-at-top" : ""}`}
            style={{
              opacity: (!titleAtTop || cardIndex === 0) ? 1 : 0,
              pointerEvents: "none",
            }}
          >
            <div
              className="deck-title"
              style={{
                fontSize: titleFontSize,
              }}
            >
              OUR SERVICES
            </div>

            <div
              className="deck-subtitle"
              style={{
                opacity: titleAtTop && cardIndex === 0 ? 1 : 0,
                transform: titleAtTop && cardIndex === 0 ? "translateY(0)" : "translateY(10px)",
                pointerEvents: "none",
              }}
            >
              <span className="deck-subtitle-line" />
              <span>IDEAS · DESIGN · TECHNOLOGY · GROWTH</span>
              <span className="deck-subtitle-line" />
            </div>
          </div>

          {/* Card stack — only visible once title reached top and settled into place */}
          {titleAtTop && (
            <div
              className={`deck-cards-area ${titleSettled ? "cards-settled" : "cards-entering"}`}
              style={{
                top: cardIndex === 0 ? "clamp(135px, 16vh, 165px)" : "50%",
                transform: cardIndex === 0
                  ? (titleSettled ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(48px)")
                  : "translate(-50%, -50%)",
                opacity: titleSettled ? 1 : 0,
                pointerEvents: titleSettled ? "auto" : "none",
              }}
            >
              {/* Render all 5 cards in reverse order (back first so front is on top) */}
              {[...SERVICES_CARDS].reverse().map((card, rIdx) => {
                const realIdx = SERVICES_CARDS.length - 1 - rIdx; // 4 → 0
                const relIdx = realIdx - cardIndex;               // position relative to active (0 = active)
                const isActive = relIdx === 0;
                const isBelow = relIdx > 0;
                const isAbove = relIdx < 0;

                // Pick layer specs: Layer 0 for active, 1..4 for lower stepped cards
                const layerIdx = isAbove ? 0 : Math.min(relIdx, 4);
                const layer = STACK_LAYERS[layerIdx];

                // Uniform card height across all layers
                const cardTop = layer.topOffset;

                return (
                  <div
                    key={card.num}
                    className="deck-card-layer"
                    style={{
                      width: `${layer.widthPct}%`,
                      height: "clamp(480px, 56vh, 560px)",
                      top: isAbove ? "-160px" : `${cardTop}px`,
                      transform: isAbove
                        ? "translateX(-50%) perspective(1000px) rotateX(45deg) translateY(-80px)"
                        : "translateX(-50%) perspective(1000px) rotateX(0deg)",
                      opacity: isAbove ? 0 : 1,
                      zIndex: isAbove ? 0 : 20 - layerIdx,
                      cursor: isBelow ? "pointer" : "default",
                      pointerEvents: isAbove ? "none" : "auto",
                    }}
                    onClick={() => {
                      if (isBelow) goToStep(TITLE_STEPS + realIdx);
                    }}
                    aria-hidden={!isActive}
                  >
                    <div className="deck-card-body">
                      <div
                        className="deck-card-content"
                        style={{
                          opacity: isActive ? 1 : 0,
                          visibility: isActive ? "visible" : "hidden",
                          pointerEvents: isActive ? "auto" : "none",
                          transition: "opacity 0.35s ease 0.1s, visibility 0.35s ease 0.1s",
                        }}
                      >
                        <div className="deck-card-main">
                          <div className="deck-card-num">{card.num}</div>
                          <div className="deck-card-title">{card.title}</div>
                          <div className="deck-card-desc">{card.desc}</div>
                        </div>
                        <div className="deck-card-tags">{card.tags}</div>
                      </div>
                    </div>
                    <div
                      className="deck-card-spine"
                      style={{ width: `${layer.spinePct}%` }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Mobile & Tablet: Carousel cards (<= 1024px) ── */}
        <section className="svc-carousel-section" aria-label="Our Services Carousel">
          <div className="svc-carousel-header">
            <h2 className="svc-carousel-title">OUR SERVICES</h2>
            <div className="svc-carousel-subtitle">
              <span className="svc-subtitle-line" />
              <span>IDEAS · DESIGN · TECHNOLOGY · GROWTH</span>
              <span className="svc-subtitle-line" />
            </div>
          </div>

          {/* Carousel Track */}
          <div
            className="svc-carousel-track"
            role="region"
            aria-live="polite"
            onTouchStart={onMobileTouchStart}
            onTouchEnd={onMobileTouchEnd}
          >
            {SERVICES_CARDS.map((card, i) => {
              const isCardActive = i === mobileIdx;
              const isPrev = i === (mobileIdx - 1 + SERVICES_CARDS.length) % SERVICES_CARDS.length;
              return (
                <div
                  key={card.num}
                  className={`svc-carousel-card ${isCardActive ? "active" : isPrev ? "prev-card" : ""}`}
                  aria-hidden={!isCardActive}
                >
                  <div className="svc-card-inner">
                    <div className="svc-card-body">
                      <div>
                        <div className="svc-card-num">{card.num}</div>
                        <h3 className="svc-card-title">{card.title}</h3>
                        <p className="svc-card-desc">{card.desc}</p>
                      </div>
                      <div className="svc-card-tags">{card.tags}</div>
                    </div>
                    <div className="svc-card-spine" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Navigation */}
          <div className="svc-carousel-dots" role="tablist" aria-label="Service card indicators">
            {SERVICES_CARDS.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === mobileIdx}
                aria-label={`Go to service ${i + 1}`}
                className={`svc-carousel-dot ${i === mobileIdx ? "active" : ""}`}
                onClick={() => {
                  setMobileIdx(i);
                  resetMobileTimer();
                }}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
