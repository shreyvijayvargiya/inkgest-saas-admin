"use client";

import { useState } from "react";
import { Card, KPI, Pill, Tag, Btn, Modal, Field, Input, Select } from "./Shared";
import { useCRM } from "../Layout";
import { CLIENTS, PRI_M } from "../data";

export default function TasksPage() {
	const { t, taskList, setTaskList } = useCRM();
	const [filter, setFilter] = useState("All");
	const [show, setShow] = useState(false);
	const groups = [
		{ label: "Today", items: taskList.filter((x) => x.due === "Today") },
		{ label: "Tomorrow", items: taskList.filter((x) => x.due === "Tomorrow") },
		{ label: "This Week", items: taskList.filter((x) => !["Today", "Tomorrow"].includes(x.due)) },
	];

	return (
		<div>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 18 }}>
				<KPI t={t} label="Total" value={taskList.length} sub="all tasks" />
				<KPI t={t} label="Done" value={taskList.filter((x) => x.done).length} sub="completed" />
				<KPI t={t} label="Due Today" value={taskList.filter((x) => x.due === "Today").length} sub="need attention" />
				<KPI t={t} label="High Prio" value={taskList.filter((x) => x.priority === "high" && !x.done).length} sub="urgent" />
			</div>
			<div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
				{["All", "high", "medium", "low", "Business Dev", "Finance", "Admin", "Client Work"].map((f) => (
					<div
						key={f}
						onClick={() => setFilter(f)}
						style={{
							padding: "5px 12px",
							borderRadius: 4,
							fontSize: 11,
							fontWeight: 700,
							cursor: "pointer",
							background: filter === f ? t.accent : t.surfaceAlt,
							color: filter === f ? "#fff" : t.textMuted,
							transition: "all 0.15s",
						}}
					>
						{f}
					</div>
				))}
				<Btn t={t} primary style={{ marginLeft: "auto" }} onClick={() => setShow(true)}>
					+ New Task
				</Btn>
			</div>
			{groups.map((group) => {
				const show2 = filter === "All" ? group.items : group.items.filter((x) => x.priority === filter || x.category === filter);
				if (!show2.length) return null;
				return (
					<div key={group.label} style={{ marginBottom: 22 }}>
						<div style={{ fontSize: 10, fontWeight: 800, color: t.textMuted, letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>
							{group.label} · {show2.length}
						</div>
						{show2.map((task) => {
							const gi = taskList.findIndex((x) => x.id === task.id);
							return (
								<Card key={task.id} t={t} p={14} style={{ marginBottom: 8, opacity: task.done ? 0.4 : 1 }}>
									<div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
										<div
											onClick={() => setTaskList((tl) => tl.map((x, j) => (j === gi ? { ...x, done: !x.done } : x)))}
											style={{
												width: 16,
												height: 16,
												borderRadius: 3,
												border: `1.5px solid ${task.done ? t.accent : t.border}`,
												background: task.done ? t.accentDim : "transparent",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												cursor: "pointer",
												flexShrink: 0,
												marginTop: 2,
											}}
										>
											{task.done && <span style={{ fontSize: 9, color: t.accent, fontWeight: 900 }}>✓</span>}
										</div>
										<div style={{ flex: 1 }}>
											<div style={{ fontSize: 13, fontWeight: 600, color: t.text, textDecoration: task.done ? "line-through" : "none", marginBottom: 6, lineHeight: 1.4 }}>
												{task.text}
											</div>
											<div style={{ display: "flex", gap: 6 }}>
												<Pill color={PRI_M[task.priority].color} dim={PRI_M[task.priority].dim} small>
													{task.priority}
												</Pill>
												<Tag t={t}>{task.category}</Tag>
												{task.client !== "—" && (
													<Tag t={t}>
														{task.client}
													</Tag>
												)}
											</div>
										</div>
										<span style={{ fontSize: 11, color: task.due === "Today" ? t.amber : t.textMuted, flexShrink: 0, fontWeight: 600 }}>{task.due}</span>
									</div>
								</Card>
							);
						})}
					</div>
				);
			})}
			{show && (
				<Modal t={t} title="New Task" onClose={() => setShow(false)}>
					<Field t={t} label="Task">
						<Input t={t} placeholder="What needs to be done?" />
					</Field>
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
						<Field t={t} label="Priority">
							<Select t={t} options={["high", "medium", "low"]} />
						</Field>
						<Field t={t} label="Due Date">
							<Select t={t} options={["Today", "Tomorrow", "Mar 15", "Mar 20"]} />
						</Field>
					</div>
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
						<Field t={t} label="Category">
							<Select t={t} options={["Client Work", "Business Dev", "Finance", "Admin"]} />
						</Field>
						<Field t={t} label="Client">
							<Select t={t} options={["—", ...CLIENTS.map((c) => c.name)]} />
						</Field>
					</div>
					<div style={{ display: "flex", gap: 8, marginTop: 6 }}>
						<Btn t={t} primary style={{ flex: 1 }} onClick={() => setShow(false)}>
							Save
						</Btn>
						<Btn t={t} onClick={() => setShow(false)}>
							Cancel
						</Btn>
					</div>
				</Modal>
			)}
		</div>
	);
}
