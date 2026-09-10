"use client";

import Header from "@/app/components/Header";

export default function ServicesPage() {
  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        backgroundImage: "url('/asset/bg.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "24px",
      }}
    >
      <Header activeTab="Services" />
      <div style={{ marginTop: "120px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "48px", fontWeight: 700 }}>
          Our <span style={{ color: "#c084fc", textShadow: "0 0 35px rgba(192,132,252,0.8)" }}>Services</span>
        </h1>
      </div>
    </main>
  );
}
