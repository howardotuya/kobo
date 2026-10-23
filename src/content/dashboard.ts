// Fake data for the /app demo. Values on screen match Figma frames 5:3 (desktop)
// and 9:2 (mobile); extra invoices exist only so the filters have something to
// filter.

export const demoBanner = {
  text: "Demo · Kòbò is a concept, all names and amounts are made up",
  back: "Back to site",
};

export const user = { name: "Adaeze", greeting: "Good morning" };

export const today = "Thursday, 23 October · You have 2 invoices due this week.";

export type Tone = "green" | "soft" | "coral";

export const stats: {
  label: string;
  value: string;
  note: string;
  tone: Tone;
  mobileNote?: string;
}[] = [
  { label: "Paid this month", value: "₦1,420,000", note: "+18% vs September", tone: "green" },
  {
    label: "Unpaid",
    value: "₦380,000",
    note: "6 invoices out",
    tone: "soft",
    mobileNote: "6 invoices",
  },
  {
    label: "Overdue",
    value: "₦120,000",
    note: "1 invoice, 4 days late",
    tone: "coral",
    mobileNote: "4 days late",
  },
  { label: "Avg. time to pay", value: "4.2 days", note: "Down from 11 days", tone: "green" },
];

export type Series = {
  id: "monthly" | "weekly";
  label: string;
  caption: string;
  /** Long label for tooltips and screen readers. */
  points: { short: string; long: string; value: number }[];
  /** Gridlines from the bottom up, with their axis labels. */
  ticks: { value: number; label: string }[];
};

const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const monthNames = ["March", "April", "May", "June", "July", "August", "September", "October"];
const monthly = [620_000, 780_000, 540_000, 910_000, 860_000, 1_050_000, 1_210_000, 1_420_000];

const weekStarts = ["1 Sep", "8 Sep", "15 Sep", "22 Sep", "29 Sep", "6 Oct", "13 Oct", "20 Oct"];
const weekly = [240_000, 310_000, 280_000, 380_000, 265_000, 350_000, 420_000, 385_000];

export const series: Series[] = [
  {
    id: "monthly",
    label: "Monthly",
    caption: "Last 8 months",
    points: months.map((short, i) => ({ short, long: monthNames[i]!, value: monthly[i]! })),
    ticks: [
      { value: 0, label: "₦0M" },
      { value: 500_000, label: "₦0.5M" },
      { value: 1_000_000, label: "₦1M" },
      { value: 1_500_000, label: "₦1.5M" },
    ],
  },
  {
    id: "weekly",
    label: "Weekly",
    caption: "Last 8 weeks",
    points: weekStarts.map((short, i) => ({ short, long: `Week of ${short}`, value: weekly[i]! })),
    ticks: [
      { value: 0, label: "₦0k" },
      { value: 150_000, label: "₦150k" },
      { value: 300_000, label: "₦300k" },
      { value: 450_000, label: "₦450k" },
    ],
  },
];

export type Status = "paid" | "overdue" | "sent" | "draft";

export type Invoice = {
  number: string;
  client: string;
  issued: string;
  due: string;
  amount: string;
  status: Status;
};

export const invoices: Invoice[] = [
  {
    number: "#0042",
    client: "Adaeze Studio",
    issued: "18 Oct",
    due: "25 Oct",
    amount: "₦450,000",
    status: "paid",
  },
  {
    number: "#0041",
    client: "Tunde Films",
    issued: "10 Oct",
    due: "19 Oct",
    amount: "₦120,000",
    status: "overdue",
  },
  {
    number: "#0040",
    client: "Kaba & Co.",
    issued: "15 Oct",
    due: "24 Oct",
    amount: "₦95,000",
    status: "sent",
  },
  {
    number: "#0039",
    client: "Lola Bakes",
    issued: "12 Oct",
    due: "31 Oct",
    amount: "₦85,000",
    status: "draft",
  },
  {
    number: "#0038",
    client: "Ìlú Press",
    issued: "9 Oct",
    due: "24 Oct",
    amount: "₦160,000",
    status: "sent",
  },
  {
    number: "#0037",
    client: "Nkem Design",
    issued: "6 Oct",
    due: "27 Oct",
    amount: "₦45,000",
    status: "sent",
  },
  {
    number: "#0036",
    client: "Ọjà Supply",
    issued: "2 Oct",
    due: "16 Oct",
    amount: "₦210,000",
    status: "paid",
  },
  {
    number: "#0035",
    client: "Lola Bakes",
    issued: "28 Sep",
    due: "12 Oct",
    amount: "₦60,000",
    status: "paid",
  },
];

export type Filter = {
  id: "all" | "paid" | "unpaid" | "overdue" | "draft";
  label: string;
  match: Status[];
};

export const filters: Filter[] = [
  { id: "all", label: "All", match: ["paid", "overdue", "sent", "draft"] },
  { id: "paid", label: "Paid", match: ["paid"] },
  { id: "unpaid", label: "Unpaid", match: ["sent", "overdue"] },
  { id: "overdue", label: "Overdue", match: ["overdue"] },
  { id: "draft", label: "Draft", match: ["draft"] },
];

export type Due = {
  client: string;
  amount: string;
  when: string;
  whenShort: string;
  tone: "late" | "soon" | "later";
  avatar: string;
};

export const dueSoon: Due[] = [
  {
    client: "Tunde Films",
    amount: "₦120,000",
    when: "4 days late",
    whenShort: "4 days late",
    tone: "late",
    avatar: "bg-mint",
  },
  {
    client: "Kaba & Co.",
    amount: "₦95,000",
    when: "Due tomorrow",
    whenShort: "Tomorrow",
    tone: "soon",
    avatar: "bg-sky",
  },
  {
    client: "Ìlú Press",
    amount: "₦160,000",
    when: "Due Fri",
    whenShort: "Fri",
    tone: "later",
    avatar: "bg-lime-soft",
  },
  {
    client: "Nkem Design",
    amount: "₦45,000",
    when: "Due Mon",
    whenShort: "Mon",
    tone: "later",
    avatar: "bg-yellow",
  },
];

export const nav = [
  "Overview",
  "Invoices",
  "Clients",
  "Pay links",
  "Reminders",
  "Reports",
  "Settings",
] as const;

export const upgrade = {
  title: "Go Pro",
  body: "Unlimited invoices and WhatsApp delivery.",
  cta: "Upgrade · ₦4,500",
};
