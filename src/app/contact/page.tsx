import type { Metadata } from "next";
import ContactPage from "@/app/pages/Contact/page";
import { PAGE_TITLES } from "@/app/constant/metaConstant";

export const metadata: Metadata = {
  title: PAGE_TITLES.CONTACT,
};

export default function ContactRoute() {
  return <ContactPage />;
}
