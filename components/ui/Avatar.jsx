export const Avatar = ({ code, color, size = 34 }) => {
	return (
		<div
			style={{
				width: size,
				height: size,
				borderRadius: Math.round(size * 0.28),
				background: color + "22",
				color,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontSize: size * 0.35,
				fontWeight: 800,
				flexShrink: 0,
			}}
		>
			{code}
		</div>
	);
};
