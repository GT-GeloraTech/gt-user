import type { Metadata } from "next";
import TermsPage from "@/app/pages/Terms/page";
import { PAGE_TITLES } from "@/app/constant/metaConstant";

export const metadata: Metadata = {
  title: PAGE_TITLES.TERMS,
};

export default function TermsRoute() {
  return <TermsPage />;
}
