"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [selected, setSelected] = useState(activeTab || "Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const currentTab =
    NAV_ITEMS.find((item) => item.href === pathname)?.name ||
    activeTab ||
    selected;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[pathname] || "Gelora Tech";
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleNavClick = (name: string) => {
    setSelected(name);
    setIsMenuOpen(false);
    if (onTabChange) onTabChange(name);
  };

  // Portal content — rendered at document.body to escape any stacking context
  const drawerPortal = mounted
    ? createPortal(
        <>
          {/* ── Backdrop Overlay ── */}
          <div
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(4, 2, 18, 0.55)",
              backdropFilter: isMenuOpen ? "blur(3px)" : "none",
              WebkitBackdropFilter: isMenuOpen ? "blur(3px)" : "none",
              zIndex: 9998,
              opacity: isMenuOpen ? 1 : 0,
              pointerEvents: isMenuOpen ? "auto" : "none",
              transition: "opacity 0.35s ease, backdrop-filter 0.35s ease",
            }}
            aria-hidden="true"
          />

          {/* ── Right-Side Drawer ── */}
          <nav
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(320px, 82vw)",
              background: "linear-gradient(160deg, rgba(18,12,45,0.98) 0%, rgba(11,9,22,0.98) 100%)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "-16px 0 60px rgba(4,2,18,0.6)",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.38s cubic-bezier(0.25, 0.86, 0.25, 1)",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
            } as React.CSSProperties}
          >
            {/* Drawer Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 22px 18px",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                flexShrink: 0,
              }}
            >
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
              >
                <Image
                  src="/asset/logo.png"
                  alt="Gelora Tech"
                  width={30}
                  height={30}
                  style={{ filter: "drop-shadow(0 0 10px rgba(116,79,231,0.9))" }}
                />
                <Image
                  src="/asset/gtText.png"
                  alt="Gelora Tech"
                  width={104}
                  height={36}
                  style={{ filter: "drop-shadow(0 0 8px rgba(191,239,255,0.35))" }}
                />
              </Link>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  width: 38,
                  height: 38,
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.07)",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.2s, transform 0.2s",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Nav Items */}
            <div style={{ display: "flex", flexDirection: "column", padding: "20px 16px", gap: "6px", flex: 1 }}>
              {NAV_ITEMS.map((item) => {
                const isActive =
                  currentTab === item.name ||
                  (item.href !== "/" && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => handleNavClick(item.name)}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: isActive ? 600 : 400,
                      fontSize: "16px",
                      lineHeight: 1,
                      color: isActive ? "#fff" : "rgba(255,255,255,0.82)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      height: "52px",
                      padding: "0 18px",
                      borderRadius: "14px",
                      border: isActive
                        ? "1px solid rgba(140,103,254,0.28)"
                        : "1px solid transparent",
                      background: isActive
                        ? "linear-gradient(135deg, rgba(140,103,254,0.22) 0%, rgba(116,79,231,0.12) 100%)"
                        : "transparent",
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* CTA */}
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              style={{
                margin: "8px 16px 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "50px",
                borderRadius: "100px",
                background: "linear-gradient(133.45deg, #8C67FE 9.67%, #EAE1FF 100%)",
                boxShadow: "0 4px 16px rgba(94,75,142,0.38)",
                textDecoration: "none",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "15px",
                color: "#fff",
              }}
            >
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Orbitron:wght@400;700&display=swap');

        .hdr-brand-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          user-select: none;
          flex-shrink: 0;
        }
        .hdr-logo-glow {
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 0 10px rgba(116, 79, 231, 0.9)) drop-shadow(0 0 20px rgba(145, 200, 230, 0.5));
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .hdr-brand-link:hover .hdr-logo-glow {
          transform: scale(1.05);
          filter: drop-shadow(0 0 14px rgba(116, 79, 231, 1)) drop-shadow(0 0 28px rgba(145, 200, 230, 0.75));
        }
        .hdr-brand-text {
          width: 124px;
          height: auto;
          margin-left: 12px;
          object-fit: contain;
          filter: drop-shadow(0 0 8px rgba(191, 239, 255, 0.35));
        }

        /* Desktop Nav Pill */
        .hdr-nav-pill {
          position: relative;
          box-sizing: border-box;
          width: min(570px, 48vw);
          height: 48px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 355px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 5px 6px;
          user-select: none;
        }
        .hdr-nav-item {
          position: relative;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 15px;
          line-height: 18px;
          color: #FFFFFF;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 0;
          min-width: 0;
          max-width: 100px;
          height: 38px;
          padding: 0 8px;
          border: 1px solid transparent;
          border-radius: 24px;
          z-index: 2;
          cursor: pointer;
          transition: color 0.25s ease, background 0.25s ease, border-color 0.25s ease;
        }
        .hdr-nav-item:hover {
          background: rgba(255, 255, 255, 0.08);
        }
        .hdr-nav-item.active {
          background: linear-gradient(180deg, rgba(116, 79, 231, 0) 0%, rgba(153, 153, 153, 0.17) 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(1.8px);
          font-weight: 500;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
        }

        /* Let's Talk Button */
        .hdr-talk-cta {
          box-sizing: border-box;
          width: 145px;
          height: 48px;
          background: linear-gradient(133.45deg, #8C67FE 9.67%, #EAE1FF 100%);
          box-shadow: 0px 4px 16px rgba(94, 75, 142, 0.34), inset 0px 1px 0px rgba(255, 255, 255, 0.14);
          border-radius: 100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4px 0 20px;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hdr-talk-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0px 6px 22px rgba(94, 75, 142, 0.5), inset 0px 1px 0px rgba(255, 255, 255, 0.25);
        }
        .hdr-talk-text {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 15px;
          color: #FFFFFF;
        }
        .hdr-talk-arrow {
          width: 40px;
          height: 40px;
          background: rgba(235, 235, 235, 0.1);
          backdrop-filter: blur(1.8px);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .hdr-talk-cta:hover .hdr-talk-arrow {
          background: rgba(235, 235, 235, 0.2);
          transform: rotate(45deg);
        }

        /* Hamburger toggle (mobile only) */
        .hdr-menu-toggle {
          display: none;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #fff;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .hdr-menu-toggle:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.35);
        }

        @media (max-width: 1080px) and (min-width: 761px) {
          .hdr-nav-pill { width: min(500px, 45vw); }
          .hdr-talk-cta { width: 126px; padding-left: 16px; }
          .hdr-brand-text { width: 112px; margin-left: 4px; }
          .hdr-brand-link { gap: 8px; }
          .hdr-nav-item { font-size: 14px; padding: 0 5px; }
        }

        @media (max-width: 760px) {
          header { min-height: 56px !important; }
          .hdr-menu-toggle { display: flex; }
          .hdr-nav-pill { display: none !important; }
          .hdr-talk-cta { display: none; }
        }

        @media (max-width: 420px) {
          .hdr-brand-text { width: 104px; margin-left: 0; }
          .hdr-logo-glow { width: 30px !important; height: 30px !important; }
        }
      `}</style>

      {/* Drawer portal (renders at document.body) */}
      {drawerPortal}

      {/* Main header bar */}
      <header
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
          padding: "0 clamp(20px, 4vw, 50px)",
          zIndex: 50,
        }}
      >
        {/* Brand */}
        <Link href="/" className="hdr-brand-link">
          <Image src="/asset/logo.png" alt="Gelora Tech" width={34} height={34} priority className="hdr-logo-glow" />
          <Image src="/asset/gtText.png" alt="Gelora Tech" width={124} height={42} className="hdr-brand-text" />
        </Link>

        {/* Desktop nav pill */}
        <nav className="hdr-nav-pill" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive =
              currentTab === item.name ||
              (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item.name)}
                className={`hdr-nav-item ${isActive ? "active" : ""}`}
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
        <Link href="/about" className="hdr-talk-cta">
          <span className="hdr-talk-text">Let&apos;s Talk</span>
          <div className="hdr-talk-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </Link>
      </header>
    </>
  );
}
