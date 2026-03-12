"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, KPI, Pill, Btn, CDot, ChartTip, Modal, Field, Input, Select } from "./Shared";
import { useCRM } from "../Layout";
import { TIME_LOGS, hoursData, CLIENTS, PROJECTS } from "../data";

export default function TimeLogPage() {
	const { t } = useCRM();
	const [show, setShow] = useState(false);
	const billH = TIME_LOGS.filter((l) => l.billable).reduce((s, l) => s + l.hours, 0);
	const nonH = TIME_LOGS.filter((l) => !l.billable).reduce((s, l) => s + l.hours, 0);
	const billVal = TIME_LOGS.filter((l) => l.billable).reduce((s, l) => s + l.hours * l.rate, 0);
	const grouped = TIME_LOGS.reduce((acc, log) => {
		if (!acc[log.date]) acc[log.date] = [];
		acc[log.date].push(log);
		return acc;
	}, {});

	return (
		<div>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 18 }}>
				<KPI t={t} label="Billable Hours (Wk)" value={`${billH}h`} sub="this week" />
				<KPI t={t} label="Non-Billable" value={`${nonH}h`} sub="admin + sales" />
				<KPI t={t} label="Billable Value" value={`$${billVal.toLocaleString()}`} sub="at avg rate" />
				<KPI t={t} label="Utilization" value={`${Math.round((billH / (billH + nonH)) * 100)}%`} sub="target: 80%" />
			</div>
			<Card t={t} style={{ marginBottom: 14 }}>
				<ResponsiveContainer width="100%" height={100}>
					<BarChart data={hoursData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
						<XAxis dataKey="week" tick={{ fill: t.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
						<YAxis tick={{ fill: t.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
						<Tooltip content={<ChartTip t={t} />} />
						<Bar dataKey="billable" fill={t.accent} radius={[3, 3, 0, 0]} />
						<Bar dataKey="nonBillable" fill={t.surfaceC} radius={[3, 3, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</Card>
			<div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
				<Btn t={t} primary onClick={() => setShow(true)}>
					+ Log Time
				</Btn>
			</div>
			{Object.entries(grouped).map(([date, logs]) => (
				<div key={date} style={{ marginBottom: 18 }}>
					<div style={{ fontSize: 10, fontWeight: 800, color: t.textMuted, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>
						{date} · {logs.reduce((s, l) => s + l.hours, 0).toFixed(1)}h logged
					</div>
					{logs.map((log) => (
						<Card key={log.id} t={t} p={14} style={{ marginBottom: 6 }}>
							<div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 0.8fr 0.8fr 0.8fr", alignItems: "center", gap: 12 }}>
								<div style={{ display: "flex", gap: 10, alignItems: "center" }}>
									<CDot client={log.client} clients={CLIENTS} />
									<div>
										<div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{log.desc}</div>
										<div style={{ fontSize: 11, color: t.textSub }}>{log.project}</div>
									</div>
								</div>
								<span style={{ fontSize: 11, color: t.textSub }}>{log.client}</span>
								<span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, fontWeight: 700 }}>{log.hours}h</span>
								<Pill color={log.billable ? t.green : t.textSub} dim={log.billable ? t.greenDim : t.surfaceAlt} small>
									{log.billable ? "Billable" : "Non-bill"}
								</Pill>
								<span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 12, color: log.billable ? t.accent : t.textMuted }}>
									{log.billable ? `$${(log.hours * log.rate).toFixed(0)}` : "—"}
								</span>
							</div>
						</Card>
					))}
				</div>
			))}
			{show && (
				<Modal t={t} title="Log Time" onClose={() => setShow(false)}>
					<Field t={t} label="Description">
						<Input t={t} placeholder="What did you work on?" />
					</Field>
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
						<Field t={t} label="Client">
							<Select t={t} options={CLIENTS.map((c) => c.name)} />
						</Field>
						<Field t={t} label="Project">
							<Select t={t} options={PROJECTS.map((p) => p.name)} />
						</Field>
					</div>
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
						<Field t={t} label="Hours">
							<Input t={t} placeholder="2.5" />
						</Field>
						<Field t={t} label="Date">
							<Input t={t} placeholder="Mar 12" />
						</Field>
						<Field t={t} label="Rate ($/hr)">
							<Input t={t} placeholder="120" />
						</Field>
					</div>
					<Field t={t} label="Billable?">
						<Select t={t} options={["Yes", "No"]} />
					</Field>
					<div style={{ display: "flex", gap: 8, marginTop: 6 }}>
						<Btn t={t} primary style={{ flex: 1 }} onClick={() => setShow(false)}>
							Save Entry
						</Btn>
						<Btn t={t} onClick={() => setShow(false)}>
							Cancel
						</Btn>
					</div>
				</Modal>
			)}
		</div>
	);
}
