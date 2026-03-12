"use client";

import { useState } from "react";
import {
	Card,
	KPI,
	Pill,
	Btn,
	CDot,
} from "./Shared";
import { useCRM } from "../Layout";
import { INVOICES, CLIENTS, INV_M } from "../data";

export default function InvoicesPage() {
	const { t } = useCRM();
	const [sf, setSf] = useState("All");
	const [sel, setSel] = useState(null);
	const filtered = INVOICES.filter((i) => sf === "All" || i.status === sf);
	const paid = INVOICES.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
	const out = INVOICES.filter((i) => ["Sent", "Overdue"].includes(i.status)).reduce((s, i) => s + i.amount, 0);

	return (
		<div>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 18 }}>
				<KPI t={t} label="Collected YTD" value={`$${paid.toLocaleString()}`} sub="paid invoices" />
				<KPI t={t} label="Outstanding" value={`$${out.toLocaleString()}`} sub="awaiting payment" />
				<KPI t={t} label="Overdue" value="$800" sub="1 invoice" />
				<KPI t={t} label="Avg Payment Time" value="14d" sub="this quarter" />
			</div>
			<div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
				{["All", ...Object.keys(INV_M)].map((s) => (
					<div
						key={s}
						onClick={() => setSf(s)}
						style={{
							padding: "5px 12px",
							borderRadius: 4,
							fontSize: 11,
							fontWeight: 700,
							cursor: "pointer",
							background: sf === s ? (INV_M[s]?.color || t.accent) : t.surfaceAlt,
							color: sf === s ? "#fff" : t.textMuted,
							transition: "all 0.15s",
						}}
					>
						{s}
					</div>
				))}
				<Btn t={t} primary style={{ marginLeft: "auto" }}>
					+ New Invoice
				</Btn>
			</div>
			<Card t={t} p={0} style={{ overflow: "hidden" }}>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1fr 1fr 0.8fr",
						padding: "10px 18px",
						borderBottom: `1px solid ${t.border}`,
						fontSize: 10,
						fontWeight: 700,
						color: t.textMuted,
						letterSpacing: 0.8,
						textTransform: "uppercase",
					}}
				>
					<span>INVOICE</span>
					<span>CLIENT</span>
					<span>AMOUNT</span>
					<span>ISSUED</span>
					<span>DUE</span>
					<span>PAID</span>
					<span>STATUS</span>
				</div>
				{filtered.map((inv, i) => {
					const sm = INV_M[inv.status];
					return (
						<div
							key={inv.id}
							onClick={() => setSel(sel?.id === inv.id ? null : inv)}
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1fr 1fr 0.8fr",
								padding: "13px 18px",
								borderBottom: i < filtered.length - 1 ? `1px solid ${t.border}` : "none",
								alignItems: "center",
								cursor: "pointer",
								background: sel?.id === inv.id ? t.surfaceAlt : "transparent",
								transition: "background 0.12s",
							}}
						>
							<span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 12, color: t.accent, fontWeight: 700 }}>{inv.id}</span>
							<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
								<CDot client={inv.client} clients={CLIENTS} />
								<span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{inv.client}</span>
							</div>
							<span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, fontWeight: 700 }}>${inv.amount.toLocaleString()}</span>
							<span style={{ fontSize: 11, color: t.textSub }}>{inv.issued}</span>
							<span style={{ fontSize: 11, color: inv.status === "Overdue" ? t.red : t.textSub }}>{inv.due}</span>
							<span style={{ fontSize: 11, color: inv.paid !== "—" ? t.green : t.textMuted }}>{inv.paid}</span>
							<Pill color={sm.color} dim={sm.dim} small>
								{inv.status}
							</Pill>
						</div>
					);
				})}
			</Card>
			{sel && (
				<div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setSel(null)}>
					<Card t={t} p={28} style={{ width: 420 }} onClick={(e) => e.stopPropagation()}>
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
							<div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 16, fontWeight: 700, color: t.accent }}>{sel.id}</div>
							<button onClick={() => setSel(null)} style={{ background: "none", border: "none", color: t.textSub, cursor: "pointer", fontSize: 18 }}>
								×
							</button>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
							<div>
								<div style={{ fontSize: 11, color: t.textMuted }}>CLIENT</div>
								<div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{sel.client}</div>
							</div>
							<Pill color={INV_M[sel.status].color} dim={INV_M[sel.status].dim}>
								{sel.status}
							</Pill>
						</div>
						<div style={{ borderTop: `1px solid ${t.border}`, paddingTop: 16, marginBottom: 16 }}>
							{sel.items.map((item, i) => (
								<div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 13 }}>
									<span style={{ color: t.text }}>{item.desc}</span>
									<span style={{ fontFamily: "'Geist Mono',monospace", fontWeight: 700 }}>${item.rate.toLocaleString()}</span>
								</div>
							))}
						</div>
						<div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${t.border}`, paddingTop: 14, marginBottom: 20 }}>
							<span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Total</span>
							<span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 20, fontWeight: 700, color: t.accent }}>${sel.amount.toLocaleString()}</span>
						</div>
						<div style={{ display: "flex", gap: 8 }}>
							<Btn t={t} primary style={{ flex: 1 }}>
								Send Invoice
							</Btn>
							<Btn t={t}>Download PDF</Btn>
						</div>
					</Card>
				</div>
			)}
		</div>
	);
}
