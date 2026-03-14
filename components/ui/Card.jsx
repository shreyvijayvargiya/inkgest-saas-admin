export const Card = ({ children, t, p = 22, style = {} }) => {
	return (
		<div
			style={{
				background: t.surface,
				border: `1px solid ${t.border}`,
				borderRadius: 16,
				padding: p,
				...style,
			}}
		>
			{children}
		</div>
	);
}
