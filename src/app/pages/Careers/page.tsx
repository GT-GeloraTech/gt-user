"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import ApplyModal from "./ApplyModal";
import FullStackDeveloperPage from "./FullStackDeveloper";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const LEADERSHIP_DATA: TeamMember[] = [
  {
    name: "Gajraj Singh",
    role: "Founder & CEO",
    image: "/asset/maleImg.png",
  },
  {
    name: "Harsh Patyal",
    role: "Co-Founder & Team managment",
    image: "/asset/maleImg.png",
  },
];

const TEAM_DATA: TeamMember[] = [
  {
    name: "Arushi Singla",
    role: "UI/UX Designer",
    image: "/asset/femaleImg.png",
  },
  {
    name: "Bhavini Jain",
    role: "UI/UX Designer",
    image: "/asset/femaleImg.png",
  },
  {
    name: "Jessica Varghese",
    role: "UI/UX Designer",
    image: "/asset/femaleImg.png",
  },
  {
    name: "Prathamesh Ugale",
    role: "Full Stack Developer",
    image: "/asset/maleImg.png",
  },
  {
    name: "Flint Dias",
    role: "Software Developer",
    image: "/asset/maleImg.png",
  },
  {
    name: "Naga Vishnu",
    role: "Frontend Developer",
    image: "/asset/maleImg.png",
  },
  {
    name: "Pranoti Chakwate",
    role: "Mobile Developer",
    image: "/asset/femaleImg.png",
  },
  {
    name: "Rajat Rana",
    role: "QA Engineer",
    image: "/asset/maleImg.png",
  },
];

const DEPARTMENTS = [
  "All departments",
  "Development",
  "Design",
  "Marketing",
  "Internships",
];

interface Opportunity {
  id: string;
  num: string;
  title: string;
  department: string;
  type: string;
}

