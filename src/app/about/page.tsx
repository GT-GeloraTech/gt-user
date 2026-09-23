import type { Metadata } from "next";
import AboutPage from "@/app/pages/About/page";

export const metadata: Metadata = { title: "About | Gelora Tech" };

export default function AboutRoute() {
  return <AboutPage />;
}