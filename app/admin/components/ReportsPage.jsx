"use client";

import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, KPI, SecHead, ChartTip, Btn } from "./Shared";
import { useCRM } from "../Layout";
import { revenueData, hoursData, clientRevShare } from "../data";

export default function ReportsPage() {
	const { t } = useCRM();
	const [period, setPeriod] = useState("6M");

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
			<div style={{ display: "flex", gap: 6, alignItems: "center" }}>
				{["1M", "3M", "6M", "YTD", "1Y"].map((p) => (
					<div
						key={p}
						onClick={() => setPeriod(p)}
						style={{
							padding: "5px 14px",
							borderRadius: 4,
							fontSize: 11,
							fontWeight: 700,
							cursor: "pointer",
							background: period === p ? t.accent : t.surfaceAlt,
							color: period === p ? "#fff" : t.textMuted,
							fontFamily: "'Geist Mono',monospace",
						}}
					>
						{p}
					</div>
				))}
				<Btn t={t} style={{ marginLeft: "auto" }}>
					Export CSV
				</Btn>
			</div>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
				<KPI t={t} label="Total Revenue" value="$52,800" change="+34%" up sub="vs prev period" />
				<KPI t={t} label="Billable Hours" value="680h" change="+12%" up sub="total logged" />
				<KPI t={t} label="Effective Rate" value="$124/h" change="+$8" up sub="blended avg" />
				<KPI t={t} label="Proposals Won" value="$16,800" change="50%" up sub="win rate" />
			</div>
			<div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
				<Card t={t}>
					<SecHead t={t} title="Monthly Revenue" sub="Revenue vs expenses" />
					<ResponsiveContainer width="100%" height={220}>
						<AreaChart data={revenueData} margin={{ top: 0, right: 0, bottom: 0, left: -15 }}>
							<defs>
								<linearGradient id="rg2" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={t.accent} stopOpacity={0.3} />
									<stop offset="95%" stopColor={t.accent} stopOpacity={0} />
								</linearGradient>
							</defs>
							<XAxis dataKey="month" tick={{ fill: t.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
							<YAxis tick={{ fill: t.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
							<Tooltip content={<ChartTip t={t} />} />
							<Area type="monotone" dataKey="revenue" stroke={t.accent} strokeWidth={2} fill="url(#rg2)" dot={false} />
						</AreaChart>
					</ResponsiveContainer>
				</Card>
				<Card t={t}>
					<SecHead t={t} title="Revenue by Client" />
					<ResponsiveContainer width="100%" height={200}>
						<BarChart data={clientRevShare} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 40 }}>
							<XAxis type="number" tick={{ fill: t.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
							<YAxis type="category" dataKey="name" tick={{ fill: t.textSub, fontSize: 11 }} axisLine={false} tickLine={false} />
							<Tooltip content={<ChartTip t={t} />} />
							<Bar dataKey="value" radius={[0, 4, 4, 0]}>
								{clientRevShare.map((e, i) => (
									<Cell key={i} fill={e.color} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</Card>
			</div>
			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
				<Card t={t}>
					<SecHead t={t} title="Billable vs Non-Billable Hours" />
					<ResponsiveContainer width="100%" height={180}>
						<BarChart data={hoursData} margin={{ top: 0, right: 0, bottom: 0, left: -15 }}>
							<XAxis dataKey="week" tick={{ fill: t.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
							<YAxis tick={{ fill: t.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
							<Tooltip content={<ChartTip t={t} />} />
							<Bar dataKey="billable" fill={t.accent} radius={[3, 3, 0, 0]} />
							<Bar dataKey="nonBillable" fill={t.surfaceC} radius={[3, 3, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</Card>
				<Card t={t}>
					<SecHead t={t} title="Proposal Performance" />
					{[
						["Total Proposals Sent", "5"],
						["Won", "1 ($4,800)"],
						["Lost", "1 ($2,200)"],
						["In Pipeline", "3 ($16,000)"],
						["Avg Time to Close", "18 days"],
						["Win Rate (by value)", "69%"],
					].map(([k, v]) => (
						<div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${t.border}`, fontSize: 12 }}>
							<span style={{ color: t.textSub }}>{k}</span>
							<span style={{ fontFamily: "'Geist Mono',monospace", fontWeight: 700, color: t.text }}>{v}</span>
						</div>
					))}
				</Card>
			</div>
		</div>
	);
}
