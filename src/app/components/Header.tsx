"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

interface HeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Product", href: "/product" },
  { name: "About", href: "/about" },
  { name: "Careers", href: "/careers" },
];

const PAGE_TITLES: Record<string, string> = {
  "/": "Home | Gelora Tech",
  "/services": "Services | Gelora Tech",
  "/product": "Product | Gelora Tech",
  "/about": "About | Gelora Tech",
  "/careers": "Careers | Gelora Tech",
};

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [selected, setSelected] = useState(activeTab || "Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);

  const navPillRef = useRef<HTMLElement>(null);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Pill indicator positions & states
  const [pillLeft, setPillLeft] = useState(0);
  const [pillWidth, setPillWidth] = useState(0);
  const [pillReady, setPillReady] = useState(false);
  const [isMelting, setIsMelting] = useState(false);
  const [isSolidifying, setIsSolidifying] = useState(false);
  const [meltDirection, setMeltDirection] = useState<"right" | "left">("right");
  const meltTimersRef = useRef<NodeJS.Timeout[]>([]);
  const targetHrefRef = useRef<string | null>(null);

  // `selected` takes priority so the active style immediately follows the click,
  // not the pathname (which only changes after router.push fires).
  const currentTab: string =
    selected ||
    NAV_ITEMS.find((item) => item.href === pathname || (item.href !== "/" && pathname?.startsWith(item.href)))?.name ||
    activeTab ||
    "Home";

  // Reposition the pill directly to the currently-active nav item
  const repositionPill = useCallback((tabName: string) => {
    const idx = NAV_ITEMS.findIndex((item) => item.name === tabName);
    const el = navItemRefs.current[idx];
    const pill = navPillRef.current;
    if (!el || !pill) return;
    setPillLeft(el.offsetLeft);
    setPillWidth(el.offsetWidth);
  }, []);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[pathname] || "Gelora Tech";
  }, [pathname]);

  // On every route change, ensure the viewport-locked class (used by scroll-locked sections)
  // is removed so the header is never stuck hidden after page navigation.
  useEffect(() => {
    document.documentElement.classList.remove('viewport-locked');
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }, [pathname]);

  // Detect if the header is over a white/light background section (including gradients)
  useEffect(() => {
    const isLightElement = (el: HTMLElement): boolean | null => {
      // 1. Check known light section classes
      if (el.closest('.gt-cta-wrapper, .story-section, .opportunities-section, .trusted-strip, .careers-light-section')) {
        return true;
      }
      const style = window.getComputedStyle(el);
      // 2. Check background-image for light gradients
      const bgImg = style.backgroundImage;
      if (bgImg && bgImg !== 'none') {
        if (/E9E1FF|CDC2EA|EEEAFB|E0D5FF|E5DCFF|F4F0FF|255,\s*255,\s*255|238,\s*234,\s*251|244,\s*240,\s*255/i.test(bgImg)) {
          return true;
        }
      }
      // 3. Check background-color
      const bg = style.backgroundColor;
      if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
        const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (m) {
          const alpha = m[4] !== undefined ? parseFloat(m[4]) : 1;
          if (alpha > 0.25) {
            const r = parseInt(m[1]), g = parseInt(m[2]), b = parseInt(m[3]);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            return luminance > 0.55;
          }
        }
      }
      return null;
    };

    const detectBg = () => {
      try {
        const pill = navPillRef.current;
        let sampleX = window.innerWidth / 2;
        let sampleY = 32;
        if (pill) {
          const rect = pill.getBoundingClientRect();
          sampleX = rect.left + rect.width / 2;
          sampleY = rect.top + rect.height / 2;
        }

        const elements = document.elementsFromPoint(sampleX, sampleY) as HTMLElement[];
        for (const el of elements) {
          if (el.closest('header')) continue;
          let curr: HTMLElement | null = el;
          while (curr && curr !== document.body && curr !== document.documentElement) {
            const res = isLightElement(curr);
            if (res !== null) {
              setIsLightBg(res);
              return;
            }
            curr = curr.parentElement;
          }
        }
        setIsLightBg(false);
      } catch {
        setIsLightBg(false);
      }
    };

    detectBg();
    window.addEventListener('scroll', detectBg, { passive: true });
    window.addEventListener('resize', detectBg, { passive: true });
    return () => {
      window.removeEventListener('scroll', detectBg);
      window.removeEventListener('resize', detectBg);
    };
  }, [pathname]);



  useEffect(() => {
    let prevY = window.scrollY;
    const handleScroll = () => {
      const curY = window.scrollY;
      setIsScrolled(curY > 20);

      // If user is near the very top of the page, ensure viewport-locked is cleared
      // as a failsafe so header is never stuck hidden on fresh reload
      if (curY < 80) {
        document.documentElement.classList.remove('viewport-locked');
      }
      prevY = curY;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Clean up any ongoing timers on unmount
  useEffect(() => {
    return () => {
      meltTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Snap pill to active tab immediately on mount without animation from the left
  useEffect(() => {
    setMounted(true);
    if (currentTab) {
      repositionPill(currentTab);
      setPillReady(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-snap when pathname changes (e.g. browser back/forward, footer navigation)
  useEffect(() => {
    // If a tab click animation is currently navigating towards targetHref,
    // only clear targetHref once pathname matches targetHref
    if (targetHrefRef.current) {
      if (pathname === targetHrefRef.current) {
        targetHrefRef.current = null;
      } else {
        // Still transitioning towards targetHref, do not snap back to old pathname!
        return;
      }
    }

    const matched = NAV_ITEMS.find((item) => item.href === pathname || (item.href !== "/" && pathname?.startsWith(item.href)))?.name;
    if (matched) {
      setSelected(matched);
      repositionPill(matched);
      setPillReady(true);
    } else {
      setSelected("");
      setPillReady(false);
    }
  }, [pathname, repositionPill]);

  // Handle window resize so pill stays aligned with active tab
  useEffect(() => {
    const handleResize = () => {
      if (currentTab) repositionPill(currentTab);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentTab, repositionPill]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // Handle nav tab switch:
  // Active background melts horizontally and flows slowly side-by-side to the switched tab
  const handleNavClick = useCallback(
    (name: string, href: string, e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
      }

      if (name === currentTab) return;

      targetHrefRef.current = href;

      // Clear any previous running timers
      meltTimersRef.current.forEach(clearTimeout);
      meltTimersRef.current = [];

      const fromIdx = NAV_ITEMS.findIndex((item) => item.name === currentTab);
      const toIdx = NAV_ITEMS.findIndex((item) => item.name === name);
      const elFrom = navItemRefs.current[fromIdx];
      const elTo = navItemRefs.current[toIdx];
      const pill = navPillRef.current;

      setSelected(name);
      setIsMenuOpen(false);
      if (onTabChange) onTabChange(name);

      if (!elFrom || !elTo || !pill) {
        repositionPill(name);
        router.push(href);
        return;
      }

      const leftTo = elTo.offsetLeft;
      const widthTo = elTo.offsetWidth;
      const dir = toIdx > fromIdx ? "right" : "left";
      setMeltDirection(dir);

      // ── Step 1: Active bg melts into molten fluid and glides slowly & smoothly to target tab ──
      // The pill maintains its tab size and glides continuously across without stretching over intermediate tabs
      setIsMelting(true);
      setIsSolidifying(false);

      setPillLeft(leftTo);
      setPillWidth(widthTo);

      // ── Step 2: Arrives slowly, cools down & solidifies cleanly into target tab ──
      const tSolidify = setTimeout(() => {
        setIsMelting(false);
        setIsSolidifying(true);
      }, 920);
      meltTimersRef.current.push(tSolidify);

      // ── Step 3: Cleanup solidifying bounce state once settled ──
      const tCleanup = setTimeout(() => {
        setIsSolidifying(false);
      }, 1340);
      meltTimersRef.current.push(tCleanup);

      // ── Step 4: Route navigates once the slow, smooth molten flow finishes ──
      const tNav = setTimeout(() => {
        router.push(href);
      }, 1420);
      meltTimersRef.current.push(tNav);
    },
    [currentTab, onTabChange, repositionPill, router]
  );

  // ─── Mobile drawer portal ──────────────────────────────────────────────
  const drawerPortal = mounted
    ? createPortal(
      <>
        <div
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(4,2,18,0.55)",
            backdropFilter: isMenuOpen ? "blur(3px)" : "none",
            WebkitBackdropFilter: isMenuOpen ? "blur(3px)" : "none",
            zIndex: 9998,
            opacity: isMenuOpen ? 1 : 0,
            pointerEvents: isMenuOpen ? "auto" : "none",
            transition: "opacity 0.35s ease, backdrop-filter 0.35s ease",
          }}
          aria-hidden="true"
        />
        <nav
          role="dialog" aria-modal="true" aria-label="Mobile Navigation"
          style={{
            position: "fixed", top: 0, right: 0, bottom: 0,
            width: "min(320px, 82vw)",
            background: "linear-gradient(160deg, rgba(18,12,45,0.98) 0%, rgba(11,9,22,0.98) 100%)",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "-16px 0 60px rgba(4,2,18,0.6)",
            zIndex: 9999, display: "flex", flexDirection: "column",
            transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.38s cubic-bezier(0.25,0.86,0.25,1)",
            overflowY: "auto",
          } as React.CSSProperties}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 22px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
            <Link href="/" onClick={() => setIsMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <Image src="/asset/logo.png" alt="Gelora Tech" width={30} height={30} style={{ filter: "drop-shadow(0 0 10px rgba(116,79,231,0.9))" }} />
              <Image src="/asset/gtText.png" alt="Gelora Tech" width={104} height={36} style={{ filter: "drop-shadow(0 0 8px rgba(191,239,255,0.35))" }} />
            </Link>
            <button type="button" aria-label="Close navigation menu" onClick={() => setIsMenuOpen(false)}
              style={{ width: 38, height: 38, border: "1px solid rgba(255,255,255,0.18)", borderRadius: "50%", background: "rgba(255,255,255,0.07)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", padding: "20px 16px", gap: "6px", flex: 1 }}>
            {NAV_ITEMS.map((item) => {
              const isActive = currentTab === item.name;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setSelected(item.name);
                    setIsMenuOpen(false);
                    if (onTabChange) onTabChange(item.name);
                  }}
                  style={{ fontFamily: "'Inter',sans-serif", fontWeight: isActive ? 600 : 400, fontSize: "16px", lineHeight: 1, color: isActive ? "#fff" : "rgba(255,255,255,0.82)", textDecoration: "none", display: "flex", alignItems: "center", height: "52px", padding: "0 18px", borderRadius: "14px", border: isActive ? "1px solid rgba(140,103,254,0.28)" : "1px solid transparent", background: isActive ? "linear-gradient(135deg,rgba(140,103,254,0.22) 0%,rgba(116,79,231,0.12) 100%)" : "transparent" }}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)}
            style={{ margin: "8px 16px 32px", display: "flex", alignItems: "center", justifyContent: "center", height: "50px", borderRadius: "100px", background: "linear-gradient(133.45deg,#8C67FE 9.67%,#EAE1FF 100%)", boxShadow: "0 4px 16px rgba(94,75,142,0.38)", textDecoration: "none", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "15px", color: "#fff" }}>
            Let&apos;s Talk
          </Link>
        </nav>
      </>,
      document.body
    )
    : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        /* ── Fixed Header Bar (Transparent background per user request) ── */
        header.hdr-fixed-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 1000000 !important;
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border-bottom: none !important;
          box-shadow: none !important;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, visibility 0.45s;
          pointer-events: auto;
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        header.hdr-fixed-header.scrolled {
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border-bottom: none !important;
          box-shadow: none !important;
        }

        /* When viewport is locked (e.g. process steps section), slide up and hide header smoothly */
        html.viewport-locked header.hdr-fixed-header {
          opacity: 0 !important;
          pointer-events: none !important;
          transform: translateY(-100%) !important;
          visibility: hidden !important;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, visibility 0.45s !important;
        }

        /* ── Logo glassmorphism pill (Default / Dark) ── */
        .hdr-logo-glass {
          display: flex;
          align-items: center;
          padding: 7px 16px 7px 10px;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 4px 20px rgba(4, 2, 18, 0.35),
                      inset 0 1px 0 rgba(255,255,255,0.12);
          transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          flex-shrink: 0;
        }
        .hdr-logo-glass:hover {
          background: rgba(255, 255, 255, 0.13);
          border-color: rgba(255, 255, 255, 0.22);
          box-shadow: 0 6px 28px rgba(4, 2, 18, 0.45),
                      inset 0 1px 0 rgba(255,255,255,0.18);
        }
        .hdr-brand-link {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; user-select: none;
        }
        .hdr-logo-glow {
          height: auto; object-fit: contain;
          filter: drop-shadow(0 0 10px rgba(116,79,231,0.9)) drop-shadow(0 0 20px rgba(145,200,230,0.5));
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .hdr-logo-glass:hover .hdr-logo-glow {
          transform: scale(1.05);
          filter: drop-shadow(0 0 14px rgba(116,79,231,1)) drop-shadow(0 0 28px rgba(145,200,230,0.75));
        }
        .hdr-brand-text {
          width: 116px; height: auto;
          object-fit: contain; filter: drop-shadow(0 0 8px rgba(191,239,255,0.35));
          transition: filter 0.3s ease;
        }

        /* ── Light-mode Logo Pill (Matching Image 2: zolarys) ── */
        .hdr-logo-glass.light-logo {
          background: rgba(0, 0, 0, 0.045);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.03);
        }
        .hdr-logo-glass.light-logo .hdr-brand-text {
          filter: brightness(0.12);
        }
        .hdr-logo-glass.light-logo .hdr-logo-glow {
          filter: drop-shadow(0 0 6px rgba(116,79,231,0.5));
        }
        .hdr-nav-pill {
          position: relative;
          box-sizing: border-box;
          width: min(540px, 48vw);
          height: 58px;
          border-radius: 355.245px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 0 12px;
          user-select: none;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.09);
          box-shadow: none;
        }

        /* ── Left-top corner curve border highlight ONLY (no harsh cutoff) ── */
        .hdr-nav-pill::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 355.245px;
          border: 1.5px solid rgba(255, 255, 255, 0.9);
          pointer-events: none;
          z-index: 3;
          -webkit-mask-image: radial-gradient(circle at 0px 0px, #000 0%, #000 22px, transparent 52px);
          mask-image: radial-gradient(circle at 0px 0px, #000 0%, #000 22px, transparent 52px);
        }

        /* ── Right-bottom corner curve border highlight ONLY (no harsh cutoff) ── */
        .hdr-nav-pill::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 355.245px;
          border: 1.5px solid rgba(255, 255, 255, 0.9);
          pointer-events: none;
          z-index: 3;
          -webkit-mask-image: radial-gradient(circle at 100% 100%, #000 0%, #000 22px, transparent 52px);
          mask-image: radial-gradient(circle at 100% 100%, #000 0%, #000 22px, transparent 52px);
        }

        /* ── Active sliding background pill ── */
        .hdr-sliding-pill {
          position: absolute;
          top: calc((100% - 40px) / 2);
          height: 40px;
          border-radius: 22px;
          background: linear-gradient(180deg, rgba(140,103,255,0.28) 0%, rgba(130,90,255,0.38) 100%);
          border: 1px solid rgba(255,255,255,0.28);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          box-shadow:
            0 2px 14px rgba(100,60,220,0.25),
            inset 0 1px 1px rgba(255,255,255,0.35),
            inset 0 -1px 1px rgba(255,255,255,0.12);
          pointer-events: none;
          z-index: 1;
          /* No transition by default to prevent animation from the left on page mount */
          transition: none;
        }

        .hdr-sliding-pill.ready {
          transition:
            left   0.92s cubic-bezier(0.25, 0.85, 0.25, 1),
            width  0.92s cubic-bezier(0.25, 0.85, 0.25, 1),
            background 0.45s ease,
            box-shadow 0.45s ease,
            border-color 0.45s ease;
        }

        /* Molten liquid state: melts and glows while gliding smoothly between tabs */
        .hdr-sliding-pill.melting {
          transition:
            left   0.92s cubic-bezier(0.25, 0.85, 0.25, 1),
            width  0.92s cubic-bezier(0.25, 0.85, 0.25, 1),
            background 0.45s ease,
            box-shadow 0.45s ease,
            border-color 0.45s ease;
          background: linear-gradient(90deg, rgba(168,85,247,0.5) 0%, rgba(216,180,254,0.78) 50%, rgba(168,85,247,0.5) 100%);
          border: 1.5px solid rgba(233,213,255,0.6);
          box-shadow: 0 0 28px rgba(168,85,247,0.8), inset 0 1px 2px rgba(255,255,255,0.65);
          border-radius: 20px;
          filter: blur(0.3px);
        }

        .hdr-sliding-pill.melting.dir-right {
          background: linear-gradient(90deg, rgba(147,51,234,0.2) 0%, rgba(192,132,252,0.65) 55%, rgba(233,213,255,0.92) 100%);
          box-shadow: -12px 0 28px rgba(168,85,247,0.7), 0 0 24px rgba(168,85,247,0.65), inset 0 1px 2px rgba(255,255,255,0.7);
        }

        .hdr-sliding-pill.melting.dir-left {
          background: linear-gradient(270deg, rgba(147,51,234,0.2) 0%, rgba(192,132,252,0.65) 55%, rgba(233,213,255,0.92) 100%);
          box-shadow: 10px 0 28px rgba(168,85,247,0.7), 0 0 24px rgba(168,85,247,0.65), inset 0 1px 2px rgba(255,255,255,0.7);
        }

        /* Solidifies upon landing at the switched tab */
        .hdr-sliding-pill.solidifying {
          animation: pillSolidify 0.36s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes pillSolidify {
          0%   { transform: scale(1.06, 0.94); }
          50%  { transform: scale(0.98, 1.02); }
          100% { transform: scale(1, 1); }
        }

        /* ── Nav item text ── */
        .hdr-nav-item {
          position: relative;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 15px;
          line-height: 1;
          color: rgba(255,255,255,0.78);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 0;
          min-width: 0;
          max-width: 110px;
          height: 40px;
          padding: 0 16px;
          border-radius: 22px;
          z-index: 2;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .hdr-nav-item:hover { color: #ffffff; }
        .hdr-nav-item.active { font-weight: 600; color: #ffffff; }

        /* ── Light-mode Nav Pill  ── */
        .hdr-nav-pill.light-mode {
          background: rgba(0, 0, 0, 0.045);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.03);
        }

        /* Hide dark-mode glowing corner highlights on light mode */
        .hdr-nav-pill.light-mode::before,
        .hdr-nav-pill.light-mode::after {
          opacity: 0;
        }

        /* Light-mode nav item text: clean dark charcoal matching Image 2 */
        .hdr-nav-pill.light-mode .hdr-nav-item {
          color: #222222;
          font-weight: 500;
        }
        .hdr-nav-pill.light-mode .hdr-nav-item:hover {
          color: #744FE7;
        }
        .hdr-nav-pill.light-mode .hdr-nav-item.active {
          color: #ffffff;
          font-weight: 600;
        }

        /* Light-mode active sliding pill */
        .hdr-nav-pill.light-mode .hdr-sliding-pill {
          background: linear-gradient(180deg, #8C67FE 0%, #744FE7 100%);
          border: 1px solid rgba(255, 255, 255, 0.45);
          box-shadow: 0 4px 14px rgba(116, 79, 231, 0.28);
        }




        /* ── Let's Talk ── */
        .hdr-talk-cta {
          box-sizing: border-box;
          width: 145px; height: 48px;
          background: linear-gradient(133.45deg, #8C67FE 9.67%, #EAE1FF 100%);
          box-shadow: 0px 4px 16px rgba(94,75,142,0.34), inset 0px 1px 0px rgba(255,255,255,0.14);
          border-radius: 100px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 4px 0 20px;
          cursor: pointer; text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hdr-talk-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0px 6px 22px rgba(94,75,142,0.5), inset 0px 1px 0px rgba(255,255,255,0.25);
        }
        .hdr-talk-text { font-family:'Inter',sans-serif; font-weight:500; font-size:15px; color:#fff; }
        .hdr-talk-arrow {
          width:40px; height:40px;
          background: rgba(235,235,235,0.1);
          backdrop-filter: blur(1.8px);
          border-radius: 24px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .hdr-talk-cta:hover .hdr-talk-arrow { background:rgba(235,235,235,0.2); transform:rotate(45deg); }

        /* ── Hamburger (mobile only) ── */
        .hdr-menu-toggle {
          display: none;
          width: 42px; height: 42px;
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #fff; cursor: pointer;
          align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .hdr-menu-toggle:hover { background:rgba(255,255,255,0.14); border-color:rgba(255,255,255,0.35); }

        @media (max-width: 1080px) and (min-width: 761px) {
          .hdr-nav-pill   { width: min(520px, 50vw); }
          .hdr-talk-cta   { width: 126px; padding-left: 16px; }
          .hdr-brand-text { width: 112px; margin-left: 4px; }
          .hdr-brand-link { gap: 8px; }
          .hdr-nav-item   { font-size: 13.5px; padding: 0 4px; }
        }
        @media (max-width: 760px) {
          .hdr-fixed-header { min-height: 56px !important; }
          .hdr-header-inner { padding-top: 12px !important; min-height: 56px !important; }
          .hdr-menu-toggle { display: flex; }
          .hdr-nav-pill    { display: none !important; }
          .hdr-talk-cta   { display: none; }
        }
        @media (max-width: 420px) {
          .hdr-brand-text { width: 104px; margin-left: 0; }
          .hdr-logo-glow  { width: 30px !important; height: 30px !important; }
        }
      `}</style>

      {drawerPortal}

      <header
        className={`hdr-fixed-header${isScrolled ? " scrolled" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <div
          className="hdr-header-inner"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1440px",
            margin: "0 auto",
            boxSizing: "border-box",
            minHeight: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            padding: isScrolled ? "12px clamp(20px, 4vw, 50px)" : "16px clamp(20px, 4vw, 50px)",
            transition: "padding 0.3s ease",
          }}
        >
          {/* Brand – glassmorphism pill */}
          <Link href="/" className={`hdr-logo-glass${isLightBg ? " light-logo" : ""}`}>
            <span className="hdr-brand-link">
              <Image src="/asset/logo.png" alt="Gelora Tech" width={32} height={32} priority className="hdr-logo-glow" />
              <Image src="/asset/gtText.png" alt="Gelora Tech" width={116} height={40} className="hdr-brand-text" />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            ref={navPillRef as React.RefObject<HTMLElement>}
            className={`hdr-nav-pill${isLightBg ? " light-mode" : ""}`}
            aria-label="Main Navigation"
          >
            {/* Active Background Pill (melts and moves slowly side-by-side) */}
            <div
              className={`hdr-sliding-pill${pillReady ? " ready" : ""}${isMelting ? ` melting dir-${meltDirection}` : ""}${isSolidifying ? " solidifying" : ""}`}
              style={{
                left: pillLeft,
                width: pillWidth,
                opacity: pillReady ? 1 : 0,
                visibility: pillReady ? "visible" : "hidden",
              }}
              aria-hidden="true"
            />

            {NAV_ITEMS.map((item, idx) => {
              const isActive = currentTab === item.name;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  ref={(el) => { navItemRefs.current[idx] = el; }}
                  onClick={(e) => handleNavClick(item.name, item.href, e)}
                  className={`hdr-nav-item${isActive ? " active" : ""}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            className="hdr-menu-toggle"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((o) => !o)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>

          {/* Let's Talk (desktop) */}
          <Link href="/contact" className="hdr-talk-cta">
            <span className="hdr-talk-text">Let&apos;s Talk</span>
            <div className="hdr-talk-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </Link>
        </div>
      </header>
    </>
  );
}
