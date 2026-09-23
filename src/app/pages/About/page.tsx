"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Footer from "@/app/components/Footer";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      marquee: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        direction?: "left" | "right" | "up" | "down";
        scrollamount?: string | number;
        behavior?: string;
      };
    }
  }
}

interface StoryCardItem {
  num: string;
  titleLine1: string;
  titleLine2: string;
  desc: string;
  isOffset?: boolean;
}

const STORY_CARDS: StoryCardItem[] = [
  {
    num: "01",
    titleLine1: "It started with a",
    titleLine2: "gap",
    desc: "Great ideas deserved better than software that only looked good.",
    isOffset: false,
  },
  {
    num: "02",
    titleLine1: "Growth revealed",
    titleLine2: "problems",
    desc: "As businesses grew, their systems became harder to manage and scale.",
    isOffset: true,
  },
  {
    num: "03",
    titleLine1: "The pattern",
    titleLine2: "repeated",
    desc: "We saw the same challenges appear across different products and teams.",
    isOffset: false,
  },
  {
    num: "04",
    titleLine1: "We saw the real",
    titleLine2: "issue",
    desc: "The problem wasn't just the software — it was how it was built.",
    isOffset: true,
  },
  {
    num: "05",
    titleLine1: "Gelora took",
    titleLine2: "shape",
    desc: "So we set out to build scalable technology designed for long-term growth.",
    isOffset: false,
  },
];

interface ValueCardItem {
  num: string;
  title: string;
  desc: string;
}

const VALUES_DATA: ValueCardItem[] = [
  {
    num: "01",
    title: "Honest Communication",
    desc: "We communicate clearly, set realistic expectations, and stay transparent throughout every stage of the journey.",
  },
  {
    num: "02",
    title: "Built for Longevity",
    desc: "We create scalable systems designed to evolve with your business and deliver value for years to come.",
  },
  {
    num: "03",
    title: "Ownership Mindset",
    desc: "We take responsibility for every solution we build, from the smallest detail to its long-term performance.",
  },
  {
    num: "04",
    title: "Practical Engineering",
    desc: "We focus on solving real problems with thoughtful technology, without adding unnecessary complexity.",
  },
  {
    num: "05",
    title: "Long-Term Partnerships",
    desc: "We believe great work continues beyond delivery, building relationships that grow alongside your business.",
  },
  {
    num: "06",
    title: "Attention to Detail",
    desc: "We believe every detail matters, creating polished, reliable experiences that make a lasting impact.",
  },
];

const TECH_ROW_1 = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "JavaScript",
  "Tailwind CSS",
  "HTML5",
  "CSS3",
];

const TECH_ROW_2 = [
  "Flutter",
  "React Native",
  "iOS",
  "Android",
  "Firebase",
  "Swift",
  "Kotlin",
];

const TECH_ROW_3 = [
  "AWS",
  "Cloud Computing",
  "Python",
  "AI Automation",
  "Machine Learning",
  "Cybersecurity",
  "API Integration",
  "DevOps",
];

