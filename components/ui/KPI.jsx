import { Card } from "./Card";

export function KPI({ t, label, value, sub, change, up }) {
	return (
		<Card t={t} p={18}>
			<div style={{ fontSize: 11, color: t.textSub, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 10 }}>{label}</div>
			<div style={{ fontSize: 28, fontWeight: 700, color: t.text, letterSpacing: -0.5, marginBottom: 6, fontFamily: "'Geist Mono',monospace" }}>{value}</div>
			<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
				{change && <span style={{ fontSize: 11, fontWeight: 700, color: up ? t.green : t.red, fontFamily: "'Geist Mono',monospace" }}>{change}</span>}
				{sub && <span style={{ fontSize: 11, color: t.textMuted }}>{sub}</span>}
			</div>
		</Card>
	);
}
