import { useState } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, SecHead, ChartTip, Pill, Avatar, Btn } from "../Shared";
import { useCRM } from "../../RealEstateLayout";
import { revenueData, sourceData, agentPerf, agentColor, AGENTS_DATA, monthlyDeals, convData } from "../../data";

export default function ReportsPage() {
	const { t } = useCRM();
	const [period, setPeriod] = useState("6M");

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
			<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
				{["1M", "3M", "6M", "YTD", "1Y"].map((p) => (
					<div
						key={p}
						onClick={() => setPeriod(p)}
						style={{
							padding: "6px 14px",
							borderRadius: 7,
							fontSize: 12,
							fontWeight: 700,
							cursor: "pointer",
							background: period === p ? t.accent : t.surfaceAlt,
							color: period === p ? t.bg : t.textMuted,
						}}
					>
						{p}
					</div>
				))}
				<Btn t={t} style={{ marginLeft: "auto" }}>
					Export CSV
				</Btn>
			</div>

			<div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="crm-reports-kpis">
				{[
					{ label: "Total Volume", val: "$38.5M", change: "+28%", up: true },
					{ label: "Gross Commission", val: "$1.15M", change: "+31%", up: true },
					{ label: "Total Deals Closed", val: "45", change: "+9", up: true },
					{ label: "Avg Commission/Deal", val: "$25.6K", change: "+4%", up: true },
				].map((m) => (
					<Card key={m.label} t={t}>
						<div style={{ fontSize: 12, color: t.textSub, marginBottom: 6 }}>{m.label}</div>
						<div style={{ fontSize: 24, fontWeight: 800, color: t.text, marginBottom: 4 }}>{m.val}</div>
						<span style={{ fontSize: 12, fontWeight: 700, color: m.up ? t.green : t.red }}>{m.change}</span>
					</Card>
				))}
			</div>

			<div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }} className="crm-reports-charts">
				<Card t={t}>
					<SecHead t={t}>Revenue Over Time</SecHead>
					<ResponsiveContainer width="100%" height={220}>
						<BarChart data={revenueData} margin={{ top: 0, right: 0, bottom: 0, left: -15 }}>
							<XAxis dataKey="month" tick={{ fill: t.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
							<YAxis tick={{ fill: t.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
							<Tooltip content={<ChartTip t={t} />} />
							<Bar dataKey="volume" fill={t.accent} radius={[5, 5, 0, 0]} />
							<Bar dataKey="commission" fill={t.blue} radius={[5, 5, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</Card>
				<Card t={t}>
					<SecHead t={t}>Lead Source Attribution</SecHead>
					<ResponsiveContainer width="100%" height={200}>
						<PieChart>
							<Pie data={sourceData} dataKey="leads" nameKey="source" cx="50%" cy="50%" outerRadius={75} paddingAngle={3}>
								{sourceData.map((e, i) => (
									<Cell key={i} fill={e.color} />
								))}
							</Pie>
							<Tooltip content={<ChartTip t={t} />} />
						</PieChart>
					</ResponsiveContainer>
					<div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
						{sourceData.map((s) => (
							<div key={s.source} style={{ display: "flex", alignItems: "center", gap: 4 }}>
								<div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
								<span style={{ fontSize: 11, color: t.textSub }}>{s.source}</span>
							</div>
						))}
					</div>
				</Card>
			</div>

			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="crm-reports-charts2">
				<Card t={t}>
					<SecHead t={t}>Monthly Deals — New vs Closed</SecHead>
					<ResponsiveContainer width="100%" height={200}>
						<LineChart data={monthlyDeals} margin={{ top: 0, right: 0, bottom: 0, left: -15 }}>
							<XAxis dataKey="month" tick={{ fill: t.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
							<YAxis tick={{ fill: t.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
							<Tooltip content={<ChartTip t={t} />} />
							<Line type="monotone" dataKey="new" stroke={t.blue} strokeWidth={2} dot={false} />
							<Line type="monotone" dataKey="closed" stroke={t.green} strokeWidth={2} dot={false} />
						</LineChart>
					</ResponsiveContainer>
				</Card>
				<Card t={t}>
					<SecHead t={t}>Conversion Funnel</SecHead>
					<div style={{ marginTop: 8 }}>
						{convData.map((c, i) => {
							const pct = (c.value / convData[0].value) * 100;
							const colors = [t.blue, t.accent, t.purple, t.amber, t.green];
							return (
								<div key={c.name} style={{ marginBottom: 12 }}>
									<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
										<span style={{ fontSize: 12, color: t.textSub, fontWeight: 500 }}>{c.name}</span>
										<div style={{ display: "flex", gap: 8 }}>
											<span style={{ fontSize: 12, fontWeight: 700, color: t.text }}>{c.value}</span>
											{i > 0 && <span style={{ fontSize: 11, color: t.textMuted }}>{Math.round((c.value / convData[i - 1].value) * 100)}% conv.</span>}
										</div>
									</div>
									<div style={{ height: 6, borderRadius: 3, background: t.surfaceAlt }}>
										<div style={{ height: "100%", width: `${pct}%`, borderRadius: 3, background: colors[i], transition: "width 0.6s" }} />
									</div>
								</div>
							);
						})}
					</div>
				</Card>
			</div>

			<Card t={t} p={0} style={{ overflow: "hidden" }}>
				<div style={{ padding: "16px 20px", borderBottom: `1px solid ${t.border}` }}>
					<h2 style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Agent Performance Breakdown</h2>
				</div>
				<div
					className="crm-reports-agent-header"
					style={{
						display: "grid",
						gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
						padding: "11px 20px",
						borderBottom: `1px solid ${t.border}`,
						fontSize: 11,
						fontWeight: 700,
						color: t.textMuted,
						letterSpacing: 0.5,
					}}
				>
					<span>AGENT</span>
					<span>VOLUME</span>
					<span>COMMISSION</span>
					<span>DEALS CLOSED</span>
					<span>AVG DAYS</span>
					<span>TREND</span>
				</div>
				{agentPerf.map((a, i) => (
					<div
						key={a.name}
						className="crm-reports-agent-row"
						style={{
							display: "grid",
							gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
							padding: "14px 20px",
							borderBottom: i < agentPerf.length - 1 ? `1px solid ${t.border}` : "none",
							alignItems: "center",
						}}
					>
						<div style={{ display: "flex", gap: 10, alignItems: "center" }}>
							<Avatar code={a.name} color={agentColor[a.name]} size={32} />
							<div>
								<div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{AGENTS_DATA.find((ag) => ag.code === a.name)?.name || a.name}</div>
								<div style={{ fontSize: 11, color: t.textSub }}>{AGENTS_DATA.find((ag) => ag.code === a.name)?.role}</div>
							</div>
						</div>
						<span style={{ fontWeight: 700, color: t.text }}>${a.vol}M</span>
						<span style={{ fontWeight: 700, color: t.green }}>${a.comm}K</span>
						<span style={{ color: t.text }}>{a.deals} deals</span>
						<span style={{ color: t.textSub }}>36d avg</span>
						<Pill color={t.green} dim={t.greenDim} small>
							↑ Strong
						</Pill>
					</div>
				))}
			</Card>
		</div>
	);
}
