"use client";

import { useState } from "react";
import { Card, Pill, Tag, Btn, CDot, ProgressBar } from "./Shared";
import { useCRM } from "../Layout";
import { PROJECTS, CLIENTS, STATUS_M } from "../data";

export default function ProjectsPage() {
	const { t } = useCRM();
	const [sf, setSf] = useState("All");
	const filtered = PROJECTS.filter((p) => sf === "All" || p.status === sf);

	return (
		<div>
			<div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
				{["All", ...Object.keys(STATUS_M)].map((s) => (
					<div
						key={s}
						onClick={() => setSf(s)}
						style={{
							padding: "5px 12px",
							borderRadius: 4,
							fontSize: 11,
							fontWeight: 700,
							cursor: "pointer",
							background: sf === s ? (STATUS_M[s]?.color || t.accent) : t.surfaceAlt,
							color: sf === s ? "#fff" : t.textMuted,
							transition: "all 0.15s",
						}}
					>
						{s}
					</div>
				))}
				<Btn t={t} primary style={{ marginLeft: "auto" }}>
					+ New Project
				</Btn>
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
				{filtered.map((p) => {
					const sm = STATUS_M[p.status] || STATUS_M["Draft"];
					return (
						<Card key={p.id} t={t} p={18} style={{ cursor: "pointer" }}>
							<div style={{ display: "grid", gridTemplateColumns: "2.5fr 0.8fr 1fr 1fr 1fr 1fr", alignItems: "center", gap: 12 }}>
								<div style={{ display: "flex", gap: 10, alignItems: "center" }}>
									<CDot client={p.client} clients={CLIENTS} />
									<div>
										<div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 2 }}>{p.name}</div>
										<div style={{ fontSize: 11, color: t.textSub }}>{p.client}</div>
									</div>
								</div>
								<Tag t={t}>{p.type}</Tag>
								<Pill color={sm.color} dim={sm.dim} small>
									{p.status}
								</Pill>
								<div>
									<div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: t.textMuted, marginBottom: 4 }}>
										<span>{p.progress}%</span>
										<span>Due {p.deadline}</span>
									</div>
									<ProgressBar value={p.progress} max={100} color={sm.color} t={t} height={4} />
								</div>
								<div>
									<div style={{ fontSize: 12, fontWeight: 700, color: t.text, fontFamily: "'Geist Mono',monospace" }}>${p.billed.toLocaleString()}</div>
									<div style={{ fontSize: 10, color: t.textMuted }}>of ${p.budget.toLocaleString()}</div>
								</div>
								<div>
									<div style={{ fontSize: 12, fontWeight: 700, color: t.text, fontFamily: "'Geist Mono',monospace" }}>{p.hours}h</div>
									<div style={{ fontSize: 10, color: t.textMuted }}>of {p.estHours}h est.</div>
								</div>
							</div>
							<div style={{ display: "flex", gap: 4, marginTop: 12 }}>
								{p.tags.map((tag) => (
									<Tag key={tag} t={t}>
										{tag}
									</Tag>
								))}
							</div>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
