"use client";

import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import HomePage from "./pages/Home/page";

export default function Home() {
  // null = not yet determined (server-side), true = show splash, false = skip to home
  const [showSplash, setShowSplash] = useState<boolean | null>(null);

  // useEffect(() => {
  //   // Only show splash on true first load or hard refresh.
  //   // sessionStorage persists within the tab session but clears on new tab/refresh.
  //   const alreadyPlayed = sessionStorage.getItem("splash_done") === "1";
  //   setShowSplash(!alreadyPlayed);
  // }, []);

  // While checking (SSR / first paint), render nothing to avoid flicker
  // if (showSplash === null) return null;

  // if (showSplash) {
  //   return (
  //     <SplashScreen
  //       onComplete={() => {
  //         sessionStorage.setItem("splash_done", "1");
  //         setShowSplash(false);
  //       }}
  //     />
  //   );
  // }

  return <HomePage />;
}
