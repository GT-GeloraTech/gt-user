"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

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
    alt: "Orbit radar showing product discovery",
    imgClass: "step-img-1",
  },
  {
    step: "02",
    title: "DESIGN",
    desc: "Shape ideas into experiences.\nSimple, useful & intuitive.",
    image: "/asset/ChatgptImg2.png",
    alt: "Pen tool and floating elements showing interface design",
    imgClass: "step-img-2",
  },
  {
    step: "03",
    title: "BUILD",
    desc: "Turn concepts into reality.\nBuilt to perform and scale.",
    image: "/asset/photoroomImg.png",
    alt: "Code window and gear showing software engineering",
    imgClass: "step-img-3",
  },
  {
    step: "04",
    title: "LAUNCH",
    desc: "Ready for the world.\nLaunch, learn & grow.",
    image: "/asset/photoroomImg2.png",
    alt: "Rocket taking off showing product launch",
    imgClass: "step-img-4",
  },
];

export default function HomePage() {
  /* ────────────────────────────────────────────────────────
   * Refs & State
   * ─────────────────────────────────────────────────────── */
  const sectionRef = useRef<HTMLElement>(null);

  const [isLocked, setIsLocked] = useState(false);
  const isLockedRef = useRef(false);

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStepRef = useRef(0);

  // 'forward' = going to a higher step (cards slide left), 'backward' = going lower (cards slide right)
  const [slideDir, setSlideDir] = useState<'forward' | 'backward' | 'none'>('none');

  const wheelCooldown = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isUnlockingRef = useRef(false);
  const prevScrollY = useRef(0);

  /* ── Hero Card Carousel (mobile/tablet only) ── */
  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const carouselNext = useCallback(() => {
    setCarouselIdx((i) => (i + 1) % CARDS_DATA.length);
  }, []);

  const carouselPrev = useCallback(() => {
    setCarouselIdx((i) => (i - 1 + CARDS_DATA.length) % CARDS_DATA.length);
  }, []);

  const resetCarouselTimer = useCallback(() => {
    if (carouselTimer.current) clearInterval(carouselTimer.current);
    carouselTimer.current = setInterval(() => {
      setCarouselIdx((i) => (i + 1) % CARDS_DATA.length);
    }, 3200);
  }, []);

  useEffect(() => {
    resetCarouselTimer();
    return () => {
      if (carouselTimer.current) clearInterval(carouselTimer.current);
    };
  }, [resetCarouselTimer]);

  const totalSteps = PROCESS_STEPS.length;

  /* ── Process Slideshow Auto-Advance (mobile/tablet only) ── */
  const processTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetProcessTimer = useCallback(() => {
    if (processTimer.current) clearInterval(processTimer.current);
    if (typeof window !== "undefined" && window.innerWidth <= 1024) {
      processTimer.current = setInterval(() => {
        setSlideDir('forward');
        setActiveStepIndex((prev) => {
          const next = (prev + 1) % PROCESS_STEPS.length;
          activeStepRef.current = next;
          return next;
        });
      }, 3500);
    }
  }, []);

  const handleProcessNext = useCallback(() => {
    setSlideDir('forward');
    setActiveStepIndex((prev) => {
      const next = (prev + 1) % PROCESS_STEPS.length;
      activeStepRef.current = next;
      return next;
    });
    resetProcessTimer();
  }, [resetProcessTimer]);

  const handleProcessPrev = useCallback(() => {
    setSlideDir('backward');
    setActiveStepIndex((prev) => {
      const next = (prev - 1 + PROCESS_STEPS.length) % PROCESS_STEPS.length;
      activeStepRef.current = next;
      return next;
    });
    resetProcessTimer();
  }, [resetProcessTimer]);

  const handleProcessSelect = useCallback((idx: number) => {
    setSlideDir(idx >= activeStepRef.current ? 'forward' : 'backward');
    activeStepRef.current = idx;
    setActiveStepIndex(idx);
    resetProcessTimer();
  }, [resetProcessTimer]);

  /* ────────────────────────────────────────────────────────
   * Helpers
   * ─────────────────────────────────────────────────────── */
  const goToStep = useCallback((idx: number) => {
    setSlideDir(idx > activeStepRef.current ? 'forward' : 'backward');
    activeStepRef.current = idx;
    setActiveStepIndex(idx);
    resetProcessTimer();
  }, [resetProcessTimer]);

  /** Lock the viewport onto the process section at a given step (Desktop > 1024px only) */
  const lockProcess = useCallback((stepIdx: number, targetTop?: number) => {
    // Mobile and tablet devices must NEVER lock viewport or hijack scroll
    if (typeof window !== "undefined" && window.innerWidth <= 1024) return;
    if (isLockedRef.current) return;
    isLockedRef.current = true;
    setIsLocked(true);
    activeStepRef.current = stepIdx;
    setActiveStepIndex(stepIdx);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (typeof targetTop === "number") {
      window.scrollTo({ top: targetTop, behavior: "instant" });
    }
  }, []);

  /**
   * Release the viewport lock and allow natural scroll to proceed.
   * direction: 'down' → user completed step 4 and scrolls into content below
   *            'up'   → user scrolled up from step 1 back to top content (About)
   */
  const unlockProcess = useCallback((direction: "down" | "up") => {
    if (!isLockedRef.current) return;
    isLockedRef.current = false;
    setIsLocked(false);
    isUnlockingRef.current = true;

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    const offsetTop = sectionRef.current ? sectionRef.current.offsetTop : window.scrollY;

    if (direction === "down") {
      // Smoothly scroll down past the section into content below
      window.scrollTo({ top: offsetTop + window.innerHeight * 0.45, behavior: "smooth" });
    } else {
      // Smoothly scroll up above the section into About section
      window.scrollTo({ top: Math.max(0, offsetTop - window.innerHeight * 0.45), behavior: "smooth" });
    }

    // Cooldown prevents immediately re-locking while smooth scroll moves the viewport
    setTimeout(() => {
      isUnlockingRef.current = false;
      prevScrollY.current = window.scrollY;
    }, 850);
  }, []);

  /* ────────────────────────────────────────────────────────
   * Event listeners
   * ─────────────────────────────────────────────────────── */
  useEffect(() => {
    resetProcessTimer();
    prevScrollY.current = window.scrollY;

    const handleResize = () => {
      if (typeof window !== "undefined" && window.innerWidth <= 1024 && isLockedRef.current) {
        isLockedRef.current = false;
        setIsLocked(false);
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
      resetProcessTimer();
    };

    /** Detects when the user scrolls into the process section from top or bottom (Desktop only) */
    const onScroll = () => {
      if (typeof window !== "undefined" && window.innerWidth <= 1024) return;
      if (isLockedRef.current || isUnlockingRef.current) return;
      if (!sectionRef.current) return;

      const curY = window.scrollY;
      const scrollingDown = curY >= prevScrollY.current;
      prevScrollY.current = curY;

      const rect = sectionRef.current.getBoundingClientRect();
      const offsetTop = sectionRef.current.offsetTop;

      if (scrollingDown) {
        // Scrolling DOWN into section from above: lock at Step 1 (0)
        if (rect.top <= 25 && rect.top >= -80) {
          lockProcess(0, offsetTop);
        }
      } else {
        // Scrolling UP into section from below: lock at Step 4 (last step)
        if (rect.bottom >= window.innerHeight - 25 && rect.bottom <= window.innerHeight + 80) {
          lockProcess(totalSteps - 1, offsetTop);
        }
      }
    };

    /** Intercepts wheel events while locked to cycle through steps in place (Desktop only) */
    const onWheel = (e: WheelEvent) => {
      if (typeof window !== "undefined" && window.innerWidth <= 1024) return;
      if (!isLockedRef.current) return;
      e.preventDefault(); // Lock page scroll

      if (wheelCooldown.current) return;
      wheelCooldown.current = true;
      setTimeout(() => {
        wheelCooldown.current = false;
      }, 950);

      const goingDown = e.deltaY > 0;
      const cur = activeStepRef.current;

      if (goingDown) {
        if (cur < totalSteps - 1) {
          goToStep(cur + 1);
        } else {
          // All steps completed going down → unlock downward to reveal below content
          unlockProcess("down");
        }
      } else {
        // Scrolling UP
        if (cur > 0) {
          // Reduce step: 4 -> 3 -> 2 -> 1
          goToStep(cur - 1);
        } else {
          // At Step 1 and scrolling UP → unlock upward to reveal top content
          unlockProcess("up");
        }
      }
    };

    /** Keyboard navigation while locked */
    const onKeyDown = (e: KeyboardEvent) => {
      if (typeof window !== "undefined" && window.innerWidth <= 1024) return;
      if (!isLockedRef.current) return;
      const cur = activeStepRef.current;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        if (cur < totalSteps - 1) goToStep(cur + 1);
        else unlockProcess("down");
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        if (cur > 0) goToStep(cur - 1);
        else unlockProcess("up");
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (processTimer.current) clearInterval(processTimer.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [goToStep, lockProcess, unlockProcess, totalSteps, resetProcessTimer]);

  /* ────────────────────────────────────────────────────────
   * Touch handlers
   * ─────────────────────────────────────────────────────── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    touchStartX.current = null;
    touchStartY.current = null;

    // Mobile & tablet: NEVER hijack vertical page scroll. Only horizontal swipe navigates cards
    if (typeof window !== "undefined" && window.innerWidth <= 1024) {
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
        if (diffX > 0) {
          handleProcessNext();
        } else {
          handleProcessPrev();
        }
      }
      return;
    }

    if (Math.abs(diffY) < 40) return;
    const cur = activeStepRef.current;
    if (diffY > 0) {
      // swipe up → advance step
      if (cur < totalSteps - 1) goToStep(cur + 1);
      else unlockProcess("down");
    } else {
      // swipe down → reduce step: 4 -> 3 -> 2 -> 1
      if (cur > 0) goToStep(cur - 1);
      else unlockProcess("up");
    }
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
          padding-top: 24px;
          background: #0b0916 url('/asset/bg.png') top center / cover no-repeat;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Inner clipping wrapper keeps fan cards cropped without clipping fixed-pos drawer */
        .home-hero-canvas {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .home-hero-canvas > * {
          pointer-events: auto;
        }

        /* ── Mobile Carousel ── */
        .hero-carousel {
          display: none;
        }

        .hero-carousel-track {
          position: relative;
          width: 260px;
          height: 340px;
          margin: 0 auto;
        }

        .hero-carousel-card {
          position: absolute;
          inset: 0;
          box-sizing: border-box;
          background: linear-gradient(161.1deg, rgba(111, 174, 255, 0.15) 3.78%, rgba(252, 253, 255, 0) 95.82%), radial-gradient(50% 50% at 50% 50%, rgba(121, 92, 255, 0.28) 0%, rgba(254, 254, 255, 0) 100%), linear-gradient(159.62deg, rgba(32, 35, 74, 0.82) 3.32%, rgba(70, 52, 138, 0.72) 96.94%);
          border: 1px solid rgba(191, 239, 255, 0.3);
          backdrop-filter: blur(21px);
          -webkit-backdrop-filter: blur(21px);
          border-radius: 32px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 14px 35px rgba(98, 80, 255, 0.28);
          opacity: 0;
          transform: translateX(60px) scale(0.94);
          transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.25, 0.86, 0.25, 1);
          pointer-events: none;
        }
        .hero-carousel-card::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 55%;
          background: radial-gradient(ellipse at 50% 100%, rgba(98, 80, 255, 0.45) 0%, rgba(124, 77, 255, 0) 75%);
          pointer-events: none;
        }
        .hero-carousel-card.active {
          opacity: 1;
          transform: translateX(0) scale(1);
          pointer-events: auto;
        }
        .hero-carousel-card.prev-card {
          opacity: 0;
          transform: translateX(-60px) scale(0.94);
        }

        .hero-carousel-arrows {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 22px;
        }

        .hero-carousel-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
          flex-shrink: 0;
        }
        .hero-carousel-arrow:hover {
          background: rgba(140, 103, 254, 0.3);
          border-color: rgba(140, 103, 254, 0.55);
          transform: scale(1.08);
        }
        .hero-carousel-arrow:active {
          transform: scale(0.95);
        }

        .hero-carousel-dots {
          display: flex;
          gap: 7px;
          align-items: center;
        }
        .hero-carousel-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          transition: background 0.25s, transform 0.25s;
          cursor: pointer;
          border: none;
          padding: 0;
        }
        .hero-carousel-dot.active {
          background: #8c67fe;
          transform: scale(1.35);
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
          padding-right: 52px;
          padding-left: 0;
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
          display: inline-flex;
          align-self: center;
          width: fit-content;
          max-width: calc(100% - 32px);
          height: 42px;
          margin: 0 auto;
          align-items: center;
          justify-content: center;
          padding: 0 26px;
          border: 0;
          border-radius: 9999px;
          background: linear-gradient(90deg, rgba(90, 40, 246, 0) 0%, rgba(90, 40, 246, 0.14) 50%, rgba(90, 40, 246, 0) 100%);
          box-shadow: none;
          color: #5a28f6;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1;
          text-align: center;
          white-space: nowrap;
          text-shadow: none;
          flex-shrink: 0;
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
          line-height: 1.12;
          text-align: center;
          color: #141415;
          text-wrap: balance;
        }

        .about-heading-br {
          display: block;
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
          border-radius: 28px;
          box-shadow: 0 12px 30px rgba(94, 75, 142, 0.15);
        }

        .about-tile img { object-fit: cover; }
        .about-future img { object-position: left center; }

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

        /* Future-Ready: 100% + title aligned with card content */
        .about-future .tile-content {
          padding: 40px 0 0 calc(49 / 603 * 100%);
          justify-content: flex-start;
          align-items: flex-start;
        }

        .about-future .about-percent {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.3;
          color: #141415;
          margin: 0 0 4px 0;
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
          padding: 40px 32px;
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
        .process-section {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 680px;
          max-height: 1024px;
          overflow: hidden;
          background: linear-gradient(117.25deg, #0B0916 15.2%, rgba(25, 13, 70, 0.8) 52.43%, #0A0815 77.43%);
          backdrop-filter: blur(27.7px);
          -webkit-backdrop-filter: blur(27.7px);
          isolation: isolate;
          user-select: none;
          display: block;

          /* Proportional sizing variables matching Figma proportions - slightly more compact */
          --card-w: clamp(295px, 26vw, 395px);
          --card-h: clamp(385px, 34vw, 480px);
          --peek-w: clamp(80px, 9vw, 130px);
          --edge-pad: clamp(48px, 6.8vw, 98px);
        }

        /* Ellipse 12 Background Glow */
        .process-ellipse-12 {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse 90% 80% at 50% 50%, #FFFFFF 0%, rgba(191, 239, 255, 0.8) 25%, rgba(160, 109, 255, 0.35) 60%, rgba(160, 109, 255, 0) 100%);
          mix-blend-mode: difference;
          opacity: 0.05;
          pointer-events: none;
          z-index: 1;
        }

        /* Left Intro Block (visible on Step 01, fades when activeStepIndex > 0) */
        .process-intro-block {
          position: absolute;
          left: var(--edge-pad);
          top: clamp(60px, 11vh, 100px);
          width: clamp(240px, 22vw, 320px);
          z-index: 10;
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .process-intro-block.is-hidden {
          opacity: 0;
          transform: translateX(-30px);
          pointer-events: none;
        }

        .process-kicker-figma {
          margin: 0 0 20px 0;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(13px, 1.1vw, 15px);
          line-height: 1.5;
          letter-spacing: 0.08em;
          color: #B09DEA;
        }

        .process-title-figma {
          margin: 0 0 clamp(18px, 2.5vh, 26px) 0;
          width: 100%;
          font-family: 'Inter', sans-serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(34px, 3.2vw, 44px);
          line-height: 1.18;
          letter-spacing: 0.02em;
          color: #FFFFFF;
        }

        .process-title-accent {
          color: #B89EFF;
          font-style: italic;
        }

        .process-desc-figma {
          margin: 0;
          width: 100%;
          max-width: 290px;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(14px, 1.1vw, 15.5px);
          line-height: 1.62;
          color: rgba(255, 255, 255, 0.82);
        }

        /* Giant Number 01/02/03/04: reduced elegant size */
        .process-giant-number-wrap {
          position: absolute;
          left: var(--edge-pad);
          bottom: clamp(24px, 4.5vh, 50px);
          height: clamp(96px, 10vw, 140px);
          width: clamp(140px, 15vw, 220px);
          z-index: 8;
          pointer-events: none;
        }
        .process-giant-number-stage {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .process-giant-number {
          position: absolute;
          left: 0;
          bottom: 0;
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: clamp(96px, 10vw, 138px);
          line-height: 0.82;
          color: #DFD7FF;
          letter-spacing: -0.04em;
          transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .process-giant-number.is-active {
          opacity: 1;
          transform: translateY(0);
        }
        .process-giant-number.is-hidden-up {
          opacity: 0;
          transform: translateY(-30px);
        }
        .process-giant-number.is-hidden-down {
          opacity: 0;
          transform: translateY(30px);
        }

        /* Nav controls for mobile/tablet */
        .process-mobile-nav {
          display: none;
        }

        /* Left Peek Card: slim peek width matching Figma */
        /* Left Peek Card: slim peek width matching Figma */
        .process-card-peek-left-figma {
          box-sizing: border-box;
          position: absolute;
          width: var(--card-w);
          height: var(--card-h);
          left: calc(-1 * var(--card-w) + var(--peek-w));
          top: 50%;
          transform: translateY(-50%);
          background: linear-gradient(111.68deg, rgba(255, 255, 255, 0.03) 7.59%, rgba(255, 255, 255, 0.06) 102.04%);
          opacity: 0;
          border: 2.5px solid rgba(109, 81, 198, 0.5);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 22px;
          cursor: pointer;
          pointer-events: none;
          z-index: 4;
          transition: opacity 0.75s ease, border-color 0.3s ease;
        }
        .process-card-peek-left-figma.is-visible {
          opacity: 0.85;
          pointer-events: auto;
        }
        /* Slow slide animations on left rectangle */
        .process-card-peek-left-figma.is-visible.slide-forward {
          animation: peekLeftSlideForward 0.95s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .process-card-peek-left-figma.is-visible.slide-backward {
          animation: peekLeftSlideBackward 0.95s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes peekLeftSlideForward {
          0% {
            transform: translateY(-50%) translateX(min(180px, 14vw));
            opacity: 0.15;
          }
          100% {
            transform: translateY(-50%) translateX(0);
            opacity: 0.85;
          }
        }
        @keyframes peekLeftSlideBackward {
          0% {
            transform: translateY(-50%) translateX(max(-220px, -16vw));
            opacity: 0;
          }
          100% {
            transform: translateY(-50%) translateX(0);
            opacity: 0.85;
          }
        }

        .process-card-peek-left-figma:hover {
          opacity: 1;
          border-color: rgba(160, 120, 255, 0.85);
          transform: translateY(-50%) translateX(8px);
        }

        /* Right Peek Card: slim peek width  */
        .process-card-peek-right-figma {
          box-sizing: border-box;
          position: absolute;
          width: var(--card-w);
          height: var(--card-h);
          right: calc(-1 * var(--card-w) + var(--peek-w));
          top: 50%;
          transform: translateY(-50%);
          background: linear-gradient(111.68deg, rgba(255, 255, 255, 0.03) 7.59%, rgba(255, 255, 255, 0.06) 102.04%);
          opacity: 0;
          border: 2.5px solid rgba(109, 81, 198, 0.5);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 22px;
          cursor: pointer;
          pointer-events: none;
          z-index: 4;
          transition: opacity 0.75s ease, border-color 0.3s ease;
        }
        .process-card-peek-right-figma.is-visible {
          opacity: 0.85;
          pointer-events: auto;
        }
        /* Slow slide animations on right rectangle */
        .process-card-peek-right-figma.is-visible.slide-forward {
          animation: peekRightSlideForward 0.95s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .process-card-peek-right-figma.is-visible.slide-backward {
          animation: peekRightSlideBackward 0.95s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes peekRightSlideForward {
          0% {
            transform: translateY(-50%) translateX(min(220px, 16vw));
            opacity: 0;
          }
          100% {
            transform: translateY(-50%) translateX(0);
            opacity: 0.85;
          }
        }
        @keyframes peekRightSlideBackward {
          0% {
            transform: translateY(-50%) translateX(max(-180px, -14vw));
            opacity: 0.15;
          }
          100% {
            transform: translateY(-50%) translateX(0);
            opacity: 0.85;
          }
        }

        .process-card-peek-right-figma:hover {
          opacity: 1;
          border-color: rgba(160, 120, 255, 0.85);
          transform: translateY(-50%) translateX(-8px);
        }

        /* Center Card Container */
        .process-cards-container {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: var(--card-w);
          height: var(--card-h);
          z-index: 10;
        }

        /* Active Center Card */
        .process-center-card {
          box-sizing: border-box;
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(111.68deg, rgba(22, 14, 50, 0.5) 7.59%, rgba(120, 95, 215, 0.18) 102.04%);
          border: 2.5px solid rgba(109, 81, 198, 0.72);
          box-shadow: 0 16px 45px rgba(8, 6, 20, 0.6);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 22px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          /* Slow, elegant horizontal slideshow transition */
          transition: opacity 0.95s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.95s cubic-bezier(0.22, 1, 0.36, 1),
                      visibility 0s linear 0.95s;
        }
        .process-center-card.is-active {
          opacity: 1;
          visibility: visible;
          transform: translateX(0) scale(1);
          pointer-events: auto;
          transition: opacity 0.95s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.95s cubic-bezier(0.22, 1, 0.36, 1),
                      visibility 0s linear 0s;
        }

        /* Going FORWARD (step 1→2→3→4): outgoing card slides LEFT, incoming enters from RIGHT */
        .slide-forward .process-center-card.is-passed {
          opacity: 0;
          visibility: hidden;
          transform: translateX(-115%) scale(0.92);
          pointer-events: none;
        }
        .slide-forward .process-center-card.is-incoming {
          opacity: 0;
          visibility: hidden;
          transform: translateX(115%) scale(0.92);
          pointer-events: none;
        }

        /* Going BACKWARD (step 4→3→2→1): outgoing card slides RIGHT, incoming enters from LEFT */
        .slide-backward .process-center-card.is-passed {
          opacity: 0;
          visibility: hidden;
          transform: translateX(115%) scale(0.92);
          pointer-events: none;
        }
        .slide-backward .process-center-card.is-incoming {
          opacity: 0;
          visibility: hidden;
          transform: translateX(-115%) scale(0.92);
          pointer-events: none;
        }

        /* Center card image area */
        .process-center-card-img-wrap {
          width: 100%;
          height: 58%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding-top: 20px;
          box-sizing: border-box;
        }
        .process-card-image {
          max-width: 86%;
          max-height: 86%;
          height: auto;
          object-fit: contain;
          transition: transform 0.5s ease;
        }
        .process-card-image.step-img-1 {
          width: 85%;
          opacity: 0.96;
        }
        .process-card-image.step-img-2 {
          width: 85%;
          transform: rotate(7.94deg);
          opacity: 0.96;
        }
        .process-card-image.step-img-3 {
          width: 85%;
          opacity: 0.96;
        }
        .process-card-image.step-img-4 {
          width: 85%;
          opacity: 0.96;
        }

        /* Center card text area */
        .process-center-card-body {
          padding: 0 clamp(24px, 2.5vw, 36px) clamp(24px, 3vh, 36px);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          box-sizing: border-box;
        }
        .process-card-title {
          margin: 0 0 8px 0;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: clamp(20px, 1.8vw, 24px);
          line-height: 1.3;
          letter-spacing: 0.03em;
          color: #FFFFFF;
        }
        .process-card-desc {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(14px, 1.1vw, 15.5px);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
        }

        /* ── Responsive ── */

        /* Show carousel, hide desktop canvas on tablet/mobile */
        @media (max-width: 860px) {
          .home-hero-canvas { display: none !important; }
          .hero-carousel {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            padding: 16px 20px 28px;
            box-sizing: border-box;
            position: relative;
            z-index: 5;
            margin-top: 12px;
          }
          .hero-carousel .hero-title-container {
            pointer-events: auto;
            user-select: auto;
            text-align: center;
          }
          .hero-carousel-track {
            width: min(280px, 80vw);
            height: 320px;
          }
        }

        @media (max-width: 560px) {
          .hero-carousel {
            padding: 12px 16px 22px;
            margin-top: 8px;
          }
          .hero-carousel-track {
            width: min(255px, 78vw);
            height: 295px;
          }
        }

        @media (max-width: 380px) {
          .hero-carousel-track {
            width: min(220px, 80vw);
            height: 270px;
          }
        }

        @media (max-width: 1024px) {

          .about-section {
            min-height: auto;
            padding: 36px 28px 64px;
          }
          .about-eyebrow {
            height: 40px;
            padding: 0 22px;
            font-size: 13.5px;
          }
          .about-heading {
            max-width: 640px;
            margin: 22px auto 32px;
            font-size: clamp(32px, 4.2vw, 42px);
            line-height: 1.15;
          }
          .about-mosaic {
            gap: 18px;
          }
          .about-mosaic-main {
            gap: 18px;
          }
          .about-row {
            gap: 18px;
            height: 215px;
          }
          .about-engineers .tile-content {
            padding: 24px 20px;
          }
          .about-engineers h3 {
            font-size: 18px;
            line-height: 1.3;
          }
          .about-engineers p {
            font-size: 12.5px;
            line-height: 1.45;
            margin-top: 8px;
          }
          .about-future .tile-content {
            padding: 28px 0 0 calc(49 / 603 * 100%);
            justify-content: flex-start;
            align-items: flex-start;
          }

          .process-section {
            height: auto;
            min-height: auto;
            max-height: none;
            padding: 56px 20px 64px;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: visible;
          }
          .process-intro-block {
            position: relative;
            left: auto;
            top: auto;
            width: 100%;
            max-width: 520px;
            margin-bottom: 26px;
            text-align: center;
          }
          .process-intro-block.is-hidden {
            display: block;
            opacity: 1;
            transform: none;
          }
          .process-kicker-figma { font-size: 14px; margin-bottom: 10px; }
          .process-title-figma { font-size: clamp(28px, 4vw, 36px); line-height: 1.2; width: 100%; margin-bottom: 14px; }
          .process-desc-figma { font-size: 15px; line-height: 1.55; width: 100%; max-width: none; margin: 0 auto; }
          .process-card-peek-left-figma,
          .process-card-peek-right-figma {
            display: none !important;
          }
          .process-cards-container {
            position: relative;
            left: auto;
            top: auto;
            transform: none;
            width: 100%;
            max-width: 380px;
            height: 440px;
            margin: 0 auto;
          }
          .process-giant-number-wrap {
            display: none !important;
          }
          .process-mobile-nav {
            display: flex !important;
            align-items: center;
            justify-content: center;
            gap: 18px;
            margin-top: 24px;
            z-index: 12;
            position: relative;
            pointer-events: auto;
          }
          .process-mobile-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.22);
            background: rgba(255, 255, 255, 0.08);
            color: #FFFFFF;
            cursor: pointer;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            transition: all 0.2s ease;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
            pointer-events: auto;
          }
          .process-mobile-arrow:hover,
          .process-mobile-arrow:active {
            background: rgba(140, 103, 254, 0.35);
            border-color: rgba(160, 120, 255, 0.65);
            transform: scale(1.08);
            box-shadow: 0 0 16px rgba(140, 103, 254, 0.4);
          }
          .process-mobile-dots {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .process-mobile-dot {
            width: 8px;
            height: 8px;
            border-radius: 4px;
            border: none;
            background: rgba(255, 255, 255, 0.3);
            cursor: pointer;
            padding: 0;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .process-mobile-dot.is-active {
            width: 26px;
            background: linear-gradient(90deg, #9D7BFF 0%, #795CFF 100%);
            box-shadow: 0 0 12px rgba(157, 123, 255, 0.7);
          }
        }

        @media (max-width: 860px) {
          .home-hero { height: 640px; }
          .hero-title-container { top: 168px; }
          .title-line-1,
          .title-line-2 { font-size: clamp(34px, 8.5vw, 60px); }
          .trusted-strip { min-height: 92px; padding-bottom: 27px; }
          .trusted-label { margin-bottom: 14px; font-size: 9px; }
          .trusted-group { gap: 28px; padding-right: 28px; padding-left: 0; }
          .trusted-company { font-size: 14px; }
          .about-section { min-height: auto; padding: 36px 20px 56px; }
          .about-eyebrow { height: 38px; padding: 0 20px; font-size: 13px; }
          .about-heading-br { display: none; }
          .about-heading { margin: 20px auto 28px; font-size: clamp(26px, 6vw, 36px); line-height: 1.2; max-width: 540px; }
          .about-mosaic { flex-direction: column; gap: 16px; max-width: 560px; width: 100%; margin: 0 auto; }
          .about-mosaic-main { gap: 16px; width: 100%; }
          .about-row { flex-direction: column; height: auto; gap: 16px; width: 100%; }
          .about-tile { min-height: 210px; width: 100%; border-radius: 20px; }
          .about-future {
            width: 100%;
            height: 215px;
            min-height: 215px;
          }
          .about-future .tile-content {
            padding: 28px 0 0 calc(49 / 603 * 100%);
            justify-content: flex-start;
            align-items: flex-start;
          }
          .about-future .about-percent {
            font-size: clamp(16px, 3.5vw, 19px);
            margin-bottom: 3px;
          }
          .about-future h3 {
            font-size: clamp(18px, 4vw, 21px);
          }
          .about-code { min-height: 200px; }
          .about-paper { min-height: 200px; }
          .about-engineers { min-height: 220px; }
          .about-engineers .tile-content { padding: 24px 20px; }
          .about-engineers h3 { font-size: 19px; line-height: 1.35; }
          .about-engineers p { font-size: 13px; line-height: 1.45; margin-top: 8px; }
          .about-analytics { width: 100%; min-height: 280px; flex: auto; border-radius: 20px; }
        }

        @media (max-width: 560px) {
          .home-hero { height: 600px; }
          .hero-title-container { top: 148px; }
          .title-line-1,
          .title-line-2 { font-size: clamp(28px, 9vw, 46px); }
          .about-section { padding: 28px 16px 44px; }
          .about-eyebrow { height: 36px; padding: 0 18px; font-size: 12.5px; }
          .about-heading { margin: 16px auto 22px; font-size: clamp(22px, 6.8vw, 28px); line-height: 1.22; }
          .about-mosaic { gap: 14px; }
          .about-mosaic-main { gap: 14px; }
          .about-row { gap: 14px; }
          .about-tile { min-height: 180px; border-radius: 18px; }
          .about-future {
            width: 100%;
            height: 195px;
            min-height: 195px;
          }
          .about-future .tile-content {
            padding: 22px 0 0 calc(49 / 603 * 100%);
            justify-content: flex-start;
            align-items: flex-start;
          }
          .about-future .about-percent { font-size: 16px; margin-bottom: 2px; }
          .about-future h3 { font-size: 18px; }
          .about-code { min-height: 170px; }
          .about-paper { min-height: 170px; }
          .about-engineers { min-height: 200px; }
          .about-engineers .tile-content { padding: 20px 16px; }
          .about-engineers h3 { font-size: 17px; line-height: 1.3; }
          .about-engineers p { font-size: 12px; line-height: 1.42; margin-top: 6px; }
          .about-analytics { min-height: 220px; border-radius: 18px; }

          .process-section {
            padding: 44px 16px 52px;
          }
          .process-title-figma { font-size: 25px; line-height: 31px; }
          .process-desc-figma { font-size: 13.5px; line-height: 20px; }
          .process-cards-container {
            max-width: 320px;
            height: 410px;
          }
          .process-mobile-nav {
            margin-top: 18px;
            gap: 14px;
          }
          .process-mobile-arrow {
            width: 38px;
            height: 38px;
          }
        }

        @media (max-width: 380px) {
          .home-hero { height: 560px; }
          .hero-title-container { top: 128px; }
          .title-line-1,
          .title-line-2 { font-size: clamp(24px, 8.5vw, 36px); }
          .about-section { padding: 24px 12px 38px; }
          .about-eyebrow { height: 34px; padding: 0 14px; font-size: 11.5px; }
          .about-heading { font-size: 21px; margin: 14px auto 18px; }
          .about-tile { min-height: 160px; border-radius: 14px; }
          .about-future {
            width: 100%;
            height: 175px;
            min-height: 175px;
          }
          .about-future .tile-content {
            padding: 16px 0 0 calc(49 / 603 * 100%);
            justify-content: flex-start;
            align-items: flex-start;
          }
          .about-future .about-percent { font-size: 14px; margin-bottom: 2px; }
          .about-future h3 { font-size: 16px; }
          .about-engineers { min-height: 185px; }
          .about-engineers .tile-content { padding: 16px 14px; }
          .about-engineers h3 { font-size: 16px; }
          .about-engineers p { font-size: 11.5px; }
          .about-analytics { min-height: 200px; border-radius: 14px; }

          .process-title-figma { font-size: 22px; line-height: 28px; }
          .process-cards-container {
            max-width: 290px;
            height: 390px;
          }
          .process-giant-number {
            font-size: 58px;
          }
        }

      `}</style>

      <section className="home-hero" aria-label="Gelora Tech hero">
        <Header activeTab="Home" />

        {/* ── Desktop: Canvas fan cards (clipped inside hero) ── */}
        <div className="home-hero-canvas">
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

            {/* 5 Glass Fan Cards — desktop only */}
            {CARDS_DATA.map((card) => (
              <div key={card.id} className={`home-glass-card ${card.className}`}>
                <div className="card-icon-wrap">{card.icon}</div>
                <h3 className="card-title-txt">{card.title}</h3>
                <p className="card-desc-txt">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile/Tablet: Carousel cards ── */}
        <div className="hero-carousel" aria-label="Service cards carousel">
          {/* Headline duplicated for mobile layout */}
          <div className="hero-title-container" style={{ position: "relative", top: "auto", left: "auto", transform: "none", marginBottom: "28px", width: "100%" }}>
            <span className="title-line-1">Digital Solutions</span>
            <span className="title-line-2">That Drive Growth</span>
          </div>

          {/* Card track */}
          <div className="hero-carousel-track" role="region" aria-live="polite">
            {CARDS_DATA.map((card, i) => (
              <div
                key={card.id}
                className={`hero-carousel-card ${i === carouselIdx ? "active" :
                  i === (carouselIdx - 1 + CARDS_DATA.length) % CARDS_DATA.length ? "prev-card" : ""
                  }`}
                aria-hidden={i !== carouselIdx}
              >
                <div className="card-icon-wrap">{card.icon}</div>
                <h3 className="card-title-txt" style={{ fontSize: "20px", lineHeight: "26px", marginBottom: "10px" }}>{card.title}</h3>
                <p className="card-desc-txt" style={{ fontSize: "14px", maxWidth: "none" }}>{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Arrows + Dots */}
          <div className="hero-carousel-arrows">

            <div className="hero-carousel-dots" role="tablist" aria-label="Card indicators">
              {CARDS_DATA.map((card, i) => (
                <button
                  key={card.id}
                  type="button"
                  role="tab"
                  aria-selected={i === carouselIdx}
                  aria-label={`Go to card ${i + 1}`}
                  className={`hero-carousel-dot ${i === carouselIdx ? "active" : ""}`}
                  onClick={() => { setCarouselIdx(i); resetCarouselTimer(); }}
                />
              ))}
            </div>

          </div>
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
          We turn complex ideas into{" "}
          <br className="about-heading-br" />
          <span className="about-heading-accent">digital experiences</span>{" "}
          <br className="about-heading-br" />
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

      {/* ── Process Section ("How We Work") ── */}
      <section
        ref={sectionRef}
        className={`process-section slide-${slideDir}`}
        id="process"
        aria-label="How we work process"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Ellipse 12 Background Glow */}
        <div className="process-ellipse-12" aria-hidden="true" />

        {/* Left Intro Block (visible on Step 01, fades when activeStepIndex > 0) */}
        <div className={`process-intro-block ${activeStepIndex > 0 ? "is-hidden" : ""}`}>
          <p className="process-kicker-figma">HOW WE WORK</p>
          <h2 id="process-heading" className="process-title-figma">
            From idea<br />
            to <span className="process-title-accent">impact.</span>
          </h2>
          <p className="process-desc-figma">
            A thoughtful process that turns your vision into scalable digital experiences built for growth
          </p>
        </div>

        {/* Left Peek Card (Rectangle 178) - visible on step 02, 03, 04 */}
        <div
          key={`peek-left-${activeStepIndex}`}
          className={`process-card-peek-left-figma ${activeStepIndex > 0 ? "is-visible" : ""} slide-${slideDir}`}
          onClick={() => {
            if (activeStepIndex > 0) goToStep(activeStepIndex - 1);
          }}
          role="button"
          tabIndex={activeStepIndex > 0 ? 0 : -1}
          aria-label="Previous step"
        />

        {/* Right Peek Card (Rectangle 177) - visible on step 01, 02, 03 */}
        <div
          key={`peek-right-${activeStepIndex}`}
          className={`process-card-peek-right-figma ${activeStepIndex < totalSteps - 1 ? "is-visible" : ""} slide-${slideDir}`}
          onClick={() => {
            if (activeStepIndex < totalSteps - 1) goToStep(activeStepIndex + 1);
          }}
          role="button"
          tabIndex={activeStepIndex < totalSteps - 1 ? 0 : -1}
          aria-label="Next step"
        />

        {/* Giant Step Number: "01", "02", "03", "04" (Desktop bottom-left) */}
        <div className="process-giant-number-wrap">
          <div className="process-giant-number-stage">
            {PROCESS_STEPS.map((s, idx) => (
              <span
                key={s.step}
                className={`process-giant-number ${idx === activeStepIndex ? "is-active"
                  : idx < activeStepIndex ? "is-hidden-up"
                    : "is-hidden-down"
                  }`}
                aria-hidden={idx !== activeStepIndex}
              >
                {s.step}
              </span>
            ))}
          </div>
        </div>

        {/* Center Card Stack (Rectangle 176) */}
        <div className="process-cards-container">
          {PROCESS_STEPS.map((step, idx) => (
            <article
              key={step.step}
              className={`process-center-card ${idx === activeStepIndex ? "is-active"
                : idx < activeStepIndex ? "is-passed"
                  : "is-incoming"
                }`}
              onClick={() => goToStep(idx)}
              role="button"
              tabIndex={0}
              aria-label={`Step ${step.step}: ${step.title}`}
              aria-hidden={idx !== activeStepIndex}
            >
              <div className="process-center-card-img-wrap">
                <Image
                  className={`process-card-image ${step.imgClass}`}
                  src={step.image}
                  alt={step.alt}
                  width={480}
                  height={350}
                  priority={idx === 0}
                />
              </div>
              <div className="process-center-card-body">
                <h3 className="process-card-title">{step.title}</h3>
                <p className="process-card-desc">
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

        {/* Mobile & Tablet Navigation Controls: Below the Card */}
        <div className="process-mobile-nav" aria-label="Process steps navigation">

          <div className="process-mobile-dots" role="tablist" aria-label="Process steps">
            {PROCESS_STEPS.map((s, idx) => (
              <button
                key={s.step}
                type="button"
                role="tab"
                aria-selected={idx === activeStepIndex}
                aria-label={`Step ${s.step}: ${s.title}`}
                className={`process-mobile-dot ${idx === activeStepIndex ? "is-active" : ""}`}
                onClick={() => handleProcessSelect(idx)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ── Content Below Process Section: CTA Section & Footer ── */}
      <Footer />
    </main>
  );
}
