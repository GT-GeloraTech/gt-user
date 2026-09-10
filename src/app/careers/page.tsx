import type { Metadata } from "next";
import CareersPage from "@/app/pages/Careers/page";

export const metadata: Metadata = { title: "Careers | Gelora Tech" };

export default function CareersRoute() {
  return <CareersPage />;
}