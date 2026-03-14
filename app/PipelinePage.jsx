import { useState } from "react";
import { Card, Pill, Avatar } from "../components/ui";
import { useCRM } from "./RealEstateLayout";
import {
	LEADS_DATA,
	PIPELINE_STAGES,
	stageMeta,
	typeMeta,
	agentColor,
} from "../data";

export default function PipelinePage() {
	const { t } = useCRM();
	const [dragOver, setDragOver] = useState(null);
	const [items, setItems] = useState(LEADS_DATA);
	const [dragId, setDragId] = useState(null);

	const totalVal = items
		.filter((l) => !["Closed Won", "Closed Lost"].includes(l.stage))
		.reduce((s, l) => s + l.budget, 0);

	return (
		<div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(4, 1fr)",
					gap: 12,
					marginBottom: 20,
				}}
				className="crm-pipeline-stats"
			>
				{[
					{
						label: "Total Pipeline",
						val: `$${(totalVal / 1e6).toFixed(1)}M`,
						color: t.accent,
					},
					{
						label: "Deals in Progress",
						val: items.filter(
							(l) =>
								!["Closed Won", "Closed Lost", "New Lead"].includes(l.stage),
						).length,
						color: t.blue,
					},
					{
						label: "Offers Out",
						val: items.filter((l) => l.stage === "Offer Submitted").length,
						color: t.amber,
					},
					{
						label: "Closed This Month",
						val: items.filter((l) => l.stage === "Closed Won").length,
						color: t.green,
					},
				].map((m) => (
					<Card key={m.label} t={t}>
						<div style={{ fontSize: 12, color: t.textSub, marginBottom: 6 }}>
							{m.label}
						</div>
						<div style={{ fontSize: 24, fontWeight: 800, color: m.color }}>
							{m.val}
						</div>
					</Card>
				))}
			</div>
			<div
				style={{
					display: "flex",
					gap: 10,
					overflowX: "auto",
					paddingBottom: 12,
				}}
			>
				{PIPELINE_STAGES.map((stage) => {
					const col = items.filter((l) => l.stage === stage);
					const sm = stageMeta[stage] || { color: t.accent, dim: t.accentDim };
					const stageVal = col.reduce((s, l) => s + l.budget, 0);
					return (
						<div
							key={stage}
							onDragOver={(e) => {
								e.preventDefault();
								setDragOver(stage);
							}}
							onDragLeave={() => setDragOver(null)}
							onDrop={(e) => {
								e.preventDefault();
								setItems((prev) =>
									prev.map((l) => (l.id === dragId ? { ...l, stage } : l)),
								);
								setDragOver(null);
								setDragId(null);
							}}
							style={{
								minWidth: 200,
								background: dragOver === stage ? sm.color + "18" : t.surfaceAlt,
								borderRadius: 14,
								padding: 12,
								flexShrink: 0,
								border: `2px solid ${dragOver === stage ? sm.color : t.border}`,
								transition: "all 0.15s",
							}}
						>
							<div style={{ marginBottom: 10 }}>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										marginBottom: 4,
									}}
								>
									<span
										style={{ fontSize: 12, fontWeight: 800, color: sm.color }}
									>
										{stage}
									</span>
									<span
										style={{
											fontSize: 11,
											color: t.textMuted,
											background: t.surface,
											borderRadius: 20,
											padding: "2px 8px",
											fontWeight: 700,
										}}
									>
										{col.length}
									</span>
								</div>
								{stageVal > 0 && (
									<div
										style={{ fontSize: 11, color: t.textSub, fontWeight: 600 }}
									>
										${(stageVal / 1000).toFixed(0)}K total
									</div>
								)}
							</div>
							{col.map((l) => (
								<div
									key={l.id}
									draggable
									onDragStart={() => setDragId(l.id)}
									style={{
										background: t.surface,
										border: `1px solid ${t.border}`,
										borderRadius: 10,
										padding: 12,
										marginBottom: 8,
										cursor: "grab",
										transition: "border-color 0.15s",
									}}
								>
									<div
										style={{
											fontSize: 13,
											fontWeight: 700,
											color: t.text,
											marginBottom: 4,
											lineHeight: 1.3,
										}}
									>
										{l.name}
									</div>
									<div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
										<Pill
											color={typeMeta[l.type].color}
											dim={typeMeta[l.type].dim}
											small
										>
											{l.type}
										</Pill>
									</div>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<span
											style={{ fontSize: 13, fontWeight: 800, color: t.accent }}
										>
											${(l.budget / 1000).toFixed(0)}K
										</span>
										<div
											style={{ display: "flex", gap: 4, alignItems: "center" }}
										>
											<Avatar
												code={l.agent}
												color={agentColor[l.agent]}
												size={20}
											/>
											<span style={{ fontSize: 10, color: t.textMuted }}>
												{l.lastContact}
											</span>
										</div>
									</div>
								</div>
							))}
							{col.length === 0 && (
								<div
									style={{
										textAlign: "center",
										padding: "20px 0",
										color: t.textMuted,
										fontSize: 12,
									}}
								>
									Drop here
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
