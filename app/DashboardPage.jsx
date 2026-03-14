import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	FunnelChart,
	Funnel,
	LabelList,
	Cell,
} from "recharts";
import { Card, SecHead, ChartTip, Pill, Avatar } from "../components/ui";
import { useCRM } from "./RealEstateLayout";
import crmdata from "../data";

export default function DashboardPage() {
	const {
		kpis,
		revenueData,
		funnelData,
		activityFeed,
		sourceData,
		agentColor,
		AGENTS_DATA,
		LISTINGS_DATA,
		statusMeta,
		typeMeta,
		priorityMeta,
	} = crmdata;
	const { t, taskList, setTaskList } = useCRM();
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(4, 1fr)",
					gap: 14,
				}}
				className="crm-kpi-grid"
			>
				{kpis.map((k) => (
					<Card key={k.label} t={t}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "flex-start",
								marginBottom: 12,
							}}
						>
							<span style={{ fontSize: 12, color: t.textSub, fontWeight: 600 }}>
								{k.label}
							</span>
							<span style={{ fontSize: 18, color: t.accent, opacity: 0.7 }}>
								{k.icon}
							</span>
						</div>
						<div
							style={{
								fontSize: 28,
								fontWeight: 800,
								letterSpacing: -1,
								color: t.text,
								marginBottom: 6,
							}}
						>
							{k.value}
						</div>
						<div style={{ display: "flex", gap: 8 }}>
							<span
								style={{
									fontSize: 12,
									fontWeight: 700,
									color: k.up ? t.green : t.red,
								}}
							>
								{k.change}
							</span>
							<span style={{ fontSize: 11, color: t.textMuted }}>{k.sub}</span>
						</div>
					</Card>
				))}
			</div>
			<div
				style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14 }}
				className="crm-charts-row"
			>
				<Card t={t}>
					<SecHead t={t} action="Full report →">
						Sales Volume & Commission
					</SecHead>
					<ResponsiveContainer width="100%" height={190}>
						<AreaChart
							data={revenueData}
							margin={{ top: 0, right: 0, bottom: 0, left: -20 }}
						>
							<defs>
								<linearGradient id="vg" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={t.accent} stopOpacity={0.25} />
									<stop offset="95%" stopColor={t.accent} stopOpacity={0} />
								</linearGradient>
								<linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={t.blue} stopOpacity={0.2} />
									<stop offset="95%" stopColor={t.blue} stopOpacity={0} />
								</linearGradient>
							</defs>
							<XAxis
								dataKey="month"
								tick={{ fill: t.textMuted, fontSize: 11 }}
								axisLine={false}
								tickLine={false}
							/>
							<YAxis
								tick={{ fill: t.textMuted, fontSize: 10 }}
								axisLine={false}
								tickLine={false}
							/>
							<Tooltip content={<ChartTip t={t} />} />
							<Area
								type="monotone"
								dataKey="volume"
								stroke={t.accent}
								strokeWidth={2}
								fill="url(#vg)"
								dot={false}
							/>
							<Area
								type="monotone"
								dataKey="commission"
								stroke={t.blue}
								strokeWidth={2}
								fill="url(#cg)"
								dot={false}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</Card>
				<Card t={t}>
					<SecHead t={t}>Pipeline Funnel</SecHead>
					<ResponsiveContainer width="100%" height={200}>
						<FunnelChart>
							<Tooltip content={<ChartTip t={t} />} />
							<Funnel dataKey="value" data={funnelData} isAnimationActive>
								<LabelList
									position="center"
									fill={t.bg}
									fontSize={11}
									fontWeight={700}
									dataKey="name"
								/>
								{funnelData.map((e, i) => (
									<Cell key={i} fill={e.fill} />
								))}
							</Funnel>
						</FunnelChart>
					</ResponsiveContainer>
				</Card>
			</div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1.2fr 1fr 0.9fr",
					gap: 14,
				}}
				className="crm-bottom-row"
			>
				<Card t={t}>
					<SecHead t={t} action="All →">
						Recent Activity
					</SecHead>
					{activityFeed.map((a, i) => (
						<div
							key={i}
							style={{
								display: "flex",
								alignItems: "flex-start",
								gap: 10,
								padding: "9px 0",
								borderBottom:
									i < activityFeed.length - 1
										? `1px solid ${t.border}`
										: "none",
							}}
						>
							<div
								style={{
									width: 30,
									height: 30,
									borderRadius: 8,
									background: (agentColor[a.user] || t.accent) + "18",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: 13,
									flexShrink: 0,
								}}
							>
								{a.icon}
							</div>
							<div style={{ flex: 1, minWidth: 0 }}>
								<div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>
									{a.name}
								</div>
								<div
									style={{
										fontSize: 11,
										color: t.textSub,
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
									}}
								>
									{a.action}
								</div>
							</div>
							<div style={{ flexShrink: 0, textAlign: "right" }}>
								<div
									style={{ fontSize: 10, color: t.textMuted, marginBottom: 3 }}
								>
									{a.time}
								</div>
								<Pill
									color={typeMeta[a.tag]?.color || t.accent}
									dim={typeMeta[a.tag]?.dim || t.accentDim}
									small
								>
									{a.tag}
								</Pill>
							</div>
						</div>
					))}
				</Card>
				<Card t={t}>
					<SecHead t={t} action="All →">
						Due Today
					</SecHead>
					{taskList.slice(0, 5).map((task, i) => (
						<div
							key={task.id}
							style={{
								display: "flex",
								gap: 9,
								padding: "9px 10px",
								background: t.surfaceAlt,
								borderRadius: 9,
								marginBottom: 6,
								opacity: task.done ? 0.45 : 1,
							}}
						>
							<div
								onClick={() =>
									setTaskList((tl) =>
										tl.map((x, j) => (j === i ? { ...x, done: !x.done } : x)),
									)
								}
								style={{
									width: 18,
									height: 18,
									borderRadius: 5,
									border: `2px solid ${task.done ? t.green : t.border}`,
									background: task.done ? t.green + "22" : "transparent",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									cursor: "pointer",
									flexShrink: 0,
									marginTop: 1,
								}}
							>
								{task.done && (
									<span
										style={{ fontSize: 10, color: t.green, fontWeight: 900 }}
									>
										✓
									</span>
								)}
							</div>
							<div style={{ flex: 1 }}>
								<div
									style={{
										fontSize: 12,
										fontWeight: 600,
										color: t.text,
										textDecoration: task.done ? "line-through" : "none",
										lineHeight: 1.4,
									}}
								>
									{task.text}
								</div>
								<div style={{ display: "flex", gap: 5, marginTop: 4 }}>
									<Avatar
										code={task.agent}
										color={agentColor[task.agent]}
										size={16}
									/>
									<Pill
										color={priorityMeta[task.priority].color}
										dim={priorityMeta[task.priority].dim}
										small
									>
										{task.priority}
									</Pill>
								</div>
							</div>
						</div>
					))}
				</Card>
				<Card t={t}>
					<SecHead t={t}>Lead Sources</SecHead>
					{sourceData.map((s) => {
						const max = Math.max(...sourceData.map((x) => x.leads));
						return (
							<div key={s.source} style={{ marginBottom: 11 }}>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginBottom: 4,
									}}
								>
									<span style={{ fontSize: 12, color: t.textSub }}>
										{s.source}
									</span>
									<span
										style={{ fontSize: 12, fontWeight: 700, color: t.text }}
									>
										{s.leads}
									</span>
								</div>
								<div
									style={{
										height: 5,
										borderRadius: 3,
										background: t.surfaceAlt,
									}}
								>
									<div
										style={{
											height: "100%",
											width: `${(s.leads / max) * 100}%`,
											borderRadius: 3,
											background: s.color,
										}}
									/>
								</div>
							</div>
						);
					})}
				</Card>
			</div>
			<div
				style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 14 }}
				className="crm-agents-listings"
			>
				<Card t={t}>
					<SecHead t={t} action="Manage →">
						Agent Leaderboard
					</SecHead>
					{AGENTS_DATA.map((a, i) => (
						<div
							key={a.code}
							style={{
								display: "flex",
								alignItems: "center",
								gap: 10,
								padding: "10px 0",
								borderBottom:
									i < AGENTS_DATA.length - 1 ? `1px solid ${t.border}` : "none",
							}}
						>
							<span
								style={{
									fontSize: 13,
									fontWeight: 800,
									color: t.textMuted,
									width: 16,
								}}
							>
								#{i + 1}
							</span>
							<Avatar code={a.code} color={agentColor[a.code]} size={34} />
							<div style={{ flex: 1 }}>
								<div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>
									{a.name}
								</div>
								<div style={{ fontSize: 11, color: t.textSub }}>
									{a.listings} listings · {a.closings} closed
								</div>
							</div>
							<div style={{ textAlign: "right" }}>
								<div
									style={{
										fontSize: 14,
										fontWeight: 800,
										color: agentColor[a.code],
									}}
								>
									{a.volume}
								</div>
								<div
									style={{
										fontSize: 11,
										fontWeight: 600,
										color: a.trend.startsWith("+") ? t.green : t.red,
									}}
								>
									{a.trend}
								</div>
							</div>
						</div>
					))}
				</Card>
				<Card t={t}>
					<SecHead t={t} action="All listings →">
						Recent Listings
					</SecHead>
					{LISTINGS_DATA.slice(0, 5).map((l) => {
						const sm = statusMeta[l.status] || {
							color: t.accent,
							dim: t.accentDim,
						};
						return (
							<div
								key={l.id}
								style={{
									display: "flex",
									gap: 10,
									padding: "10px 12px",
									background: t.surfaceAlt,
									borderRadius: 11,
									marginBottom: 7,
									cursor: "pointer",
								}}
							>
								<div
									style={{
										width: 40,
										height: 40,
										borderRadius: 9,
										background: t.surfaceB,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: 20,
										flexShrink: 0,
									}}
								>
									{l.img}
								</div>
								<div style={{ flex: 1, minWidth: 0 }}>
									<div
										style={{
											fontSize: 13,
											fontWeight: 600,
											color: t.text,
											overflow: "hidden",
											textOverflow: "ellipsis",
											whiteSpace: "nowrap",
										}}
									>
										{l.address}
									</div>
									<div style={{ fontSize: 11, color: t.textSub }}>
										{l.city}
										{l.beds > 0 ? ` · ${l.beds}bd/${l.baths}ba` : ""} · {l.dom}d
										on market
									</div>
								</div>
								<div style={{ textAlign: "right", flexShrink: 0 }}>
									<div
										style={{
											fontSize: 14,
											fontWeight: 800,
											color: t.text,
											marginBottom: 3,
										}}
									>
										${(l.price / 1000).toFixed(0)}K
									</div>
									<Pill color={sm.color} dim={sm.dim} small>
										{l.status}
									</Pill>
								</div>
							</div>
						);
					})}
				</Card>
			</div>
		</div>
	);
}
