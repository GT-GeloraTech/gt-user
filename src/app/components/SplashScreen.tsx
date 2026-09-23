"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "./Header";

interface SplashScreenProps {
  onComplete?: () => void;
}

// Stage 1 to 4: Initial ring formation pixel IDs
const STAGE_1_PIXELS = ["154", "159", "160", "161", "162", "163", "155", "156"] as const;
const STAGE_2_PIXELS = ["164", "165", "166", "167"] as const;
const STAGE_3_PIXELS = ["168", "169", "170", "171"] as const;
const STAGE_4_PIXELS = ["172", "173", "174", "175", "176", "177"] as const;

// ── Particle Breakdown Definition ──
// Top pixels break first in Stage 6A (Image 2) while logo bottom stays.
// Lower pixels break next in Stage 6B as bottom dissolves into full cloud (Image 3).
interface DeconstructParticle {
  id: number;
  w: number;
  h: number;
  startLeft: number;
  startTop: number;
  dx: number;
  dy: number;
  rot: number;
  bg: string;
  delay: number;
}

const LOGO_DECONSTRUCT_PARTICLES: DeconstructParticle[] = [
  // ── Wave 1: Very Top of Logo (Image 2 top cluster) ──
  { id: 1, w: 18, h: 18, startLeft: 712, startTop: 365, dx: 12, dy: -95, rot: 14, bg: "#B1A2FE", delay: 0.05 },
  { id: 2, w: 16, h: 16, startLeft: 688, startTop: 372, dx: -38, dy: -85, rot: -18, bg: "#744FE7", delay: 0.12 },
  { id: 3, w: 20, h: 16, startLeft: 736, startTop: 375, dx: 48, dy: -80, rot: 22, bg: "#75A5F9", delay: 0.20 },
  { id: 4, w: 18, h: 18, startLeft: 666, startTop: 382, dx: -65, dy: -70, rot: -25, bg: "#91C8E6", delay: 0.28 },
  { id: 5, w: 16, h: 16, startLeft: 755, startTop: 385, dx: 78, dy: -65, rot: 18, bg: "#B1A2FE", delay: 0.36 },

  // ── Wave 2: Upper-Middle of Logo (Image 2 upper scatter) ──
  { id: 6, w: 22, h: 20, startLeft: 700, startTop: 398, dx: -18, dy: -45, rot: -12, bg: "#744FE7", delay: 0.44 },
  { id: 7, w: 18, h: 18, startLeft: 725, startTop: 405, dx: 32, dy: -40, rot: 16, bg: "#D0ECFB", delay: 0.52 },
  { id: 8, w: 20, h: 16, startLeft: 650, startTop: 412, dx: -90, dy: -45, rot: -22, bg: "#75A5F9", delay: 0.60 },
  { id: 9, w: 18, h: 16, startLeft: 770, startTop: 418, dx: 105, dy: -35, rot: 28, bg: "#744FE7", delay: 0.68 },
  { id: 10, w: 16, h: 16, startLeft: 680, startTop: 425, dx: -52, dy: -20, rot: -15, bg: "#91C8E6", delay: 0.76 },

  // ── Wave 3: Center Mid of Logo ──
  { id: 11, w: 24, h: 22, startLeft: 710, startTop: 435, dx: -6, dy: 5, rot: 10, bg: "#744FE7", delay: 0.84 },
  { id: 12, w: 18, h: 18, startLeft: 740, startTop: 440, dx: 58, dy: 10, rot: -20, bg: "#B1A2FE", delay: 0.92 },
  { id: 13, w: 20, h: 18, startLeft: 660, startTop: 445, dx: -82, dy: 10, rot: 24, bg: "#75A5F9", delay: 1.00 },
  { id: 14, w: 22, h: 20, startLeft: 765, startTop: 450, dx: 88, dy: 25, rot: -16, bg: "#744FE7", delay: 1.08 },
  { id: 15, w: 16, h: 16, startLeft: 690, startTop: 458, dx: -35, dy: 25, rot: 14, bg: "#91C8E6", delay: 1.16 },

  // ── Wave 4: Lower Logo (Breaks in Stage 6B as bottom outline dissolves) ──
  { id: 16, w: 18, h: 18, startLeft: 720, startTop: 472, dx: 22, dy: 45, rot: -14, bg: "#B1A2FE", delay: 1.40 },
  { id: 17, w: 20, h: 20, startLeft: 675, startTop: 480, dx: -60, dy: 50, rot: 25, bg: "#75A5F9", delay: 1.48 },
  { id: 18, w: 16, h: 16, startLeft: 745, startTop: 485, dx: 65, dy: 55, rot: -22, bg: "#D0ECFB", delay: 1.56 },
  { id: 19, w: 18, h: 16, startLeft: 645, startTop: 495, dx: -108, dy: 45, rot: 30, bg: "#744FE7", delay: 1.64 },
  { id: 20, w: 18, h: 16, startLeft: 775, startTop: 502, dx: 100, dy: 60, rot: -26, bg: "#75A5F9", delay: 1.72 },

  // ── Wave 5: Very Bottom of Logo (Completes Full Pixel Cloud - Image 3) ──
  { id: 21, w: 22, h: 18, startLeft: 705, startTop: 512, dx: -12, dy: 70, rot: 15, bg: "#744FE7", delay: 1.80 },
  { id: 22, w: 16, h: 16, startLeft: 730, startTop: 520, dx: 38, dy: 75, rot: -18, bg: "#B1A2FE", delay: 1.88 },
  { id: 23, w: 18, h: 16, startLeft: 685, startTop: 528, dx: -50, dy: 80, rot: 20, bg: "#91C8E6", delay: 1.96 },
  { id: 24, w: 16, h: 16, startLeft: 750, startTop: 535, dx: 70, dy: 85, rot: -12, bg: "#75A5F9", delay: 2.04 },
  { id: 25, w: 15, h: 15, startLeft: 660, startTop: 515, dx: -80, dy: 70, rot: -8, bg: "#B1A2FE", delay: 2.12 },
  { id: 26, w: 17, h: 17, startLeft: 760, startTop: 525, dx: 90, dy: 75, rot: 18, bg: "#744FE7", delay: 2.20 },
];

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  // Stages:
  // 1-4: Ring assembly
  // 5: Solid Logo Hold (Image 1) - 1.8s to 3.4s
  // 6: Stage 6A: Top breaks linely while bottom stays (Image 2) - 3.4s to 4.8s
  // 7: Stage 6B: Bottom dissolves into full Pixel Cloud (Image 3) - 4.8s to 6.2s
  // 8: UI Emerges One-by-One from inside the cloud - 6.4s onwards
  // 9: UI Spreads to destination positions - 10.0s
  // 10: Permanent settle into Home layout - 11.4s
  const [stage, setStage] = useState(0);

  const [emergeAI, setEmergeAI] = useState(false);
  const [emergeCyber, setEmergeCyber] = useState(false);
  const [emergeMobile, setEmergeMobile] = useState(false);
  const [emergeCloud, setEmergeCloud] = useState(false);
  const [emergeWeb, setEmergeWeb] = useState(false);
  const [emergeNav, setEmergeNav] = useState(false);
  const [emergeTitle, setEmergeTitle] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 200),
      setTimeout(() => setStage(2), 600),
      setTimeout(() => setStage(3), 1000),
      setTimeout(() => setStage(4), 1400),

      // Stage 5: Solid Logo Hold (Image 1)
      setTimeout(() => setStage(5), 1800),

      // Stage 6: Top of logo breaks first while bottom remains (Image 2)
      setTimeout(() => setStage(6), 3400),

      // Stage 7: Bottom dissolves into complete Pixel Cloud (Image 3)
      setTimeout(() => setStage(7), 5000),

      // Stage 8: UI Emerges one-by-one from inside the pixel cloud
      setTimeout(() => {
        setStage(8);
        setEmergeAI(true);
      }, 6400),
      setTimeout(() => setEmergeCyber(true), 7000),
      setTimeout(() => setEmergeMobile(true), 7600),
      setTimeout(() => setEmergeCloud(true), 8200),
      setTimeout(() => setEmergeWeb(true), 8800),
      setTimeout(() => setEmergeNav(true), 9400),
      setTimeout(() => setEmergeTitle(true), 9900),

      // Stage 9: Spreading smoothly
      setTimeout(() => setStage(9), 10400),

      // Stage 10: Smooth settle into permanent Home layout
      setTimeout(() => {
        setStage(10);
        onComplete?.();
      }, 11600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <main
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundImage: "url('/asset/bg.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        paddingTop: "24px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Orbitron:wght@400;700&display=swap');

        /* ─── Ring Pixels Animation (Only Stages 1-4) ─── */
        @keyframes px-enter {
          0%   { opacity: 0; transform: scale(0.2) translateY(6px); }
          65%  { opacity: 1; transform: scale(1.15) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* ─── Solid Logo Reveal & Glow (Stage 5 - Image 1) ─── */
        @keyframes logo-reveal {
          0%   { opacity: 0; transform: scale(0.92); filter: drop-shadow(0 0 0px transparent); }
          60%  { opacity: 1; transform: scale(1.03); filter: drop-shadow(0 0 35px rgba(116, 79, 231, 0.95)) drop-shadow(0 0 60px rgba(145, 200, 230, 0.7)); }
          100% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 20px rgba(116, 79, 231, 0.85)) drop-shadow(0 0 38px rgba(145, 200, 230, 0.55)); }
        }

        @keyframes logo-ambient-glow {
          0%   { filter: drop-shadow(0 0 16px rgba(116, 79, 231, 0.75)) drop-shadow(0 0 30px rgba(145, 200, 230, 0.4)); transform: translateY(0px); }
          100% { filter: drop-shadow(0 0 26px rgba(116, 79, 231, 1)) drop-shadow(0 0 48px rgba(145, 200, 230, 0.7)); transform: translateY(-3px); }
        }

        /* Top half of solid logo dissolves as top pixels break */
        @keyframes logo-top-dissolve {
          0%   { opacity: 1; }
          100% { opacity: 0; filter: blur(6px); }
        }

        /* Bottom outline of the logo (Image 2): Holds during top breaking, then dissolves */
        @keyframes logo-bottom-hold-then-fade {
          0%   { opacity: 1; transform: scale(1); }
          70%  { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.05) translateY(6px); filter: blur(8px); }
        }

        /* ─── Particles Breaking Sequentially & Hovering Seamlessly ─── */
        @keyframes particle-break-and-hover {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.6) rotate(0deg);
          }
          10% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          70% {
            opacity: 1;
            transform: translate(var(--dx), var(--dy)) scale(1.06) rotate(var(--rot));
          }
          85% {
            opacity: 1;
            transform: translate(calc(var(--dx) + 2px), calc(var(--dy) - 3px)) rotate(calc(var(--rot) + 2deg));
          }
          100% {
            opacity: 1;
            transform: translate(var(--dx), var(--dy)) scale(1) rotate(var(--rot));
          }
        }

        @keyframes cloud-fadeout {
          0%   { opacity: 1; }
          100% { opacity: 0; transform: scale(1.2); filter: blur(12px); }
        }

        /* ─── ONE-BY-ONE UI EMERGENCE FROM INSIDE THE CLOUD TO FINAL PLACE ─── */

        /* 1. AI Automation Card */
        @keyframes travel-ai-card {
          0% {
            opacity: 0;
            left: calc(50% - 180px);
            top: 280px;
            transform: scale(0.2) rotate(0deg);
            filter: blur(10px);
          }
          22% {
            opacity: 0.9;
            left: calc(50% - 180px - 140px);
            top: 220px;
            transform: scale(0.68) rotate(-14deg);
            filter: blur(0px);
          }
          55% {
            opacity: 0.9;
            left: calc(50% - 180px - 60px);
            top: 300px;
            transform: scale(0.82) rotate(-6deg);
          }
          100% {
            opacity: 0.8;
            left: calc(50% - 180px + 360px);
            top: 425px;
            transform: rotate(10.63deg) scale(1);
          }
        }

        /* 2. Cybersecurity Card */
        @keyframes travel-cyber-card {
          0% {
            opacity: 0;
            left: calc(50% - 180px);
            top: 280px;
            transform: scale(0.2) rotate(0deg);
            filter: blur(10px);
          }
          22% {
            opacity: 0.9;
            left: calc(50% - 180px - 50px);
            top: 450px;
            transform: scale(0.68) rotate(16deg);
            filter: blur(0px);
          }
          55% {
            opacity: 0.9;
            left: calc(50% - 180px + 160px);
            top: 430px;
            transform: scale(0.82) rotate(4deg);
          }
          100% {
            opacity: 0.8;
            left: calc(50% - 180px + 720px);
            top: 340px;
            transform: rotate(-19deg) scale(1);
          }
        }

        /* 3. Mobile Applications Card */
        @keyframes travel-mobile-card {
          0% {
            opacity: 0;
            left: calc(50% - 180px);
            top: 280px;
            transform: scale(0.2) rotate(0deg);
            filter: blur(8px);
          }
          35% {
            opacity: 0.9;
            left: calc(50% - 180px - 10px);
            top: 250px;
            transform: scale(0.7) rotate(-9deg);
            filter: blur(0px);
          }
          100% {
            opacity: 0.8;
            left: calc(50% - 180px - 360px);
            top: 425px;
            transform: rotate(-11.3deg) scale(1);
          }
        }

        /* 4. Cloud Solutions Card */
        @keyframes travel-cloud-card {
          0% {
            opacity: 0;
            left: calc(50% - 180px);
            top: 280px;
            transform: scale(0.2) rotate(0deg);
            filter: blur(8px);
          }
          35% {
            opacity: 0.9;
            left: calc(50% - 180px + 150px);
            top: 420px;
            transform: scale(0.72) rotate(0deg);
            filter: blur(0px);
          }
          100% {
            opacity: 0.8;
            left: calc(50% - 180px);
            top: 365px;
            transform: rotate(0deg) scale(1);
          }
        }

        /* 5. Web Development Card */
        @keyframes travel-web-card {
          0% {
            opacity: 0;
            left: calc(50% - 180px);
            top: 280px;
            transform: scale(0.2) rotate(0deg);
            filter: blur(8px);
          }
          35% {
            opacity: 0.9;
            left: calc(50% - 180px - 330px);
            top: 380px;
            transform: scale(0.72) rotate(-16deg);
            filter: blur(0px);
          }
          100% {
            opacity: 0.8;
            left: calc(50% - 180px - 720px);
            top: 300px;
            transform: matrix(0.94, 0.34, -0.37, 0.93, 0, 0) scale(1);
          }
        }

        /* 6. Navigation Pill / Header */
        @keyframes travel-nav-header {
          0% {
            opacity: 0;
            transform: translateY(180px) scale(0.4);
            filter: blur(8px);
          }
          50% {
            opacity: 1;
            transform: translateY(40px) scale(0.85);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* 7. Hero Title "Digital Solutions That Drive Growth" */
        @keyframes travel-hero-title {
          0% {
            opacity: 0;
            transform: translateY(80px) scale(0.5);
            filter: blur(10px);
          }
          50% {
            opacity: 0.95;
            transform: translateY(20px) scale(0.9);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Intermediate Let's Talk Pill & GELORA TECH Badge */
        @keyframes pulse-talk-pill {
          0%   { opacity: 0; transform: scale(0.3); }
          30%  { opacity: 1; transform: scale(0.95); }
          80%  { opacity: 1; transform: scale(0.95); }
          100% { opacity: 0; transform: scale(0.8) translateY(-20px); }
        }

        @keyframes pulse-brand-badge {
          0%   { opacity: 0; transform: scale(0.3) rotate(-10deg); }
          30%  { opacity: 1; transform: scale(0.9) rotate(-10deg); }
          80%  { opacity: 1; transform: scale(0.9) rotate(-10deg); }
          100% { opacity: 0; transform: scale(0.8) translateY(-20px); }
        }

        /* ─── Exact Glassmorphism Fan Cards Matching HomePage ─── */
        .home-glass-card {
          box-sizing: border-box;
          position: absolute;
          width: 360px;
          height: 430px;
          opacity: 0.8;
          background: linear-gradient(161.1deg, rgba(111, 174, 255, 0.15) 3.78%, rgba(252, 253, 255, 0) 95.82%),
                      radial-gradient(50% 50% at 50% 50%, rgba(121, 92, 255, 0.28) 0%, rgba(254, 254, 255, 0) 100%),
                      linear-gradient(159.62deg, rgba(32, 35, 74, 0.82) 3.32%, rgba(70, 52, 138, 0.72) 96.94%);
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

        /* Settled Hover States matching HomePage */
        .settled.home-card-1 {
          left: calc(50% - 180px - 720px);
          top: 300px;
          transform: matrix(0.94, 0.34, -0.37, 0.93, 0, 0);
          z-index: 15;
          animation: none !important;
        }
        .settled.home-card-1:hover {
          transform: matrix(0.94, 0.34, -0.37, 0.93, 0, -12) scale(1.03);
          z-index: 25;
        }

        .settled.home-card-2 {
          left: calc(50% - 180px - 360px);
          top: 425px;
          transform: rotate(-11.3deg);
          z-index: 18;
          animation: none !important;
        }
        .settled.home-card-2:hover {
          transform: rotate(-11.3deg) translateY(-12px) scale(1.03);
          z-index: 25;
        }

        .settled.home-card-3 {
          left: calc(50% - 180px);
          top: 365px;
          transform: rotate(0deg);
          z-index: 20;
          animation: none !important;
        }
        .settled.home-card-3:hover {
          transform: rotate(0deg) translateY(-12px) scale(1.03);
          z-index: 25;
        }

        .settled.home-card-4 {
          left: calc(50% - 180px + 360px);
          top: 425px;
          transform: rotate(10.63deg);
          z-index: 17;
          animation: none !important;
        }
        .settled.home-card-4:hover {
          transform: rotate(10.63deg) translateY(-12px) scale(1.03);
          z-index: 25;
        }

        .settled.home-card-5 {
          left: calc(50% - 180px + 720px);
          top: 340px;
          transform: rotate(-19deg);
          z-index: 14;
          animation: none !important;
        }
        .settled.home-card-5:hover {
          transform: rotate(-19deg) translateY(-12px) scale(1.03);
          z-index: 25;
        }

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

        /* Intermediate Let's Talk button pill */
        .emerge-talk-btn {
          position: absolute;
          box-sizing: border-box;
          height: 42px;
          left: calc(50% - 40px);
          top: 480px;
          padding: 0 6px 0 18px;
          background: rgba(18, 16, 38, 0.88);
          border: 1px solid rgba(191, 239, 255, 0.35);
          border-radius: 999px;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 24px rgba(116, 79, 231, 0.35);
          z-index: 25;
          pointer-events: none;
          animation: pulse-talk-pill 2.2s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
        }

        /* Intermediate GELORA TECH Brand Badge */
        .emerge-brand-pill {
          position: absolute;
          box-sizing: border-box;
          height: 48px;
          left: calc(50% + 95px);
          top: 475px;
          padding: 0 20px 0 12px;
          background: rgba(18, 16, 38, 0.85);
          border: 1px solid rgba(191, 239, 255, 0.35);
          border-radius: 999px;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 24px rgba(116, 79, 231, 0.3);
          z-index: 25;
          pointer-events: none;
          animation: pulse-brand-badge 2.2s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
        }

        /* Stage 1-4 Ring Pixels */
        .sp {
          position: absolute;
          opacity: 0;
          border-radius: 2px;
          animation: px-enter 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.2) forwards;
        }
        .r-154 { width: 19px; height: 18px; left: 619px; top: 454px; background: #B1A2FE; animation-delay: 0.04s; }
        .r-159 { width: 19px; height: 18px; left: 584px; top: 492px; background: #B1A2FE; animation-delay: 0.08s; }
        .r-160 { width: 19px; height: 18px; left: 679px; top: 447px; background: #91C8E6; animation-delay: 0.12s; }
        .r-161 { width: 19px; height: 18px; left: 643px; top: 474px; background: #744FE7; animation-delay: 0.16s; }
        .r-162 { width: 11px; height: 10px; left: 646px; top: 400px; background: #744FE7; animation-delay: 0.20s; }
        .r-163 { width: 19px; height: 18px; left: 666px; top: 379px; background: #B1A2FE; animation-delay: 0.24s; }
        .r-155 { width: 19px; height: 18px; left: 643px; top: 429px; background: #91C8E6; animation-delay: 0.28s; }
        .r-156 { width: 19px; height: 18px; left: 607px; top: 443px; background: #744FE7; animation-delay: 0.32s; }

        .r-164 { width: 22px; height: 21px; left: 687px; top: 363px; background: #744FE7; animation-delay: 0.05s; }
        .r-165 { width: 21px; height: 21px; left: 712px; top: 363px; background: #744FE7; animation-delay: 0.10s; }
        .r-166 { width: 28px; height: 21px; left: 733px; top: 384px; background: #75A5F9; transform: scaleY(-1); animation-delay: 0.15s; }
        .r-167 { width: 21px; height: 18px; left: 761px; top: 370px; background: #75A5F9; animation-delay: 0.20s; }

        .r-168 { width: 22px; height: 21px; left: 773px; top: 404px; background: #744FE7; animation-delay: 0.05s; }
        .r-169 { width: 21px; height: 21px; left: 784px; top: 430px; background: #91C8E6; animation-delay: 0.10s; }
        .r-170 { width: 21px; height: 24px; left: 792px; top: 457px; background: #B1A2FE; animation-delay: 0.15s; }
        .r-171 { width: 22px; height: 21px; left: 788px; top: 485px; background: #744FE7; animation-delay: 0.20s; }

        .r-172 { width: 21px; height: 21px; left: 773px; top: 512px; background: #744FE7; animation-delay: 0.04s; }
        .r-173 { width: 21px; height: 18px; left: 750px; top: 533px; background: #75A5F9; animation-delay: 0.08s; }
        .r-174 { width: 28px; height: 21px; left: 724px; top: 545px; background: #75A5F9; transform: scaleY(-1); animation-delay: 0.12s; }
        .r-175 { width: 22px; height: 21px; left: 698px; top: 545px; background: #744FE7; animation-delay: 0.16s; }
        .r-176 { width: 21px; height: 24px; left: 668px; top: 525px; background: #B1A2FE; animation-delay: 0.20s; }
        .r-177 { width: 21px; height: 21px; left: 643px; top: 505px; background: #91C8E6; animation-delay: 0.24s; }

        /* Stage 5 Center Logo: Clean solid logo container (Image 1) */
        .solid-logo-box {
          position: absolute;
          width: 165px;
          height: 195px;
          left: 638px;
          top: 364px;
          animation: logo-reveal 0.7s cubic-bezier(0.2, 0.9, 0.3, 1.1) forwards,
                     logo-ambient-glow 2.2s 0.7s ease-in-out infinite alternate;
          z-index: 30;
        }

        .solid-logo-box.deconstruct {
          animation: logo-top-dissolve 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          pointer-events: none;
        }

        /* ─── Logo Down Outline (Image 2) ───
           The exact bottom & right half of the logo hexagon.
           Stays visible while the top breaks, then dissolves in Stage 6B!
        ─── */
        .logo-down-outline {
          position: absolute;
          width: 165px;
          height: 195px;
          left: 638px;
          top: 364px;
          z-index: 29;
          animation: logo-bottom-hold-then-fade 1.6s ease-out forwards;
          pointer-events: none;
        }
      `}</style>

      {/* Top Header - In exact same DOM position and style as HomePage */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: emergeNav ? 1 : 0,
          transform: emergeNav ? "translateY(0)" : "translateY(24px) scale(0.95)",
          transition: "opacity 0.8s cubic-bezier(0.2, 0.9, 0.3, 1), transform 0.8s cubic-bezier(0.2, 0.9, 0.3, 1)",
          zIndex: 50,
          pointerEvents: stage >= 10 ? "auto" : "none",
        }}
      >
        <Header activeTab="Home" />
      </div>

      {/* Canvas Container for Background & Cards - IDENTICAL TO HOMEPAGE */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%) scale(min(1.35, calc(99vw / 1440px), calc(99vh / 1024px)))",
          width: "1440px",
          height: "1024px",
          transformOrigin: "top center",
          pointerEvents: stage >= 10 ? "auto" : "none",
        }}
      >
        {/* Ellipse 12 Ambient Radial Background */}
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

        {/* ─── STAGE 1–4: Initial Pixel Ring Formation (HIDDEN COMPLETELY IN STAGE 5) ─── */}
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

        {/* ─── STAGE 5: Solid Glowing Center Logo (IMAGE 1) ─── */}
        {stage >= 5 && stage <= 6 && (
          <div className={`solid-logo-box ${stage === 6 ? "deconstruct" : ""}`}>
            <Image
              src="/asset/logo.png"
              alt="Gelora Tech"
              width={165}
              height={195}
              priority
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        )}

        {/* ─── STAGE 6: "Logo Down Is There" (IMAGE 2) ───
            When top breaks first, the bottom hexagon shape remains solidly visible,
            then dissolves as the breaking finishes!
        ─── */}
        {stage === 6 && (
          <div className="logo-down-outline">
            <svg width="165" height="195" viewBox="0 0 165 195" fill="none">
              <path
                d="M 28 140 L 74 168 L 126 138 L 126 95"
                stroke="#E2DCF7"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 16px rgba(116, 79, 231, 0.9))",
                }}
              />
            </svg>
          </div>
        )}

        {/* ─── STAGE 6 ONWARDS: Particles Breaking Line-by-Line From Top to Bottom ───
            - Top breaks first (Image 2) while logo down is there!
            - Bottom breaks next as bottom dissolves into full cloud (Image 3)
            - Particles STAY hovering as the Pixel Cloud!
        ─── */}
        {stage >= 6 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 12,
              animation: stage >= 9 ? "cloud-fadeout 2.2s ease-out forwards" : undefined,
            }}
          >
            {LOGO_DECONSTRUCT_PARTICLES.map((px) => (
              <span
                key={px.id}
                style={{
                  position: "absolute",
                  width: `${px.w}px`,
                  height: `${px.h}px`,
                  left: `${px.startLeft}px`,
                  top: `${px.startTop}px`,
                  background: px.bg,
                  borderRadius: "2px",
                  boxShadow: `0 0 12px ${px.bg}`,
                  // @ts-expect-error CSS variables
                  "--dx": `${px.dx}px`,
                  "--dy": `${px.dy}px`,
                  "--rot": `${px.rot}deg`,
                  animation: `particle-break-and-hover 2.4s ${px.delay}s cubic-bezier(0.18, 0.88, 0.28, 1) forwards`,
                }}
              />
            ))}
          </div>
        )}

        {/* ─── STAGE 8 & 9: ONE-BY-ONE UI EMERGES FROM INSIDE & TRAVELS TO PLACE ─── */}
        {stage >= 8 && (
          <>
            {/* Intermediate Accents: Let's Talk Pill & GELORA TECH Badge */}
            {stage === 8 && (
              <>
                <div className="emerge-talk-btn">
                  <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "14px", color: "#ffffff", whiteSpace: "nowrap" }}>
                    Let&apos;s Talk
                  </span>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>

                <div className="emerge-brand-pill">
                  <Image
                    src="/asset/logo.png"
                    alt="Gelora Tech"
                    width={28}
                    height={28}
                    style={{ objectFit: "contain", filter: "drop-shadow(0 0 8px rgba(116, 79, 231, 0.8))" }}
                  />
                  <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "2px", color: "#ffffff", whiteSpace: "nowrap" }}>
                    GELORA TECH
                  </span>
                </div>
              </>
            )}

            {/* Hero Headline: Unfolds into center at top 208px */}
            {emergeTitle && (
              <div
                style={{
                  position: "absolute",
                  width: "800px",
                  left: "calc(50% - 800px/2 + 4px)",
                  top: "208px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  zIndex: 10,
                  pointerEvents: "none",
                  userSelect: "none",
                  animation: stage >= 10 ? "none" : "travel-hero-title 2.2s cubic-bezier(0.2, 0.9, 0.3, 1) forwards",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "100px",
                    lineHeight: "82px",
                    color: "#F4F1FF",
                    whiteSpace: "nowrap",
                  }}
                >
                  Digital Solutions
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "100px",
                    lineHeight: "82px",
                    marginTop: "18px",
                    background: "linear-gradient(90deg, #F4F1FF 6.25%, #B29DFF 19.71%, #7049FF 88.94%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    whiteSpace: "nowrap",
                  }}
                >
                  That Drive Growth
                </span>
              </div>
            )}

            {/* ─── 5 Fan Cards: Each emerges from INSIDE the center and travels to its final place ─── */}

            {/* 1. Web Development Card */}
            {emergeWeb && (
              <div
                className={`home-glass-card ${stage >= 10 ? "settled home-card-1" : ""}`}
                style={{
                  zIndex: 15,
                  animation: stage >= 10 ? "none" : "travel-web-card 3.2s cubic-bezier(0.2, 0.9, 0.3, 1) forwards",
                }}
              >
                <div className="card-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EBE6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className="card-title-txt">{"Web\nDevelopment"}</h3>
                <p className="card-desc-txt">Scalable, high-performance web applications.</p>
              </div>
            )}

            {/* 2. Mobile Applications Card */}
            {emergeMobile && (
              <div
                className={`home-glass-card ${stage >= 10 ? "settled home-card-2" : ""}`}
                style={{
                  zIndex: 18,
                  animation: stage >= 10 ? "none" : "travel-mobile-card 3.5s cubic-bezier(0.2, 0.9, 0.3, 1) forwards",
                }}
              >
                <div className="card-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EBE6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="3" />
                    <circle cx="9.5" cy="7" r="0.9" fill="#EBE6FF" />
                    <circle cx="14.5" cy="7" r="0.9" fill="#EBE6FF" />
                    <circle cx="9.5" cy="11" r="0.9" fill="#EBE6FF" />
                    <circle cx="14.5" cy="11" r="0.9" fill="#EBE6FF" />
                    <line x1="9" y1="17" x2="15" y2="17" />
                  </svg>
                </div>
                <h3 className="card-title-txt">{"Mobile\nApplications"}</h3>
                <p className="card-desc-txt">Native &amp; cross-platform apps for iOS &amp; Android.</p>
              </div>
            )}

            {/* 3. Cloud Solutions Card */}
            {emergeCloud && (
              <div
                className={`home-glass-card ${stage >= 10 ? "settled home-card-3" : ""}`}
                style={{
                  zIndex: 20,
                  animation: stage >= 10 ? "none" : "travel-cloud-card 3.4s cubic-bezier(0.2, 0.9, 0.3, 1) forwards",
                }}
              >
                <div className="card-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EBE6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                    <polyline points="10 14 12 12 14 14" />
                    <line x1="12" y1="12" x2="12" y2="17" />
                  </svg>
                </div>
                <h3 className="card-title-txt">{"Cloud\nSolutions"}</h3>
                <p className="card-desc-txt">Secure, scalable and reliable cloud infrastructure.</p>
              </div>
            )}

            {/* 4. AI Automation Card */}
            {emergeAI && (
              <div
                className={`home-glass-card ${stage >= 10 ? "settled home-card-4" : ""}`}
                style={{
                  zIndex: 17,
                  animation: stage >= 10 ? "none" : "travel-ai-card 3.8s cubic-bezier(0.2, 0.9, 0.3, 1) forwards",
                }}
              >
                <div className="card-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EBE6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
                    <path d="M5 3v4M3 5h4" />
                  </svg>
                </div>
                <h3 className="card-title-txt">{"AI\nAutomation"}</h3>
                <p className="card-desc-txt">Intelligent automation that optimizes processes.</p>
              </div>
            )}

            {/* 5. Cybersecurity Card */}
            {emergeCyber && (
              <div
                className={`home-glass-card ${stage >= 10 ? "settled home-card-5" : ""}`}
                style={{
                  zIndex: 14,
                  animation: stage >= 10 ? "none" : "travel-cyber-card 3.8s cubic-bezier(0.2, 0.9, 0.3, 1) forwards",
                }}
              >
                <div className="card-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EBE6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <circle cx="12" cy="11" r="2" fill="#EBE6FF" />
                    <path d="M12 13v3" strokeWidth="2.2" />
                  </svg>
                </div>
                <h3 className="card-title-txt">Cybersecurity</h3>
                <p className="card-desc-txt">Protecting your systems and data with advanced security.</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
