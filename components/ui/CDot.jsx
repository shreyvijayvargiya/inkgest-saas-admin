export function CDot({ client, clients }) {
	const c = (clients || []).find((x) => x.name === client);
	const color = c?.color || "#52525b";
	const avatar = c?.avatar || (client && client !== "—" ? client.slice(0, 2).toUpperCase() : "—");
	return (
		<div
			style={{
				width: 28,
				height: 28,
				borderRadius: 4,
				background: color + "22",
				color: color,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontSize: 9,
				fontWeight: 800,
				flexShrink: 0,
				border: `1px solid ${color}30`,
				fontFamily: "'Geist Mono',monospace",
			}}
		>
			{avatar}
		</div>
	);
}
