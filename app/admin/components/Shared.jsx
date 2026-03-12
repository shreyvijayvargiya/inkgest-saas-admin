export function Pill({ children, color, dim, small = false }) {
	return (
		<span
			style={{
				display: "inline-flex",
				alignItems: "center",
				padding: small ? "2px 8px" : "3px 11px",
				borderRadius: 20,
				fontSize: small ? 10 : 11,
				fontWeight: 700,
				background: dim,
				color,
				whiteSpace: "nowrap",
				letterSpacing: 0.2,
			}}
		>
			{children}
		</span>
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

export function Card({ children, t, p = 24, style = {}, onClick }) {
	return (
		<div
			onClick={onClick}
			style={{
				background: t.surface,
				borderRadius: 24,
				boxShadow: t.shadow,
				padding: p,
				border: `1px solid ${t.border}`,
				transition: "box-shadow 0.2s",
				cursor: onClick ? "pointer" : "default",
				...style,
			}}
		>
			{children}
		</div>
	);
}

export function SecHead({ t, children, action, sub }) {
	return (
		<div style={{ marginBottom: 18 }}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<h2 style={{ fontSize: 15, fontWeight: 800, color: t.text, letterSpacing: -0.3 }}>{children}</h2>
				{action && <span style={{ fontSize: 12, color: t.accent, cursor: "pointer", fontWeight: 700 }}>{action}</span>}
			</div>
			{sub && <p style={{ fontSize: 12, color: t.textSub, marginTop: 3 }}>{sub}</p>}
		</div>
	);
}

export function Btn({ children, t, primary, small, danger, onClick, style = {} }) {
	return (
		<button
			onClick={onClick}
			style={{
				padding: small ? "7px 14px" : "10px 20px",
				borderRadius: 12,
				background: primary ? t.accent : danger ? t.redDim : "transparent",
				color: primary ? t.bg : danger ? t.red : t.textSub,
				border: primary ? "none" : danger ? `1px solid ${t.red}30` : `1px solid ${t.border}`,
				fontSize: small ? 12 : 13,
				fontWeight: 700,
				cursor: "pointer",
				fontFamily: "inherit",
				transition: "all 0.15s",
				whiteSpace: "nowrap",
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
		<div style={{ background: t.surfaceB, border: `1px solid ${t.border}`, borderRadius: 14, padding: "10px 14px", boxShadow: t.shadow }}>
			<div style={{ fontSize: 11, color: t.textSub, marginBottom: 5 }}>{label}</div>
			{payload.map((p, i) => (
				<div key={i} style={{ fontSize: 13, fontWeight: 800, color: p.color || t.accent }}>{p.value}</div>
			))}
		</div>
	);
}

export function ProgressBar({ value, max, color, t, height = 8 }) {
	const pct = Math.min((value / max) * 100, 100);
	return (
		<div style={{ height, borderRadius: height, background: t.surfaceB, overflow: "hidden" }}>
			<div style={{ height: "100%", width: `${pct}%`, borderRadius: height, background: color, transition: "width 0.6s ease" }} />
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
		<div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }} onClick={onClose}>
			<div style={{ background: t.surface, borderRadius: 24, padding: 28, width, maxHeight: "85vh", overflowY: "auto", boxShadow: t.shadowLg, border: `1px solid ${t.border}` }} onClick={(e) => e.stopPropagation()}>
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
					<span style={{ fontSize: 17, fontWeight: 800, color: t.text }}>{title}</span>
					<button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.textSub, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
				</div>
				{children}
			</div>
		</div>
	);
}

export function Field({ t, label, children }) {
	return (
		<div style={{ marginBottom: 16 }}>
			<div style={{ fontSize: 12, fontWeight: 700, color: t.textSub, marginBottom: 6, letterSpacing: 0.3 }}>{label}</div>
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
				padding: "10px 14px",
				borderRadius: 12,
				border: `1.5px solid ${t.border}`,
				background: t.surfaceAlt,
				color: t.text,
				fontSize: 13,
				outline: "none",
				fontFamily: "inherit",
				transition: "border-color 0.15s",
			}}
		/>
	);
}

export function Select({ t, options }) {
	return (
		<select
			style={{
				width: "100%",
				padding: "10px 14px",
				borderRadius: 12,
				border: `1.5px solid ${t.border}`,
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
