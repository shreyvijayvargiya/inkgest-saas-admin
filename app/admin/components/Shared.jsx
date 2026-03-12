import {
	AreaChart, Area, BarChart, Bar, XAxis, YAxis,
	Tooltip, ResponsiveContainer, FunnelChart, Funnel,
	LabelList, Cell, PieChart, Pie, LineChart, Line,
} from "recharts";

export function Pill({ children, color, dim, small = false }) {
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

export function Avatar({ code, color, size = 34 }) {
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
}

export function Card({ children, t, p = 22, style = {} }) {
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

export function SecHead({ t, children, action }) {
	return (
		<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
			<h2 style={{ fontSize: 14, fontWeight: 700, color: t.text, letterSpacing: -0.2 }}>{children}</h2>
			{action && (
				<span style={{ fontSize: 12, color: t.accent, cursor: "pointer", fontWeight: 600 }}>{action}</span>
			)}
		</div>
	);
}

export function ChartTip({ active, payload, label, t }) {
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

export function Btn({ children, t, primary, small, onClick, style = {} }) {
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
