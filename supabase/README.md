# Supabase — Freelance CRM

Migrations define the schema that mirrors `data.js` so the app can use Supabase as the backend.

## Tables (from data.js)

| Table          | data.js source  | Notes |
|----------------|-----------------|--------|
| `clients`     | CLIENTS         | id, name, contact, email, phone, stage, type, value, outstanding, started, tags, avatar, color, last_activity |
| `projects`    | PROJECTS        | client_id → clients.id; name, status, type, budget, billed, deadline, progress, hours, est_hours, tags |
| `invoices`    | INVOICES        | id (e.g. INV-001), client_id, amount, status, issued, due, paid |
| `invoice_items` | INVOICES[].items | invoice_id, desc, rate |
| `proposals`   | PROPOSALS       | id (e.g. PROP-001), client_id, title, value, status, sent, expires, win, type |
| `time_logs`   | TIME_LOGS       | date, client_id, project_id (nullable), desc, hours, billable, rate |
| `tasks`       | TASKS_DATA      | text, due, client_id (nullable), priority, done, category |

Theme/config/chart data (THEMES, NAV, NOTIFICATIONS, revenueData, etc.) stay in `data.js` unless you add separate tables.

## Apply migrations

**Option A — Supabase CLI (linked project)**

```bash
npx supabase link --project-ref YOUR_REF
npx supabase db push
```

**Option B — Supabase Dashboard**

1. Open your project → SQL Editor.
2. Paste and run the contents of `migrations/20260312120000_initial_freelance_crm.sql`.

## Seeding from data.js

To backfill Supabase from the current `data.js`:

1. Insert **clients** first (use the same `id` values as in data.js so you can map by id).
2. Insert **projects** with `client_id` = client id (match by client name → id).
3. Insert **invoices** and **invoice_items** (match client name → client_id).
4. Insert **proposals** (match client name → client_id).
5. Insert **time_logs** (client_id/project_id nullable where client is "—" or no project).
6. Insert **tasks** (client_id nullable where client is "—").

You can do this with a one-off script that reads `data.js` (or its exports), maps client/project names to IDs, and uses `@supabase/supabase-js` to insert rows.
