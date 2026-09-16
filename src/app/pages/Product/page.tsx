"use client";

import Header from "@/app/components/Header";

export default function ProductPage() {
  return (
    <main className="simple-page-shell">
      <div style={{ height: "64px" }} aria-hidden="true" />
      <div className="simple-page-content">
        <h1>
          Our <span style={{ color: "#c084fc", textShadow: "0 0 35px rgba(192,132,252,0.8)" }}>Products</span>
        </h1>
      </div>
    </main>
  );
}
