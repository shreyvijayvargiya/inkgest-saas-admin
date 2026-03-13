export function SecHead({ t, title, sub, action }) {
	return (
		<div style={{ display: "flex", justifyContent: "space-between", alignItems: sub ? "flex-start" : "center", marginBottom: 16 }}>
			<div>
				<div style={{ fontSize: 13, fontWeight: 700, color: t.text, letterSpacing: -0.2 }}>{title}</div>
				{sub && <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{sub}</div>}
			</div>
			{action && <span style={{ fontSize: 12, color: t.accent, cursor: "pointer", fontWeight: 700 }}>{action}</span>}
		</div>
	);
}
