"use client";

import Footer from "@/app/components/Footer";

interface ProjectItem {
  id: string;
  category: string;
  title: string;
  desc: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "1",
    category: "WEBSITE · CORPORATE",
    title: "Lorem Ipsum Platform",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "2",
    category: "WEBSITE · CORPORATE",
    title: "Lorem Ipsum Platform",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "3",
    category: "WEBSITE · CORPORATE",
    title: "Lorem Ipsum Platform",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "4",
    category: "WEBSITE · CORPORATE",
    title: "Lorem Ipsum Platform",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "5",
    category: "WEBSITE · CORPORATE",
    title: "Lorem Ipsum Platform",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "6",
    category: "WEBSITE · CORPORATE",
    title: "Lorem Ipsum Platform",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default function ProductPage() {
  return (
    <main className="product-main">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .product-main {
          min-height: 100vh;
          width: 100%;
          background: #080415 url('/asset/bg.png') top center / cover no-repeat;
          position: relative;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* Ambient Glow Background for depth */
        .product-bg-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(1200px, 100vw);
          height: 700px;
          background: radial-gradient(
            ellipse 60% 50% at 50% 25%,
            rgba(116, 79, 231, 0.18) 0%,
            rgba(78, 44, 175, 0.08) 50%,
            transparent 80%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Hero & Header Section */
        .product-hero-section {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: clamp(135px, 17vh, 185px) clamp(20px, 4vw, 40px) 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-sizing: border-box;
        }

        /* Title: What We've Built (Figma: font-size 80px, line-height 82px, font-weight 700) */
        .product-title {
          margin: 0;
          max-width: 780px;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: clamp(26px, 3vw, 60px);
          line-height: 1.05;
          letter-spacing: -0.025em;
          text-align: center;
          color: #FFFFFF;
        }

        /* Subtitle (Figma: width 715.96px, font-size 20px, line-height 33px, font-weight 400) */
        .product-desc {
          margin: clamp(20px, 2.8vh, 36px) auto 0;
          max-width: 716px;
          width: 100%;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(13px, 1.12vw, 17px);
          line-height: 1.6;
          text-align: center;
          color: #ffffff;
          opacity: 0.92;
          animation: careersFadeUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Button: Explore Projects (Figma: width 277px, height 59px, background #744FE7, border-radius 54px) */
        .product-btn {
          box-sizing: border-box;
          width: min(267px, 78vw);
          height: 59px;
          background: #744FE7;
          border-radius: 54px;
          border: none;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 1;
          letter-spacing: 0.01em;
          color: #FFFFFF;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 8px 24px rgba(116, 79, 231, 0.32);
          margin-top: clamp(38px, 5.2vh, 56px);
        }

        .product-btn:hover {
          background: #653fd6;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(116, 79, 231, 0.46);
        }

        .product-btn:active {
          transform: translateY(0);
          box-shadow: 0 6px 18px rgba(116, 79, 231, 0.36);
        }

        /* Divider: Line 58 (Figma: width 1301px, height 0px, border 1px solid rgba(0,0,0,0.26)) */
        .product-divider {
          width: min(1301px, 92vw);
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(224, 213, 255, 0.18) 18%,
            rgba(224, 213, 255, 0.26) 50%,
            rgba(224, 213, 255, 0.18) 82%,
            rgba(255, 255, 255, 0) 100%
          );
          margin: clamp(64px, 9vh, 107px) auto 0;
          border: none;
        }

        /* Sub-heading: • SELECTED WORK (Figma: font-size 20px, line-height 30px, letter-spacing 0.12em) */
        .selected-work-label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(12px, 1.2vw, 18px);
          line-height: 30px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-align: center;
          color: #A58BFA;
          margin-top: clamp(34px, 4.8vh, 51px);
        }

        .selected-work-dot {
          width: 6px;
          height: 6px;
          background: #A58BFA;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 10px rgba(165, 139, 250, 0.8);
          flex-shrink: 0;
        }

        /* ══════════════════════════════════════════════════════════
           SELECTED WORK GRID SECTION
           ══════════════════════════════════════════════════════════ */
        .selected-work-section {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: clamp(48px, 6vh, 68px) clamp(20px, 4vw, 40px) clamp(100px, 14vh, 160px);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(280px, 372px));
          column-gap: clamp(20px, 2.4vw, 36px);
          row-gap: clamp(44px, 6vh, 68px);
          justify-content: center;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
        }

        .project-card-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          max-width: 372px;
          box-sizing: border-box;
        }

        /* Rectangle 264 (Figma: width 372px, height 350px, border-radius 28px) */
        .project-thumb-box {
          position: relative;
          width: 100%;
          height: clamp(280px, 30vw, 350px);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(116, 79, 231, 0.12) 100%
          ), rgba(20, 14, 40, 0.55);
          border: 1px solid rgba(224, 213, 255, 0.12);
          border-radius: 28px;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
          cursor: pointer;
        }

        .project-thumb-box:hover {
          transform: translateY(-5px);
          border-color: rgba(165, 139, 250, 0.38);
          box-shadow: 0 20px 45px rgba(116, 79, 231, 0.26);
        }

        /* Subtle ambient glow inside card */
        .project-thumb-inner-glow {
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(116, 79, 231, 0.25) 0%, transparent 70%);
          pointer-events: none;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }

