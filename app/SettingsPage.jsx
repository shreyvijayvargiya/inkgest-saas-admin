import { useState } from "react";
import { Card, SecHead, Pill, Avatar, Btn } from "../components/ui";
import { useCRM } from "./RealEstateLayout";
import {
	AGENTS_DATA,
	agentColor,
	agencyProfile,
	integrations as intgData,
	billing,
} from "../data";

export default function SettingsPage() {
	const { t } = useCRM();
	const [activeSection, setActiveSection] = useState("agency");
	const sections = [
		{ id: "agency", label: "Agency Profile" },
		{ id: "agents", label: "Agent Management" },
		{ id: "integrations", label: "Integrations" },
		{ id: "notifications", label: "Notifications" },
		{ id: "billing", label: "Billing" },
	];
	const integrations = intgData.map((i) => ({
		...i,
		color: i.status === "Connected" ? t.green : t.textMuted,
	}));

	return (
		<div
			style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20 }}
			className="crm-settings-layout"
		>
			<Card t={t} p={12}>
				{sections.map((s) => (
					<div
						key={s.id}
						onClick={() => setActiveSection(s.id)}
						style={{
							padding: "9px 12px",
							borderRadius: 9,
							fontSize: 13,
							fontWeight: 600,
							cursor: "pointer",
							color: activeSection === s.id ? t.accent : t.textSub,
							background: activeSection === s.id ? t.accentDim : "transparent",
							marginBottom: 2,
							transition: "all 0.12s",
						}}
					>
						{s.label}
					</div>
				))}
			</Card>
			<div>
				{activeSection === "agency" && (
					<Card t={t}>
						<SecHead t={t}>Agency Profile</SecHead>
						{[
							["Agency Name", agencyProfile.name],
							["Website", agencyProfile.website],
							["License #", agencyProfile.license],
							["Phone", agencyProfile.phone],
							["Email", agencyProfile.email],
							["Address", agencyProfile.address],
						].map(([label, val]) => (
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
									defaultValue={val}
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
						<Btn t={t} primary>
							Save Changes
						</Btn>
					</Card>
				)}

				{activeSection === "agents" && (
					<Card t={t}>
						<SecHead t={t} action="+ Add Agent">
							Agent Management
						</SecHead>
						{AGENTS_DATA.map((a, i) => (
							<div
								key={a.code}
								style={{
									display: "flex",
									alignItems: "center",
									gap: 12,
									padding: "13px 0",
									borderBottom:
										i < AGENTS_DATA.length - 1
											? `1px solid ${t.border}`
											: "none",
								}}
							>
								<Avatar code={a.code} color={agentColor[a.code]} size={40} />
								<div style={{ flex: 1 }}>
									<div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>
										{a.name}
									</div>
									<div style={{ fontSize: 12, color: t.textSub }}>
										{a.role} · {a.listings} active listings
									</div>
								</div>
								<Pill color={t.green} dim={t.greenDim} small>
									Active
								</Pill>
								<Btn t={t} small>
									Edit
								</Btn>
							</div>
						))}
					</Card>
				)}

				{activeSection === "integrations" && (
					<Card t={t}>
						<SecHead t={t}>Integrations</SecHead>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: 12,
							}}
						>
							{integrations.map((intg) => (
								<div
									key={intg.name}
									style={{
										background: t.surfaceAlt,
										borderRadius: 12,
										padding: 16,
										display: "flex",
										gap: 12,
										alignItems: "center",
									}}
								>
									<div style={{ fontSize: 28 }}>{intg.icon}</div>
									<div style={{ flex: 1 }}>
										<div
											style={{ fontSize: 13, fontWeight: 700, color: t.text }}
										>
											{intg.name}
										</div>
										<div
											style={{
												fontSize: 11,
												color: intg.color,
												fontWeight: 600,
												marginTop: 2,
											}}
										>
											{intg.status}
										</div>
									</div>
									<Btn t={t} small>
										{intg.status === "Connected" ? "Manage" : "Connect"}
									</Btn>
								</div>
							))}
						</div>
					</Card>
				)}

				{activeSection === "notifications" && (
					<Card t={t}>
						<SecHead t={t}>Notification Preferences</SecHead>
						{[
							["New lead assigned", "Email + Push"],
							["Showing scheduled", "Email + Push"],
							["Offer received", "Email + Push + SMS"],
							["Lead goes cold (5 days)", "Email"],
							["Listing status change", "Push"],
							["Task due today", "Push"],
							["Weekly performance report", "Email"],
							["Team announcements", "Email + Push"],
						].map(([label, def]) => (
							<div
								key={label}
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "13px 0",
									borderBottom: `1px solid ${t.border}`,
								}}
							>
								<div>
									<div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>
										{label}
									</div>
									<div style={{ fontSize: 11, color: t.textSub }}>{def}</div>
								</div>
								<div
									style={{
										width: 40,
										height: 22,
										borderRadius: 11,
										background: t.accent,
										cursor: "pointer",
										position: "relative",
									}}
								>
									<div
										style={{
											width: 16,
											height: 16,
											borderRadius: "50%",
											background: "#fff",
											position: "absolute",
											right: 3,
											top: 3,
										}}
									/>
								</div>
							</div>
						))}
					</Card>
				)}

				{activeSection === "billing" && (
					<Card t={t}>
						<SecHead t={t}>Billing</SecHead>
						<div
							style={{
								background: t.surfaceAlt,
								borderRadius: 14,
								padding: 20,
								marginBottom: 16,
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "flex-start",
									marginBottom: 12,
								}}
							>
								<div>
									<div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>
										{billing.plan}
									</div>
									<div style={{ fontSize: 13, color: t.textSub }}>
										{billing.description}
									</div>
								</div>
								<Pill color={t.green} dim={t.greenDim}>
									Active
								</Pill>
							</div>
							<div style={{ fontSize: 28, fontWeight: 800, color: t.accent }}>
								${billing.amount}
								<span
									style={{ fontSize: 14, color: t.textSub, fontWeight: 400 }}
								>
									/mo
								</span>
							</div>
							<div style={{ fontSize: 12, color: t.textMuted, marginTop: 4 }}>
								Next billing: {billing.nextBilling}
							</div>
						</div>
						<div
							style={{
								display: "flex",
								gap: 8,
								marginBottom: 20,
								flexWrap: "wrap",
							}}
						>
							<Btn t={t}>Change Plan</Btn>
							<Btn t={t}>Update Payment</Btn>
							<Btn t={t} style={{ color: t.red, borderColor: t.red + "44" }}>
								Cancel Plan
							</Btn>
						</div>
						<div
							style={{
								fontSize: 13,
								fontWeight: 700,
								color: t.text,
								marginBottom: 10,
							}}
						>
							Billing History
						</div>
						{billing.history.map((h) => (
							<div
								key={h.date}
								style={{
									display: "flex",
									justifyContent: "space-between",
									padding: "11px 0",
									borderBottom: `1px solid ${t.border}`,
									fontSize: 13,
								}}
							>
								<span style={{ color: t.textSub }}>{h.date}</span>
								<span style={{ color: t.text }}>{h.desc}</span>
								<span style={{ fontWeight: 700, color: t.text }}>
									{h.amount}
								</span>
								<Pill color={t.green} dim={t.greenDim} small>
									{h.status}
								</Pill>
							</div>
						))}
					</Card>
				)}
			</div>
		</div>
	);
}
