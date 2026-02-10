import type { Metadata } from "next";
import { PrivacyPageClient } from "./privacy-client";

export const metadata: Metadata = {
  title: "Privacy Policy - Get Gains",
  description:
    "Privacy Policy for Get Gains workout tracker application. Learn how we protect your data.",
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
