"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface HeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/pages/Services" },
  { name: "About", href: "/pages/About" },
  { name: "Careers", href: "/pages/Careers" },
];

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const pathname = usePathname();
  const [selected, setSelected] = useState(activeTab || "Home");

  const currentTab = activeTab || selected;

  const handleNavClick = (name: string) => {
    setSelected(name);
    if (onTabChange) onTabChange(name);
  };

  return (
    <header
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1440px",
        boxSizing: "border-box",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 50px",
        zIndex: 50,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Orbitron:wght@400;700&display=swap');

        .hdr-brand-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          user-select: none;
        }

        .hdr-logo-glow {
          object-fit: contain;
          filter: drop-shadow(0 0 10px rgba(116, 79, 231, 0.9)) drop-shadow(0 0 20px rgba(145, 200, 230, 0.5));
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .hdr-brand-link:hover .hdr-logo-glow {
          transform: scale(1.05);
          filter: drop-shadow(0 0 14px rgba(116, 79, 231, 1)) drop-shadow(0 0 28px rgba(145, 200, 230, 0.75));
        }

        .hdr-title-txt {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.28em;
          color: #ffffff;
          line-height: 1;
        }

        .hdr-sub-txt {
          font-family: 'Orbitron', sans-serif;
          font-size: 8px;
          letter-spacing: 0.7em;
          color: rgba(191, 239, 255, 0.95);
          margin-top: 4px;
          text-shadow: 0 0 8px rgba(191, 239, 255, 0.8);
        }

        /* ─── Frame 2: Navbar Outer Pill ─── */
        .hdr-nav-pill {
          position: relative;
          box-sizing: border-box;
          width: 470px;
          height: 48px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 355.245px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          padding: 4px 8px;
          user-select: none;
        }

        /* Nav Item Link */
        .hdr-nav-item {
          position: relative;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 15px;
          line-height: 18px;
          color: #FFFFFF;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 38px;
          padding: 0 16px;
          border-radius: 24px;
          z-index: 2;
          transition: color 0.25s ease, background 0.25s ease;
        }

        .hdr-nav-item:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
        }

        /* Active Item Pill: Group 9 / Rectangle 11 & 12 */
        .hdr-nav-item.active {
          width: 98px;
          height: 38px;
          background: linear-gradient(180deg, rgba(116, 79, 231, 0) 0%, rgba(153, 153, 153, 0.17) 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(1.8px);
          -webkit-backdrop-filter: blur(1.8px);
          border-radius: 24px;
          font-weight: 500;
          color: #FFFFFF;
        }

        /* Let's Talk CTA Button */
        .hdr-talk-cta {
          box-sizing: border-box;
          width: 152px;
          height: 48px;
          background: linear-gradient(133.45deg, #8C67FE 9.67%, #EAE1FF 100%);
          box-shadow: 0px 4px 16px rgba(94, 75, 142, 0.34), inset 0px 1px 0px rgba(255, 255, 255, 0.14);
          border-radius: 100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4px 0 20px;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hdr-talk-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0px 6px 22px rgba(94, 75, 142, 0.5), inset 0px 1px 0px rgba(255, 255, 255, 0.25);
        }

        .hdr-talk-text {
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 18px;
          color: #FFFFFF;
        }

        .hdr-talk-arrow {
          box-sizing: border-box;
          width: 40px;
          height: 40px;
          background: rgba(235, 235, 235, 0.1);
          backdrop-filter: blur(1.8px);
          -webkit-backdrop-filter: blur(1.8px);
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
      `}</style>

      {/* Brand Logo & Name */}
      <Link href="/" className="hdr-brand-link">
        <Image
          src="/asset/logo.png"
          alt="Gelora Tech"
          width={34}
          height={34}
          priority
          className="hdr-logo-glow"
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span className="hdr-title-txt">GELORA</span>
          <span className="hdr-sub-txt">— TECH —</span>
        </div>
      </Link>

      {/* Frame 2 Nav Pill */}
      <nav className="hdr-nav-pill" aria-label="Main Navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = currentTab === item.name || (item.href !== "/" && pathname?.startsWith(item.href));
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

      {/* Let's Talk Button */}
      <Link href="/pages/About" className="hdr-talk-cta">
        <span className="hdr-talk-text">Let&apos;s Talk</span>
        <div className="hdr-talk-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </Link>
    </header>
  );
}
