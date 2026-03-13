"use client";

import { useState } from "react";
import {
	Card,
	Pill,
	Tag,
	Btn,
	CDot,
	Modal,
	Field,
	Input,
	Select,
} from "./Shared";
import { useCRM } from "./Layout";
import { CLIENTS, STAGE_M } from "./data";

export default function ClientsPage() {
	const { t } = useCRM();
	const [sel, setSel] = useState(null);
	const [sf, setSf] = useState("All");
	const [show, setShow] = useState(false);
	const filtered = CLIENTS.filter((c) => sf === "All" || c.stage === sf);

	return (
		<div style={{ display: "flex", gap: 16 }}>
			<div style={{ flex: 1, minWidth: 0 }}>
				<div
					style={{
						display: "flex",
						gap: 8,
						marginBottom: 14,
						alignItems: "center",
						flexWrap: "wrap",
					}}
				>
					{["All", ...Object.keys(STAGE_M)].map((s) => (
						<div
							key={s}
							onClick={() => setSf(s)}
							style={{
								padding: "5px 12px",
								borderRadius: 4,
								fontSize: 11,
								fontWeight: 700,
								cursor: "pointer",
								background:
									sf === s ? STAGE_M[s]?.color || t.accent : t.surfaceAlt,
								color: sf === s ? "#fff" : t.textMuted,
								transition: "all 0.15s",
								fontFamily: "'Geist Mono',monospace",
							}}
						>
							{s}
						</div>
					))}
					<Btn
						t={t}
						primary
						onClick={() => setShow(true)}
						style={{ marginLeft: "auto" }}
					>
						+ New Client
					</Btn>
				</div>
				<Card t={t} p={0} style={{ overflow: "hidden" }}>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "2fr 1fr 0.8fr 1fr 1fr 0.9fr",
							padding: "10px 18px",
							borderBottom: `1px solid ${t.border}`,
							fontSize: 10,
							fontWeight: 700,
							color: t.textMuted,
							letterSpacing: 0.8,
							textTransform: "uppercase",
						}}
					>
						<span>CLIENT</span>
						<span>TYPE</span>
						<span>STAGE</span>
						<span>VALUE</span>
						<span>OUTSTANDING</span>
						<span>LAST ACTIVITY</span>
					</div>
					{filtered.map((c, i) => {
						const sm = STAGE_M[c.stage];
						return (
							<div
								key={c.id}
								onClick={() => setSel(sel?.id === c.id ? null : c)}
								style={{
									display: "grid",
									gridTemplateColumns: "2fr 1fr 0.8fr 1fr 1fr 0.9fr",
									padding: "13px 18px",
									borderBottom:
										i < filtered.length - 1 ? `1px solid ${t.border}` : "none",
									alignItems: "center",
									gap: 8,
									cursor: "pointer",
									background: sel?.id === c.id ? t.surfaceAlt : "transparent",
									transition: "background 0.12s",
								}}
							>
								<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
									<div
										style={{
											width: 32,
											height: 32,
											borderRadius: 6,
											background: c.color + "20",
											color: c.color,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											fontSize: 10,
											fontWeight: 800,
											border: `1px solid ${c.color}30`,
											fontFamily: "'Geist Mono',monospace",
											flexShrink: 0,
										}}
									>
										{c.avatar}
									</div>
									<div>
										<div
											style={{ fontSize: 13, fontWeight: 700, color: t.text }}
										>
											{c.name}
										</div>
										<div style={{ fontSize: 11, color: t.textSub }}>
											{c.contact}
										</div>
									</div>
								</div>
								<Tag t={t}>{c.type}</Tag>
								<Pill color={sm.color} dim={sm.dim} small>
									{c.stage}
								</Pill>
								<span
									style={{
										fontFamily: "'Geist Mono',monospace",
										fontSize: 13,
										fontWeight: 700,
									}}
								>
									${c.value.toLocaleString()}
								</span>
								<span
									style={{
										fontFamily: "'Geist Mono',monospace",
										fontSize: 13,
										color: c.outstanding > 0 ? t.amber : t.textMuted,
									}}
								>
									{c.outstanding > 0
										? `$${c.outstanding.toLocaleString()}`
										: "—"}
								</span>
								<span
									style={{
										fontSize: 11,
										color: c.lastActivity === "Today" ? t.green : t.textMuted,
									}}
								>
									{c.lastActivity}
								</span>
							</div>
						);
					})}
				</Card>
			</div>
			{sel && (
				<div style={{ width: 280, flexShrink: 0 }}>
					<Card t={t} p={18} style={{ position: "sticky", top: 0 }}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: 16,
							}}
						>
							<span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>
								Client Detail
							</span>
							<button
								onClick={() => setSel(null)}
								style={{
									background: "none",
									border: "none",
									color: t.textSub,
									cursor: "pointer",
									fontSize: 16,
								}}
							>
								×
							</button>
						</div>
						<div
							style={{
								textAlign: "center",
								padding: "16px 0",
								borderBottom: `1px solid ${t.border}`,
								marginBottom: 14,
							}}
						>
							<div
								style={{
									width: 48,
									height: 48,
									borderRadius: 8,
									background: sel.color + "20",
									color: sel.color,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: 16,
									fontWeight: 800,
									border: `1px solid ${sel.color}30`,
									margin: "0 auto 10px",
									fontFamily: "'Geist Mono',monospace",
								}}
							>
								{sel.avatar}
							</div>
							<div
								style={{
									fontSize: 15,
									fontWeight: 700,
									color: t.text,
									marginBottom: 4,
								}}
							>
								{sel.name}
							</div>
							<div style={{ fontSize: 12, color: t.textSub }}>
								{sel.contact}
							</div>
						</div>
						{[
							["Email", sel.email],
							["Phone", sel.phone],
							["Type", sel.type],
							["Started", sel.started],
							["Projects", sel.projects],
							[
								"Outstanding",
								sel.outstanding > 0
									? `$${sel.outstanding.toLocaleString()}`
									: "None",
							],
						].map(([k, v]) => (
							<div
								key={k}
								style={{
									display: "flex",
									justifyContent: "space-between",
									padding: "8px 0",
									borderBottom: `1px solid ${t.border}`,
									fontSize: 12,
								}}
							>
								<span style={{ color: t.textSub }}>{k}</span>
								<span style={{ fontWeight: 600, color: t.text }}>{v}</span>
							</div>
						))}
						<div style={{ marginTop: 12, marginBottom: 14 }}>
							<div
								style={{
									fontSize: 10,
									color: t.textMuted,
									fontWeight: 700,
									letterSpacing: 0.6,
									marginBottom: 6,
								}}
							>
								TAGS
							</div>
							<div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
								{sel.tags.map((tag) => (
									<Tag key={tag} t={t}>
										{tag}
									</Tag>
								))}
							</div>
						</div>
						<div style={{ display: "flex", gap: 6 }}>
							<Btn t={t} primary style={{ flex: 1 }}>
								✉️ Email
							</Btn>
							<Btn t={t} style={{ flex: 1 }}>
								Edit
							</Btn>
						</div>
					</Card>
				</div>
			)}
			<Modal
				show={show}
				t={t}
				title="New Client"
				onClose={() => setShow(false)}
			>
				<Field t={t} label="Company Name">
					<Input t={t} placeholder="Stripe Inc." />
				</Field>
				<Field t={t} label="Primary Contact">
					<Input t={t} placeholder="Sarah Chen" />
				</Field>
				<Field t={t} label="Email">
					<Input t={t} placeholder="sarah@stripe.com" type="email" />
				</Field>
				<Field t={t} label="Phone">
					<Input t={t} placeholder="+1 (415) 555-0000" />
				</Field>
				<div
					style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
				>
					<Field t={t} label="Stage">
						<Select t={t} options={Object.keys(STAGE_M)} />
					</Field>
					<Field t={t} label="Contract Type">
						<Select t={t} options={["Retainer", "Project", "Hourly"]} />
					</Field>
				</div>
				<Field t={t} label="Contract Value">
					<Input t={t} placeholder="$6,000" />
				</Field>
				<div style={{ display: "flex", gap: 8, marginTop: 6 }}>
					<Btn t={t} primary style={{ flex: 1 }} onClick={() => setShow(false)}>
						Save Client
					</Btn>
					<Btn t={t} onClick={() => setShow(false)}>
						Cancel
					</Btn>
				</div>
			</Modal>
		</div>
	);
}
