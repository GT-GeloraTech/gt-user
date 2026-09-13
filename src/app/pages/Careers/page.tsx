"use client";

import Header from "@/app/components/Header";

export default function CareersPage() {
  return (
    <main className="simple-page-shell">
      <Header activeTab="Careers" />
      <div className="simple-page-content">
        <h1>
          Join Our <span style={{ color: "#c084fc", textShadow: "0 0 35px rgba(192,132,252,0.8)" }}>Team</span>
        </h1>
      </div>
    </main>
  );
}
