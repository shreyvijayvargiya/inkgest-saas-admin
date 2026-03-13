"use client";

import { useState } from "react";
import { Card, SecHead, Pill, Btn, Field, Input } from "./Shared";
import { useCRM } from "./Layout";
import { INTEGRATIONS } from "./data";

export default function SettingsPage() {
	const { t } = useCRM();
	const [sec, setSec] = useState("profile");
	const sections = [
		{ id: "profile", label: "Profile" },
		{ id: "rates", label: "Rates & Billing" },
		{ id: "integrations", label: "Integrations" },
		{ id: "notifications", label: "Notifications" },
		{ id: "plan", label: "Plan" },
	];

	return (
		<div className="flex flex-col gap-4 md:grid md:grid-cols-[180px_1fr] md:gap-4">
			<Card t={t} p={10} style={{ minWidth: 0 }}>
				<div className="flex flex-row gap-2 overflow-x-auto pb-1 -mx-1 md:flex-col md:overflow-visible md:mx-0 md:pb-0">
					{sections.map((s) => (
						<div
							key={s.id}
							onClick={() => setSec(s.id)}
							className="shrink-0 md:shrink md:mb-0.5 last:md:mb-0"
							style={{
								padding: "8px 12px",
								borderRadius: 6,
								fontSize: 12,
								fontWeight: 600,
								cursor: "pointer",
								color: sec === s.id ? t.accent : t.textSub,
								background: sec === s.id ? t.accentDim : "transparent",
								transition: "all 0.12s",
							}}
						>
							{s.label}
						</div>
					))}
				</div>
			</Card>
			<div className="min-w-0">
				{sec === "profile" && (
					<Card t={t}>
						<SecHead t={t} title="Profile" sub="Your freelance identity" />
						{[
							["Full Name", "Alex Rivera"],
							["Email", "alex@alexrivera.co"],
							["Website", "alexrivera.co"],
							["Location", "San Francisco, CA"],
							["Tagline", "Product Designer & Developer"],
						].map(([l, v]) => (
							<Field key={l} t={t} label={l}>
								<Input t={t} defaultValue={v} />
							</Field>
						))}
						<Field t={t} label="Bio">
							<textarea
								defaultValue="Freelance product designer and developer helping SaaS companies ship better products."
								rows={3}
								style={{
									width: "100%",
									padding: "8px 12px",
									borderRadius: 6,
									border: `1px solid ${t.border}`,
									background: t.surfaceAlt,
									color: t.text,
									fontSize: 13,
									outline: "none",
									resize: "vertical",
									fontFamily: "inherit",
								}}
							/>
						</Field>
						<Btn t={t} primary>
							Save Changes
						</Btn>
					</Card>
				)}
				{sec === "rates" && (
					<Card t={t}>
						<SecHead t={t} title="Rates & Billing" />
						{[
							["Default Hourly Rate", "$120"],
							["Design Rate ($/hr)", "$110"],
							["Development Rate ($/hr)", "$130"],
							["Rush Rate ($/hr)", "$180"],
							["Payment Terms", "Net 14"],
							["Currency", "USD"],
						].map(([l, v]) => (
							<Field key={l} t={t} label={l}>
								<Input t={t} defaultValue={v} />
							</Field>
						))}
						<Btn t={t} primary>
							Save Changes
						</Btn>
					</Card>
				)}
				{sec === "integrations" && (
					<Card t={t}>
						<SecHead t={t} title="Integrations" sub="Connect your tools" />
						<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
							{INTEGRATIONS.map((intg) => (
								<div
									key={intg.name}
									style={{
										display: "flex",
										alignItems: "center",
										gap: 14,
										padding: "14px 16px",
										background: t.surfaceAlt,
										borderRadius: 8,
										border: `1px solid ${t.border}`,
									}}
								>
									<span style={{ fontSize: 22 }}>{intg.icon}</span>
									<div style={{ flex: 1 }}>
										<div
											style={{ fontSize: 13, fontWeight: 700, color: t.text }}
										>
											{intg.name}
										</div>
										<div
											style={{
												fontSize: 11,
												color:
													intg.status === "Connected" ? t.green : t.textMuted,
											}}
										>
											{intg.status}
										</div>
									</div>
									<Btn t={t} small>
										{intg.status === "Connected" ? "Disconnect" : "Connect"}
									</Btn>
								</div>
							))}
						</div>
					</Card>
				)}
				{sec === "notifications" && (
					<Card t={t}>
						<SecHead t={t} title="Notifications" />
						{[
							["Invoice overdue", "Email + Push"],
							["Proposal viewed", "Push"],
							["Proposal accepted", "Email + Push"],
							["Deadline in 3 days", "Push"],
							["Weekly revenue summary", "Email"],
							["Client no response 7d", "Email"],
						].map(([label, def]) => (
							<div
								key={label}
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "12px 0",
									borderBottom: `1px solid ${t.border}`,
								}}
							>
								<div>
									<div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>
										{label}
									</div>
									<div
										style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}
									>
										{def}
									</div>
								</div>
								<div
									style={{
										width: 38,
										height: 20,
										borderRadius: 10,
										background: t.accent,
										cursor: "pointer",
										position: "relative",
										flexShrink: 0,
									}}
								>
									<div
										style={{
											width: 14,
											height: 14,
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
				{sec === "plan" && (
					<Card t={t}>
						<SecHead t={t} title="Plan" />
						<div
							style={{
								background: t.accentDim,
								border: `1px solid ${t.accent}30`,
								borderRadius: 8,
								padding: 20,
								marginBottom: 18,
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "flex-start",
									marginBottom: 10,
								}}
							>
								<div>
									<div
										style={{
											fontSize: 15,
											fontWeight: 700,
											color: t.text,
											marginBottom: 4,
										}}
									>
										Solo Plan
									</div>
									<div style={{ fontSize: 12, color: t.textSub }}>
										Unlimited clients, projects, and invoices
									</div>
								</div>
								<Pill color={t.green} dim={t.greenDim}>
									Active
								</Pill>
							</div>
							<div
								style={{
									fontFamily: "'Geist Mono',monospace",
									fontSize: 28,
									fontWeight: 700,
									color: t.accent,
								}}
							>
								$19
								<span
									style={{ fontSize: 13, color: t.textSub, fontWeight: 400 }}
								>
									/mo
								</span>
							</div>
							<div style={{ fontSize: 11, color: t.textMuted, marginTop: 4 }}>
								Next billing: April 1, 2026
							</div>
						</div>
						<div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
							<Btn t={t}>Upgrade to Team</Btn>
							<Btn t={t}>Update Payment</Btn>
							<Btn t={t} danger>
								Cancel Plan
							</Btn>
						</div>
						<div
							style={{
								fontSize: 12,
								fontWeight: 700,
								color: t.text,
								marginBottom: 10,
							}}
						>
							Billing History
						</div>
						{[
							["Mar 1, 2026", "Solo Plan", "$19"],
							["Feb 1, 2026", "Solo Plan", "$19"],
							["Jan 1, 2026", "Solo Plan", "$19"],
						].map(([d, desc, amt]) => (
							<div
								key={d}
								style={{
									display: "flex",
									justifyContent: "space-between",
									padding: "10px 0",
									borderBottom: `1px solid ${t.border}`,
									fontSize: 12,
									alignItems: "center",
								}}
							>
								<span style={{ color: t.textSub }}>{d}</span>
								<span style={{ color: t.text }}>{desc}</span>
								<span
									style={{
										fontFamily: "'Geist Mono',monospace",
										fontWeight: 700,
									}}
								>
									{amt}
								</span>
								<Pill color={t.green} dim={t.greenDim} small>
									Paid
								</Pill>
							</div>
						))}
					</Card>
				)}
			</div>
		</div>
	);
}
