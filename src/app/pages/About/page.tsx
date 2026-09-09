"use client";

import Header from "@/app/components/Header";

export default function AboutPage() {
  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(117.25deg, #0B0916 20.9%, rgba(25, 13, 70, 0.8) 48.45%, #0A0815 77.43%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "24px",
      }}
    >
      <Header activeTab="About" />
      <div style={{ marginTop: "120px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "48px", fontWeight: 700 }}>
          About <span style={{ color: "#c084fc", textShadow: "0 0 35px rgba(192,132,252,0.8)" }}>Gelora Tech</span>
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "18px", color: "rgba(199,193,222,0.8)", marginTop: "12px" }}>
          Innovating the future through intelligent digital transformation.
        </p>
      </div>
    </main>
  );
}
