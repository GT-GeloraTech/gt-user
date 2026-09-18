"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, createContext, useContext } from "react";

/* ──────────────────────────────────────────────────────────────────────────
 * Loader Context — lets any component programmatically trigger the loader
 * ────────────────────────────────────────────────────────────────────────── */
interface LoaderContextType {
  showLoader: () => void;
  hideLoader: () => void;
  isLoading: boolean;
}

export const LoaderContext = createContext<LoaderContextType>({
  showLoader: () => { },
  hideLoader: () => { },
  isLoading: false,
});

export const usePageLoader = () => useContext(LoaderContext);

/* ──────────────────────────────────────────────────────────────────────────
 * PageLoader — the full-screen loading overlay
 * Fixed one-direction rotating arc (not oscillating)
 * ────────────────────────────────────────────────────────────────────────── */
export function PageLoader() {
  return (
    <div className="gt-page-loader-overlay" role="status" aria-label="Loading page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        /* ── Overlay ── */
        .gt-page-loader-overlay {
          position: fixed;
          inset: 0;
          z-index: 999990;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(8, 4, 21, 0.93);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          animation: gtLoaderFadeIn 0.22s ease forwards;
          user-select: none;
        }

        /* ── Ambient purple glow ball behind spinner ── */
        .gt-loader-glow-ball {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(140, 103, 254, 0.28) 0%,
            rgba(116, 79, 231, 0.14) 40%,
            transparent 70%
          );
          filter: blur(40px);
          pointer-events: none;
          animation: gtGlowBreath 2.8s ease-in-out infinite alternate;
        }

        /* ── Center spinner + logo container ── */
        .gt-loader-ring-box {
          position: relative;
          width: 128px;
          height: 128px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        /* ── Outer SVG ring — rotates in ONE direction only ── */
        .gt-loader-ring-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 128px;
          height: 128px;
          /* Start from top (-90deg) then spin clockwise continuously */
          animation: gtSpinCW 1.3s linear infinite;
        }

        /* Faint full circle track */
        .gt-ring-track {
          stroke: rgba(140, 103, 254, 0.13);
          stroke-width: 3.8;
          fill: none;
        }

        /* The visible arc — fixed dashoffset so length stays constant while ring spins */
        .gt-ring-arc {
          stroke: url(#gtArcGrad);
          stroke-width: 3.8;
          stroke-linecap: round;
          fill: none;
          /* circumference = 2π × 50 ≈ 314.2 — show ~75% of the ring as arc */
          stroke-dasharray: 354.2;
          stroke-dashoffset: 88.5;
          filter: drop-shadow(0 0 8px rgba(140, 103, 254, 0.75));
        }

        /* ── Logo centered inside ring ── */
        .gt-loader-logo {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          animation: gtLogoGlow 2.2s ease-in-out infinite alternate;
        }

        /* ── Text row below ring ── */
        .gt-loader-label-row {
          margin-top: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0px;
          position: relative;
          z-index: 2;
        }

        .gt-loader-label {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 14.5px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #FFFFFF 0%, #E2D7FC 35%, #B69AFA 70%, #8C67FE 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Dots container */
        .gt-loader-dots-wrap {
          display: inline-flex;
          align-items: center;
          gap: 0px;
          margin-left: 3px;
        }

        /* Each dot — appears one by one, then resets */
        .gt-loader-dot {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 17px;
          line-height: 1;
          color: #B69AFA;
          opacity: 0;
          display: inline-block;
          animation: gtDotStep 1.6s infinite;
        }

        .gt-loader-dot:nth-child(1) { animation-delay: 0.00s; }
        .gt-loader-dot:nth-child(2) { animation-delay: 0.22s; }
        .gt-loader-dot:nth-child(3) { animation-delay: 0.44s; }
        .gt-loader-dot:nth-child(4) { animation-delay: 0.66s; }

        /* ── Keyframes ── */

        @keyframes gtLoaderFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Clockwise spin — one direction, continuous, linear */
        @keyframes gtSpinCW {
          from { transform: rotate(-90deg); }
          to   { transform: rotate(270deg); }
        }

        @keyframes gtGlowBreath {
          0%   { opacity: 0.55; transform: scale(0.90); }
          100% { opacity: 1.00; transform: scale(1.12); }
        }

        @keyframes gtLogoGlow {
          0%   { filter: drop-shadow(0 0 10px rgba(140, 103, 254, 0.55)); }
          100% { filter: drop-shadow(0 0 22px rgba(168, 137, 255, 0.95)); }
        }

        /* Dot appears, holds, then fades - one at a time */
        @keyframes gtDotStep {
          0%, 10%   { opacity: 0; transform: translateY(0px); }
          25%, 65%  { opacity: 1; transform: translateY(-2px); }
          80%, 100% { opacity: 0; transform: translateY(0px); }
        }
      `}</style>

      {/* Ambient glow behind everything */}
      <div className="gt-loader-glow-ball" aria-hidden="true" />

      {/* Ring + Logo */}
      <div className="gt-loader-ring-box">
        <svg
          className="gt-loader-ring-svg"
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="gtArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8C67FE" stopOpacity="0.2" />
              <stop offset="40%" stopColor="#744FE7" />
              <stop offset="80%" stopColor="#B69AFA" />
              <stop offset="100%" stopColor="#E2D7FC" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Faint full-circle track */}
          <circle className="gt-ring-track" cx="64" cy="64" r="50" />

          {/* Fixed-length arc that appears to spin around the ring */}
          <circle className="gt-ring-arc" cx="64" cy="64" r="50" />
        </svg>

        {/* Logo in center */}
        <div className="gt-loader-logo">
          <Image
            src="/asset/logo.png"
            alt="Gelora Tech"
            width={58}
            height={58}
            priority
          />
        </div>
      </div>

      {/* "Loading . . . ." — dots appear one-by-one */}
      <div className="gt-loader-label-row">
        <span className="gt-loader-label">Loading</span>
        <span className="gt-loader-dots-wrap" aria-hidden="true">
          <span className="gt-loader-dot">.</span>
          <span className="gt-loader-dot">.</span>
          <span className="gt-loader-dot">.</span>
          <span className="gt-loader-dot">.</span>
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * NavigationLoaderProvider
 * Intercepts all internal link clicks globally and shows the loader.
 * Also shows loader on initial load and page refresh.
 * Hides it once the route finishes mounting.
 * ────────────────────────────────────────────────────────────────────────── */
export function NavigationLoaderProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Show loader on initial page load and refresh
  const [isLoading, setIsLoading] = useState(true);

  // Automatically dismiss loader after initial page mount or refresh
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  // Show loader when user reloads / refreshes the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsLoading(true);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Hide loader after pathname changes (new page mounted)
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 320);
      return () => clearTimeout(timer);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Global capture-phase click listener for all internal <a> elements
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        e.ctrlKey || e.metaKey || e.shiftKey || e.defaultPrevented
      ) return;

      try {
        const target = new URL(href, window.location.href);
        const current = new URL(window.location.href);
        if (target.origin === current.origin && target.pathname !== current.pathname) {
          setIsLoading(true);
        }
      } catch {
        if (href.startsWith("/") && href !== pathname) setIsLoading(true);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname]);

  return (
    <LoaderContext.Provider value={{
      showLoader: () => setIsLoading(true),
      hideLoader: () => setIsLoading(false),
      isLoading,
    }}>
      {children}
      {isLoading && <PageLoader />}
    </LoaderContext.Provider>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Default export — Next.js uses this as the Suspense fallback for the route
 * ────────────────────────────────────────────────────────────────────────── */
export default function Loading() {
  return <PageLoader />;
}
