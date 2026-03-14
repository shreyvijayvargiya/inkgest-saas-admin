export const SecHead = ({ t, children, action }) => {
	return (
		<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
			<h2 style={{ fontSize: 14, fontWeight: 700, color: t.text, letterSpacing: -0.2 }}>{children}</h2>
			{action && (
				<span style={{ fontSize: 12, color: t.accent, cursor: "pointer", fontWeight: 600 }}>{action}</span>
			)}
		</div>
	);
}
