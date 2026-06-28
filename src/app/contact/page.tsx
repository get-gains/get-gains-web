import type { Metadata } from "next";
import { ContactPageClient } from "./contact-client";

export const metadata: Metadata = {
  title: "Contact & Partnerships - Get Gains",
  description:
    "Partner with Get Gains. Interested in partnerships, sponsorships, or collaborating? We work with fitness brands, supplement companies, and gyms.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
