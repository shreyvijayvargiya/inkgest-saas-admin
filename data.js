/**
 * Freelance CRM — Master Data File
 * Edit this file to customize all data. All content is exported from here only.
 */

const THEMES = {
  dark: {
    bg: "#09090b",
    bgAlt: "#0f0f11",
    bgSubtle: "#0f0f11",
    surface: "#18181b",
    surfaceAlt: "#1f1f23",
    surfaceB: "#27272a",
    surfaceC: "#3f3f46",
    border: "#27272a",
    borderB: "#3f3f46",
    text: "#fafafa",
    textSub: "#a1a1aa",
    textMuted: "#52525b",
    accent: "#7c3aed",
    accentBr: "#8b5cf6",
    accentDim: "#7c3aed18",
    green: "#22c55e",
    greenDim: "#22c55e14",
    red: "#ef4444",
    redDim: "#ef444414",
    amber: "#f59e0b",
    amberDim: "#f59e0b14",
    blue: "#3b82f6",
    blueDim: "#3b82f614",
    cyan: "#06b6d4",
    cyanDim: "#06b6d414",
    pink: "#ec4899",
    pinkDim: "#ec489914",
    shadow: "0 4px 24px rgba(0,0,0,0.4)",
    shadowMd: "0 4px 24px rgba(0,0,0,0.4)",
    shadowLg: "0 8px 32px rgba(0,0,0,0.5)",
    accentDeep: "#6d28d9",
  },
  light: {
    bg: "#fafafa",
    bgAlt: "#f4f4f5",
    bgSubtle: "#f4f4f5",
    surface: "#ffffff",
    surfaceAlt: "#f4f4f5",
    surfaceB: "#e4e4e7",
    surfaceC: "#d4d4d8",
    border: "#e4e4e7",
    borderB: "#d4d4d8",
    text: "#09090b",
    textSub: "#52525b",
    textMuted: "#a1a1aa",
    accent: "#6d28d9",
    accentBr: "#7c3aed",
    accentDim: "#6d28d912",
    green: "#16a34a",
    greenDim: "#16a34a10",
    red: "#dc2626",
    redDim: "#dc262610",
    amber: "#d97706",
    amberDim: "#d9770610",
    blue: "#2563eb",
    blueDim: "#2563eb10",
    cyan: "#0891b2",
    cyanDim: "#0891b210",
    pink: "#db2777",
    pinkDim: "#db277710",
    shadow: "0 4px 24px rgba(0,0,0,0.06)",
    shadowMd: "0 4px 24px rgba(0,0,0,0.08)",
    shadowLg: "0 8px 32px rgba(0,0,0,0.1)",
    accentDeep: "#5b21b6",
  },
  warm: {
    bg: "#1c1917",
    bgAlt: "#292524",
    bgSubtle: "#292524",
    surface: "#44403c",
    surfaceAlt: "#57534e",
    surfaceB: "#78716c",
    surfaceC: "#a8a29e",
    border: "#57534e",
    borderB: "#78716c",
    text: "#fef3c7",
    textSub: "#d6d3d1",
    textMuted: "#a8a29e",
    accent: "#ea580c",
    accentBr: "#f97316",
    accentDim: "#ea580c18",
    green: "#65a30d",
    greenDim: "#65a30d14",
    red: "#dc2626",
    redDim: "#dc262614",
    amber: "#d97706",
    amberDim: "#d9770614",
    blue: "#2563eb",
    blueDim: "#2563eb14",
    cyan: "#0891b2",
    cyanDim: "#0891b214",
    pink: "#db2777",
    pinkDim: "#db277714",
    shadow: "0 4px 24px rgba(0,0,0,0.35)",
    shadowMd: "0 4px 24px rgba(0,0,0,0.4)",
    shadowLg: "0 8px 32px rgba(0,0,0,0.45)",
    accentDeep: "#c2410c",
  },
  slate: {
    bg: "#0f172a",
    bgAlt: "#1e293b",
    bgSubtle: "#1e293b",
    surface: "#1e293b",
    surfaceAlt: "#334155",
    surfaceB: "#475569",
    surfaceC: "#64748b",
    border: "#334155",
    borderB: "#475569",
    text: "#f1f5f9",
    textSub: "#94a3b8",
    textMuted: "#64748b",
    accent: "#0ea5e9",
    accentBr: "#38bdf8",
    accentDim: "#0ea5e918",
    green: "#22c55e",
    greenDim: "#22c55e14",
    red: "#f87171",
    redDim: "#f8717114",
    amber: "#fbbf24",
    amberDim: "#fbbf2414",
    blue: "#3b82f6",
    blueDim: "#3b82f614",
    cyan: "#06b6d4",
    cyanDim: "#06b6d414",
    pink: "#f472b6",
    pinkDim: "#f472b614",
    shadow: "0 4px 24px rgba(0,0,0,0.4)",
    shadowMd: "0 4px 24px rgba(0,0,0,0.4)",
    shadowLg: "0 8px 32px rgba(0,0,0,0.5)",
    accentDeep: "#0284c7",
  },
};

