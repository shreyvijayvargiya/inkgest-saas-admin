"use client";

import { useState } from "react";
import { Card, KPI, Pill, Tag, Btn, CDot, ProgressBar, Modal, Field, Input, Select } from "./Shared";
import { useCRM } from "./Layout";
import { PROPOSALS, CLIENTS, PROP_M } from "./data";

const PROP_TYPES = ["Design", "Development", "Design+Dev"];

export default function ProposalsPage() {
	const { t } = useCRM();
	const [proposals, setProposals] = useState(PROPOSALS);
	const [showNewProposal, setShowNewProposal] = useState(false);
	const wonVal = proposals.filter((p) => p.status === "Won").reduce(
		(s, p) => s + p.value,
		0,
	);
	const pipeVal = proposals.filter((p) =>
		["Sent", "Viewed", "Draft"].includes(p.status),
	).reduce((s, p) => s + p.value, 0);
	const wonOrLost = proposals.filter((p) => ["Won", "Lost"].includes(p.status)).length;
	const winRate = wonOrLost
		? Math.round(
				(proposals.filter((p) => p.status === "Won").length / wonOrLost) * 100,
			)
		: 0;

	const handleNewProposal = (e) => {
		e.preventDefault();
		const fd = new FormData(e.target);
		const client = fd.get("client") || "";
		const title = fd.get("title") || "";
		const value = Number(fd.get("value")) || 0;
		const status = fd.get("status") || "Draft";
		const type = fd.get("type") || "Design";
		const sent = fd.get("sent") || "—";
		const expires = fd.get("expires") || "—";
		const win = Number(fd.get("win")) || 0;
		if (!title.trim()) return;
		const nextNum = String(
			Math.max(
				...proposals.map((p) =>
					parseInt((p.id || "").replace(/\D/g, ""), 10) || 0,
				),
			) + 1,
		).padStart(3, "0");
		setProposals((prev) => [
			...prev,
			{
				id: `PROP-${nextNum}`,
				client,
				title: title.trim(),
				value,
				status,
				sent,
				expires,
				win,
				type,
			},
		]);
		setShowNewProposal(false);
		e.target.reset();
	};

	return (
		<div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(4,1fr)",
					gap: 12,
					marginBottom: 18,
				}}
			>
				<KPI
					t={t}
					label="Pipeline Value"
					value={`$${pipeVal.toLocaleString()}`}
					sub="3 open proposals"
				/>
				<KPI
					t={t}
					label="Won YTD"
					value={`$${wonVal.toLocaleString()}`}
					sub="1 deal closed"
				/>
				<KPI t={t} label="Win Rate" value={`${winRate}%`} sub="last 6 months" />
				<KPI t={t} label="Avg Proposal" value="$4,600" sub="per proposal" />
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					marginBottom: 14,
				}}
			>
				<Btn t={t} primary onClick={() => setShowNewProposal(true)}>
					+ New Proposal
				</Btn>
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
				{proposals.map((prop) => {
					const sm = PROP_M[prop.status];
					return (
						<Card key={prop.id} t={t} p={18}>
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "1fr 0.8fr 1fr 1fr 1fr 1.2fr 1fr",
									alignItems: "center",
									gap: 12,
								}}
							>
								<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
									<CDot client={prop.client} clients={CLIENTS} />
									<div>
										<div
											style={{ fontSize: 13, fontWeight: 700, color: t.text }}
										>
											{prop.title}
										</div>
										<div style={{ fontSize: 11, color: t.textSub }}>
											{prop.client}
										</div>
									</div>
								</div>
								<Tag t={t}>{prop.type}</Tag>
								<span
									style={{
										fontFamily: "'Geist Mono',monospace",
										fontSize: 14,
										fontWeight: 700,
										color: t.accent,
									}}
								>
									${prop.value.toLocaleString()}
								</span>
								<Pill color={sm.color} dim={sm.dim} small>
									{prop.status}
								</Pill>
								<span style={{ fontSize: 11, color: t.textSub }}>
									Sent {prop.sent}
								</span>
								<div>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											fontSize: 10,
											color: t.textMuted,
											marginBottom: 4,
										}}
									>
										<span>Win prob.</span>
										<span
											style={{
												fontFamily: "'Geist Mono',monospace",
												color:
													prop.win >= 70
														? t.green
														: prop.win >= 40
															? t.amber
															: t.red,
											}}
										>
											{prop.win}%
										</span>
									</div>
									<ProgressBar
										value={prop.win}
										max={100}
										color={
											prop.win >= 70
												? t.green
												: prop.win >= 40
													? t.amber
													: t.red
										}
										t={t}
										height={4}
									/>
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
			<Modal show={showNewProposal} t={t} title="New Proposal" onClose={() => setShowNewProposal(false)}>
				<form onSubmit={handleNewProposal}>
					<Field t={t} label="Title">
						<Input t={t} name="title" placeholder="Full-Stack Web App" />
					</Field>
					<Field t={t} label="Client">
						<Select t={t} name="client" options={CLIENTS.map((c) => c.name)} />
					</Field>
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
						<Field t={t} label="Value ($)">
							<Input t={t} name="value" type="number" placeholder="6500" />
						</Field>
						<Field t={t} label="Win probability (%)">
							<Input t={t} name="win" type="number" placeholder="72" />
						</Field>
					</div>
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
						<Field t={t} label="Status">
							<Select t={t} name="status" options={Object.keys(PROP_M)} />
						</Field>
						<Field t={t} label="Type">
							<Select t={t} name="type" options={PROP_TYPES} />
						</Field>
					</div>
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
						<Field t={t} label="Sent">
							<Input t={t} name="sent" placeholder="Mar 8" />
						</Field>
						<Field t={t} label="Expires">
							<Input t={t} name="expires" placeholder="Mar 22" />
						</Field>
					</div>
					<div style={{ display: "flex", gap: 8, marginTop: 16 }}>
						<Btn t={t} type="submit" primary style={{ flex: 1 }}>
							Save Proposal
						</Btn>
						<Btn t={t} type="button" onClick={() => setShowNewProposal(false)}>
							Cancel
						</Btn>
					</div>
				</form>
			</Modal>
		</div>
	);
}
