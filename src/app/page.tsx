"use client";

import { useSyncExternalStore } from "react";
import SplashScreen from "./components/SplashScreen";
import HomePage from "./pages/Home/page";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  if (typeof window === "undefined") return "true";
  return sessionStorage.getItem("gt_splash_seen") || "false";
}

function getServerSnapshot() {
  return "true";
}

export default function Home() {
  const splashStatus = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleSplashFinish = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("gt_splash_seen", "true");
      window.dispatchEvent(new Event("storage"));
    }
  };

  if (splashStatus === "false") {
    return <SplashScreen onComplete={handleSplashFinish} />;
  }

  return <HomePage />;
}