const THEME_OPTIONS = [
  { id: "dark", label: "Dark", icon: "◇" },
  { id: "light", label: "Light", icon: "○" },
  { id: "warm", label: "Warm", icon: "◐" },
  { id: "slate", label: "Slate", icon: "▣" },
];

const CLIENTS = [
  { id: 1, name: "Stripe Inc.", contact: "Sarah Chen", email: "s.chen@stripe.com", phone: "+1 (415) 555-0101", stage: "Active", type: "Retainer", value: 8400, outstanding: 2800, started: "Jan 2026", tags: ["SaaS", "Design", "Monthly"], avatar: "ST", color: "#7c3aed", projects: 3, lastActivity: "Today" },
  { id: 2, name: "Notion", contact: "Mike Park", email: "m.park@notion.so", phone: "+1 (646) 555-0202", stage: "Active", type: "Project", value: 12000, outstanding: 6000, started: "Feb 2026", tags: ["SaaS", "Dev", "Design"], avatar: "NO", color: "#3b82f6", projects: 1, lastActivity: "Yesterday" },
  { id: 3, name: "Linear", contact: "Alma Söderberg", email: "alma@linear.app", phone: "+1 (212) 555-0303", stage: "Proposal", type: "Project", value: 6500, outstanding: 0, started: "—", tags: ["SaaS", "Dev"], avatar: "LN", color: "#06b6d4", projects: 0, lastActivity: "2d ago" },
  { id: 4, name: "Vercel", contact: "Tom Occhino", email: "t.occhino@vercel.com", phone: "+1 (650) 555-0404", stage: "Negotiating", type: "Retainer", value: 6000, outstanding: 0, started: "—", tags: ["SaaS", "Dev", "Monthly"], avatar: "VC", color: "#e4e4e7", projects: 0, lastActivity: "3d ago" },
  { id: 5, name: "Loom", contact: "Jen Rubio", email: "jen@loom.com", phone: "+1 (510) 555-0505", stage: "Completed", type: "Project", value: 4200, outstanding: 0, started: "Nov 2025", tags: ["SaaS", "Design"], avatar: "LO", color: "#22c55e", projects: 2, lastActivity: "Jan 14" },
  { id: 6, name: "Framer", contact: "Koen Bok", email: "koen@framer.com", phone: "+31 555-0606", stage: "Active", type: "Project", value: 9800, outstanding: 4900, started: "Mar 2026", tags: ["Design", "Animation"], avatar: "FR", color: "#ec4899", projects: 2, lastActivity: "Today" },
  { id: 7, name: "Craft CMS", contact: "Brad Bell", email: "brad@craftcms.com", phone: "+1 (503) 555-0707", stage: "Prospect", type: "Project", value: 3500, outstanding: 0, started: "—", tags: ["CMS", "Dev"], avatar: "CC", color: "#f59e0b", projects: 0, lastActivity: "1w ago" },
  { id: 8, name: "Ghost", contact: "John O'Nolan", email: "john@ghost.org", phone: "+44 555-0808", stage: "Churned", type: "Retainer", value: 2400, outstanding: 0, started: "Sep 2025", tags: ["CMS", "Design", "Monthly"], avatar: "GH", color: "#71717a", projects: 1, lastActivity: "Dec 2025" },
];