        .project-thumb-box:hover .project-thumb-inner-glow {
          transform: scale(1.3);
          opacity: 0.9;
        }

        /* Rectangle 267: Button: View Case Study ↗ (Figma: width 198px, height 42px, background #F4F0FF, border-radius 54px) */
        .project-case-btn {
          position: relative;
          z-index: 2;
          width: 198px;
          height: 42px;
          background: #F4F0FF;
          border-radius: 54px;
          border: none;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 14.5px;
          line-height: 1;
          color: #572ED7;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          cursor: pointer;
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease, color 0.22s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
        }

        .project-case-btn:hover {
          background: #FFFFFF;
          color: #451ec9;
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(244, 240, 255, 0.38);
        }

        .project-case-arrow {
          font-size: 15px;
          display: inline-block;
          transition: transform 0.2s ease;
        }

        .project-case-btn:hover .project-case-arrow {
          transform: translate(2px, -2px);
        }

        /* WEBSITE · CORPORATE (Figma: font-size 16px, line-height 30px, color #572ED7) */
        .project-item-category {
          margin-top: 22px;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 24px;
          letter-spacing: -0.01em;
          color: #9D7BFF;
          text-align: left;
        }

        /* Lorem Ipsum Platform (Figma: font-size 40px, line-height 47px, font-weight 700) */
        .project-item-title {
          margin: 6px 0 0 0;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: clamp(24px, 2.2vw, 324px);
          line-height: 1.2;
          color: #FFFFFF;
          text-align: left;
          letter-spacing: -0.02em;
        }

        /* Description text */
        .project-item-desc {
          margin: 12px 0 0 0;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(12.5px, 1.2vw, 14px);
          line-height: 1.58;
          color: rgba(224, 213, 255, 0.74);
          text-align: left;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1140px) {
          .projects-grid {
            grid-template-columns: repeat(2, minmax(280px, 372px));
            row-gap: 52px;
          }
        }

        @media (max-width: 768px) {
          .product-hero-section {
            padding-top: 130px;
          }

          .product-title {
            font-size: 40px;
            line-height: 48px;
          }

          .product-desc {
            font-size: 15px;
            line-height: 25px;
            padding: 0 8px;
          }

          .product-btn {
            width: min(260px, 86vw);
            height: 52px;
            font-size: 15px;
          }

          .product-divider {
            margin-top: 54px;
          }

          .selected-work-label {
            font-size: 14px;
            margin-top: 28px;
            letter-spacing: 0.10em;
          }

          .selected-work-section {
            padding-top: 40px;
            padding-bottom: 80px;
          }

          .projects-grid {
            grid-template-columns: minmax(260px, 420px);
            row-gap: 46px;
          }

          .project-card-item {
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .product-hero-section {
            padding-top: 115px;
          }

          .product-title {
            font-size: 34px;
            line-height: 40px;
          }

          .product-desc {
            font-size: 14px;
            line-height: 22px;
          }

          .product-btn {
            width: 100%;
            max-width: 250px;
            height: 48px;
            font-size: 14.5px;
          }

          .project-thumb-box {
            height: 280px;
            border-radius: 22px;
          }

          .project-item-title {
            font-size: 24px;
          }
        }
      `}</style>

      {/* Ambient background glow */}
      <div className="product-bg-glow" aria-hidden="true" />

      {/* Hero Section */}
      <section className="product-hero-section" aria-label="Product Showcase">
        {/* Main Title */}
        <h1 className="product-title">What We&apos;ve Built</h1>

        {/* Subtitle */}
        <p className="product-desc">
          A selection of websites, applications, and digital platforms designed and developed to solve real problems.
        </p>

        {/* Action Button */}
        <button type="button" className="product-btn">
          Explore Products
        </button>

        {/* Full-width hairline divider (Line 58) */}
        <div className="product-divider" aria-hidden="true" />

      </section>

      {/* Selected Work Grid Section */}
      <section className="selected-work-section" aria-label="Selected Projects">
        <div className="projects-grid">
          {PROJECTS_DATA.map((project) => (
            <article key={project.id} className="project-card-item">
              {/* Thumbnail Container (Rectangle 264) */}
              <div className="project-thumb-box">
                <div className="project-thumb-inner-glow" aria-hidden="true" />
                {/* Button: View Case Study ↗ (Rectangle 267) */}
                <button type="button" className="project-case-btn">
                  <span>View Case Study</span>
                  <span className="project-case-arrow" aria-hidden="true">↗</span>
                </button>
              </div>

              {/* Tag / Category (WEBSITE · CORPORATE) */}
              <span className="project-item-category">{project.category}</span>

              {/* Title (Lorem Ipsum Platform) */}
              <h2 className="project-item-title">{project.title}</h2>

              {/* Description */}
              <p className="project-item-desc">{project.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
