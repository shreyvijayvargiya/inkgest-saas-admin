import { useState } from "react";
import { Card, Pill, Btn } from "../Shared";
import { useCRM } from "../../RealEstateLayout";
import { EMAIL_TEMPLATES, SEQUENCES } from "../../data";

export default function OutreachPage() {
	const { t } = useCRM();
	const [tab, setTab] = useState("templates");
	const [preview, setPreview] = useState(null);

	const catColors = { Welcome: t.green, Showing: t.blue, "Follow-up": t.amber, Milestone: t.purple, Listing: t.accent, Nurture: t.textSub };

	return (
		<div>
			<div style={{ display: "flex", background: t.surfaceAlt, borderRadius: 9, padding: 3, gap: 2, width: "fit-content", marginBottom: 20 }}>
				{["templates", "sequences"].map((tab2) => (
					<button
						key={tab2}
						onClick={() => setTab(tab2)}
						style={{
							padding: "7px 18px",
							borderRadius: 7,
							border: "none",
							background: tab === tab2 ? t.surface : "transparent",
							color: tab === tab2 ? t.text : t.textMuted,
							fontSize: 13,
							fontWeight: 700,
							cursor: "pointer",
							fontFamily: "inherit",
							textTransform: "capitalize",
						}}
					>
						{tab2}
					</button>
				))}
			</div>

			{tab === "templates" && (
				<div style={{ display: "grid", gridTemplateColumns: preview ? "1fr 400px" : "1fr", gap: 20 }} className="crm-outreach-layout">
					<div>
						<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
							{EMAIL_TEMPLATES.map((tpl) => (
								<div
									key={tpl.id}
									onClick={() => setPreview(preview?.id === tpl.id ? null : tpl)}
									style={{
										background: t.surface,
										border: `1px solid ${preview?.id === tpl.id ? t.accent : t.border}`,
										borderRadius: 14,
										padding: 18,
										cursor: "pointer",
										transition: "all 0.15s",
									}}
								>
									<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
										<Pill color={catColors[tpl.category] || t.accent} dim={(catColors[tpl.category] || t.accent) + "18"} small>
											{tpl.category}
										</Pill>
										<span style={{ fontSize: 11, color: t.textMuted }}>{tpl.sent} sent</span>
									</div>
									<div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 6 }}>{tpl.name}</div>
									<div style={{ fontSize: 12, color: t.textSub, marginBottom: 12, lineHeight: 1.5 }}>{tpl.preview.slice(0, 80)}...</div>
									<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
										<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
											<div style={{ height: 4, width: 60, borderRadius: 2, background: t.surfaceAlt, overflow: "hidden" }}>
												<div style={{ height: "100%", width: `${tpl.opens}%`, borderRadius: 2, background: t.green }} />
											</div>
											<span style={{ fontSize: 11, color: t.green, fontWeight: 700 }}>{tpl.opens}% open</span>
										</div>
										<span style={{ fontSize: 11, color: t.accent, fontWeight: 700 }}>Edit →</span>
									</div>
								</div>
							))}
							<div
								style={{
									background: t.surfaceAlt,
									border: `2px dashed ${t.border}`,
									borderRadius: 14,
									padding: 18,
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexDirection: "column",
									gap: 8,
									minHeight: 140,
								}}
							>
								<span style={{ fontSize: 24, opacity: 0.3 }}>+</span>
								<span style={{ fontSize: 13, color: t.textMuted, fontWeight: 600 }}>New Template</span>
							</div>
						</div>
					</div>
					{preview && (
						<div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 22, position: "sticky", top: 0, maxHeight: "80vh", overflowY: "auto" }}>
							<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
								<span style={{ fontSize: 14, fontWeight: 800, color: t.text }}>Preview</span>
								<button onClick={() => setPreview(null)} style={{ background: "none", border: "none", color: t.textSub, fontSize: 18, cursor: "pointer" }}>
									×
								</button>
							</div>
							<div style={{ background: t.surfaceAlt, borderRadius: 10, padding: 14, marginBottom: 16 }}>
								<div style={{ fontSize: 11, color: t.textMuted, marginBottom: 4 }}>SUBJECT</div>
								<div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{preview.subject}</div>
							</div>
							<div style={{ background: t.surfaceAlt, borderRadius: 10, padding: 14, marginBottom: 16 }}>
								<div style={{ fontSize: 11, color: t.textMuted, marginBottom: 6 }}>BODY PREVIEW</div>
								<div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.7 }}>
									{preview.preview}
									<br />
									<br />
									[Template continues with dynamic fields for {"{name}"}, {"{address}"}, {"{agent_name}"}]
									<br />
									<br />
									Best regards,
									<br />
									{"{agent_name}"}
									<br />
									EstateOS Realty
								</div>
							</div>
							<div style={{ marginBottom: 16 }}>
								<div style={{ fontSize: 11, color: t.textMuted, marginBottom: 8 }}>PERFORMANCE</div>
								<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
									{[["Sent", preview.sent], ["Open Rate", `${preview.opens}%`]].map(([k, v]) => (
										<div key={k} style={{ background: t.surfaceAlt, borderRadius: 9, padding: "10px 12px" }}>
											<div style={{ fontSize: 11, color: t.textMuted }}>{k}</div>
											<div style={{ fontSize: 18, fontWeight: 800, color: t.text }}>{v}</div>
										</div>
									))}
								</div>
							</div>
							<div style={{ display: "flex", gap: 8 }}>
								<Btn t={t} primary style={{ flex: 1 }}>
									Edit Template
								</Btn>
								<Btn t={t}>Duplicate</Btn>
							</div>
						</div>
					)}
				</div>
			)}

			{tab === "sequences" && (
				<div>
					<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
						{SEQUENCES.map((seq) => (
							<Card key={seq.id} t={t}>
								<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
									<div>
										<div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 4 }}>{seq.name}</div>
										<Pill color={seq.status === "Active" ? t.green : t.amber} dim={seq.status === "Active" ? t.greenDim : t.amberDim} small>
											{seq.status}
										</Pill>
									</div>
								</div>
								<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 14 }}>
									{[["Contacts", seq.contacts], ["Emails", seq.emails], ["Open Rate", `${seq.openRate}%`]].map(([k, v]) => (
										<div key={k} style={{ background: t.surfaceAlt, borderRadius: 9, padding: "9px 10px", textAlign: "center" }}>
											<div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>{v}</div>
											<div style={{ fontSize: 10, color: t.textMuted }}>{k}</div>
										</div>
									))}
								</div>
								<div style={{ fontSize: 12, color: t.textSub, marginBottom: 14 }}>
									Next: <b style={{ color: t.text }}>{seq.nextStep}</b>
								</div>
								<div style={{ display: "flex", gap: 8 }}>
									<Btn t={t} primary small style={{ flex: 1 }}>
										{seq.status === "Active" ? "Pause" : "Resume"}
									</Btn>
									<Btn t={t} small>
										Edit
									</Btn>
								</div>
							</Card>
						))}
						<div
							style={{
								background: t.surfaceAlt,
								border: `2px dashed ${t.border}`,
								borderRadius: 16,
								padding: 22,
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexDirection: "column",
								gap: 8,
							}}
						>
							<span style={{ fontSize: 28, opacity: 0.3 }}>+</span>
							<span style={{ fontSize: 13, color: t.textMuted, fontWeight: 600 }}>New Sequence</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