const PROJECTS = [
  { id: 1, client: "Stripe Inc.", name: "Design System v2", status: "In Progress", type: "Design", budget: 4200, billed: 2100, deadline: "Mar 28", progress: 60, hours: 48, estHours: 80, tags: ["Figma", "Components"] },
  { id: 2, client: "Stripe Inc.", name: "Dashboard Redesign", status: "Review", type: "Design", budget: 2800, billed: 2800, deadline: "Mar 15", progress: 90, hours: 38, estHours: 40, tags: ["UI", "Wireframes"] },
  { id: 3, client: "Notion", name: "Web App Frontend", status: "In Progress", type: "Development", budget: 12000, billed: 6000, deadline: "Apr 30", progress: 50, hours: 110, estHours: 220, tags: ["React", "Next.js"] },
  { id: 4, client: "Framer", name: "Marketing Site", status: "In Progress", type: "Design+Dev", budget: 9800, billed: 4900, deadline: "Apr 10", progress: 45, hours: 62, estHours: 140, tags: ["Framer", "Motion"] },
  { id: 5, client: "Framer", name: "Component Library", status: "Blocked", type: "Design", budget: 0, billed: 0, deadline: "Apr 15", progress: 20, hours: 18, estHours: 60, tags: ["Figma", "Tokens"] },
  { id: 6, client: "Loom", name: "Onboarding Flow", status: "Completed", type: "Design", budget: 2400, billed: 2400, deadline: "Jan 20", progress: 100, hours: 32, estHours: 32, tags: ["UX", "Flows"] },
  { id: 7, client: "Loom", name: "Brand Refresh", status: "Completed", type: "Branding", budget: 1800, billed: 1800, deadline: "Dec 15", progress: 100, hours: 24, estHours: 24, tags: ["Logo", "Identity"] },
];

const INVOICES = [
  { id: "INV-001", client: "Stripe Inc.", amount: 2800, status: "Paid", issued: "Feb 28", due: "Mar 14", paid: "Mar 10", items: [{ desc: "Dashboard Redesign", rate: 2800 }] },
  { id: "INV-002", client: "Notion", amount: 6000, status: "Sent", issued: "Mar 1", due: "Mar 15", paid: "—", items: [{ desc: "Web App Frontend — 50%", rate: 6000 }] },
  { id: "INV-003", client: "Framer", amount: 4900, status: "Sent", issued: "Mar 5", due: "Mar 19", paid: "—", items: [{ desc: "Marketing Site — 50%", rate: 4900 }] },
  { id: "INV-004", client: "Stripe Inc.", amount: 2100, status: "Draft", issued: "—", due: "Mar 28", paid: "—", items: [{ desc: "Design System v2 — 50%", rate: 2100 }] },
  { id: "INV-005", client: "Loom", amount: 2400, status: "Paid", issued: "Jan 15", due: "Jan 29", paid: "Jan 27", items: [{ desc: "Onboarding Flow", rate: 2400 }] },
  { id: "INV-006", client: "Loom", amount: 1800, status: "Paid", issued: "Dec 10", due: "Dec 24", paid: "Dec 22", items: [{ desc: "Brand Refresh", rate: 1800 }] },
  { id: "INV-007", client: "Ghost", amount: 800, status: "Overdue", issued: "Feb 1", due: "Feb 15", paid: "—", items: [{ desc: "Monthly Retainer — Jan", rate: 800 }] },
];

const PROPOSALS = [
  { id: "PROP-001", client: "Linear", title: "Full-Stack Web App", value: 6500, status: "Sent", sent: "Mar 8", expires: "Mar 22", win: 72, type: "Development" },
  { id: "PROP-002", client: "Vercel", title: "Design System Retainer", value: 6000, status: "Viewed", sent: "Mar 5", expires: "Mar 19", win: 85, type: "Design" },
  { id: "PROP-003", client: "Craft CMS", title: "Custom Theme Development", value: 3500, status: "Draft", sent: "—", expires: "—", win: 55, type: "Development" },
  { id: "PROP-004", client: "Figma", title: "Plugin UI Design", value: 4800, status: "Won", sent: "Feb 10", expires: "—", win: 100, type: "Design" },
  { id: "PROP-005", client: "Webflow", title: "E-commerce Template", value: 2200, status: "Lost", sent: "Jan 20", expires: "—", win: 0, type: "Design+Dev" },
];

