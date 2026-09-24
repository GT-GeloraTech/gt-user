import type { Metadata } from "next";
import PrivacyPage from "@/app/pages/Privacy/page";
import { PAGE_TITLES } from "@/app/constant/metaConstant";

export const metadata: Metadata = {
  title: PAGE_TITLES.PRIVACY,
};

export default function PrivacyRoute() {
  return <PrivacyPage />;
}
