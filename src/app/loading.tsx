"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, createContext, useContext } from "react";

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
export function PageLoader({ isFadingOut = false }: { isFadingOut?: boolean }) {
  return (
    <div
      className={`gt-page-loader-overlay${isFadingOut ? " fading-out" : ""}`}
      role="status"
      aria-label="Loading page"
    >
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
          background: rgba(8, 4, 21, 0.95);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          animation: gtLoaderFadeIn 0.22s ease forwards;
          transition: opacity 0.26s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.26s;
          user-select: none;
        }

        .gt-page-loader-overlay.fading-out {
          opacity: 0 !important;
          pointer-events: none !important;
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
 * Ensures the loader stays visible until the next page is 100% ready,
 * including all images, fonts, and DOM components.
 * ────────────────────────────────────────────────────────────────────────── */
export function NavigationLoaderProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const navStartTimeRef = useRef<number>(Date.now());
  const prevPathnameRef = useRef<string>(pathname);
  const isMountedRef = useRef<boolean>(false);

  const showLoader = () => {
    navStartTimeRef.current = Date.now();
    setIsFadingOut(false);
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsFadingOut(false);
    }, 260);
  };

  // Check if all images and fonts are loaded on the page
  const checkPageReady = async () => {
    // 1. Give Next.js two animation frames + 50ms to mount the new route DOM
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    await new Promise((r) => setTimeout(r, 60));

    // 2. Wait for fonts if supported
    if (typeof document !== "undefined" && "fonts" in document) {
      try {
        await (document as any).fonts.ready;
      } catch {
        // ignore font failure
      }
    }

    const images = Array.from(document.querySelectorAll<HTMLImageElement>("img"));

    const imgPromises = images.map((img) => {
      return new Promise<void>((resolve) => {
        if (img.complete && img.naturalWidth > 0) {
          resolve();
          return;
        }
        if (typeof img.decode === "function") {
          img.decode().then(resolve).catch(() => resolve());
          return;
        }
        const onDone = () => {
          img.removeEventListener("load", onDone);
          img.removeEventListener("error", onDone);
          resolve();
        };
        img.addEventListener("load", onDone);
        img.addEventListener("error", onDone);
      });
    });

    // 4. Find key background images in the DOM
    const bgUrls: string[] = [];
    document.querySelectorAll("[style*='background']").forEach((el) => {
      const style = el.getAttribute("style") || "";
      if (style.includes("url(")) {
        const matches = style.match(/url\(['"]?(.*?)['"]?\)/g);
        if (matches) {
          matches.forEach((m) => {
            const clean = m.replace(/^url\(['"]?/, "").replace(/['"]?\)$/, "");
            if (clean && !clean.startsWith("data:") && !bgUrls.includes(clean)) {
              bgUrls.push(clean);
            }
          });
        }
      }
    });

    const bgPromises = bgUrls.map((url: string) => {
      return new Promise<void>((resolve) => {
        const i = new window.Image();
        i.src = url;
        if (i.complete) {
          resolve();
          return;
        }
        i.onload = () => resolve();
        i.onerror = () => resolve();
      });
    });

    // 5. Wait for all images/backgrounds with a 2.5s maximum timeout
    await Promise.race([
      Promise.all([...imgPromises, ...bgPromises]),
      new Promise((resolve) => setTimeout(resolve, 2500)),
    ]);

    // 6. Ensure minimum display time for smooth UX (450ms from click)
    const elapsed = Date.now() - navStartTimeRef.current;
    const minWait = 450;
    if (elapsed < minWait) {
      await new Promise((r) => setTimeout(r, minWait - elapsed));
    }

    // 7. Ready! Smoothly fade out the loader
    hideLoader();
  };

  // Initial page load
  useEffect(() => {
    isMountedRef.current = true;
    checkPageReady();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // When pathname changes (switching tabs or navigating)
  useEffect(() => {
    if (!isMountedRef.current) return;
    if (prevPathnameRef.current === pathname) return;

    prevPathnameRef.current = pathname;
    // Scroll to top of new page instantly behind the loader
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    checkPageReady();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Global capture click listener for internal navigation links
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.search === window.location.search) {
          return;
        }
        showLoader();
      } catch {
        if (href.startsWith("/") && href !== window.location.pathname) {
          showLoader();
        }
      }
    };

    document.addEventListener("click", handleGlobalClick, true);
    return () => document.removeEventListener("click", handleGlobalClick, true);
  }, []);

  // Show loader on page reload / refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      const activeEl = document.activeElement as HTMLElement | null;
      if (activeEl) {
        const anchor = activeEl.closest("a");
        const href = anchor?.getAttribute("href");
        if (href && (href.startsWith("mailto:") || href.startsWith("tel:"))) {
          return;
        }
      }
      setIsLoading(true);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <LoaderContext.Provider value={{
      showLoader,
      hideLoader,
      isLoading,
    }}>
      {children}
      {isLoading && <PageLoader isFadingOut={isFadingOut} />}
    </LoaderContext.Provider>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Default export — Next.js uses this as the Suspense fallback for the route
 * ────────────────────────────────────────────────────────────────────────── */
export default function Loading() {
  return <PageLoader />;
}
