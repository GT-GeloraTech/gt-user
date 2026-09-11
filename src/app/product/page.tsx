import type { Metadata } from "next";
import ProductPage from "@/app/pages/Product/page";
import { PAGE_TITLES } from "@/app/constant/metaConstant";

export const metadata: Metadata = { title: PAGE_TITLES.PRODUCT };

export default function ProductRoute() {
  return <ProductPage />;
}
