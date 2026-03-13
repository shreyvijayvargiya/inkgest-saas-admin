"use client";

import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import {
	Card,
	KPI,
	SecHead,
	ChartTip,
	Pill,
	Tag,
	Btn,
	CDot,
	ProgressBar,
} from "./Shared";
import { useCRM } from "./Layout";
import {
	CLIENTS,
	PROJECTS,
	INVOICES,
	PROPOSALS,
	revenueData,
	clientRevShare,
	STATUS_M,
	INV_M,
	PROP_M,
	PRI_M,
} from "./data";
import router from "next/router";

export default function DashboardPage() {
	const { t, taskList, setTaskList } = useCRM();
	const totalOut = CLIENTS.reduce((s, c) => s + c.outstanding, 0);

	return (
		<div className="flex flex-col gap-6">
			<div className="grid md:grid-cols-4 flex-wrap gap-4">
				<KPI
					t={t}
					label="Revenue — Mar"
					value="$8,400"
					change="+$800"
					up
					sub="vs last month"
				/>
				<KPI
					t={t}
					label="Outstanding"
					value={`$${totalOut.toLocaleString()}`}
					sub="3 invoices open"
				/>
				<KPI
					t={t}
					label="Active Clients"
					value={CLIENTS.filter((c) => c.stage === "Active").length}
					change="+1"
					up
					sub="this quarter"
				/>
				<KPI
					t={t}
					label="Active Projects"
					value={
						PROJECTS.filter((p) => ["In Progress", "Review"].includes(p.status))
							.length
					}
					sub="across clients"
				/>
			</div>
			<div
				style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 12 }}
			>
				<Card t={t}>
					<SecHead
						t={t}
						title="Revenue vs Expenses"
						sub="Last 7 months"
						action="Full report →"
						onClick={() => router.push("/reports")}
					/>
					<ResponsiveContainer width="100%" height={200}>
						<AreaChart
							data={revenueData}
							margin={{ top: 0, right: 0, bottom: 0, left: -20 }}
						>
							<defs>
								<linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={t.accent} stopOpacity={0.25} />
									<stop offset="95%" stopColor={t.accent} stopOpacity={0} />
								</linearGradient>
								<linearGradient id="eg" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={t.red} stopOpacity={0.15} />
									<stop offset="95%" stopColor={t.red} stopOpacity={0} />
								</linearGradient>
							</defs>
							<XAxis
								dataKey="month"
								tick={{ fill: t.textMuted, fontSize: 10 }}
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
								dataKey="revenue"
								stroke={t.accent}
								strokeWidth={2}
								fill="url(#rg)"
								dot={false}
							/>
							<Area
								type="monotone"
								dataKey="expenses"
								stroke={t.red}
								strokeWidth={1.5}
								fill="url(#eg)"
								dot={false}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</Card>
				<Card t={t}>
					<SecHead t={t} title="Revenue by Client" onClick={() => router.push("/clients")} />
					<ResponsiveContainer width="100%" height={180}>
						<PieChart>
							<Pie
								data={clientRevShare}
								dataKey="value"
								cx="50%"
								cy="50%"
								outerRadius={70}
								innerRadius={32}
								paddingAngle={2}
							>
								{clientRevShare.map((e, i) => (
									<Cell key={i} fill={e.color} />
								))}
							</Pie>
							<Tooltip content={<ChartTip t={t} />} />
						</PieChart>
					</ResponsiveContainer>
					<div
						style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}
					>
						{clientRevShare.map((s) => (
							<div
								key={s.name}
								style={{ display: "flex", alignItems: "center", gap: 4 }}
							>
								<div
									style={{
										width: 6,
										height: 6,
										borderRadius: 1,
										background: s.color,
									}}
								/>
								<span style={{ fontSize: 10, color: t.textSub }}>{s.name}</span>
							</div>
						))}
					</div>
				</Card>
			</div>
			<div
				style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}
			>
				<Card t={t} p={0} style={{ overflow: "hidden" }}>
					<div
						style={{
							padding: "16px 18px",
							borderBottom: `1px solid ${t.border}`,
						}}
					>
						<SecHead t={t} title="Active Projects" action="All →" onClick={() => router.push("/projects")} />
					</div>
					{PROJECTS.filter((p) => p.status !== "Completed")
						.slice(0, 5)
						.map((p, i) => {
							const sm = STATUS_M[p.status] || STATUS_M["In Progress"];
							return (
								<div
									key={p.id}
									style={{
										display: "flex",
										gap: 12,
										alignItems: "center",
										padding: "12px 18px",
										borderBottom: i < 4 ? `1px solid ${t.border}` : "none",
									}}
								>
									<CDot client={p.client} clients={CLIENTS} />
									<div style={{ flex: 1, minWidth: 0 }}>
										<div
											style={{
												fontSize: 13,
												fontWeight: 600,
												color: t.text,
												marginBottom: 4,
											}}
										>
											{p.name}
										</div>
										<ProgressBar
											value={p.progress}
											max={100}
											color={sm.color}
											t={t}
											height={3}
										/>
									</div>
									<div style={{ textAlign: "right", flexShrink: 0 }}>
										<Pill color={sm.color} dim={sm.dim} small>
											{p.status}
										</Pill>
										<div
											style={{ fontSize: 10, color: t.textMuted, marginTop: 4 }}
										>
											{p.progress}%
										</div>
									</div>
								</div>
							);
						})}
				</Card>
				<Card t={t}>
					<SecHead t={t} title="Due Today" action="All tasks →" onClick={() => router.push("/tasks")} />
					{taskList
						.filter((x) => x.due === "Today")
						.map((task, i, arr) => {
							const gi = taskList.findIndex((x) => x.id === task.id);
							return (
								<div
									key={task.id}
									style={{
										display: "flex",
										gap: 10,
										padding: "9px 0",
										borderBottom:
											i < arr.length - 1 ? `1px solid ${t.border}` : "none",
										opacity: task.done ? 0.4 : 1,
									}}
								>
									<div
										onClick={() =>
											setTaskList((tl) =>
												tl.map((x, j) =>
													j === gi ? { ...x, done: !x.done } : x,
												),
											)
										}
										style={{
											width: 16,
											height: 16,
											borderRadius: 3,
											border: `1.5px solid ${task.done ? t.accent : t.border}`,
											background: task.done ? t.accentDim : "transparent",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											cursor: "pointer",
											flexShrink: 0,
											marginTop: 2,
										}}
									>
										{task.done && (
											<span
												style={{
													fontSize: 9,
													color: t.accent,
													fontWeight: 900,
												}}
											>
												✓
											</span>
										)}
									</div>
									<div style={{ flex: 1 }}>
										<div
											style={{
												fontSize: 12,
												color: t.text,
												fontWeight: 600,
												textDecoration: task.done ? "line-through" : "none",
												marginBottom: 4,
												lineHeight: 1.4,
											}}
										>
											{task.text}
										</div>
										<div style={{ display: "flex", gap: 5 }}>
											<Pill
												color={PRI_M[task.priority].color}
												dim={PRI_M[task.priority].dim}
												small
											>
												{task.priority}
											</Pill>
											<Tag t={t}>{task.category}</Tag>
										</div>
									</div>
								</div>
							);
						})}
				</Card>
			</div>
			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
				<Card t={t} p={0} style={{ overflow: "hidden" }}>
					<div
						style={{
							padding: "16px 18px",
							borderBottom: `1px solid ${t.border}`,
						}}
					>
						<SecHead t={t} title="Recent Invoices" action="All →" onClick={() => router.push("/invoices")} />
					</div>
					{INVOICES.slice(0, 5).map((inv, i) => {
						const sm = INV_M[inv.status];
						return (
							<div
								key={inv.id}
								style={{
									display: "flex",
									alignItems: "center",
									gap: 12,
									padding: "11px 18px",
									borderBottom: i < 4 ? `1px solid ${t.border}` : "none",
								}}
							>
								<CDot client={inv.client} clients={CLIENTS} />
								<div style={{ flex: 1 }}>
									<div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>
										{inv.id}
									</div>
									<div style={{ fontSize: 10, color: t.textMuted }}>
										{inv.client} · Due {inv.due}
									</div>
								</div>
								<div style={{ textAlign: "right" }}>
									<div
										style={{
											fontSize: 13,
											fontWeight: 700,
											color: t.text,
											fontFamily: "'Geist Mono',monospace",
										}}
									>
										${inv.amount.toLocaleString()}
									</div>
									<Pill color={sm.color} dim={sm.dim} small>
										{inv.status}
									</Pill>
								</div>
							</div>
						);
					})}
				</Card>
				<Card t={t} p={0} style={{ overflow: "hidden" }}>
					<div
						style={{
							padding: "16px 18px",
							borderBottom: `1px solid ${t.border}`,
						}}
					>
						<SecHead t={t} title="Open Proposals" action="All →" onClick={() => router.push("/proposals")} />
					</div>
					{PROPOSALS.filter((p) =>
						["Sent", "Viewed", "Draft"].includes(p.status),
					).map((prop, i) => {
						const sm = PROP_M[prop.status];
						return (
							<div
								key={prop.id}
								style={{
									display: "flex",
									alignItems: "center",
									gap: 12,
									padding: "11px 18px",
									borderBottom: i < 2 ? `1px solid ${t.border}` : "none",
								}}
							>
								<CDot client={prop.client} clients={CLIENTS} />
								<div style={{ flex: 1 }}>
									<div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>
										{prop.title}
									</div>
									<div style={{ fontSize: 10, color: t.textMuted }}>
										{prop.client} · {prop.win}% win prob.
									</div>
								</div>
								<div style={{ textAlign: "right" }}>
									<div
										style={{
											fontSize: 13,
											fontWeight: 700,
											color: t.accent,
											fontFamily: "'Geist Mono',monospace",
										}}
									>
										${prop.value.toLocaleString()}
									</div>
									<Pill color={sm.color} dim={sm.dim} small>
										{prop.status}
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
