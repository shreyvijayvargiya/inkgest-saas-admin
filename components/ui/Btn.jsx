export const Btn = ({ children, t, primary, small, onClick, style = {} }) => {
	return (
		<button
			onClick={onClick}
			style={{
				padding: small ? "6px 12px" : "9px 18px",
				borderRadius: 9,
				background: primary ? t.accent : t.surfaceAlt,
				color: primary ? t.bg : t.textSub,
				border: primary ? "none" : `1px solid ${t.border}`,
				fontSize: small ? 12 : 13,
				fontWeight: 700,
				cursor: "pointer",
				fontFamily: "inherit",
				transition: "opacity 0.15s",
				...style,
			}}
		>
			{children}
		</button>
	);
}
