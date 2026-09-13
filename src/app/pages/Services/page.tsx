"use client";

import Header from "@/app/components/Header";

export default function ServicesPage() {
  return (
    <main className="simple-page-shell">
      <Header activeTab="Services" />
      <div className="simple-page-content">
        <h1>
          Our <span style={{ color: "#c084fc", textShadow: "0 0 35px rgba(192,132,252,0.8)" }}>Services</span>
        </h1>
      </div>
    </main>
  );
}
