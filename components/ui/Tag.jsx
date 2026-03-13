export function Tag({ children, t }) {
	return (
		<span
			style={{
				display: "inline-flex",
				alignItems: "center",
				padding: "1px 7px",
				borderRadius: 3,
				fontSize: 10,
				fontWeight: 600,
				background: t.surfaceB,
				color: t.textSub,
				border: `1px solid ${t.border}`,
			}}
		>
			{children}
		</span>
	);
}
