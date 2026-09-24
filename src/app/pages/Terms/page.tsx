"use client";

import LegalPage, { type LegalSection } from "@/app/components/LegalPage";

const SECTIONS: LegalSection[] = [
  {
    id: "services",
    title: "Services",
    paragraphs: [
      "Gelora Tech provides technology-related services including software development, mobile applications, AI automation, cloud solutions, APIs, consulting, enterprise systems, and related digital services.",
      "We reserve the right to modify, suspend, or discontinue any service without notice.",
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility",
    paragraphs: [
      "Users must have legal authority and capacity to enter into binding agreements under applicable law.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    paragraphs: ["Users agree not to:"],
    list: [
      "Use services for unlawful purposes",
      "Attempt unauthorized access",
      "Interfere with infrastructure or systems",
      "Upload malicious code or harmful content",
      "Reverse engineer proprietary systems",
      "Violate intellectual property rights",
      "Abuse APIs or automation systems",
    ],
    after: ["Gelora Tech may suspend or terminate access for violations."],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property Rights",
    paragraphs: [
      "All software, source code, systems, designs, trademarks, documentation, frameworks, automation logic, APIs, and related materials owned by Gelora Tech remain exclusive intellectual property unless otherwise agreed in writing.",
      "No ownership rights are transferred by default.",
    ],
  },
  {
    id: "client-content",
    title: "Client Content & Responsibility",
    paragraphs: [
      "Users retain responsibility for all data, files, content, credentials, and materials submitted to Gelora Tech.",
      "Users confirm they possess necessary permissions and rights for submitted materials.",
      "Gelora Tech is not responsible for unlawful or unauthorized content provided by users.",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Integrations",
    paragraphs: [
      "Services may rely on third-party providers, platforms, APIs, hosting services, or infrastructure.",
      "Gelora Tech is not liable for:",
    ],
    list: [
      "Third-party outages",
      "API changes",
      "Service discontinuation",
      "Security incidents originating from third parties",
      "External platform limitations",
    ],
  },
  {
    id: "payments",
    title: "Payments & Refunds",
    paragraphs: ["Unless otherwise agreed in writing:"],
    list: [
      "Payments are non-refundable",
      "Delayed payments may result in service suspension",
      "Subscription or service fees may change at any time",
      "Taxes and statutory charges are the responsibility of the client where applicable",
    ],
  },
  {
    id: "availability",
    title: "No Guarantee of Availability",
    paragraphs: ["Gelora Tech does not guarantee:"],
    list: [
      "Continuous uptime",
      "Error-free operation",
      "Uninterrupted services",
      "Compatibility with all systems",
      "Specific business outcomes or results",
    ],
    after: ["Temporary downtime, maintenance, upgrades, failures, or interruptions may occur."],
  },
  {
    id: "ai-disclaimer",
    title: "AI & Automation Disclaimer",
    paragraphs: [
      "AI-generated outputs, automation workflows, recommendations, or machine-generated results may contain errors, inaccuracies, or incomplete information.",
      "Users are solely responsible for verifying outputs before implementation or reliance.",
      "Gelora Tech does not guarantee accuracy or suitability of automated or AI-generated outputs.",
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    paragraphs: [
      "Both parties may exchange confidential information during projects or services.",
      "Unless required by law, neither party shall intentionally disclose confidential business information to unauthorized third parties.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    paragraphs: ["To the fullest extent permitted by law, Gelora Tech shall not be liable for:"],
    list: [
      "Indirect or consequential damages",
      "Revenue loss",
      "Data loss",
      "Business interruption",
      "Security breaches",
      "Loss caused by third-party services",
      "Delays or downtime",
      "User misuse of services",
    ],
    after: [
      "Total liability, if any, shall not exceed the amount paid for the relevant service giving rise to the claim.",
    ],
  },
  {
    id: "indemnification",
    title: "Indemnification",
    paragraphs: [
      "Users agree to defend, indemnify, and hold harmless Gelora Tech from claims, liabilities, damages, losses, costs, or legal expenses arising from:",
    ],
    list: [
      "User misuse",
      "Violation of laws",
      "Intellectual property infringement",
      "Unauthorized activities",
      "User-submitted content",
    ],
  },
  {
    id: "suspension",
    title: "Service Suspension & Termination",
    paragraphs: [
      "Gelora Tech reserves the right to suspend or terminate services immediately without liability if:",
    ],
    list: [
      "Terms are violated",
      "Payments remain unpaid",
      "Security risks are identified",
      "Illegal or abusive activities occur",
    ],
  },
  {
    id: "force-majeure",
    title: "Force Majeure",
    paragraphs: [
      "Gelora Tech shall not be responsible for delays or failures caused by events beyond reasonable control, including infrastructure failures, internet outages, government actions, cyberattacks, or natural disasters.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law & Jurisdiction",
    paragraphs: [
      "These Terms shall be governed under the laws of India.",
      "Any disputes shall fall under the exclusive jurisdiction of courts located in India.",
    ],
  },
  {
    id: "modifications",
    title: "Modifications",
    paragraphs: [
      "Gelora Tech may update these Terms at any time without prior notice.",
      "Continued use of services constitutes acceptance of revised Terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      leads={[
        "These Terms & Conditions govern access to and use of services provided by Gelora Tech.",
        "By using our services, platforms, applications, APIs, software, or websites, you agree to these Terms.",
      ]}
      sections={SECTIONS}
    />
  );
}