const TIME_LOGS = [
  { id: 1, date: "Mar 12", client: "Stripe Inc.", project: "Design System v2", desc: "Component library — button states", hours: 3.5, billable: true, rate: 120 },
  { id: 2, date: "Mar 12", client: "Framer", project: "Marketing Site", desc: "Hero section animation", hours: 2.0, billable: true, rate: 110 },
  { id: 3, date: "Mar 11", client: "Notion", project: "Web App Frontend", desc: "Auth flow implementation", hours: 4.0, billable: true, rate: 130 },
  { id: 4, date: "Mar 11", client: "Stripe Inc.", project: "Dashboard Redesign", desc: "Client review call", hours: 1.0, billable: true, rate: 120 },
  { id: 5, date: "Mar 11", client: "—", project: "Admin", desc: "Invoicing and bookkeeping", hours: 1.5, billable: false, rate: 0 },
  { id: 6, date: "Mar 10", client: "Framer", project: "Component Library", desc: "Token system setup in Figma", hours: 3.0, billable: true, rate: 110 },
  { id: 7, date: "Mar 10", client: "Linear", project: "Proposal", desc: "Scoping call and requirements doc", hours: 2.0, billable: false, rate: 0 },
  { id: 8, date: "Mar 9", client: "Notion", project: "Web App Frontend", desc: "Dashboard components — data tables", hours: 5.0, billable: true, rate: 130 },
];

const TASKS_DATA = [
  { id: 1, text: "Send revised proposal to Linear", due: "Today", client: "Linear", priority: "high", done: false, category: "Business Dev" },
  { id: 2, text: "Review Stripe design system feedback", due: "Today", client: "Stripe Inc.", priority: "high", done: false, category: "Client Work" },
  { id: 3, text: "INV-007 follow-up — Ghost overdue", due: "Today", client: "Ghost", priority: "high", done: false, category: "Finance" },
  { id: 4, text: "Framer marketing site — hero copy", due: "Tomorrow", client: "Framer", priority: "medium", done: false, category: "Client Work" },
  { id: 5, text: "Log time for this week — Notion project", due: "Tomorrow", client: "Notion", priority: "medium", done: false, category: "Admin" },
  { id: 6, text: "Update Craft CMS proposal draft", due: "Mar 15", client: "Craft CMS", priority: "low", done: true, category: "Business Dev" },
  { id: 7, text: "Quarterly tax prep — receipts", due: "Mar 20", client: "—", priority: "medium", done: false, category: "Finance" },
  { id: 8, text: "Renew Figma org plan", due: "Mar 18", client: "—", priority: "low", done: false, category: "Admin" },
];

const revenueData = [
  { month: "Sep", revenue: 4200, expenses: 800 }, { month: "Oct", revenue: 6800, expenses: 1200 },
  { month: "Nov", revenue: 5400, expenses: 900 }, { month: "Dec", revenue: 9200, expenses: 1600 },
  { month: "Jan", revenue: 7600, expenses: 1100 }, { month: "Feb", revenue: 11200, expenses: 1800 },
  { month: "Mar", revenue: 8400, expenses: 1200 },
];

const hoursData = [
  { week: "W1", billable: 28, nonBillable: 8 }, { week: "W2", billable: 32, nonBillable: 6 },
  { week: "W3", billable: 24, nonBillable: 10 }, { week: "W4", billable: 36, nonBillable: 7 },
  { week: "W5", billable: 30, nonBillable: 9 }, { week: "W6", billable: 38, nonBillable: 5 },
];

const clientRevShare = [
  { name: "Stripe", value: 8400, color: "#7c3aed" }, { name: "Notion", value: 12000, color: "#3b82f6" },
  { name: "Framer", value: 9800, color: "#ec4899" }, { name: "Loom", value: 4200, color: "#22c55e" },
  { name: "Others", value: 5900, color: "#52525b" },
];

