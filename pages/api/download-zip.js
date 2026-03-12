import archiver from "archiver";
import { readFileSync, existsSync } from "fs";
import path from "path";

const INCLUDE_FILES = [
	"package.json",
	"next.config.js",
	"tailwind.config.js",
	"postcss.config.js",
	".gitignore",
	"README.md",
	"pages/_app.js",
	"pages/_document.js",
	"pages/index.js",
	"pages/404.js",
	"pages/donors.js",
	"pages/grants.js",
	"pages/campaigns.js",
	"pages/events.js",
	"pages/volunteers.js",
	"pages/tasks.js",
	"pages/reports.js",
	"pages/communications.js",
	"pages/settings.js",
	"app/admin/data.js",
	"app/admin/Layout.jsx",
	"app/admin/components/AIChatbotSidebar.jsx",
	"app/admin/components/index.js",
	"app/admin/components/Shared.jsx",
	"app/admin/components/pages/index.js",
	"app/admin/components/pages/DashboardPage.jsx",
	"app/admin/components/pages/DonorsPage.jsx",
	"app/admin/components/pages/GrantsPage.jsx",
	"app/admin/components/pages/CampaignsPage.jsx",
	"app/admin/components/pages/EventsPage.jsx",
	"app/admin/components/pages/VolunteersPage.jsx",
	"app/admin/components/pages/TasksPage.jsx",
	"app/admin/components/pages/ReportsPage.jsx",
	"app/admin/components/pages/CommsPage.jsx",
	"app/admin/components/pages/SettingsPage.jsx",
	"styles/globals.css",
];

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "2mb",
		},
	},
};

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { content } = req.body;
	if (!content || typeof content !== "string") {
		return res.status(400).json({ error: "Content is required" });
	}

	const cwd = process.cwd();
	const zipName = `hopecrm-${Date.now()}.zip`;

	res.setHeader("Content-Type", "application/zip");
	res.setHeader("Content-Disposition", `attachment; filename="${zipName}"`);

	const archive = archiver("zip", { zlib: { level: 9 } });
	archive.pipe(res);

	archive.on("error", (err) => {
		console.error("Zip error:", err);
		res.status(500).end();
	});

	// Add custom data.js (root CRM data)
	archive.append(content, { name: "data.js" });

	// Add other project files
	for (const relPath of INCLUDE_FILES) {
		const fullPath = path.join(cwd, relPath);
		if (existsSync(fullPath)) {
			const content = readFileSync(fullPath, "utf-8");
			archive.append(content, { name: relPath });
		}
	}

	await archive.finalize();
}
