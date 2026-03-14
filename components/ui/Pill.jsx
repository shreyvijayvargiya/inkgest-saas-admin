export const Pill = ({ children, color, dim, small = false }) => {
	return (
		<span
			style={{
				display: "inline-flex",
				alignItems: "center",
				padding: small ? "2px 7px" : "3px 10px",
				borderRadius: 20,
				fontSize: small ? 10 : 11,
				fontWeight: 700,
				background: dim,
				color,
				whiteSpace: "nowrap",
			}}
		>
			{children}
		</span>
	);
}
