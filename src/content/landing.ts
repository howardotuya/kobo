// Copy for the landing page, taken from Figma frames 3:17 (desktop) and 8:2
// (mobile). Where the two differ, the desktop wording is used everywhere.
//
// `href: null` = no destination yet; rendered as plain text, not a dead link.

export type NavLink = { label: string; href: string | null };

export const DEMO_HREF = "/app";

export const nav: NavLink[] = [
  { label: "Product", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#customers" },
  { label: "Resources", href: null },
];

export const hero = {
  eyebrow: { tag: "NEW", text: "Paystack pay links, built in" },
  title: ["Get paid,", "not chased."],
  lead: "Kòbò sends proper invoices, collects through Paystack and nudges clients for you. Built for Nigerian freelancers and small businesses.",
  emailPlaceholder: "Your email address",
  cta: "Start free",
  note: "Free for your first 10 invoices. No card needed.",
  stat: "12,000+",
  statCaption: "freelancers and small teams get paid faster with Kòbò.",
  cards: {
    paid: "Paid in 2 days, not 2 months.",
    /** Mobile card (decoration, so it keeps the 390 frame's shorter copy). */
    paidShort: ["Paid in", "2 days."],
    lands: "Money lands straight in your account.",
    due: { amount: "₦120k", label: "Due Friday" },
    reminder: "Send reminder",
  },
};

export const invoice = {
  number: "Invoice #0042",
  status: "Paid",
  billedTo: "Adaeze Studio",
  amount: "₦450,000",
  lines: [
    { label: "Brand identity", short: "Brand identity", amount: "₦300,000" },
    { label: "Social kit, 12 posts", short: "Social kit", amount: "₦120,000" },
    { label: "Revisions", short: "Revisions", amount: "₦30,000" },
  ],
  total: "₦450,000",
  paidVia: "Paid via Paystack",
  paidAfter: "2 days",
  receipt: "Receipt sent to adaeze@studio.ng",
};

export const logos = {
  caption: "Trusted by 12,000+ freelancers and small teams across Nigeria",
  names: [
    "Adaeze Studio",
    "Lola Bakes",
    "Tunde Films",
    "Kaba & Co.",
    "Ìlú Press",
    "Nkem Design",
    "Ọjà Supply",
  ],
};

export const features = {
  title: ["Everything you need", "to get paid on time."],
  lead: "Invoices, pay links, reminders and reports. Naira-first, and made for how Nigerians actually work.",
};

export type FeatureTab = {
  id: string;
  label: string;
  eyebrow: string[];
  title: string;
  body: string;
  cta: string;
  photo: { name: "baker" | "fashion" | "photographer" | "designer"; label: string; amount: string };
  /** Not in Figma: written for the build, pending Howard's review. */
  draft?: true;
};

export const featureTabs: FeatureTab[] = [
  {
    id: "invoices",
    label: "Invoices",
    eyebrow: ["QUICK SETUP", "NAIRA-FIRST", "ALWAYS ON"],
    title: "A proper invoice in under a minute",
    body: "Add your client, list the work, pick a due date. Kòbò adds your logo, VAT and a Paystack link, then sends it by email or WhatsApp.",
    cta: "Create an invoice",
    photo: { name: "baker", label: "Personal", amount: "₦85,000" },
  },
  {
    id: "pay-links",
    label: "Pay links",
    eyebrow: ["NO INVOICE NEEDED", "CARD", "TRANSFER", "USSD"],
    title: "A pay link for anything you sell",
    body: "Make a link for a deposit, a fixed price or an amount your customer chooses. Share it on WhatsApp or Instagram and Paystack does the rest.",
    cta: "Create a pay link",
    photo: { name: "fashion", label: "Deposit", amount: "₦40,000" },
    draft: true,
  },
  {
    id: "reminders",
    label: "Reminders",
    eyebrow: ["POLITE", "AUTOMATIC", "STOPS WHEN PAID"],
    title: "Reminders that sound like you",
    body: "Kòbò nudges clients before and after the due date by email and WhatsApp, in your words, and stops the moment they pay.",
    cta: "Set up reminders",
    photo: { name: "photographer", label: "Wedding shoot", amount: "₦250,000" },
    draft: true,
  },
  {
    id: "reports",
    label: "Reports",
    eyebrow: ["MONTHLY", "VAT-READY", "EXPORTS"],
    title: "Know what’s paid, owed and late",
    body: "See money in by month, who owes you and what’s overdue. Export to CSV or PDF when your accountant asks.",
    cta: "See your reports",
    photo: { name: "designer", label: "This month", amount: "₦1.2m" },
    draft: true,
  },
];

export const useCases = {
  title: ["Made for people who", "get paid per job."],
  lead: "Whatever you make, Kòbò makes sure you get paid for it.",
  items: [
    {
      title: "Fashion designers",
      body: "Send a deposit link before you cut the fabric.",
      photo: "fashion",
      tone: "forest",
    },
    {
      title: "Photographers",
      body: "Bill the shoot, the edits and the rush fee in one go.",
      photo: "photographer",
      tone: "sky",
    },
    {
      title: "Designers",
      body: "Milestone invoices for every round of revisions.",
      photo: "designer",
      tone: "lime",
    },
    {
      title: "Bakers",
      body: "Take orders and payments before the oven is on.",
      photo: "baker",
      tone: "yellow",
    },
  ],
} as const;

export const pricing = {
  eyebrow: "PRICING",
  title: "Simple pricing, in naira.",
  lead: "No foreign cards. No surprise fees. Cancel any time.",
  plans: [
    {
      name: "Starter",
      price: "₦0",
      note: "For your first 10 invoices",
      features: ["10 invoices", "Paystack pay links", "Email delivery"],
      cta: "Start free",
    },
    {
      name: "Pro",
      price: "₦4,500",
      note: "per month, billed monthly",
      features: [
        "Unlimited invoices",
        "WhatsApp delivery",
        "Auto reminders",
        "Your logo and colours",
      ],
      cta: "Choose Pro",
      popular: "Most popular",
    },
    {
      name: "Team",
      price: "₦12,000",
      note: "per month, up to 5 people",
      features: ["Everything in Pro", "Shared clients", "Reports and exports", "Priority support"],
      cta: "Choose Team",
    },
  ],
};

export const cta = {
  title: ["Stop chasing.", "Start getting paid."],
  lead: "Set up in two minutes. Your first 10 invoices are free.",
  primary: "Start free",
  secondary: "Book a demo",
};

export const footer = {
  tagline: "Invoices and payments for Nigerian freelancers.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Invoices", href: "#invoices" },
        { label: "Pay links", href: "#pay-links" },
        { label: "Reminders", href: "#reminders" },
        { label: "Pricing", href: "#pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: null },
        { label: "Customers", href: "#customers" },
        { label: "Careers", href: null },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "Support", href: null },
        { label: "Guides", href: null },
        { label: "Status", href: null },
      ],
    },
  ] satisfies { title: string; links: NavLink[] }[],
  legal: "© 2026 Kòbò. A concept project by Howard Otuya. Kòbò is fictional.",
};
