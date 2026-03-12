"use client";

import { Card, KPI, Pill, Tag, Btn, CDot, ProgressBar } from "./Shared";
import { useCRM } from "../Layout";
import { PROPOSALS, CLIENTS, PROP_M } from "../data";

export default function ProposalsPage() {
	const { t } = useCRM();
	const wonVal = PROPOSALS.filter((p) => p.status === "Won").reduce((s, p) => s + p.value, 0);
	const pipeVal = PROPOSALS.filter((p) => ["Sent", "Viewed", "Draft"].includes(p.status)).reduce((s, p) => s + p.value, 0);
	const winRate = Math.round(
		(PROPOSALS.filter((p) => p.status === "Won").length / PROPOSALS.filter((p) => ["Won", "Lost"].includes(p.status)).length) * 100
	);

	return (
		<div>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 18 }}>
				<KPI t={t} label="Pipeline Value" value={`$${pipeVal.toLocaleString()}`} sub="3 open proposals" />
				<KPI t={t} label="Won YTD" value={`$${wonVal.toLocaleString()}`} sub="1 deal closed" />
				<KPI t={t} label="Win Rate" value={`${winRate}%`} sub="last 6 months" />
				<KPI t={t} label="Avg Proposal" value="$4,600" sub="per proposal" />
			</div>
			<div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
				<Btn t={t} primary>
					+ New Proposal
				</Btn>
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
				{PROPOSALS.map((prop) => {
					const sm = PROP_M[prop.status];
					return (
						<Card key={prop.id} t={t} p={18}>
							<div style={{ display: "grid", gridTemplateColumns: "1fr 0.8fr 1fr 1fr 1fr 1.2fr 1fr", alignItems: "center", gap: 12 }}>
								<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
									<CDot client={prop.client} clients={CLIENTS} />
									<div>
										<div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{prop.title}</div>
										<div style={{ fontSize: 11, color: t.textSub }}>{prop.client}</div>
									</div>
								</div>
								<Tag t={t}>{prop.type}</Tag>
								<span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 14, fontWeight: 700, color: t.accent }}>${prop.value.toLocaleString()}</span>
								<Pill color={sm.color} dim={sm.dim} small>
									{prop.status}
								</Pill>
								<span style={{ fontSize: 11, color: t.textSub }}>Sent {prop.sent}</span>
								<div>
									<div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: t.textMuted, marginBottom: 4 }}>
										<span>Win prob.</span>
										<span style={{ fontFamily: "'Geist Mono',monospace", color: prop.win >= 70 ? t.green : prop.win >= 40 ? t.amber : t.red }}>{prop.win}%</span>
									</div>
									<ProgressBar value={prop.win} max={100} color={prop.win >= 70 ? t.green : prop.win >= 40 ? t.amber : t.red} t={t} height={4} />
								</div>
								<div style={{ display: "flex", gap: 6 }}>
									<Btn t={t} small>
										Edit
									</Btn>
									{["Sent", "Viewed"].includes(prop.status) && (
										<Btn t={t} small primary>
											Follow up
										</Btn>
									)}
								</div>
							</div>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
