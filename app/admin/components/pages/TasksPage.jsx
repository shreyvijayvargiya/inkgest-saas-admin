import { useState } from "react";
import { Card, Pill, Avatar, Btn } from "../Shared";
import { useCRM } from "../../RealEstateLayout";
import { AGENTS_DATA, agentColor, priorityMeta } from "../../data";

export default function TasksPage() {
	const { t, taskList, setTaskList } = useCRM();
	const [filter, setFilter] = useState("All");
	const [showForm, setShowForm] = useState(false);

	const groups = [
		{ label: "Today", tasks: taskList.filter((t2) => t2.due === "Today") },
		{ label: "Tomorrow", tasks: taskList.filter((t2) => t2.due === "Tomorrow") },
		{ label: "This Week", tasks: taskList.filter((t2) => !["Today", "Tomorrow"].includes(t2.due)) },
	];
	const filtered = filter === "All" ? groups : groups.map((g) => ({ ...g, tasks: g.tasks.filter((t2) => t2.priority === filter.toLowerCase() || t2.agent === filter || t2.category === filter) }));
	const done = taskList.filter((x) => x.done).length;

	return (
		<div>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }} className="crm-tasks-stats">
				{[
					{ label: "Total Tasks", val: taskList.length, color: t.text },
					{ label: "Completed", val: done, color: t.green },
					{ label: "Overdue", val: 1, color: t.red },
					{ label: "Due Today", val: taskList.filter((x) => x.due === "Today").length, color: t.amber },
				].map((m) => (
					<Card key={m.label} t={t}>
						<div style={{ fontSize: 12, color: t.textSub, marginBottom: 6 }}>{m.label}</div>
						<div style={{ fontSize: 24, fontWeight: 800, color: m.color }}>{m.val}</div>
					</Card>
				))}
			</div>

			<div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
				{["All", "High", "Medium", "Low", "SR", "JM", "KL", "DP"].map((f) => (
					<div
						key={f}
						onClick={() => setFilter(f)}
						style={{
							padding: "5px 12px",
							borderRadius: 7,
							fontSize: 12,
							fontWeight: 700,
							cursor: "pointer",
							background: filter === f ? t.accent : t.surfaceAlt,
							color: filter === f ? t.bg : t.textMuted,
						}}
					>
						{f}
					</div>
				))}
				<Btn t={t} primary style={{ marginLeft: "auto" }} onClick={() => setShowForm(true)}>
					+ New Task
				</Btn>
			</div>

			{filtered.map(
				(group) =>
					group.tasks.length > 0 && (
						<div key={group.label} style={{ marginBottom: 22 }}>
							<div style={{ fontSize: 12, fontWeight: 800, color: t.textMuted, letterSpacing: 1, marginBottom: 10 }}>
								{group.label.toUpperCase()} · {group.tasks.length}
							</div>
							{group.tasks.map((task) => {
								const globalIdx = taskList.findIndex((x) => x.id === task.id);
								return (
									<div
										key={task.id}
										style={{
											display: "flex",
											gap: 12,
											padding: "13px 16px",
											background: t.surface,
											border: `1px solid ${t.border}`,
											borderRadius: 12,
											marginBottom: 8,
											opacity: task.done ? 0.5 : 1,
											transition: "opacity 0.2s",
											flexWrap: "wrap",
										}}
									>
										<div
											onClick={() => setTaskList((tl) => tl.map((x, j) => (j === globalIdx ? { ...x, done: !x.done } : x)))}
											style={{
												width: 20,
												height: 20,
												borderRadius: 6,
												border: `2px solid ${task.done ? t.green : t.border}`,
												background: task.done ? t.green + "22" : "transparent",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												cursor: "pointer",
												flexShrink: 0,
												marginTop: 2,
											}}
										>
											{task.done && <span style={{ fontSize: 11, color: t.green, fontWeight: 900 }}>✓</span>}
										</div>
										<div style={{ flex: 1, minWidth: 200 }}>
											<div style={{ fontSize: 14, fontWeight: 600, color: t.text, textDecoration: task.done ? "line-through" : "none", marginBottom: 6 }}>{task.text}</div>
											<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
												<Pill color={priorityMeta[task.priority].color} dim={priorityMeta[task.priority].dim} small>
													{task.priority}
												</Pill>
												<Pill color={t.textSub} dim={t.surfaceAlt} small>
													{task.category}
												</Pill>
												<Pill color={t.textSub} dim={t.surfaceAlt} small>
													{task.linked}
												</Pill>
											</div>
										</div>
										<div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
											<div style={{ fontSize: 12, color: task.due === "Today" ? t.amber : t.textMuted, fontWeight: 600 }}>{task.due}</div>
											<Avatar code={task.agent} color={agentColor[task.agent]} size={28} />
										</div>
									</div>
								);
							})}
						</div>
					)
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
							width: 440,
							maxWidth: "100%",
						}}
						onClick={(e) => e.stopPropagation()}
					>
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
							<span style={{ fontSize: 16, fontWeight: 800, color: t.text }}>New Task</span>
							<button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", color: t.textSub, fontSize: 18, cursor: "pointer" }}>
								×
							</button>
						</div>
						<div style={{ marginBottom: 14 }}>
							<div style={{ fontSize: 12, fontWeight: 600, color: t.textSub, marginBottom: 5 }}>Task Description</div>
							<input
								placeholder="What needs to be done?"
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
						{[["Priority", ["High", "Medium", "Low"]], ["Assign To", AGENTS_DATA.map((a) => a.name)], ["Category", ["Follow-up", "Offer", "Marketing", "Admin", "Legal", "Research"]], ["Due Date", ["Today", "Tomorrow", "Mar 14", "Mar 15", "Mar 16"]]].map(([label, opts]) => (
							<div key={label} style={{ marginBottom: 14 }}>
								<div style={{ fontSize: 12, fontWeight: 600, color: t.textSub, marginBottom: 5 }}>{label}</div>
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
						<div style={{ display: "flex", gap: 8, marginTop: 20 }}>
							<Btn t={t} primary style={{ flex: 1 }} onClick={() => setShowForm(false)}>
								Save Task
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
