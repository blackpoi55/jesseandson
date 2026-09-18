import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { privacyPolicy } from "@/content/policies";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <LegalPage {...privacyPolicy} />;
}
