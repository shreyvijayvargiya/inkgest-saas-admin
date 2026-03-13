export function Field({ t, label, children }) {
	return (
		<div style={{ marginBottom: 14 }}>
			<div style={{ fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 5 }}>{label}</div>
			{children}
		</div>
	);
}
