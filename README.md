# Freelance CRM Template

A modern CRM for freelancers and solo consultants built with Next.js. Manage clients, projects, invoices, proposals, time logs, tasks, reports, and settings from one dashboard. No database or backend required — customize everything by editing a single root data file.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the CRM.

## Customize Your CRM

All data lives in **`data.js`** at the project root. Edit this single file to create your own Freelance CRM — no store, Redux, or API needed. Each page imports from this data via `app/admin/data.js`, which re-exports from `data.js` only.

### Data Structure

| Section | Description |
|--------|-------------|
| `THEMES` | Dark, Light, Warm, Slate color palettes |
| `THEME_OPTIONS` | Theme switcher labels and icons |
| `CLIENTS` | Client records (contact, stage, type, value, outstanding, tags) |
| `PROJECTS` | Projects (client, status, budget, billed, deadline, progress, hours) |
| `INVOICES` | Invoices (client, amount, status, issued, due, paid, line items) |
| `PROPOSALS` | Proposals (client, title, value, status, win probability) |
| `TIME_LOGS` | Time entries (date, client, project, hours, billable, rate) |
| `TASKS_DATA` | To-do items (due, priority, category, client) |
| `revenueData` | Monthly revenue vs expenses (charts) |
| `hoursData` | Billable vs non-billable hours by week |
| `clientRevShare` | Revenue by client (pie/bar charts) |
| `STAGE_M` / `STATUS_M` / `INV_M` / `PROP_M` / `PRI_M` | Status and priority colors |
| `NAV` | Sidebar navigation (id, label, icon) |
| `PAGE_TITLES` / `PAGE_SUB` | Page titles and subtitles |
| `NOTIFICATIONS` | Header notification list |
| `INTEGRATIONS` | Settings integrations (Stripe, Notion, etc.) |

### Example: Add a New Client

```javascript
// In data.js, add to the CLIENTS array:
{
  id: 9,
  name: "Acme Corp",
  contact: "Jane Doe",
  email: "jane@acme.com",
  phone: "+1 (555) 000-0000",
  stage: "Prospect",
  type: "Project",
  value: 5000,
  outstanding: 0,
  started: "—",
  tags: ["SaaS", "Dev"],
  avatar: "AC",
  color: "#3b82f6",
  projects: 0,
  lastActivity: "Today",
}
```

## Pages

- **Dashboard** — Revenue KPIs, revenue vs expenses chart, revenue by client, active projects, due today tasks, recent invoices, open proposals
- **Clients** — Client table with stage filters, client detail panel, new client modal
- **Projects** — Project cards with status, progress, budget, hours; status filters
- **Invoices** — Invoice table with status filters, invoice detail modal (line items, send/PDF)
- **Proposals** — Proposal cards with pipeline value, win rate, follow-up actions
- **Time Log** — Billable/non-billable KPIs, hours chart, time entries by date, log time modal
- **Tasks** — Tasks by due (Today, Tomorrow, This Week), priority/category filters, new task modal
- **Reports** — Period selector, revenue/hours/rate KPIs, monthly revenue chart, revenue by client, billable vs non-billable, proposal performance
- **Settings** — Profile, rates & billing, integrations, notifications, plan & billing history

## Themes

Four themes are defined in `data.js`: **Dark**, **Light**, **Warm** (amber/terracotta), and **Slate** (blue-gray). Use the theme buttons in the sidebar to switch. The selected theme is stored in `localStorage` as `crm-theme`.

## Layout

The app uses a single **Layout** (`app/admin/Layout.jsx`): sidebar on the left (Freelance CRM branding, nav from `data.js`, outstanding invoices widget, theme switcher), main content on the right with header (breadcrumb, search, notifications, settings, user avatar). The AI chatbot sidebar is included when enabled.

## Tech Stack

- Next.js (Pages Router)
- React
- Recharts
- Root `data.js` (single source of truth); `app/admin/data.js` re-exports from it only

## License

MIT
