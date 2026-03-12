# EstateOS — Real Estate CRM Template

A modern Real Estate CRM built with Next.js. Manage leads, listings, pipeline, calendar, outreach, tasks, and reports from a single dashboard. No database or backend required — customize everything by editing one data file.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the CRM.

## Customize Your CRM

All data lives in **`data/crm-data.js`**. Edit this single file to create your own Real Estate CRM — no store, Redux, or API needed. Each page imports from this data object.

### Data Structure

| Section | Description |
|--------|-------------|
| `themes` | Dark/light color palettes |
| `agents` | Team members with performance metrics |
| `leads` | CRM leads (buyers, sellers, investors) |
| `listings` | Properties for sale |
| `pipelineStages` | Deal stages for the pipeline board |
| `tasks` | To-do items |
| `emailTemplates` | Outreach email templates |
| `sequences` | Automated email sequences |
| `revenueData` | Dashboard revenue chart data |
| `sourceData` | Lead source pie chart |
| `funnelData` | Pipeline funnel chart |
| `agentPerf` | Agent performance table |
| `activityFeed` | Recent activity list |
| `kpis` | Dashboard KPI cards |
| `showings` | Calendar events (showings, inspections, closings) |
| `navMain` / `navBottom` | Sidebar navigation |
| `agencyProfile` | Agency name, license, contact |
| `integrations` | Connected services (Zillow, MLS, etc.) |
| `billing` | Plan, amount, billing history |

### Example: Add a New Lead

```javascript
// In data/crm-data.js, add to the leads array:
{
  id: 9,
  name: "Jane Smith",
  type: "Buyer",
  budget: 550000,
  stage: "New Lead",
  source: "Website",
  agent: "SR",
  lastContact: "Today",
  score: 72,
  phone: "+1 (555) 123-4567",
  email: "jane@email.com",
  notes: "First-time buyer, looking for 2BR condo.",
  interested: ["Downtown Condo"]
}
```

### Example: Add a Calendar Event

```javascript
// In data/crm-data.js, add to the showings array:
{
  date: "2026-03-28",
  time: "3:00 PM",
  address: "123 Main St",
  client: "John Doe",
  agent: "JM",
  type: "Showing"
}
```

### Example: Update Agency Profile

```javascript
agencyProfile: {
  name: "Your Agency Name",
  website: "www.youragency.com",
  license: "RE-2024-XXXX",
  phone: "+1 (555) 000-0000",
  email: "office@youragency.com",
  address: "Your address here",
}
```

## Pages

- **Dashboard** — KPIs, revenue chart, funnel, activity feed, tasks
- **Leads** — List/kanban view, filters, lead detail panel
- **Listings** — Property table with status, agent, DOM
- **Pipeline** — Drag-and-drop deal stages
- **Calendar** — Showings, open houses, inspections, closings
- **Outreach** — Email templates and sequences
- **Tasks** — To-do list with due dates and priorities
- **Reports** — Revenue, lead sources, agent performance
- **Settings** — Agency profile, agents, integrations, billing

## Tech Stack

- Next.js (Pages Router)
- React
- Recharts
- Tailwind CSS (optional utility classes)

## Layout

The app uses a flex layout: sidebar on the left, main content on the right. On mobile, the sidebar collapses into a slide-out drawer.

## License

MIT
