"use client";

import Footer from "@/app/components/Footer";

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

        /* Hero Section */
        .product-hero-section {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: clamp(135px, 17vh, 185px) clamp(20px, 4vw, 60px) 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-sizing: border-box;
        }

        .product-title {
          margin: 0;
          max-width: 780px;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: clamp(28px, 3.2vw, 60px);
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: #FFFFFF;
        }

        .product-desc {
          margin: clamp(20px, 2.8vh, 36px) auto 0;
          max-width: 716px;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: clamp(13px, 1.12vw, 17px);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.88);
        }

        .product-btn {
          box-sizing: border-box;
          width: min(267px, 78vw);
          height: 59px;
          background: #744FE7;
          border-radius: 54px;
          border: none;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 16px;
          color: #FFFFFF;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-top: clamp(28px, 4vh, 48px);
          transition: background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
          box-shadow: 0 6px 24px rgba(116, 79, 231, 0.36);
          text-decoration: none;
        }

        .product-btn:hover {
          background: #5E38C8;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(116, 79, 231, 0.48);
        }

        .product-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(224, 213, 255, 0.18) 20%,
            rgba(165, 139, 250, 0.36) 50%,
            rgba(224, 213, 255, 0.18) 80%,
            transparent 100%
          );
          margin-top: clamp(56px, 7vh, 80px);
        }

        /* Selected Work Section */
        .selected-work-section {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: clamp(48px, 6vh, 68px) clamp(20px, 4vw, 60px) clamp(100px, 14vh, 160px);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .selected-work-label {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 13px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #A58BFA;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 32px;
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

        /* 3-column row grid aligning from the start (left) */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          width: 100%;
          justify-items: start;
        }

        /* Entire card column item */
        .project-card-item {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 360px;
          gap: 16px;
        }

        /* 3D Flip Card Container */
        .flip-card {
          width: 100%;
          height: 240px;
          perspective: 1200px;
          cursor: pointer;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        /* Front & Back faces */
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
          box-sizing: border-box;
        }

        /* FRONT FACE: Screenshot Banner */
        .flip-card-front {
          background: #110924;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .flip-card:hover .flip-card-front {
          border-color: rgba(165, 139, 250, 0.35);
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.55);
        }

        .flip-front-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .flip-card:hover .flip-front-img {
          transform: scale(1.05);
        }

        /* BACK FACE: Flip Details */
        .flip-card-back {
          background: linear-gradient(135deg, #2D1577 0%, #5227B8 50%, #6E3BD9 100%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 16px 48px rgba(116, 79, 231, 0.55);
          transform: rotateY(180deg);
          padding: 24px 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-align: center;
        }

        .flip-back-tag {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.75);
        }

        .flip-back-title {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 22px;
          line-height: 1.15;
          color: #FFFFFF;
          letter-spacing: -0.02em;
        }

        .flip-back-desc {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 12.5px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.85);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .flip-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          color: #5227B8;
          border: none;
          border-radius: 100px;
          padding: 10px 22px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 13.5px;
          line-height: 1;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          margin-top: 2px;
        }

        .flip-back-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.28);
        }

        .flip-back-btn-arrow {
          font-size: 16px;
          transition: transform 0.2s ease;
          display: inline-block;
        }

        .flip-back-btn:hover .flip-back-btn-arrow {
          transform: translate(2px, -2px);
        }

        /* ── Below the card info (Outside) ── */
        .project-card-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 0 4px;
        }

        .project-card-category {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #D4A259;
          letter-spacing: 0.01em;
        }

        .project-card-title {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 21px;
          line-height: 1.25;
          color: #FFFFFF;
          letter-spacing: -0.01em;
        }

        .project-card-desc {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.65);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1080px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
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
            padding: 0 8px;
          }
          .product-btn {
            width: min(260px, 86vw);
            height: 52px;
            font-size: 15px;
          }
        }

        @media (max-width: 680px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .project-card-item {
            max-width: 100%;
          }
          .flip-card {
            height: 220px;
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
        }
      `}</style>

      {/* Ambient glow */}
      <div className="product-bg-glow" aria-hidden="true" />

      {/* Hero Section */}
      <section className="product-hero-section" aria-label="Product Showcase">
        <h1 className="product-title">What We&apos;ve Built</h1>
        <p className="product-desc">
          A selection of websites, applications, and digital platforms designed and developed to solve real problems.
        </p>
        <a href="https://chopdi.geloratech.com/#home" target="_blank" rel="noopener noreferrer" className="product-btn">
          Explore Products
        </a>
        <div className="product-divider" aria-hidden="true" />
      </section>

      {/* Selected Work Grid Section */}
      <section className="selected-work-section" aria-label="Selected Projects">


        {/* 3-column grid — single card sits at the start (left) */}
        <div className="projects-grid">

          {/* ── Chopdi Project Item ── */}
          <div className="project-card-item">
            {/* The 3D Flip Card */}
            <div className="flip-card" role="article" aria-label="Chopdi — Your Digital Hisaab">
              <div className="flip-card-inner">

                {/* ── FRONT FACE: Preview Image ── */}
                <div className="flip-card-front">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/asset/chopdiImg.png"
                    alt="Chopdi application screenshot"
                    className="flip-front-img"
                  />
                </div>

                {/* ── BACK FACE: Flip Details ── */}
                <div className="flip-card-back">
                  <a
                    href="https://chopdi.geloratech.com/#home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flip-back-btn"
                    aria-label="View Chopdi Details (opens in new tab)"
                  >
                    <span>View More Details</span>
                    <span className="flip-back-btn-arrow" aria-hidden="true">↗</span>
                  </a>
                </div>

              </div>
            </div>

            {/* ── OUTSIDE & BELOW THE CARD: Info Text ── */}
            <div className="project-card-info">
              <h2 className="project-card-title">Chopdi</h2>
              <p className="project-card-desc">
                A digital hisaab platform built to manage financial records, loans, EMIs, interest calculations, and payment history.
              </p>
            </div>
          </div>

          {/* ── END Chopdi ── */}

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
