import { writeFileSync } from "fs";
import path from "path";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { content } = req.body;
	if (!content || typeof content !== "string") {
		return res.status(400).json({ error: "Content is required" });
	}

	try {
		const cwd = process.cwd();
		const dataPath = path.join(cwd, "data.js");

		// Ensure content has valid structure (HopeCRM root data.js)
		if (!content.includes("module.exports") && !content.includes("THEMES") && !content.includes("DONORS")) {
			return res.status(400).json({ error: "Invalid content: must contain THEMES, DONORS, and module.exports" });
		}

		writeFileSync(dataPath, content, "utf-8");

		return res.status(200).json({ success: true, message: "data.js updated successfully" });
	} catch (err) {
		console.error("Save data error:", err);
		return res.status(500).json({ error: err.message || "Failed to save file" });
	}
}
