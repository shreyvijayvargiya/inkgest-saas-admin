import { useState } from "react";
import { Card, Pill, Avatar, Btn } from "../components/ui";
import { useCRM } from "./RealEstateLayout";
import {
	LEADS_DATA,
	AGENTS_DATA,
	PIPELINE_STAGES,
	stageMeta,
	typeMeta,
	agentColor,
} from "../data";

export default function LeadsPage() {
	const { t } = useCRM();
	const [view, setView] = useState("list");
	const [stageF, setStageF] = useState("All");
	const [typeF, setTypeF] = useState("All");
	const [selected, setSelected] = useState(null);
	const [showForm, setShowForm] = useState(false);

	const filtered = LEADS_DATA.filter(
		(l) =>
			(stageF === "All" || l.stage === stageF) &&
			(typeF === "All" || l.type === typeF),
	);

	const timelineItems = [
		{
			icon: "📞",
			text: "Call logged — discussed budget and timeline",
			time: "Today 9:14 AM",
		},
		{
			icon: "✉️",
			text: "Email sent — property recommendations",
			time: "Yesterday 3:20 PM",
		},
		{
			icon: "🏠",
			text: "Showing booked — 2847 Lakeview Terrace",
			time: "Mar 10 10:00 AM",
		},
		{
			icon: "✦",
			text: "Lead created from Zillow inquiry",
			time: "Mar 8 2:45 PM",
		},
	];

	return (
		<div
			style={{ display: "flex", gap: 20, height: "100%", flexWrap: "wrap" }}
			className="crm-leads-layout"
		>
			<div style={{ flex: 1, minWidth: 280 }}>
				<div
					style={{
						display: "flex",
						gap: 10,
						marginBottom: 16,
						alignItems: "center",
						flexWrap: "wrap",
					}}
				>
					<div
						style={{
							display: "flex",
							background: t.surfaceAlt,
							borderRadius: 8,
							padding: 3,
							gap: 2,
						}}
					>
						{["list", "kanban"].map((v) => (
							<button
								key={v}
								onClick={() => setView(v)}
								style={{
									padding: "6px 14px",
									borderRadius: 6,
									border: "none",
									background: v === view ? t.surface : "transparent",
									color: v === view ? t.text : t.textMuted,
									fontSize: 12,
									fontWeight: 700,
									cursor: "pointer",
									fontFamily: "inherit",
								}}
							>
								{v === "list" ? "≡ List" : "⊞ Board"}
							</button>
						))}
					</div>
					<div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
						{["All", "Buyer", "Seller", "Investor"].map((tp) => (
							<div
								key={tp}
								onClick={() => setTypeF(tp)}
								style={{
									padding: "5px 12px",
									borderRadius: 7,
									fontSize: 12,
									fontWeight: 700,
									cursor: "pointer",
									background:
										typeF === tp
											? typeMeta[tp]?.color || t.accent
											: t.surfaceAlt,
									color: typeF === tp ? "#fff" : t.textMuted,
								}}
							>
								{tp}
							</div>
						))}
					</div>
					<div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
						{["All", ...PIPELINE_STAGES.slice(0, 6)].map((s) => (
							<div
								key={s}
								onClick={() => setStageF(s)}
								style={{
									padding: "4px 10px",
									borderRadius: 7,
									fontSize: 11,
									fontWeight: 700,
									cursor: "pointer",
									background:
										stageF === s
											? stageMeta[s]?.color || t.accent
											: t.surfaceAlt,
									color: stageF === s ? "#fff" : t.textMuted,
									whiteSpace: "nowrap",
								}}
							>
								{s}
							</div>
						))}
					</div>
					<Btn
						t={t}
						primary
						onClick={() => setShowForm(true)}
						style={{ marginLeft: "auto" }}
					>
						+ New Lead
					</Btn>
				</div>

				{view === "list" ? (
					<Card t={t} p={0} style={{ overflow: "hidden" }}>
						<div
							className="crm-leads-table-header"
							style={{
								display: "grid",
								gridTemplateColumns: "2fr 0.8fr 1fr 1.1fr 0.9fr 0.8fr 0.6fr",
								padding: "11px 18px",
								borderBottom: `1px solid ${t.border}`,
								fontSize: 11,
								fontWeight: 700,
								color: t.textMuted,
								letterSpacing: 0.5,
							}}
						>
							<span>CONTACT</span>
							<span>TYPE</span>
							<span>BUDGET</span>
							<span>STAGE</span>
							<span>SOURCE</span>
							<span>LAST TOUCH</span>
							<span>SCORE</span>
						</div>
						{filtered.map((l, i) => (
							<div
								key={l.id}
								onClick={() => setSelected(selected?.id === l.id ? null : l)}
								className="crm-leads-table-row"
								style={{
									display: "grid",
									gridTemplateColumns: "2fr 0.8fr 1fr 1.1fr 0.9fr 0.8fr 0.6fr",
									padding: "13px 18px",
									borderBottom:
										i < filtered.length - 1 ? `1px solid ${t.border}` : "none",
									alignItems: "center",
									cursor: "pointer",
									background:
										selected?.id === l.id ? t.surfaceAlt : "transparent",
									transition: "background 0.12s",
								}}
							>
								<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
									<Avatar
										code={l.agent}
										color={agentColor[l.agent]}
										size={34}
									/>
									<div>
										<div
											style={{ fontSize: 13, fontWeight: 700, color: t.text }}
										>
											{l.name}
										</div>
										<div style={{ fontSize: 11, color: t.textSub }}>
											{l.email}
										</div>
									</div>
								</div>
								<Pill
									color={typeMeta[l.type].color}
									dim={typeMeta[l.type].dim}
									small
								>
									{l.type}
								</Pill>
								<span style={{ fontWeight: 700, fontSize: 13 }}>
									${(l.budget / 1000).toFixed(0)}K
								</span>
								<Pill
									color={stageMeta[l.stage]?.color || t.accent}
									dim={stageMeta[l.stage]?.dim || t.accentDim}
									small
								>
									{l.stage}
								</Pill>
								<span style={{ fontSize: 12, color: t.textSub }}>
									{l.source}
								</span>
								<span
									style={{
										fontSize: 12,
										color: l.lastContact === "Today" ? t.green : t.textMuted,
									}}
								>
									{l.lastContact}
								</span>
								<div
									style={{
										width: 34,
										height: 34,
										borderRadius: "50%",
										border: `2px solid ${l.score >= 85 ? t.green : l.score >= 70 ? t.amber : t.red}`,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: 11,
										fontWeight: 800,
										color:
											l.score >= 85 ? t.green : l.score >= 70 ? t.amber : t.red,
									}}
								>
									{l.score}
								</div>
							</div>
						))}
					</Card>
				) : (
					<div
						style={{
							display: "flex",
							gap: 10,
							overflowX: "auto",
							paddingBottom: 8,
						}}
					>
						{PIPELINE_STAGES.slice(0, 6).map((stage) => {
							const col = filtered.filter((l) => l.stage === stage);
							const sm = stageMeta[stage] || {
								color: t.accent,
								dim: t.accentDim,
							};
							return (
								<div
									key={stage}
									style={{
										minWidth: 190,
										background: t.surfaceAlt,
										borderRadius: 12,
										padding: 12,
										flexShrink: 0,
									}}
								>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											marginBottom: 10,
										}}
									>
										<span
											style={{ fontSize: 12, fontWeight: 700, color: sm.color }}
										>
											{stage}
										</span>
										<span
											style={{
												fontSize: 11,
												color: t.textMuted,
												background: t.surface,
												borderRadius: 20,
												padding: "1px 8px",
											}}
										>
											{col.length}
										</span>
									</div>
									{col.map((l) => (
										<div
											key={l.id}
											onClick={() =>
												setSelected(selected?.id === l.id ? null : l)
											}
											style={{
												background: t.surface,
												border: `1px solid ${selected?.id === l.id ? sm.color : t.border}`,
												borderRadius: 10,
												padding: 12,
												marginBottom: 8,
												cursor: "pointer",
												transition: "border-color 0.15s",
											}}
										>
											<div
												style={{
													display: "flex",
													justifyContent: "space-between",
													marginBottom: 5,
												}}
											>
												<span
													style={{
														fontSize: 13,
														fontWeight: 700,
														color: t.text,
														lineHeight: 1.3,
													}}
												>
													{l.name}
												</span>
											</div>
											<Pill
												color={typeMeta[l.type].color}
												dim={typeMeta[l.type].dim}
												small
											>
												{l.type}
											</Pill>
											<div
												style={{
													display: "flex",
													justifyContent: "space-between",
													fontSize: 12,
													marginTop: 8,
												}}
											>
												<span style={{ fontWeight: 700, color: t.accent }}>
													${(l.budget / 1000).toFixed(0)}K
												</span>
												<span style={{ color: t.textMuted }}>{l.source}</span>
											</div>
										</div>
									))}
								</div>
							);
						})}
					</div>
				)}
			</div>

			{selected && (
				<div
					className="crm-lead-detail-panel"
					style={{
						width: 300,
						minWidth: 280,
						flexShrink: 0,
						background: t.surface,
						border: `1px solid ${t.border}`,
						borderRadius: 16,
						padding: 20,
						overflowY: "auto",
						maxHeight: "calc(100vh - 180px)",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: 16,
						}}
					>
						<span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>
							Lead Detail
						</span>
						<button
							onClick={() => setSelected(null)}
							style={{
								width: 26,
								height: 26,
								borderRadius: 7,
								border: `1px solid ${t.border}`,
								background: t.surfaceAlt,
								color: t.textSub,
								cursor: "pointer",
								fontSize: 14,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							×
						</button>
					</div>
					<div
						style={{
							background: t.surfaceAlt,
							borderRadius: 12,
							padding: 14,
							marginBottom: 16,
						}}
					>
						<Avatar
							code={selected.agent}
							color={agentColor[selected.agent]}
							size={40}
						/>
						<div style={{ marginTop: 10 }}>
							<div
								style={{
									fontSize: 15,
									fontWeight: 800,
									color: t.text,
									marginBottom: 4,
								}}
							>
								{selected.name}
							</div>
							<Pill
								color={typeMeta[selected.type].color}
								dim={typeMeta[selected.type].dim}
							>
								{selected.type}
							</Pill>
						</div>
					</div>
					{[
						["Phone", selected.phone],
						["Email", selected.email],
						["Budget", `$${selected.budget.toLocaleString("en-US")}`],
						["Stage", selected.stage],
						["Source", selected.source],
						["Agent", AGENTS_DATA.find((a) => a.code === selected.agent)?.name],
					].map(([k, v]) => (
						<div
							key={k}
							style={{
								display: "flex",
								justifyContent: "space-between",
								padding: "9px 0",
								borderBottom: `1px solid ${t.border}`,
								fontSize: 12,
							}}
						>
							<span style={{ color: t.textSub }}>{k}</span>
							<span style={{ fontWeight: 600, color: t.text }}>{v}</span>
						</div>
					))}
					<div style={{ marginTop: 14, marginBottom: 14 }}>
						<div
							style={{
								fontSize: 12,
								color: t.textSub,
								marginBottom: 6,
								fontWeight: 600,
							}}
						>
							Notes
						</div>
						<div
							style={{
								fontSize: 12,
								color: t.text,
								lineHeight: 1.6,
								background: t.surfaceAlt,
								borderRadius: 9,
								padding: 10,
							}}
						>
							{selected.notes}
						</div>
					</div>
					<div style={{ marginBottom: 16 }}>
						<div
							style={{
								fontSize: 12,
								color: t.textSub,
								marginBottom: 8,
								fontWeight: 600,
							}}
						>
							Timeline
						</div>
						{timelineItems.map((item, i) => (
							<div
								key={i}
								style={{
									display: "flex",
									gap: 8,
									marginBottom: 10,
									alignItems: "flex-start",
								}}
							>
								<div
									style={{
										width: 24,
										height: 24,
										borderRadius: 6,
										background: t.surfaceB,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: 12,
										flexShrink: 0,
									}}
								>
									{item.icon}
								</div>
								<div>
									<div style={{ fontSize: 12, color: t.text, fontWeight: 500 }}>
										{item.text}
									</div>
									<div
										style={{ fontSize: 10, color: t.textMuted, marginTop: 2 }}
									>
										{item.time}
									</div>
								</div>
							</div>
						))}
					</div>
					<div style={{ display: "flex", gap: 8 }}>
						<Btn
							t={t}
							primary
							style={{ flex: 1, padding: "9px 0", textAlign: "center" }}
						>
							📞 Call
						</Btn>
						<Btn
							t={t}
							style={{ flex: 1, padding: "9px 0", textAlign: "center" }}
						>
							✉️ Email
						</Btn>
					</div>
				</div>
			)}

			{showForm && (
				<div
					style={{
						position: "fixed",
						inset: 0,
						background: "rgba(0,0,0,0.6)",
						zIndex: 300,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: 16,
					}}
					onClick={() => setShowForm(false)}
				>
					<div
						style={{
							background: t.surface,
							border: `1px solid ${t.border}`,
							borderRadius: 18,
							padding: 28,
							width: 480,
							maxWidth: "100%",
							maxHeight: "80vh",
							overflowY: "auto",
						}}
						onClick={(e) => e.stopPropagation()}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: 20,
							}}
						>
							<span style={{ fontSize: 16, fontWeight: 800, color: t.text }}>
								Add New Lead
							</span>
							<button
								onClick={() => setShowForm(false)}
								style={{
									background: "none",
									border: "none",
									color: t.textSub,
									fontSize: 18,
									cursor: "pointer",
								}}
							>
								×
							</button>
						</div>
						{[
							["Full Name", "text", "Marcus Webb"],
							["Email", "email", "m@email.com"],
							["Phone", "tel", "+1 (312) 555-0000"],
							["Budget", "text", "$950,000"],
						].map(([label, type, ph]) => (
							<div key={label} style={{ marginBottom: 14 }}>
								<div
									style={{
										fontSize: 12,
										fontWeight: 600,
										color: t.textSub,
										marginBottom: 5,
									}}
								>
									{label}
								</div>
								<input
									type={type}
									placeholder={ph}
									style={{
										width: "100%",
										padding: "9px 12px",
										borderRadius: 9,
										border: `1px solid ${t.border}`,
										background: t.surfaceAlt,
										color: t.text,
										fontSize: 13,
										outline: "none",
										fontFamily: "inherit",
									}}
								/>
							</div>
						))}
						{[
							["Lead Type", ["Buyer", "Seller", "Investor"]],
							["Stage", PIPELINE_STAGES.slice(0, 5)],
							[
								"Source",
								["Zillow", "Referral", "Open House", "Instagram", "Website"],
							],
							["Assign Agent", AGENTS_DATA.map((a) => a.name)],
						].map(([label, opts]) => (
							<div key={label} style={{ marginBottom: 14 }}>
								<div
									style={{
										fontSize: 12,
										fontWeight: 600,
										color: t.textSub,
										marginBottom: 5,
									}}
								>
									{label}
								</div>
								<select
									style={{
										width: "100%",
										padding: "9px 12px",
										borderRadius: 9,
										border: `1px solid ${t.border}`,
										background: t.surfaceAlt,
										color: t.text,
										fontSize: 13,
										outline: "none",
										fontFamily: "inherit",
									}}
								>
									{opts.map((o) => (
										<option key={o}>{o}</option>
									))}
								</select>
							</div>
						))}
						<div style={{ marginBottom: 20 }}>
							<div
								style={{
									fontSize: 12,
									fontWeight: 600,
									color: t.textSub,
									marginBottom: 5,
								}}
							>
								Notes
							</div>
							<textarea
								rows={3}
								placeholder="Initial notes about this lead..."
								style={{
									width: "100%",
									padding: "9px 12px",
									borderRadius: 9,
									border: `1px solid ${t.border}`,
									background: t.surfaceAlt,
									color: t.text,
									fontSize: 13,
									outline: "none",
									resize: "vertical",
									fontFamily: "inherit",
								}}
							/>
						</div>
						<div style={{ display: "flex", gap: 8 }}>
							<Btn
								t={t}
								primary
								style={{ flex: 1 }}
								onClick={() => setShowForm(false)}
							>
								Save Lead
							</Btn>
							<Btn t={t} onClick={() => setShowForm(false)}>
								Cancel
							</Btn>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
