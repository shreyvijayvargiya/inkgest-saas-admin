import { readFileSync, existsSync } from "fs";
import path from "path";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { prompt } = req.body;
	if (!prompt || typeof prompt !== "string") {
		return res.status(400).json({ error: "Prompt is required" });
	}

	const apiKey = process.env.OPENROUTER_API_KEY;
	if (!apiKey) {
		return res.status(500).json({ error: "OPENROUTER_API_KEY is not configured" });
	}

	try {
		const cwd = process.cwd();
		const defaultDataPath = path.join(cwd, "data.js");
		const defaultData = existsSync(defaultDataPath) ? readFileSync(defaultDataPath, "utf-8") : "// No default data.js found";

		const systemPrompt = `You are a JavaScript data generator for HopeCRM, a Nonprofit/Charity CRM template. The user will provide customization requests (organization name, donors, grants, campaigns, staff, etc.) in any format.

RULES:
1. Return ONLY valid JavaScript. No markdown, no explanations.
2. Use the EXACT same schema and structure as the default data below. Do NOT add new top-level keys.
3. Keep all required exports: THEMES, STAFF_COLOR, DONORS, GRANTS, CAMPAIGNS, EVENTS, VOLUNTEERS, TASKS_DATA, EMAIL_TEMPLATES, SEQUENCES, raisedOverTime, retentionData, sourceData, volunteerHours, STAGE_META, TIER_META, TYPE_META, PRIORITY_META, GRANT_STAGE_META, EVENT_TYPE_COLOR, NAV, PAGE_TITLES, PAGE_SUB, STAFF_LIST, INTEGRATIONS, STAFF_PERF, UPCOMING_DEADLINES, NOTIFICATIONS.
4. Only update data values: organization name, donor names, grant funders, campaign names, staff names, etc. Keep staff codes (AM, JT, RK, NP, LW) consistent across the file.
5. Start with the comment: /** HopeCRM — Nonprofit / Charity CRM — Master Data File */ and end with: module.exports = { THEMES, STAFF_COLOR, DONORS, GRANTS, CAMPAIGNS, EVENTS, VOLUNTEERS, TASKS_DATA, EMAIL_TEMPLATES, SEQUENCES, raisedOverTime, retentionData, sourceData, volunteerHours, STAGE_META, TIER_META, TYPE_META, PRIORITY_META, GRANT_STAGE_META, EVENT_TYPE_COLOR, NAV, PAGE_TITLES, PAGE_SUB, STAFF_LIST, INTEGRATIONS, STAFF_PERF, UPCOMING_DEADLINES, NOTIFICATIONS };
6. Preserve all hex color codes for THEMES and meta objects.

DEFAULT DATA (for schema reference):
\`\`\`javascript
${defaultData.slice(0, 12000)}
\`\`\`

Return the complete data.js file content as your response.`;

		const response = await fetch(OPENROUTER_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey.trim()}`,
				"HTTP-Referer": req.headers.origin || "http://localhost:3000",
			},
			body: JSON.stringify({
				model: "openai/gpt-4o-mini",
				messages: [
					{ role: "system", content: systemPrompt },
					{ role: "user", content: prompt },
				],
				temperature: 0.3,
			}),
		});

		if (!response.ok) {
			const errText = await response.text();
			throw new Error(`OpenRouter API error: ${response.status} - ${errText}`);
		}

		const data = await response.json();
		const content = data.choices?.[0]?.message?.content?.trim();

		if (!content) {
			throw new Error("No content in AI response");
		}

		// Strip markdown code blocks if present
		let cleanContent = content;
		if (cleanContent.startsWith("```")) {
			cleanContent = cleanContent.replace(/^```(?:javascript|js)?\n?/, "").replace(/\n?```$/, "");
		}

		// Ensure it ends with module.exports
		if (!cleanContent.includes("module.exports")) {
			cleanContent = cleanContent.replace(/;?\s*$/, "") + "\n\nmodule.exports = { THEMES, STAFF_COLOR, DONORS, GRANTS, CAMPAIGNS, EVENTS, VOLUNTEERS, TASKS_DATA, EMAIL_TEMPLATES, SEQUENCES, raisedOverTime, retentionData, sourceData, volunteerHours, STAGE_META, TIER_META, TYPE_META, PRIORITY_META, GRANT_STAGE_META, EVENT_TYPE_COLOR, NAV, PAGE_TITLES, PAGE_SUB, STAFF_LIST, INTEGRATIONS, STAFF_PERF, UPCOMING_DEADLINES, NOTIFICATIONS };";
		}

		return res.status(200).json({ content: cleanContent });
	} catch (err) {
		console.error("Customise API error:", err);
		return res.status(500).json({ error: err.message || "Failed to generate data" });
	}
}
