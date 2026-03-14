export const ChartTip = ({ active, payload, label, t }) => {
	if (!active || !payload?.length) return null;
	return (
		<div
			style={{
				background: t.surfaceB,
				border: `1px solid ${t.border}`,
				borderRadius: 10,
				padding: "10px 14px",
			}}
		>
			<div style={{ fontSize: 11, color: t.textSub, marginBottom: 4 }}>{label}</div>
			{payload.map((p, i) => (
				<div key={i} style={{ fontSize: 13, fontWeight: 700, color: p.color || t.text }}>
					{p.value}
				</div>
			))}
		</div>
	);
}
