"use client";

import LegalPage, { type LegalSection } from "@/app/components/LegalPage";

const SECTIONS: LegalSection[] = [
  {
    id: "company-information",
    title: "Company Information",
    paragraphs: [
      "Company Name: Gelora Tech",
      "Business Location: India",
      "Contact Email: hello@geloratech.com",
    ],
  },
  {
    id: "scope",
    title: "Scope of Services",
    paragraphs: ["Gelora Tech provides services including but not limited to:"],
    list: [
      "Custom Software Development",
      "Website Development",
      "Mobile Application Development",
      "AI Automation Solutions",
      "Cloud Services",
      "API Services",
      "IT Consulting",
      "Subscription-Based Software Solutions",
      "Enterprise Software Solutions",
      "Third-Party Integrations",
    ],
  },
  {
    id: "information-collected",
    title: "Information We May Collect",
    paragraphs: ["Depending on the nature of the project or service, we may collect:"],
    list: [
      "Name",
      "Email address",
      "Business/company details",
      "Technical information",
      "Communication records",
      "Project-related files and content",
      "Usage and diagnostic data",
    ],
    after: [
      "We do not intentionally collect sensitive personal information unless required for a specific business purpose.",
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Information",
    paragraphs: ["We may use collected information to:"],
    list: [
      "Provide and maintain services",
      "Develop and deliver software solutions",
      "Improve system performance and security",
      "Respond to inquiries and support requests",
      "Process business communications",
      "Monitor and prevent misuse or unauthorized activities",
      "Comply with legal obligations",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Services",
    paragraphs: [
      "Our services may integrate with or rely on third-party providers, including cloud hosting, analytics, payment gateways, APIs, or infrastructure services.",
      "Gelora Tech is not responsible for the privacy practices, availability, security, or operations of third-party platforms or services.",
      "Users are encouraged to review third-party privacy policies separately.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    paragraphs: [
      "We implement commercially reasonable technical and organizational measures to help protect information against unauthorized access, misuse, or disclosure.",
      "However, no system, platform, transmission method, or electronic storage mechanism can be guaranteed as completely secure. Users acknowledge and accept these risks.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    paragraphs: ["We may retain information for as long as necessary to:"],
    list: [
      "Fulfill contractual obligations",
      "Maintain operational records",
      "Resolve disputes",
      "Enforce agreements",
      "Comply with legal requirements",
    ],
    after: [
      "Gelora Tech reserves the right to delete, archive, or anonymize data at its discretion unless otherwise required by law or contractual agreement.",
    ],
  },
  {
    id: "ai-disclaimer",
    title: "AI & Automated Technologies Disclaimer",
    paragraphs: [
      "Some services provided by Gelora Tech may involve AI-assisted tools, automation systems, machine learning models, or generated outputs.",
      "AI-generated or automated outputs may contain inaccuracies, incomplete information, or unintended results. Users are responsible for independently reviewing and validating outputs before relying on them for business, legal, financial, technical, or operational purposes.",
      "Gelora Tech does not guarantee the accuracy, reliability, or suitability of AI-generated content.",
    ],
  },
  {
    id: "user-responsibilities",
    title: "User Responsibilities",
    paragraphs: ["Users are solely responsible for:"],
    list: [
      "Content, files, or data submitted to our systems",
      "Ensuring they have necessary rights or permissions",
      "Compliance with applicable laws and regulations",
      "Maintaining confidentiality of credentials and access",
    ],
    after: [
      "Users must not upload or transmit unlawful, harmful, malicious, infringing, or unauthorized content.",
    ],
  },
  {
    id: "suspension",
    title: "Suspension & Termination",
    paragraphs: [
      "Gelora Tech reserves the right to suspend, restrict, or terminate access to services at any time, without prior notice, if we reasonably believe a user:",
    ],
    list: [
      "Violates applicable laws",
      "Abuses services or infrastructure",
      "Engages in fraudulent or harmful activities",
      "Violates these policies or agreements",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    paragraphs: [
      "Unless otherwise agreed in writing, all proprietary systems, frameworks, source code, software architecture, tools, designs, documentation, branding, and related materials developed or owned by Gelora Tech remain the intellectual property of Gelora Tech.",
      "Third-party assets remain the property of their respective owners.",
    ],
  },
  {
    id: "no-warranty",
    title: "No Warranty",
    paragraphs: [
      "All services, software, APIs, automation systems, platforms, and deliverables are provided on an “as is” and “as available” basis without warranties of any kind, whether express, implied, statutory, or otherwise.",
      "Gelora Tech disclaims all warranties including, but not limited to:",
    ],
    list: [
      "Merchantability",
      "Fitness for a particular purpose",
      "Non-infringement",
      "Availability",
      "Accuracy",
      "Reliability",
      "Security",
      "Uninterrupted operation",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted under applicable law, Gelora Tech shall not be liable for:",
    ],
    list: [
      "Indirect damages",
      "Incidental damages",
      "Consequential damages",
      "Loss of profits",
      "Business interruption",
      "Data loss",
      "Security incidents",
      "Service downtime",
      "Third-party failures",
    ],
    after: ["Use of our services is at the user's own risk."],
  },
  {
    id: "force-majeure",
    title: "Force Majeure",
    paragraphs: [
      "Gelora Tech shall not be held responsible for delays, interruptions, failures, or inability to perform caused by circumstances beyond reasonable control, including but not limited to:",
    ],
    list: [
      "Natural disasters",
      "Government actions",
      "Internet failures",
      "Cyberattacks",
      "Infrastructure outages",
      "Labor disputes",
      "Pandemic events",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    paragraphs: [
      "We reserve the right to modify or update this Privacy Policy at any time without prior notice.",
      "Continued use of services after updates constitutes acceptance of the revised policy.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    paragraphs: [
      "This Privacy Policy shall be governed by and interpreted in accordance with the laws of India.",
      "Any disputes arising from the use of services shall be subject to the exclusive jurisdiction of the courts located in India.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      leads={[
        "Welcome to Gelora Tech. We value your privacy and are committed to protecting your information. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use our services, websites, applications, APIs, software solutions, and related technologies.",
        "By accessing or using our services, you agree to the practices described in this Privacy Policy.",
      ]}
      sections={SECTIONS}
    />
  );
}
