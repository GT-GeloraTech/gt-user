"use client";

import Header from "@/app/components/Header";

export default function AboutPage() {
  return (
    <main
      style={{
        position: "relative",
        width: "100%",
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
      <Header activeTab="About" />
      <div style={{ marginTop: "120px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "48px", fontWeight: 700 }}>
          About <span style={{ color: "#c084fc", textShadow: "0 0 35px rgba(192,132,252,0.8)" }}>Gelora Tech</span>
        </h1>
      </div>
    </main>
  );
}
