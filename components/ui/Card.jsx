export function Card({ children, t, p = 20, style = {}, onClick }) {
	return (
		<div
			onClick={onClick}
			style={{
				background: t.surface,
				borderRadius: 8,
				border: `1px solid ${t.border}`,
				padding: p,
				transition: "border-color 0.15s",
				cursor: onClick ? "pointer" : "default",
				...(t.shadow ? { boxShadow: t.shadow } : {}),
				...style,
			}}
		>
			{children}
		</div>
	);
}
