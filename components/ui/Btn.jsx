export function Btn({ children, t, primary, small, danger, onClick, style = {} }) {
	return (
		<button
			onClick={onClick}
			style={{
				padding: small ? "5px 10px" : "8px 16px",
				borderRadius: 6,
				background: primary ? t.accent : danger ? t.redDim : t.surfaceAlt,
				color: primary ? "#fff" : danger ? t.red : t.textSub,
				border: primary ? "none" : danger ? `1px solid ${t.red}30` : `1px solid ${t.border}`,
				fontSize: small ? 11 : 12,
				fontWeight: 700,
				cursor: "pointer",
				fontFamily: "inherit",
				transition: "all 0.15s",
				whiteSpace: "nowrap",
				letterSpacing: 0.2,
				...style,
			}}
		>
			{children}
		</button>
	);
}
