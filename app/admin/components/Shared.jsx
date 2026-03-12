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

export function KPI({ t, label, value, sub, change, up }) {
	return (
		<Card t={t} p={18}>
			<div style={{ fontSize: 11, color: t.textSub, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 10 }}>{label}</div>
			<div style={{ fontSize: 28, fontWeight: 700, color: t.text, letterSpacing: -0.5, marginBottom: 6, fontFamily: "'Geist Mono',monospace" }}>{value}</div>
			<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
				{change && <span style={{ fontSize: 11, fontWeight: 700, color: up ? t.green : t.red, fontFamily: "'Geist Mono',monospace" }}>{change}</span>}
				{sub && <span style={{ fontSize: 11, color: t.textMuted }}>{sub}</span>}
			</div>
		</Card>
	);
}

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

export function Avatar({ code, color, size = 36 }) {
	return (
		<div
			style={{
				width: size,
				height: size,
				borderRadius: "50%",
				background: color + "20",
				color,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontSize: size * 0.33,
				fontWeight: 800,
				flexShrink: 0,
				border: `2px solid ${color}30`,
			}}
		>
			{code}
		</div>
	);
}

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

export function SecHead({ t, title, sub, action }) {
	return (
		<div style={{ display: "flex", justifyContent: "space-between", alignItems: sub ? "flex-start" : "center", marginBottom: 16 }}>
			<div>
				<div style={{ fontSize: 13, fontWeight: 700, color: t.text, letterSpacing: -0.2 }}>{title}</div>
				{sub && <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{sub}</div>}
			</div>
			{action && <span style={{ fontSize: 12, color: t.accent, cursor: "pointer", fontWeight: 700 }}>{action}</span>}
		</div>
	);
}

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

export function ChartTip({ active, payload, label, t }) {
	if (!active || !payload?.length) return null;
	return (
		<div style={{ background: t.surfaceB, border: `1px solid ${t.borderB}`, borderRadius: 6, padding: "10px 14px" }}>
			<div style={{ fontSize: 11, color: t.textSub, marginBottom: 4 }}>{label}</div>
			{payload.map((p, i) => (
				<div key={i} style={{ fontSize: 13, fontWeight: 700, color: p.color || t.text, fontFamily: "'Geist Mono',monospace" }}>
					{p.value}
				</div>
			))}
		</div>
	);
}

export function ProgressBar({ value, max, color, t, height = 4 }) {
	const pct = Math.min((value / max) * 100, 100);
	return (
		<div style={{ height, borderRadius: height, background: t.surfaceB, overflow: "hidden" }}>
			<div style={{ height: "100%", width: `${pct}%`, borderRadius: height, background: color, transition: "width 0.5s" }} />
		</div>
	);
}

export function StatCard({ t, label, value, change, up, sub, icon, color }) {
	return (
		<Card t={t} style={{ position: "relative", overflow: "hidden" }}>
			<div style={{ position: "absolute", top: -10, right: -10, fontSize: 52, opacity: 0.06, lineHeight: 1 }}>{icon}</div>
			<div style={{ fontSize: 12, color: t.textSub, fontWeight: 600, marginBottom: 10 }}>{label}</div>
			<div style={{ fontSize: 30, fontWeight: 800, color: color || t.text, letterSpacing: -1, marginBottom: 8 }}>{value}</div>
			{change && (
				<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
					<span style={{ fontSize: 12, fontWeight: 700, color: up ? t.green : t.red }}>{change}</span>
					{sub && <span style={{ fontSize: 11, color: t.textMuted }}>{sub}</span>}
				</div>
			)}
		</Card>
	);
}

export function Modal({ t, title, onClose, children, width = 480 }) {
	return (
		<div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)" }} onClick={onClose}>
			<div style={{ background: t.surface, border: `1px solid ${t.borderB}`, borderRadius: 10, padding: 28, width, maxHeight: "85vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
					<span style={{ fontSize: 15, fontWeight: 700, color: t.text, letterSpacing: -0.3 }}>{title}</span>
					<button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.textSub, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
				</div>
				{children}
			</div>
		</div>
	);
}

export function Field({ t, label, children }) {
	return (
		<div style={{ marginBottom: 14 }}>
			<div style={{ fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 5 }}>{label}</div>
			{children}
		</div>
	);
}

export function Input({ t, placeholder, type = "text", defaultValue }) {
	return (
		<input
			type={type}
			placeholder={placeholder}
			defaultValue={defaultValue}
			style={{
				width: "100%",
				padding: "8px 12px",
				borderRadius: 6,
				border: `1px solid ${t.border}`,
				background: t.surfaceAlt,
				color: t.text,
				fontSize: 13,
				outline: "none",
				fontFamily: "inherit",
			}}
		/>
	);
}

export function Select({ t, options }) {
	return (
		<select
			style={{
				width: "100%",
				padding: "8px 12px",
				borderRadius: 6,
				border: `1px solid ${t.border}`,
				background: t.surfaceAlt,
				color: t.text,
				fontSize: 13,
				outline: "none",
				fontFamily: "inherit",
			}}
		>
			{options.map((o) => (
				<option key={o}>{o}</option>
			))}
		</select>
	);
}
