import type { Metadata } from "next";
import ServicesPage from "@/app/pages/Services/page";

export const metadata: Metadata = { title: "Services | Gelora Tech" };

export default function ServicesRoute() {
  return <ServicesPage />;
}