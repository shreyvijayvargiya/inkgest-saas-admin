import { useState } from "react";
import { Card, SecHead, Pill, Avatar, Btn } from "../Shared";
import { useCRM } from "../../RealEstateLayout";
import { SHOWINGS, MONTHS, DAYS, eventTypeColor, agentColor, AGENTS_DATA } from "../../data";

export default function CalendarPage() {
	const { t } = useCRM();
	const [month, setMonth] = useState(2);
	const [year] = useState(2026);
	const [selectedDate, setSelectedDate] = useState("2026-03-12");

	const firstDay = new Date(Date.UTC(year, month, 1)).getUTCDay();
	const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) => (i < firstDay ? null : i - firstDay + 1));

	const eventsForDate = (d) => {
		const ds = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
		return SHOWINGS.filter((s) => s.date === ds);
	};
	const selectedEvents = eventsForDate(parseInt(selectedDate.split("-")[2]));

	return (
		<div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }} className="crm-calendar-layout">
			<Card t={t}>
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
					<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
						<button
							onClick={() => setMonth((m) => m - 1)}
							style={{
								width: 30,
								height: 30,
								borderRadius: 7,
								border: `1px solid ${t.border}`,
								background: t.surfaceAlt,
								color: t.text,
								cursor: "pointer",
								fontSize: 14,
							}}
						>
							‹
						</button>
						<h2 style={{ fontSize: 16, fontWeight: 800, color: t.text }}>
							{MONTHS[month]} {year}
						</h2>
						<button
							onClick={() => setMonth((m) => m + 1)}
							style={{
								width: 30,
								height: 30,
								borderRadius: 7,
								border: `1px solid ${t.border}`,
								background: t.surfaceAlt,
								color: t.text,
								cursor: "pointer",
								fontSize: 14,
							}}
						>
							›
						</button>
					</div>
					<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
						{Object.entries(eventTypeColor).map(([type, color]) => (
							<div key={type} style={{ display: "flex", alignItems: "center", gap: 4 }}>
								<div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
								<span style={{ fontSize: 11, color: t.textSub }}>{type}</span>
							</div>
						))}
					</div>
				</div>
				<div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 8 }}>
					{DAYS.map((d) => (
						<div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: t.textMuted, padding: "6px 0" }}>
							{d}
						</div>
					))}
				</div>
				<div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
					{cells.map((day, i) => {
						if (!day) return <div key={i} />;
						const ds = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
						const evts = eventsForDate(day);
						const isSelected = ds === selectedDate;
						const isToday = ds === "2026-03-12";
						return (
							<div
								key={i}
								onClick={() => setSelectedDate(ds)}
								style={{
									minHeight: 72,
									borderRadius: 9,
									padding: "6px 7px",
									background: isSelected ? t.accentDim : isToday ? t.surfaceB : t.surfaceAlt,
									border: `1px solid ${isSelected ? t.accent : isToday ? t.borderB : t.border}`,
									cursor: "pointer",
									transition: "all 0.12s",
								}}
							>
								<div style={{ fontSize: 12, fontWeight: isToday || isSelected ? 800 : 500, color: isSelected ? t.accent : isToday ? t.text : t.textSub, marginBottom: 4 }}>
									{day}
								</div>
								{evts.slice(0, 2).map((e, ei) => (
									<div
										key={ei}
										style={{
											fontSize: 10,
											fontWeight: 700,
											color: eventTypeColor[e.type] || t.accent,
											background: (eventTypeColor[e.type] || t.accent) + "18",
											borderRadius: 4,
											padding: "1px 5px",
											marginBottom: 2,
											overflow: "hidden",
											textOverflow: "ellipsis",
											whiteSpace: "nowrap",
										}}
									>
										{e.type}
									</div>
								))}
								{evts.length > 2 && <div style={{ fontSize: 10, color: t.textMuted }}>+{evts.length - 2}</div>}
							</div>
						);
					})}
				</div>
			</Card>

			<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
				<Card t={t}>
					<SecHead t={t}>{selectedDate === "2026-03-12" ? "Today — Mar 12" : `${MONTHS[month]} ${parseInt(selectedDate.split("-")[2])}`}</SecHead>
					{selectedEvents.length > 0 ? (
						selectedEvents.map((e, i) => (
							<div
								key={i}
								style={{
									padding: "11px 12px",
									background: t.surfaceAlt,
									borderRadius: 10,
									marginBottom: 8,
									borderLeft: `3px solid ${eventTypeColor[e.type] || t.accent}`,
								}}
							>
								<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
									<span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{e.time}</span>
									<Pill color={eventTypeColor[e.type] || t.accent} dim={(eventTypeColor[e.type] || t.accent) + "18"} small>
										{e.type}
									</Pill>
								</div>
								<div style={{ fontSize: 12, color: t.text, fontWeight: 600, marginBottom: 2 }}>{e.address}</div>
								<div style={{ fontSize: 11, color: t.textSub }}>{e.client}</div>
								<div style={{ display: "flex", gap: 6, marginTop: 8 }}>
									<Avatar code={e.agent} color={agentColor[e.agent]} size={20} />
									<span style={{ fontSize: 11, color: t.textSub, marginTop: 2 }}>{AGENTS_DATA.find((a) => a.code === e.agent)?.name}</span>
								</div>
							</div>
						))
					) : (
						<div style={{ textAlign: "center", padding: "24px 0", color: t.textMuted, fontSize: 13 }}>No events scheduled</div>
					)}
					<Btn t={t} primary style={{ width: "100%", marginTop: 8 }}>
						+ Add Event
					</Btn>
				</Card>
				<Card t={t}>
					<SecHead t={t}>Upcoming</SecHead>
					{SHOWINGS.slice(0, 5).map((s, i) => (
						<div key={i} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: i < 4 ? `1px solid ${t.border}` : "none", alignItems: "flex-start" }}>
							<div
								style={{
									width: 36,
									height: 36,
									borderRadius: 9,
									background: (eventTypeColor[s.type] || t.accent) + "18",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: 11,
									fontWeight: 800,
									color: eventTypeColor[s.type] || t.accent,
									flexShrink: 0,
									textAlign: "center",
									lineHeight: 1.2,
								}}
							>
								{s.date.split("-")[2]}
								<br />
								<span style={{ fontSize: 9 }}>{MONTHS[parseInt(s.date.split("-")[1]) - 1].slice(0, 3)}</span>
							</div>
							<div style={{ flex: 1 }}>
								<div style={{ fontSize: 12, fontWeight: 700, color: t.text }}>{s.address}</div>
								<div style={{ fontSize: 11, color: t.textSub }}>
									{s.client} · {s.time}
								</div>
							</div>
						</div>
					))}
				</Card>
			</div>
		</div>
	);
}
