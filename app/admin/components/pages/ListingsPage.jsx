import { useState } from "react";
import { Card, SecHead, Pill, Avatar, Btn } from "../Shared";
import { useCRM } from "../../RealEstateLayout";
import { LISTINGS_DATA, LEADS_DATA, SHOWINGS, AGENTS_DATA, statusMeta, agentColor } from "../../data";

export default function ListingsPage() {
	const { t } = useCRM();
	const [view, setView] = useState("grid");
	const [statusF, setStatusF] = useState("All");
	const [selected, setSelected] = useState(null);
	const filtered = LISTINGS_DATA.filter((l) => statusF === "All" || l.status === statusF);

	if (selected) {
		return (
			<div>
				<button
					onClick={() => setSelected(null)}
					style={{
						display: "flex",
						alignItems: "center",
						gap: 6,
						background: "none",
						border: "none",
						color: t.accent,
						fontSize: 13,
						fontWeight: 700,
						cursor: "pointer",
						marginBottom: 20,
						fontFamily: "inherit",
					}}
				>
					← Back to Listings
				</button>
				<div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20 }} className="crm-listing-detail-grid">
					<div>
						<div
							style={{
								background: t.surfaceAlt,
								borderRadius: 16,
								height: 240,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: 80,
								marginBottom: 20,
							}}
						>
							{selected.img}
						</div>
						<Card t={t} style={{ marginBottom: 14 }}>
							<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
								<div>
									<h1 style={{ fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 4 }}>{selected.address}</h1>
									<div style={{ fontSize: 14, color: t.textSub }}>
										{selected.city} · {selected.type}
									</div>
								</div>
								<Pill color={statusMeta[selected.status]?.color || t.green} dim={statusMeta[selected.status]?.dim || statusMeta["Active"]?.dim}>
									{selected.status}
								</Pill>
							</div>
							<div style={{ fontSize: 30, fontWeight: 800, color: t.accent, marginBottom: 16 }}>${selected.price.toLocaleString("en-US")}</div>
							<div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
								{[
									[selected.beds > 0 ? `${selected.beds} Beds` : "Commercial", "🛏"],
									[`${selected.baths} Baths`, "🚿"],
									[`${selected.sqft.toLocaleString("en-US")} ft²`, "📐"],
									[`${selected.dom} Days`, "📅"],
								].map(([v, icon]) => (
									<div key={v} style={{ background: t.surfaceAlt, borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
										<div style={{ fontSize: 18, marginBottom: 4 }}>{icon}</div>
										<div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{v}</div>
									</div>
								))}
							</div>
							<p style={{ fontSize: 13, color: t.textSub, lineHeight: 1.7 }}>{selected.desc}</p>
						</Card>
						<Card t={t}>
							<SecHead t={t}>Property Details</SecHead>
							<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
								{[["Garage", selected.garage > 0 ? `${selected.garage} car` : "N/A"], ["Lot Size", selected.lot], ["Year Built", selected.year], ["Agent", AGENTS_DATA.find((a) => a.code === selected.agent)?.name], ["Days on Market", `${selected.dom} days`], ["Price/sqft", `$${Math.round(selected.price / selected.sqft)}`]].map(([k, v]) => (
									<div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${t.border}` }}>
										<span style={{ fontSize: 12, color: t.textSub }}>{k}</span>
										<span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{v}</span>
									</div>
								))}
							</div>
						</Card>
					</div>
					<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
						<Card t={t}>
							<SecHead t={t}>Matched Leads</SecHead>
							{LEADS_DATA.filter((l) => l.type === "Buyer")
								.slice(0, 3)
								.map((l) => (
									<div key={l.id} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: `1px solid ${t.border}`, alignItems: "center" }}>
										<Avatar code={l.agent} color={agentColor[l.agent]} size={30} />
										<div style={{ flex: 1 }}>
											<div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{l.name}</div>
											<div style={{ fontSize: 11, color: t.textSub }}>
												{l.stage} · ${(l.budget / 1000).toFixed(0)}K budget
											</div>
										</div>
									</div>
								))}
						</Card>
						<Card t={t}>
							<SecHead t={t}>Showings</SecHead>
							{SHOWINGS.filter((s) => s.address === selected.address)
								.slice(0, 3)
								.map((s, i) => (
									<div key={i} style={{ padding: "9px 0", borderBottom: `1px solid ${t.border}` }}>
										<div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{s.client}</div>
										<div style={{ fontSize: 11, color: t.textSub }}>
											{s.date} · {s.time}
										</div>
									</div>
								))}
							{SHOWINGS.filter((s) => s.address === selected.address).length === 0 && (
								<div style={{ fontSize: 13, color: t.textMuted, textAlign: "center", padding: "10px 0" }}>No showings yet</div>
							)}
							<Btn t={t} primary style={{ width: "100%", marginTop: 12 }}>
								+ Schedule Showing
							</Btn>
						</Card>
						<Card t={t}>
							<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
								<Btn t={t} primary>
									Edit Listing
								</Btn>
								<Btn t={t}>Share Listing</Btn>
								<Btn t={t}>Generate Flyer</Btn>
								<Btn t={t} style={{ color: t.red, borderColor: t.red + "44" }}>
									Mark as Sold
								</Btn>
							</div>
						</Card>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
				<div style={{ display: "flex", background: t.surfaceAlt, borderRadius: 8, padding: 3, gap: 2 }}>
					{["grid", "list"].map((v) => (
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
							{v === "grid" ? "⊞ Grid" : "≡ List"}
						</button>
					))}
				</div>
				<div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
					{["All", "Active", "Under Contract", "Sold"].map((s) => (
						<div
							key={s}
							onClick={() => setStatusF(s)}
							style={{
								padding: "5px 12px",
								borderRadius: 7,
								fontSize: 12,
								fontWeight: 700,
								cursor: "pointer",
								background: statusF === s ? (statusMeta[s]?.color || t.accent) : t.surfaceAlt,
								color: statusF === s ? "#fff" : t.textMuted,
								whiteSpace: "nowrap",
							}}
						>
							{s}
						</div>
					))}
				</div>
				<Btn t={t} primary style={{ marginLeft: "auto" }}>
					+ New Listing
				</Btn>
			</div>
			{view === "grid" ? (
				<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 16 }}>
					{filtered.map((l) => {
						const sm = statusMeta[l.status] || { color: t.accent, dim: t.accentDim };
						return (
							<div
								key={l.id}
								onClick={() => setSelected(l)}
								style={{
									background: t.surface,
									border: `1px solid ${t.border}`,
									borderRadius: 16,
									overflow: "hidden",
									cursor: "pointer",
									transition: "all 0.18s",
								}}
							>
								<div
									style={{
										height: 130,
										background: t.surfaceAlt,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: 56,
										borderBottom: `1px solid ${t.border}`,
									}}
								>
									{l.img}
								</div>
								<div style={{ padding: 16 }}>
									<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
										<Pill color={sm.color} dim={sm.dim} small>
											{l.status}
										</Pill>
										<span style={{ fontSize: 11, color: t.textMuted }}>{l.dom}d on market</span>
									</div>
									<div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 2 }}>{l.address}</div>
									<div style={{ fontSize: 12, color: t.textSub, marginBottom: 12 }}>
										{l.city} · {l.type}
									</div>
									<div style={{ display: "flex", gap: 14, fontSize: 12, color: t.textSub, marginBottom: 12 }}>
										{l.beds > 0 && <span>🛏 {l.beds}bd</span>}
										<span>🚿 {l.baths}ba</span>
										<span>📐 {l.sqft.toLocaleString("en-US")}</span>
									</div>
									<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
										<span style={{ fontSize: 20, fontWeight: 800, color: t.accent }}>${(l.price / 1000).toFixed(0)}K</span>
										<Avatar code={l.agent} color={agentColor[l.agent]} size={26} />
									</div>
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<Card t={t} p={0} style={{ overflow: "hidden" }}>
					<div
						className="crm-listings-table-header"
						style={{
							display: "grid",
							gridTemplateColumns: "2fr 0.8fr 0.8fr 0.8fr 1fr 0.8fr 1fr",
							padding: "11px 18px",
							borderBottom: `1px solid ${t.border}`,
							fontSize: 11,
							fontWeight: 700,
							color: t.textMuted,
							letterSpacing: 0.5,
						}}
					>
						<span>ADDRESS</span>
						<span>TYPE</span>
						<span>PRICE</span>
						<span>BED/BATH</span>
						<span>STATUS</span>
						<span>DOM</span>
						<span>AGENT</span>
					</div>
					{filtered.map((l, i) => {
						const sm = statusMeta[l.status] || { color: t.accent, dim: t.accentDim };
						return (
							<div
								key={l.id}
								onClick={() => setSelected(l)}
								className="crm-listings-table-row"
								style={{
									display: "grid",
									gridTemplateColumns: "2fr 0.8fr 0.8fr 0.8fr 1fr 0.8fr 1fr",
									padding: "13px 18px",
									borderBottom: i < filtered.length - 1 ? `1px solid ${t.border}` : "none",
									alignItems: "center",
									cursor: "pointer",
									transition: "background 0.12s",
								}}
							>
								<div style={{ display: "flex", gap: 10, alignItems: "center" }}>
									<div
										style={{
											width: 36,
											height: 36,
											borderRadius: 9,
											background: t.surfaceAlt,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											fontSize: 18,
											flexShrink: 0,
										}}
									>
										{l.img}
									</div>
									<div>
										<div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{l.address}</div>
										<div style={{ fontSize: 11, color: t.textSub }}>{l.city}</div>
									</div>
								</div>
								<span style={{ fontSize: 12, color: t.textSub }}>{l.type}</span>
								<span style={{ fontWeight: 700, fontSize: 13 }}>${(l.price / 1000).toFixed(0)}K</span>
								<span style={{ fontSize: 12, color: t.textSub }}>{l.beds > 0 ? `${l.beds}/${l.baths}` : `—/${l.baths}`}</span>
								<Pill color={sm.color} dim={sm.dim} small>
									{l.status}
								</Pill>
								<span style={{ fontSize: 12, color: l.dom > 20 ? t.red : t.textSub }}>{l.dom}d</span>
								<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
									<Avatar code={l.agent} color={agentColor[l.agent]} size={24} />
									<span style={{ fontSize: 12, color: t.textSub }}>{AGENTS_DATA.find((a) => a.code === l.agent)?.name}</span>
								</div>
							</div>
						);
					})}
				</Card>
			)}
		</div>
	);
}