export default function AboutPage() {
  const storyCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = storyCardsRef.current;
    if (!container) return;
    if (window.innerWidth > 1100) return; // only on mobile/tablet

    const cards = container.querySelectorAll<HTMLElement>(".story-card");
    cards.forEach((card) => card.classList.add("story-card-mobile-reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = (parseInt(el.dataset.cardIdx || "0")) * 80;
            setTimeout(() => el.classList.add("revealed"), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card, idx) => {
      card.dataset.cardIdx = String(idx);
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="about-main">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&display=swap');

        .about-main {
          min-height: 100vh;
          width: 100%;
          background: #080415;
          position: relative;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* Ambient Glow Backgrounds */
        .about-bg-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(1400px, 100vw);
          height: 850px;
          background: radial-gradient(
            ellipse 65% 55% at 50% 30%,
            rgba(100, 60, 210, 0.28) 0%,
            rgba(45, 20, 110, 0.18) 45%,
            rgba(8, 4, 21, 0) 75%
          );
          pointer-events: none;
          z-index: 1;
        }

        .about-bg-glow-bottom {
          position: absolute;
          bottom: 180px;
          left: 50%;
          transform: translateX(-50%);
          width: min(900px, 90vw);
          height: 380px;
          background: radial-gradient(
            ellipse 60% 40% at 50% 60%,
            rgba(116, 79, 231, 0.22) 0%,
            transparent 70%
          );
          filter: blur(40px);
          pointer-events: none;
          z-index: 1;
        }

        /* Hero Container */
        .about-hero-section {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: clamp(135px, 15vh, 148px) clamp(20px, 4vw, 56px) clamp(30px, 5vh, 50px);
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
        }

        /* Title matching Services page typography */
        .about-title {
          margin: 0;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: clamp(26px, 3vw, 60px);
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: #FFFFFF;
        }

        .about-title-line1 {
          color: #FFFFFF;
        }

        .about-title-line2 {
          margin-top: clamp(4px, 0.8vh, 8px);
          background: linear-gradient(90deg, #FFFFFF 0%, #E2D7FC 20%, #B69AFA 46%, #8860F2 72%, #6234E2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
        }

        /* Description */
        .about-desc {
          margin: 18px auto 0;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: clamp(13px, 1.2vw, 17px);
          line-height: 1.6;
          color: #FFFFFF;
          text-align: center;
          max-width: 640px;
          opacity: 0.92;
          position: relative;
          z-index: 5;
           animation: careersFadeUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;         
        }

        .about-desc-br {
          display: block;
        }

        /* Central Graphic Wrapper */
        .about-graphic-container {
          position: relative;
          width: 100%;
          max-width: 1420px;
          margin-top: clamp(-290px, -11.5vw, -120px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
        }

        .about-img {
          width: 100%;
          max-width: 1260px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 15px 50px rgba(116, 79, 231, 0.32));
          user-select: none;
          pointer-events: none;
        }

        /* ─────────────────────────────────────────────────────────────
         * SECTION 2: OUR STORY (Pixel-perfect matching to Figma & Image)
         * ───────────────────────────────────────────────────────────── */
        .story-section {
          position: relative;
          width: 100%;
          background: #EEEAFB;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
          padding-bottom: 172px;
        }

        .story-header-content {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: clamp(72px, 9vh, 108px) clamp(20px, 4vw, 40px) 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-sizing: border-box;
        }

        /* Figma: font-size 60px, line-height 72px, color #744FE7 */
        .story-title {
          margin: 0 0 clamp(16px, 2.2vh, 24px) 0;
          font-family: 'Inter', sans-serif;
          font-size: clamp(24px, 4vw, 52px);
          line-height: clamp(36px, 6vw, 66px);
          text-align: center;
          color: #744FE7;
          max-width: 930px;
          letter-spacing: -0.02em;
        }
        .story-title-bold {
          font-weight: 700;
          color: #744FE7;
        }
        .story-title-italic {
          font-style: italic;
          font-weight: 300;
          color: #744FE7;
        }

        /* Figma: width 936.7px, color #271B54, transform: rotate(-0.13deg) */
        .story-desc {
          margin: 0 auto;
          max-width: 936.7px;
          width: 100%;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(12px, 1.30vw, 17px);
          line-height: clamp(23px, 2.1vw, 32px);
          text-align: center;
          color: #271B54;
          letter-spacing: -0.02em;
          transform: rotate(-0.13deg);
        }
        .story-desc-br {
          display: block;
        }

        @keyframes storyBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }

        /* Figma: width 303px, height 59px, background #271B54, border-radius 54px */
        .story-btn {
          box-sizing: border-box;
          width: min(303px, 88vw);
          height: 59px;
          background: #271B54;
          border-radius: 54px;
          border: none;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 13.5px;
          letter-spacing: 0.14em;
          color: #FFFFFF;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 8px 24px rgba(39, 27, 84, 0.24);
          margin-bottom: clamp(64px, 8.5vh, 92px);
          margin-top: 50px;
          text-transform: uppercase;
        }
        .story-btn:hover {
          background: #1c133e;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(39, 27, 84, 0.36);
        }

        /* Cards Wrapper overlapping white section above */
        .story-cards-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: -172px;
          z-index: 2;
        }

        /* 5-Card Centered Row */
        .story-cards-grid {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1440px;
          display: grid;
          grid-template-columns: repeat(5, minmax(210px, 263px));
          justify-content: center;
          gap: clamp(14px, 1.7vw, 24px);
          padding: 0 clamp(16px, 2vw, 32px) clamp(60px, 8vh, 100px);
          box-sizing: border-box;
          align-items: start;
        }

        /* Figma: width 263px, height 288px, border-radius 20px, blur 11px */
        .story-card {
          box-sizing: border-box;
          width: 100%;
          max-width: 243px;
          min-height: 238px;
          background: linear-gradient(111.68deg, rgba(249, 244, 244, 0.48) 7.59%, rgba(114, 81, 214, 0.48) 102.04%);
          border: 0.1px solid #9e97c9ff;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 20px;
          padding: 26px 22px 26px 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 10px 30px rgba(112, 87, 245, 0.16);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .story-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 46px rgba(112, 87, 245, 0.28);
        }

        /* Staggered cards (Cards 02 and 04) offset down into the dark background */
        .story-card-offset {
          margin-top: 148px;
        }
        .story-card-offset:hover {
          transform: translateY(-6px);
        }

        .story-card-top {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .story-card-num {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 18px;
          line-height: 1.2;
          color: #271B54;
          margin-bottom: 8px;
          display: block;
        }

        .story-card-title {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 20px;
          line-height: 1.25;
          color: #271B54;
          margin: 0;
          letter-spacing: -0.015em;
        }

        .story-card-desc {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.92);
          margin: 0;
          padding-top: 20px;
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .story-section {
            padding-bottom: 140px;
          }
          .story-cards-wrapper {
            margin-top: -140px;
          }
          .story-cards-grid {
            display: flex;
            justify-content: flex-start;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding: 0 24px clamp(60px, 10vh, 100px);
            gap: 16px;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .story-cards-grid::-webkit-scrollbar {
            display: none;
          }
          .story-card {
            flex: 0 0 250px;
            scroll-snap-align: center;
          }
          .story-card-offset {
            margin-top: 50px;
          }
          .story-card-offset:hover {
            transform: translateY(-6px);
          }

          /* Slide-up reveal animation on mobile */
          .story-card-mobile-reveal {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
            transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .story-card-mobile-reveal.revealed {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 768px) {
          .story-section {
            padding-bottom: 120px;
          }
          .story-cards-wrapper {
            margin-top: -120px;
          }
          .about-hero-section {
            padding-top: 100px;
            padding-bottom: 40px;
          }
          .about-desc {
            font-size: 13.5px;
            line-height: 1.55;
            padding: 0 12px;
          }
          .about-desc-br {
            display: inline;
          }
          .about-graphic-container {
            margin-top: -24px;
          }
          .story-header-content {
            padding-top: 52px;
          }
          .story-title {
            font-size: 32px;
            line-height: 1.22;
          }
          .story-desc {
            font-size: 15px;
            line-height: 1.6;
            padding: 0 16px;
          }
          .story-desc-br {
            display: inline;
          }
          .story-btn {
            width: 260px;
            height: 52px;
            font-size: 12.5px;
            margin-bottom: 48px;
          }
          .story-card {
            width: 240px;
            min-height: 270px;
          }
          .story-card-offset {
            margin-top: 36px;
          }
        }

        /* ══════════════════════════════════════════════════════════
           SECTION 3: THE VALUES BEHIND OUR WORK
           ══════════════════════════════════════════════════════════ */
        .values-section {
          position: relative;
          background: #080415 url('/asset/bg.png') top center / cover no-repeat;
          padding: 0 clamp(20px, 3.5vw, 56px) clamp(100px, 14vh, 160px);
          overflow: visible;
          z-index: 2;
        }

        /* Figma: font-weight 700, font-size 60px, line-height 72px, color #FFFFFF */
        .values-title {
          margin: 0 auto clamp(48px, 6.5vh, 76px);
          max-width: 540px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(26px, 4vw, 56px);
          line-height: clamp(38px, 5.1vw, 72px);
          text-align: center;
          color: #FFFFFF;
          letter-spacing: -0.02em;
        }
        .values-title-bold {
          font-weight: 650;
          color: #FFFFFF;
        }
        .values-title-italic {
          font-family: 'Inter', sans-serif;
          font-style: italic;
          font-weight: 300;
          color: #FFFFFF;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(260px, 315px));
          gap: clamp(20px, 2.3vw, 32px);
          justify-content: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Rectangle 209: width 315px, height 315px, background #E0D5FF, border-radius 21px */
        .values-card {
          box-sizing: border-box;
          width: 100%;
          max-width: 310px;
          min-height: 260px;
          background: #E0D5FF;
          border-radius: 21px;
          padding: 28px 24px 24px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          transition: transform 0.28s ease, box-shadow 0.28s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          cursor: default;
        }
        .values-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 42px rgba(116, 79, 231, 0.26);
        }

        .values-card-header {
          margin-bottom: 22px;
        }

        /* 01 Honest Communication: font-size 22px, line-height 35px, color #271B54 */
        .values-card-num {
          display: block;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 600;
          font-size: clamp(19px, 1.55vw, 22px);
          line-height: 1.35;
          color: #271B54;
          transform: rotate(-0.13deg);
          margin-bottom: 4px;
        }

        .values-card-title {
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 600;
          font-size: clamp(19px, 1.55vw, 22px);
          line-height: 1.35;
          color: #271B54;
          margin: 0;
          transform: rotate(-0.13deg);
        }

        /* We communicate clearly... font-size 18px, line-height 26px, color #1A123B */
        .values-card-desc {
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(15px, 1.25vw, 18px);
          line-height: clamp(23px, 1.8vw, 26px);
          color: #1A123B;
          margin: 0;
          transform: rotate(-0.13deg);
        }

        /* Sparkle graphic cell between cards */
        .values-sparkle-cell {
          width: 100%;
          max-width: 310px;
          min-height: 260px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .values-sparkle-img {
          width: 100%;
          height: 100%;
          max-width: 290px;
          max-height: 260px;
          object-fit: contain;
          opacity: 0.95;
          filter: drop-shadow(0 0 18px rgba(116, 79, 231, 0.42));
          animation: sparkleFloat 4s ease-in-out infinite alternate;
        }

        @keyframes sparkleFloat {
          0% {
            transform: translateY(0) scale(1);
          }
          100% {
            transform: translateY(-8px) scale(1.03);
          }
        }

        @media (max-width: 1240px) {
          .values-grid {
            grid-template-columns: repeat(4, minmax(210px, 1fr));
            gap: 16px;
          }
          .values-card {
            min-height: 245px;
            padding: 22px 18px;
          }
          .values-sparkle-cell {
            min-height: 245px;
          }
          .values-sparkle-img {
            max-width: 220px;
            max-height: 220px;
          }
        }

        @media (max-width: 992px) {
          .values-grid {
            grid-template-columns: repeat(2, minmax(260px, 340px));
            gap: 22px;
          }
          .values-sparkle-cell {
            display: none;
          }
          .values-card {
            max-width: 100%;
            min-height: auto;
          }
        }

        @media (max-width: 600px) {
          .values-grid {
            grid-template-columns: minmax(260px, 100%);
            gap: 16px;
            padding: 0 4px;
          }
          .values-title {
            font-size: 32px;
            line-height: 1.25;
            margin-bottom: 36px;
          }
          .values-card {
            padding: 24px 20px;
          }
        }

        /* ══════════════════════════════════════════════════════════
           SEAMLESS CONTINUOUS INFINITE TECH MARQUEE
           ══════════════════════════════════════════════════════════ */
        .tech-marquee-section {
          margin-top: clamp(82px, 20vh, 134px);
          padding-bottom: clamp(64px, 9vh, 112px);
          display: flex;
          flex-direction: column;
          gap: clamp(34px, 4.4vh, 52px);
          overflow: hidden;
          width: 100%;
        }

        .tech-marquee-row {
          width: 100%;
          overflow: hidden;
          display: flex;
          position: relative;
          user-select: none;
        }

        .tech-marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }

        .tech-marquee-track-right {
          animation: marqueeScrollRight 82s linear infinite;
        }

        .tech-marquee-track-left {
          animation: marqueeScrollLeft 82s linear infinite;
        }

        /* Row 2 has 7 items (vs 8 in rows 1 & 3), so its track is 7/8 as wide.
           Use 7/8 × 82s ≈ 72s so all rows move at identical pixel-per-second speed. */
        .tech-marquee-track-left-row2 {
          animation: marqueeScrollLeft 102s linear infinite;
        }

        .tech-marquee-row:hover .tech-marquee-track {
          animation-play-state: paused;
        }

        @keyframes marqueeScrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeScrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .tech-marquee-content {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          white-space: nowrap;
        }

        .tech-marquee-group {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* Scaled down, refined typography matching Image 1 */
        .tech-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-right: clamp(48px, 5.2vw, 84px);
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(13px, 1,10vw, 17px);
          line-height: 1.35;
          color: #E0D5FF;
          white-space: nowrap;
          letter-spacing: -0.01em;
          transition: color 0.2s ease;
        }
        .tech-marquee-item:hover {
          color: #FFFFFF;
        }

        /* Star icon cleanly paired with content */
        .tech-item-star {
          margin: 0;
          color: #E0D5FF;
          font-size: clamp(10px, 0.85vw, 13px);
          opacity: 0.92;
          display: inline-block;
          transform: translateY(-0.5px);
          flex-shrink: 0;
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="about-bg-glow" aria-hidden="true" />
      <div className="about-bg-glow-bottom" aria-hidden="true" />

      {/* Main Hero Content */}
      <section className="about-hero-section" aria-label="About Gelora Tech Hero">
        {/* Heading */}
        <h1 className="about-title">
          <span className="about-title-line1">Build around ideas.</span>
          <span className="about-title-line2">Designed for impact.</span>
        </h1>

        {/* Subtitle / Description */}
        <p className="about-desc">
          We bring together strategy, design,
          <br className="about-desc-br" />
          and technology to build digital solutions that grow with your business.
        </p>

        {/* Wide glowing graphic from asset/aboutImg.png */}
        <div className="about-graphic-container">
          <Image
            src="/asset/aboutImg.png"
            alt="Gelora Tech strategy, design, technology and growth framework"
            width={1376}
            height={768}
            priority
            className="about-img"
          />
        </div>
      </section>

      {/* SECTION 2: OUR STORY */}
      <section className="story-section" aria-label="Our Story">
        <div className="story-header-content">
          {/* Main Title */}
          <h2 className="story-title">
            <span className="story-title-bold">Behind every </span>
            <span className="story-title-italic">great idea,</span>
            <br />
            <span className="story-title-bold">there’s a </span>
            <span className="story-title-italic">story waiting to be built.</span>
          </h2>

          {/* Subtitle */}
          <p className="story-desc">
            At Gelora Tech, we bring curiosity, creativity, and technology together to turn ideas into
            <br className="story-desc-br" />
            digital experiences that create real impact.
          </p>
          {/* Action Button */}
          <button type="button" className="story-btn">
            DISCOVER OUR STORY
          </button>
        </div>
      </section>

      {/* SECTION 3: THE VALUES BEHIND OUR WORK & OUR STORY CARDS (Unified on /asset/bg.png) */}
      <section className="values-section" aria-label="Our Values">
        {/* Staggered Cards overlapping white section above */}
        <div className="story-cards-wrapper">
          {/* 5 Cards Row - Centered and evenly spaced */}
          <div className="story-cards-grid" ref={storyCardsRef}>
            {STORY_CARDS.map((card) => (
              <div
                key={card.num}
                data-slide
                className={`story-card ${card.isOffset ? "story-card-offset" : ""}`}
              >
                <div className="story-card-top">
                  <span className="story-card-num">
                    {card.num}
                  </span>
                  <h3 className="story-card-title">
                    {card.titleLine1}
                    <br />
                    {card.titleLine2}
                  </h3>
                </div>
                <p className="story-card-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <h2 className="values-title">
          <span className="values-title-bold">The </span>
          <span className="values-title-italic">values</span>
          <br />
          <span className="values-title-bold">behind our work</span>
        </h2>

        <div className="values-grid">
          {/* Row 1: Card 01 */}
          <div className="values-card">
            <div className="values-card-header">
              <span className="values-card-num">{VALUES_DATA[0].num}</span>
              <h3 className="values-card-title">{VALUES_DATA[0].title}</h3>
            </div>
            <p className="values-card-desc">{VALUES_DATA[0].desc}</p>
          </div>

          {/* Row 1: Sparkle graphic */}
          <div className="values-sparkle-cell" aria-hidden="true">
            <Image
              src="/asset/sparkleImg.png"
              alt=""
              width={290}
              height={260}
              className="values-sparkle-img"
            />
          </div>

          {/* Row 1: Card 02 */}
          <div className="values-card">
            <div className="values-card-header">
              <span className="values-card-num">{VALUES_DATA[1].num}</span>
              <h3 className="values-card-title">{VALUES_DATA[1].title}</h3>
            </div>
            <p className="values-card-desc">{VALUES_DATA[1].desc}</p>
          </div>

          {/* Row 1: Card 03 */}
          <div className="values-card">
            <div className="values-card-header">
              <span className="values-card-num">{VALUES_DATA[2].num}</span>
              <h3 className="values-card-title">{VALUES_DATA[2].title}</h3>
            </div>
            <p className="values-card-desc">{VALUES_DATA[2].desc}</p>
          </div>

          {/* Row 2: Card 04 */}
          <div className="values-card">
            <div className="values-card-header">
              <span className="values-card-num">{VALUES_DATA[3].num}</span>
              <h3 className="values-card-title">{VALUES_DATA[3].title}</h3>
            </div>
            <p className="values-card-desc">{VALUES_DATA[3].desc}</p>
          </div>

          {/* Row 2: Card 05 */}
          <div className="values-card">
            <div className="values-card-header">
              <span className="values-card-num">{VALUES_DATA[4].num}</span>
              <h3 className="values-card-title">{VALUES_DATA[4].title}</h3>
            </div>
            <p className="values-card-desc">{VALUES_DATA[4].desc}</p>
          </div>

          {/* Row 2: Sparkle graphic */}
          <div className="values-sparkle-cell" aria-hidden="true">
            <Image
              src="/asset/sparkleImg.png"
              alt=""
              width={290}
              height={260}
              className="values-sparkle-img"
            />
          </div>

          {/* Row 2: Card 06 */}
          <div className="values-card">
            <div className="values-card-header">
              <span className="values-card-num">{VALUES_DATA[5].num}</span>
              <h3 className="values-card-title">{VALUES_DATA[5].title}</h3>
            </div>
            <p className="values-card-desc">{VALUES_DATA[5].desc}</p>
          </div>
        </div>

        {/* TECH STACK MARQUEE: 3 ROWS (RIGHT, LEFT, RIGHT) - SEAMLESS CONTINUOUS */}
        <div className="tech-marquee-section" aria-label="Technologies and Skills">
          {/* Row 1: Right direction */}
          <div className="tech-marquee-row">
            <div className="tech-marquee-track tech-marquee-track-right">
              <div className="tech-marquee-content">
                {Array.from({ length: 4 }).map((_, rIdx) => (
                  <span key={rIdx} className="tech-marquee-group">
                    {TECH_ROW_1.map((tech, idx) => (
                      <span key={idx} className="tech-marquee-item">
                        <span className="tech-item-star" aria-hidden="true">✦</span>
                        <span className="tech-item-text">{tech}</span>
                      </span>
                    ))}
                  </span>
                ))}
              </div>
              <div className="tech-marquee-content" aria-hidden="true">
                {Array.from({ length: 4 }).map((_, rIdx) => (
                  <span key={rIdx} className="tech-marquee-group">
                    {TECH_ROW_1.map((tech, idx) => (
                      <span key={idx} className="tech-marquee-item">
                        <span className="tech-item-star" aria-hidden="true">✦</span>
                        <span className="tech-item-text">{tech}</span>
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Left direction */}
          <div className="tech-marquee-row">
            <div className="tech-marquee-track tech-marquee-track-left-row2">
              <div className="tech-marquee-content">
                {Array.from({ length: 4 }).map((_, rIdx) => (
                  <span key={rIdx} className="tech-marquee-group">
                    {TECH_ROW_2.map((tech, idx) => (
                      <span key={idx} className="tech-marquee-item">
                        <span className="tech-item-star" aria-hidden="true">✦</span>
                        <span className="tech-item-text">{tech}</span>
                      </span>
                    ))}
                  </span>
                ))}
              </div>
              <div className="tech-marquee-content" aria-hidden="true">
                {Array.from({ length: 4 }).map((_, rIdx) => (
                  <span key={rIdx} className="tech-marquee-group">
                    {TECH_ROW_2.map((tech, idx) => (
                      <span key={idx} className="tech-marquee-item">
                        <span className="tech-item-star" aria-hidden="true">✦</span>
                        <span className="tech-item-text">{tech}</span>
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Right direction */}
          <div className="tech-marquee-row">
            <div className="tech-marquee-track tech-marquee-track-right">
              <div className="tech-marquee-content">
                {Array.from({ length: 4 }).map((_, rIdx) => (
                  <span key={rIdx} className="tech-marquee-group">
                    {TECH_ROW_3.map((tech, idx) => (
                      <span key={idx} className="tech-marquee-item">
                        <span className="tech-item-star" aria-hidden="true">✦</span>
                        <span className="tech-item-text">{tech}</span>
                      </span>
                    ))}
                  </span>
                ))}
              </div>
              <div className="tech-marquee-content" aria-hidden="true">
                {Array.from({ length: 4 }).map((_, rIdx) => (
                  <span key={rIdx} className="tech-marquee-group">
                    {TECH_ROW_3.map((tech, idx) => (
                      <span key={idx} className="tech-marquee-item">
                        <span className="tech-item-star" aria-hidden="true">✦</span>
                        <span className="tech-item-text">{tech}</span>
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
