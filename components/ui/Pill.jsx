export function Pill({ children, color, dim, small = false }) {
	return (
		<span
			style={{
				display: "inline-flex",
				alignItems: "center",
				padding: small ? "2px 7px" : "3px 9px",
				borderRadius: 4,
				fontSize: small ? 10 : 11,
				fontWeight: 700,
				background: dim,
				color,
				whiteSpace: "nowrap",
				letterSpacing: 0.3,
				fontFamily: "'Geist Mono',monospace",
			}}
		>
			{children}
		</span>
	);
}
