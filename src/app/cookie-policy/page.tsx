import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { cookiePolicy } from "@/content/policies";

export const metadata: Metadata = {
  title: "Cookies Policy",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return <LegalPage {...cookiePolicy} />;
}