const STAGE_M = { Active: { color: "#22c55e", dim: "#22c55e14" }, Proposal: { color: "#3b82f6", dim: "#3b82f614" }, Negotiating: { color: "#f59e0b", dim: "#f59e0b14" }, Prospect: { color: "#71717a", dim: "#71717a14" }, Completed: { color: "#7c3aed", dim: "#7c3aed14" }, Churned: { color: "#ef4444", dim: "#ef444414" } };
const STATUS_M = { "In Progress": { color: "#3b82f6", dim: "#3b82f614" }, Review: { color: "#f59e0b", dim: "#f59e0b14" }, Completed: { color: "#22c55e", dim: "#22c55e14" }, Blocked: { color: "#ef4444", dim: "#ef444414" }, Draft: { color: "#71717a", dim: "#71717a14" } };
const INV_M = { Paid: { color: "#22c55e", dim: "#22c55e14" }, Sent: { color: "#3b82f6", dim: "#3b82f614" }, Draft: { color: "#71717a", dim: "#71717a14" }, Overdue: { color: "#ef4444", dim: "#ef444414" } };
const PROP_M = { Sent: { color: "#3b82f6", dim: "#3b82f614" }, Viewed: { color: "#f59e0b", dim: "#f59e0b14" }, Draft: { color: "#71717a", dim: "#71717a14" }, Won: { color: "#22c55e", dim: "#22c55e14" }, Lost: { color: "#ef4444", dim: "#ef444414" } };
const PRI_M = { high: { color: "#ef4444", dim: "#ef444414" }, medium: { color: "#f59e0b", dim: "#f59e0b14" }, low: { color: "#3b82f6", dim: "#3b82f614" } };

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "clients", label: "Clients", icon: "◉" },
  { id: "projects", label: "Projects", icon: "◇" },
  { id: "invoices", label: "Invoices", icon: "▤" },
  { id: "proposals", label: "Proposals", icon: "◎" },
  { id: "timelog", label: "Time Log", icon: "⏱" },
  { id: "tasks", label: "Tasks", icon: "◻", badge: 3 },
  { id: "reports", label: "Reports", icon: "▲" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

const PAGE_TITLES = {
  dashboard: "Dashboard",
  clients: "Clients",
  projects: "Projects",
  invoices: "Invoices",
  proposals: "Proposals",
  timelog: "Time Log",
  tasks: "Tasks",
  reports: "Reports",
  settings: "Settings",
};

const PAGE_SUB = {
  dashboard: "Your freelance business at a glance.",
  clients: "All client relationships in one place.",
  projects: "Track deliverables, deadlines, and progress.",
  invoices: "Send, track, and collect payments.",
  proposals: "Win more work. Track every opportunity.",
  timelog: "Log hours, track utilization, maximize billing.",
  tasks: "Stay on top of everything.",
  reports: "Revenue, hours, and business health.",
  settings: "Profile, rates, integrations, and billing.",
};

const NOTIFICATIONS = [
  { text: "INV-007 overdue — Ghost ($800)", time: "Now", dotKey: "red" },
  { text: "Linear proposal viewed by client", time: "2h ago", dotKey: "amber" },
  { text: "Notion invoice paid — $6,000", time: "Yesterday", dotKey: "green" },
];

const INTEGRATIONS = [
  { name: "Stripe", icon: "💳", status: "Connected" },
  { name: "Notion", icon: "📝", status: "Connected" },
  { name: "Google Calendar", icon: "📅", status: "Connected" },
  { name: "Figma", icon: "🎨", status: "Not Connected" },
  { name: "Slack", icon: "💬", status: "Not Connected" },
  { name: "GitHub", icon: "🐙", status: "Not Connected" },
];

module.exports = {
  THEMES,
  THEME_OPTIONS,
  CLIENTS,
  PROJECTS,
  INVOICES,
  PROPOSALS,
  TIME_LOGS,
  TASKS_DATA,
  revenueData,
  hoursData,
  clientRevShare,
  STAGE_M,
  STATUS_M,
  INV_M,
  PROP_M,
  PRI_M,
  NAV,
  PAGE_TITLES,
  PAGE_SUB,
  NOTIFICATIONS,
  INTEGRATIONS,
};