const OPPORTUNITIES_DATA: Opportunity[] = [
  {
    id: "01",
    num: "01",
    title: "Full Stack Developer",
    department: "Development",
    type: "Full-time",
  },
  {
    id: "02",
    num: "02",
    title: "UI/UX Designer",
    department: "Design",
    type: "Full-time",
  },
  {
    id: "03",
    num: "03",
    title: "Content Creator / Social Media Executive",
    department: "Marketing",
    type: "Full-time",
  },
  {
    id: "04",
    num: "04",
    title: "Internships",
    department: "Internships",
    type: "Internships",
  },
];

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState("All departments");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState('');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const openModal = (role = '') => { setModalRole(role); setIsModalOpen(true); };
  const closeModal = () => setIsModalOpen(false);

  const handleOpportunityClick = (job: Opportunity) => {
    if (job.title.toLowerCase().includes("full stack")) {
      setSelectedJob("full-stack");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (selectedJob === "full-stack") {
    return (
      <FullStackDeveloperPage
        onBack={() => {
          setSelectedJob(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  const filteredOpportunities =
    activeDept === "All departments"
      ? OPPORTUNITIES_DATA
      : OPPORTUNITIES_DATA.filter(
        (job) => job.department.toLowerCase() === activeDept.toLowerCase()
      );

  return (
    <main className="careers-page-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&display=swap');

        .careers-page-shell {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
          background-color: #0b0916;
          background-image: 
            radial-gradient(ellipse 65% 50% at 50% 280px, rgba(116, 79, 231, 0.24) 0%, rgba(68, 40, 150, 0.12) 45%, transparent 75%),
            radial-gradient(ellipse 75% 55% at 50% 720px, rgba(88, 52, 185, 0.18) 0%, rgba(35, 18, 75, 0.08) 55%, transparent 80%),
            radial-gradient(ellipse 60% 45% at 50% 1350px, rgba(109, 81, 198, 0.16) 0%, rgba(40, 20, 85, 0.08) 50%, transparent 75%),
            radial-gradient(ellipse 70% 50% at 50% 1950px, rgba(116, 79, 231, 0.15) 0%, transparent 75%),
            url('/asset/bg.png');
          background-position: top center, center 500px, center 1200px, center 1800px, top center;
          background-size: 100% 900px, 100% 1000px, 100% 1000px, 100% 1000px, cover;
          background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, repeat-y;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ─── Hero Section Container ─── */
        .careers-hero-wrapper {
          position: relative;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-top: clamp(90px, 14vh, 180px);
          padding-bottom: clamp(30px, 5vh, 60px);
          padding-left: clamp(16px, 3.8vw, 55px);
          padding-right: clamp(16px, 3.8vw, 55px);
          user-select: none;
        }

        /* ─── CAREERS Badge ─── */
        .careers-badge-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 24px;
          animation: careersFadeIn 0.8s ease-out forwards;
        }

        /* ─── Heading Line 1 ─── */
        .careers-heading-line1 {
          margin: clamp(12px, 2vh, 22px) 0 0 0;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: clamp(26px, 3vw, 60px);
          line-height: 1.05;
          text-align: center;
          color: #F4F1FF;
          letter-spacing: -0.02em;
          max-width: min(720px, 92vw);
          animation: careersFadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* ─── Heading Line 2 ─── */
        .careers-heading-line2 {
          margin: clamp(6px, 1vh, 12px) 0 0 0;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: clamp(26px, 3vw, 60px);
          line-height: 1.05;
          text-align: center;
          letter-spacing: -0.02em;
          background: linear-gradient(90deg, #FFFFFF 15%, #B09DEA 55%, #744FE7 88%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          max-width: min(1067px, 94vw);
          display: inline-block;
          animation: careersFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* ─── Subtitle Description ─── */
        .careers-subtitle {
          margin: clamp(14px, 2.6vh, 26px) auto 0;
          max-width: min(680px, 88vw);
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(13px, 1.2vw, 17px);
          line-height: 1.6;
          text-align: center;
          color: #FFFFFF;
          opacity: 0.92;
          animation: careersFadeUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .careers-desktop-break {
          display: block;
        }

        /* ─── Hero 3D Graphic Image ─── */
        .careers-image-container {
          position: relative;
          width: 100%;
          max-width: 1360px;
          margin-top: clamp(-24px, -1.8vw, -12px);
          display: flex;
          justify-content: center;
          align-items: center;
          animation: careersFloatIn 1.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          perspective: 1000px;
        }

        .careers-hero-image {
          width: 100%;
          max-width: 1360px;
          height: auto;
          aspect-ratio: 1319 / 482;
          object-fit: contain;
          filter: drop-shadow(0 20px 60px rgba(116, 79, 231, 0.22));
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.6s ease;
        }

        .careers-hero-image:hover {
          transform: translateY(-4px) scale(1.008);
          filter: drop-shadow(0 28px 70px rgba(116, 79, 231, 0.32));
        }

        /* ─── Our PEOPLE Section ─── */
        .people-section {
          position: relative;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: clamp(18px, 4vh, 40px);
          padding-bottom: clamp(32px, 4.5vh, 50px);
          padding-left: clamp(16px, 3vw, 40px);
          padding-right: clamp(16px, 3vw, 40px);
          user-select: none;
        }

        .people-title-wrapper {
          text-align: center;
          margin: 0;
        }

        .people-main-title {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: clamp(40px, 4vw, 54px);
          line-height: 1.1;
          text-align: center;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 12px;
        }

        .people-title-our {
          font-style: italic;
          font-weight: 400;
          color: #D3C5FF;
        }

        .people-title-people {
          font-style: normal;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: #6D51C6;
          text-shadow: 0 0 15px rgba(109, 81, 198, 0.5);
        }

        .people-subtitle {
          margin: 10px auto 0;
          max-width: 820px;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(16px, 1.8vw, 14.5px);
          line-height: clamp(20px, 1.5vw, 22px);
          text-align: center;
          color: #FFFFFF;
          opacity: 0.9;
        }

        .people-desktop-br {
          display: block;
        }

        /* ─── Category Section Badges ─── */
        .people-category-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 20px;
          margin-top: clamp(18px, 2.5vh, 26px);
        }

        .people-category-text {
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 300;
          font-size: 10.5px;
          line-height: 20px;
          letter-spacing: 0.25em;
          color: #B09DEA;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .people-cat-dot {
          display: inline-block;
          font-size: 18px;
          line-height: 1;
          color: #B09DEA;
          opacity: 0.85;
          transform: translateY(-1px);
        }

        /* ─── Cards Containers ─── */
        .leadership-cards-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 48px;
          margin-top: 20px;
          width: 100%;
        }

        .team-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 168px);
          gap: 48px;
          justify-content: center;
          margin-top: 16px;
          width: 100%;
        }

        /* ─── Individual Team Card (Rectangle 178) ─── */
        .person-card {
          box-sizing: border-box;
          width: 178px;
          height: 164px;
          background: linear-gradient(111.68deg, rgba(255, 255, 255, 0.058) 7.59%, rgba(255, 255, 255, 0.078) 102.04%);
          border: 2px solid #6D51C6;
          backdrop-filter: blur(11px);
          -webkit-backdrop-filter: blur(11px);
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding: 6px 8px 10px;
          position: relative;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease;
          box-shadow: 0 6px 18px rgba(109, 81, 198, 0.16);
        }

        .person-card:hover {
          transform: translateY(-4px);
          border-color: #9F7BF7;
          box-shadow: 0 12px 30px rgba(109, 81, 198, 0.35);
        }

        .person-card-avatar {
          position: absolute;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          height: 100px;
          width: auto;
          object-fit: contain;
          pointer-events: none;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .person-card:hover .person-card-avatar {
          transform: translateX(-50%) scale(1.04);
        }

        .person-card-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 2;
          width: 100%;
        }

        .person-name-pill {
          display: inline-block;
          background: #D3C5FF;
          color: #1A0D38;
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 11.5px;
          line-height: 1.2;
          padding: 2.5px 10px;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.22);
          text-align: center;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .person-role-text {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 9.8px;
          line-height: 1.3;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          margin-top: 2.5px;
          white-space: nowrap;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ─── View Full Team Button ─── */
        .view-team-cta {
          box-sizing: border-box;
          height: 38px;
          padding: 0 22px;
          margin-top: clamp(38px, 2.5vh, 26px);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid #B69FFF;
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 19px;
          color: #FFFFFF;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 18px rgba(182, 159, 255, 0.12);
        }

        .view-team-cta:hover {
          background: rgba(182, 159, 255, 0.2);
          border-color: #D3C5FF;
          transform: translateY(-2px);
          box-shadow: 0 8px 26px rgba(182, 159, 255, 0.28);
        }

        .view-team-arrow {
          transition: transform 0.25s ease;
        }

        .view-team-cta:hover .view-team-arrow {
          transform: translateX(3px);
        }

        /* ──────────────────────────────────────────────
         * SECTION: CURRENT OPPORTUNITIES (Light Theme)
         * ────────────────────────────────────────────── */
        .opportunities-section {
          position: relative;
          width: 100%;
          background-color: #EEEAFB;
          display: flex;
          justify-content: center;
          padding: clamp(28px, 3.8vh, 42px) clamp(16px, 3.5vw, 40px);
          box-sizing: border-box;
        }

        .opportunities-container {
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .opportunities-badge {
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          letter-spacing: 0.25em;
          color: #572ED7;
          text-transform: uppercase;
        }

        .opportunities-title {
          margin: 6px 0 16px 0;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: clamp(30px, 3.4vw, 44px);
          line-height: 1.15;
          color: #744FE7;
          letter-spacing: -0.015em;
        }

        .opportunities-title-italic {
          font-style: italic;
          font-weight: 400;
          color: #744FE7;
        }

        .opportunities-empty {
          margin: 12px 0 28px;
          padding: 20px 18px 8px;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: clamp(18px, 1.6vw, 20px);
          line-height: 1.5;
          color: #3A3555;
          text-align: center;
        }

        .opportunities-tabs-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        .dept-tab-pill {
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          font-weight: 400;
          line-height: 1;
          padding: 7px 16px;
          border-radius: 30px;
          border: 1px solid rgba(116, 79, 231, 0.18);
          background: rgba(255, 255, 255, 0.45);
          color: #4A4468;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        .dept-tab-pill:hover {
          background: rgba(216, 203, 255, 0.5);
          color: #572ED7;
          border-color: #A78BFA;
        }

        .dept-tab-pill.active {
          background: #D8CBFF;
          color: #572ED7;
          font-weight: 600;
          border-color: #B09DEA;
          box-shadow: 0 2px 10px rgba(87, 46, 215, 0.18);
        }

        .opportunities-list {
          display: flex;
          flex-direction: column;
          gap: 11px;
          width: 100%;
        }

        .opportunity-card {
          box-sizing: border-box;
          width: 100%;
          min-height: 68px;
          background: linear-gradient(111.68deg, rgba(255, 255, 255, 0.65) 7.59%, rgba(245, 240, 255, 0.45) 102.04%);
          border: 1.5px solid #C4B5FD;
          border-radius: 14px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px clamp(16px, 2.5vw, 30px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          box-shadow: 0 3px 12px rgba(116, 79, 231, 0.04);
        }

        .opportunity-card:hover {
          transform: translateY(-2px);
          border-color: #8C67FE;
          background: linear-gradient(111.68deg, rgba(255, 255, 255, 0.85) 7.59%, rgba(245, 240, 255, 0.7) 102.04%);
          box-shadow: 0 8px 22px rgba(116, 79, 231, 0.12);
        }

        .opportunity-card-left {
          display: flex;
          align-items: center;
          gap: clamp(16px, 2.2vw, 28px);
        }

        .opportunity-num {
          font-family: 'Inter', sans-serif;
          font-size: 21px;
          line-height: 1;
          font-weight: 400;
          letter-spacing: 0.12em;
          color: #7A52F5;
          min-width: 38px;
        }

        .opportunity-details {
          display: flex;
          flex-direction: column;
        }

        .opportunity-role {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 15.5px;
          line-height: 1.25;
          color: #141415;
          letter-spacing: 0.01em;
        }

        .opportunity-tags {
          margin-top: 3px;
          display: flex;
          align-items: center;
          gap: clamp(16px, 2.8vw, 34px);
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 11.5px;
          line-height: 1;
          color: rgba(46, 46, 47, 0.68);
          letter-spacing: 0.04em;
        }

        .opportunity-arrow-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid rgba(122, 82, 245, 0.35);
          background: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7A52F5;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .opportunity-card:hover .opportunity-arrow-circle {
          background: #7A52F5;
          border-color: #7A52F5;
          color: #FFFFFF;
          transform: scale(1.05);
        }

        .view-opportunities-wrapper {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-top: 18px;
        }

        .view-opportunities-btn {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 13.5px;
          line-height: 1;
          color: #572ED7;
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid #B09DEA;
          border-radius: 8px;
          padding: 9px 24px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .view-opportunities-btn:hover {
          background: rgba(255, 255, 255, 0.85);
          border-color: #744FE7;
          box-shadow: 0 4px 14px rgba(87, 46, 215, 0.15);
          transform: translateY(-1px);
        }

        /* ──────────────────────────────────────────────
         * SECTION: CAN'T FIND THE RIGHT ROLE (Dark Card)
         * ────────────────────────────────────────────── */
        /* ──────────────────────────────────────────────
         * SECTION: CAN'T FIND THE RIGHT ROLE (Dark Card)
         * ────────────────────────────────────────────── */
        .future-role-section {
          position: relative;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          padding: clamp(60px, 8vh, 100px) clamp(16px, 4vw, 50px);
        }

        .future-role-card {
          box-sizing: border-box;
          width: 100%;
          max-width: 1220px;
          min-height: 440px;
          background: 
            linear-gradient(161.1deg, rgba(130, 159, 255, 0.12) 3.78%, rgba(120, 169, 255, 0) 95.82%),
            linear-gradient(159.62deg, #0B0916 3.32%, rgba(75, 49, 143, 0.82) 96.94%);
          border: 1.5px solid rgba(167, 139, 250, 0.45);
          box-shadow: 
            0px 0px 30px rgba(167, 139, 250, 0.2),
            0px 14px 45px rgba(116, 71, 255, 0.35),
            inset -5px -5px 250px rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(21px);
          -webkit-backdrop-filter: blur(21px);
          border-radius: clamp(28px, 3.5vw, 42px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 32px clamp(24px, 4vw, 56px);
          position: relative;
          overflow: hidden;
        }

        .future-role-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1 1 480px;
          max-width: 490px;
          z-index: 2;
        }

        .future-role-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          letter-spacing: 0.22em;
          color: #B09DEA;
          text-transform: uppercase;
        }

        .future-role-badge-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #B09DEA;
        }

        .future-role-title {
          margin: 16px 0 0 0;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: clamp(32px, 3.4vw, 44px);
          line-height: 1.15;
          color: #FFFFFF;
          letter-spacing: -0.015em;
        }

        .future-role-italic {
          font-style: italic;
          font-weight: 400;
          color: #B99EFA;
        }

        .future-role-desc {
          margin: 16px 0 0 0;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(14px, 1.15vw, 15.5px);
          line-height: 24px;
          color: rgba(235, 230, 255, 0.75);
          max-width: 380px;
        }

        .apply-role-btn {
          margin-top: 24px;
          box-sizing: border-box;
          width: auto;
          min-width: 195px;
          height: 48px;
          background: #FFFFFF;
          box-shadow: 0px 4px 20px rgba(94, 75, 142, 0.3), inset 0px 1px 0px rgba(255, 255, 255, 0.14);
          border-radius: 100px;
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 4px 4px 22px;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .apply-role-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0px 8px 28px rgba(94, 75, 142, 0.45);
        }

        .apply-role-text {
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 600;
          font-size: 14.5px;
          line-height: 20px;
          color: #653CD6;
          margin-right: 12px;
        }

        .apply-role-icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #E5DCFF;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #653CD6;
          transition: transform 0.25s ease, background 0.25s ease;
        }

        .apply-role-btn:hover .apply-role-icon-circle {
          transform: translateX(2px);
          background: #D9CBFF;
        }

        .future-role-image-wrapper {
          position: relative;
          flex: 1 1 520px;
          max-width: 530px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          z-index: 1;
        }

        .future-role-image-wrapper::before {
          content: "";
          position: absolute;
          width: 360px;
          height: 360px;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
          background: radial-gradient(circle, rgba(124, 77, 255, 0.42) 0%, rgba(103, 58, 227, 0.16) 50%, rgba(15, 10, 30, 0) 75%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(28px);
        }

        .future-role-image {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 514px;
          height: auto;
          max-height: 410px;
          object-fit: contain;
          filter: drop-shadow(0 15px 35px rgba(116, 79, 231, 0.3));
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .future-role-image:hover {
          transform: scale(1.02) rotate(0.5deg);
        }

        /* ─── Full-Bleed Stretching (No left/right gaps for sections and footer) ─── */
        .opportunities-section,
        .future-role-section,
        .gt-bottom-section,
        .gt-footer-root {
          width: 100% !important;
          max-width: 100% !important;
          align-self: stretch !important;
        }

        /* ─── Keyframe Animations ─── */
        @keyframes careersFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes careersFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes careersFloatIn {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* ─── Responsive Media Queries ─── */

        /* 1081px - 1439px (Laptops) */
        @media (max-width: 1439px) and (min-width: 1081px) {
          .team-cards-grid {
            grid-template-columns: repeat(4, 168px);
            gap: 16px;
          }
          .person-card {
            width: 168px;
            height: 166px;
          }
        }

        /* Tablet Landscape / Small Laptops (769px - 1080px) */
        @media (max-width: 1080px) and (min-width: 769px) {
          .team-cards-grid {
            grid-template-columns: repeat(4, 150px);
            gap: 12px;
          }
          .person-card {
            width: 150px;
            height: 154px;
          }
          .person-card-avatar {
            height: 90px;
          }
          .person-name-pill {
            font-size: 9px;
            padding: 2.5px 8px;
          }
          .person-role-text {
            font-size: 8.5px;
          }
          .future-role-card {
            padding: 28px 32px;
            min-height: 380px;
          }
          .future-role-image-wrapper {
            max-width: 440px;
          }
        }

        /* Mobile & Small Tablets (<= 768px) */
        @media (max-width: 768px) {
          .careers-hero-wrapper {
            padding-top: clamp(96px, 13vh, 120px);
            padding-left: 18px;
            padding-right: 18px;
            padding-bottom: 30px;
          }
          .careers-badge-text {
            font-size: clamp(13px, 3.8vw, 15px);
            line-height: 24px;
            letter-spacing: 0.2em;
            gap: 10px;
          }
          .careers-dot {
            font-size: 13px;
          }
          .careers-heading-line1,
          .careers-heading-line2 {
            font-size: clamp(32px, 8vw, 44px);
            line-height: clamp(36px, 8.5vw, 48px);
          }
          .careers-heading-line1 {
            margin-top: 14px;
          }
          .careers-heading-line2 {
            margin-top: 4px;
          }
          .careers-subtitle {
            font-size: clamp(15px, 4vw, 17px);
            line-height: clamp(24px, 5.8vw, 27px);
            max-width: 92%;
            margin-top: 16px;
          }
          .careers-desktop-break {
            display: inline;
          }
          .careers-image-container {
            margin-top: 8px;
            max-width: 100%;
          }
          .careers-hero-image {
            transform: none !important;
          }

          /* People section on mobile */
          .people-section {
            padding-top: 36px;
            padding-bottom: 44px;
            padding-left: 16px;
            padding-right: 16px;
          }
          .people-main-title {
            gap: 8px;
            font-size: clamp(28px, 7.5vw, 38px);
          }
          .people-subtitle {
            font-size: 12.5px;
            line-height: 19px;
            margin-top: 8px;
          }
          .people-desktop-br {
            display: inline;
          }
          .people-category-badge {
            margin-top: 20px;
          }
          .leadership-cards-grid {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            width: 100%;
          }
          .leadership-cards-grid .person-card {
            width: 200px !important;
            max-width: 200px !important;
            height: 162px !important;
            margin: 0 auto;
            padding-bottom: 10px;
          }
          .leadership-cards-grid .person-card-avatar {
            height: 94px;
            top: 5px;
          }
          .leadership-cards-grid .person-name-pill {
            font-size: 9.5px;
            padding: 2.5px 8px;
          }
          .leadership-cards-grid .person-role-text {
            font-size: 9px;
            margin-top: 2.5px;
          }

          .team-cards-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            max-width: 340px;
            margin: 0 auto;
            width: 100%;
          }
          .team-cards-grid .person-card {
            width: 100% !important;
            height: 156px !important;
            padding-bottom: 10px;
          }
          .team-cards-grid .person-card-avatar {
            height: 92px;
            top: 5px;
          }
          .team-cards-grid .person-name-pill {
            font-size: 9px;
            padding: 2.5px 8px;
          }
          .team-cards-grid .person-role-text {
            font-size: 8.5px;
            margin-top: 2.5px;
          }

          /* Opportunities Section on mobile */
          .opportunities-section {
            padding-top: 32px;
            padding-bottom: 36px;
          }
          .opportunity-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding: 12px 14px;
            min-height: auto;
          }
          .opportunity-card-left {
            width: 100%;
            gap: 12px;
          }
          .opportunity-arrow-circle {
            align-self: flex-end;
            width: 32px;
            height: 32px;
          }
          .opportunity-tags {
            gap: 14px;
          }

          /* Future role card on mobile */
          .future-role-section {
            padding: 30px 16px 40px !important;
          }
          .future-role-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 28px 20px 24px !important;
            min-height: auto !important;
            height: auto !important;
            gap: 16px !important;
            border-radius: 24px !important;
          }
          .future-role-content {
            width: 100% !important;
            max-width: 100% !important;
            flex: none !important;
            align-items: flex-start !important;
          }
          .future-role-badge {
            font-size: 11px !important;
            letter-spacing: 0.18em !important;
          }
          .future-role-title {
            font-size: clamp(24px, 6.5vw, 28px) !important;
            line-height: 1.2 !important;
            margin-top: 12px !important;
          }
          .future-role-desc {
            font-size: 13.5px !important;
            line-height: 20px !important;
            margin-top: 10px !important;
            max-width: 100% !important;
          }
          .apply-role-btn {
            margin-top: 16px !important;
          }
          .future-role-image-wrapper {
            width: 100% !important;
            max-width: 240px !important;
            flex: none !important;
            align-self: center !important;
            justify-content: center !important;
            margin-top: 4px !important;
          }
          .future-role-image-wrapper::before {
            width: 160px !important;
            height: 160px !important;
            right: auto !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
          }
          .future-role-image {
            max-width: 100% !important;
            height: auto !important;
            max-height: 170px !important;
          }
        }

        /* Extra small devices (<= 400px) */
        @media (max-width: 400px) {
          .leadership-cards-grid .person-card {
            width: 185px !important;
            max-width: 185px !important;
            height: 158px !important;
          }
          .team-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .team-cards-grid .person-card {
            height: 154px !important;
            border-radius: 16px;
          }
          .team-cards-grid .person-card-avatar {
            height: 90px;
          }
          .person-name-pill {
            font-size: 9px;
            padding: 2px 7px;
          }
          .person-role-text {
            font-size: 8.5px;
          }
        }
      `}</style>

      {/* ─── Hero Section ─── */}
      <section className="careers-hero-wrapper" aria-label="Gelora Tech Careers Hero">
        {/* Heading line 1: Build what’s next. */}
        <h1 className="careers-heading-line1">
          Build what’s next.
        </h1>

        {/* Heading line 2: Grow while building it. */}
        <h2 className="careers-heading-line2">
          Grow while building it.
        </h2>

        {/* Subtitle: Join a team of designers, developers, and thinkers building technology that creates real impact. */}
        <p className="careers-subtitle">
          Join a team of designers, developers, and thinkers building technology
          <span className="careers-desktop-break"> </span>
          that creates real impact.
        </p>

        {/* Hero 3D Cards Graphic (carrerImg.png) */}
        <div className="careers-image-container">
          <Image
            src="/asset/carrerImg.png"
            alt="Gelora Tech Careers - Collaborate, Create, Join Our Team, Grow, and Make an Impact"
            width={1319}
            height={482}
            priority
            className="careers-hero-image"
          />
        </div>
      </section>

      {/* ─── Our PEOPLE Section ─── */}
      <section className="people-section" aria-label="Our People Section">
        {/* Main Title: Our PEOPLE */}
        <div className="people-title-wrapper">
          <h2 className="people-main-title">
            <span className="people-title-our">Our</span>
            <span className="people-title-people">PEOPLE</span>
          </h2>
        </div>

        {/* Subtitle description */}
        <p className="people-subtitle">
          We build digital experiences that matter by putting people first.
          <span className="people-desktop-br"> </span>
          We are a collision of different minds on a single mission: to leave things better than we found them.
        </p>

        {/* Sub-badge: · LEADERSHIP · */}
        <div className="people-category-badge">
          <span className="people-category-text">
            <span className="people-cat-dot">·</span>
            LEADERSHIP
            <span className="people-cat-dot">·</span>
          </span>
        </div>

        {/* Leadership Cards */}
        <div className="leadership-cards-grid">
          {LEADERSHIP_DATA.map((member) => (
            <div key={member.name} className="person-card">
              <Image
                src={member.image}
                alt={member.name}
                width={120}
                height={145}
                className="person-card-avatar"
              />
              <div className="person-card-footer">
                <span className="person-name-pill">{member.name}</span>
                <span className="person-role-text">{member.role}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sub-badge: · THE TEAM · */}
        <div className="people-category-badge">
          <span className="people-category-text">
            <span className="people-cat-dot">·</span>
            THE TEAM
            <span className="people-cat-dot">·</span>
          </span>
        </div>

        {/* Team Cards Grid (4x2) */}
        <div className="team-cards-grid">
          {TEAM_DATA.map((member) => (
            <div key={member.name} className="person-card">
              <Image
                src={member.image}
                alt={member.name}
                width={120}
                height={145}
                className="person-card-avatar"
              />
              <div className="person-card-footer">
                <span className="person-name-pill">{member.name}</span>
                <span className="person-role-text">{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CURRENT OPPORTUNITIES Section (Light Theme) ─── */}
      <section className="opportunities-section" aria-label="Current Opportunities Section">
        <div className="opportunities-container">
          {/* Sub-badge */}
          <div className="opportunities-badge">
            <span>· &nbsp;CURRENT OPPORTUNITIES</span>
          </div>

          {/* Heading */}
          <h2 className="opportunities-title">
            Find where <span className="opportunities-title-italic">you fit.</span>
          </h2>

          <p className="opportunities-empty">No openings available at the moment.</p>

          {/*
          Filter Tabs
          <div className="opportunities-tabs-row" role="tablist">
            {DEPARTMENTS.map((dept) => {
              const isActive = activeDept === dept;
              return (
                <button
                  key={dept}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveDept(dept)}
                  className={`dept-tab-pill${isActive ? " active" : ""}`}
                >
                  {dept}
                </button>
              );
            })}
          </div>

          List of Opportunities
          <div className="opportunities-list">
            {filteredOpportunities.map((job) => {
              const isFullStack = job.title.toLowerCase().includes("full stack");
              return (
                <div
                  key={job.id}
                  className="opportunity-card"
                  onClick={() => handleOpportunityClick(job)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOpportunityClick(job);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="opportunity-card-left">
                    <span className="opportunity-num">{job.num}</span>
                    <div className="opportunity-details">
                      <h3 className="opportunity-role">{job.title}</h3>
                      <div className="opportunity-tags">
                        <span>{job.department}</span>
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="opportunity-arrow-circle" aria-hidden="true">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
          */}
        </div>
      </section>

      {/* ─── CAN'T FIND THE RIGHT ROLE Card Section (Dark Theme) ─── */}
      <section className="future-role-section" aria-label="Future Opportunities Card">
        <div className="future-role-card">
          {/* Left Text & CTA */}
          <div className="future-role-content">
            <div className="future-role-badge">
              <span className="future-role-badge-dot" />
              <span>CAN’T FIND THE RIGHT ROLE?</span>
            </div>

            <h2 className="future-role-title">
              Your next opportunity<br />
              might be <span className="future-role-italic">on the way.</span>
            </h2>

            <p className="future-role-desc">
              Share your resume and we’ll review your profile for future opportunities that match your skills.
            </p>

            <button
              type="button"
              className="apply-role-btn"
              onClick={() => openModal()}
            >
              <span className="apply-role-text">Apply for a role</span>
              <div className="apply-role-icon-circle">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </button>
          </div>

          {/* Right 3D Folder & Orbit Illustration (fileImg.png) */}
          <div className="future-role-image-wrapper">
            <Image
              src="/asset/fileImg.png"
              alt="Folder with resume and orbit particles"
              width={514}
              height={464}
              priority
              className="future-role-image"
            />
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      <ApplyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        defaultRole={modalRole}
      />

      {/* Footer */}
      <Footer showCta={false} />
    </main>
  );
}
