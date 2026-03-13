"use client";

import { useState } from "react";
import {
	Card,
	Pill,
	Tag,
	Btn,
	CDot,
	ProgressBar,
	Modal,
	Field,
	Input,
	Select,
} from "./Shared";
import { useCRM } from "./Layout";
import { PROJECTS, CLIENTS, STATUS_M } from "./data";

const PROJECT_TYPES = ["Design", "Development", "Design+Dev", "Branding"];

export default function ProjectsPage() {
	const { t } = useCRM();
	const [sf, setSf] = useState("All");
	const [projects, setProjects] = useState(PROJECTS);
	const [showNewProject, setShowNewProject] = useState(false);
	const filtered = projects.filter((p) => sf === "All" || p.status === sf);

	const handleNewProject = (e) => {
		e.preventDefault();
		const fd = new FormData(e.target);
		const client = fd.get("client") || "";
		const name = fd.get("name") || "";
		const status = fd.get("status") || "Draft";
		const type = fd.get("type") || "Design";
		const budget = Number(fd.get("budget")) || 0;
		const deadline = fd.get("deadline") || "";
		const estHours = Number(fd.get("estHours")) || 0;
		if (!name.trim()) return;
		setProjects((prev) => [
			...prev,
			{
				id: Math.max(0, ...prev.map((p) => p.id)) + 1,
				client,
				name: name.trim(),
				status,
				type,
				budget,
				billed: 0,
				deadline,
				progress: 0,
				hours: 0,
				estHours,
				tags: [],
			},
		]);
		setShowNewProject(false);
		e.target.reset();
	};

	return (
		<div>
			<div
				style={{
					display: "flex",
					gap: 8,
					marginBottom: 14,
					alignItems: "center",
				}}
			>
				{["All", ...Object.keys(STATUS_M)].map((s) => (
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
								sf === s ? STATUS_M[s]?.color || t.accent : t.surfaceAlt,
							color: sf === s ? "#fff" : t.textMuted,
							transition: "all 0.15s",
						}}
					>
						{s}
					</div>
				))}
				<Btn
					t={t}
					primary
					style={{ marginLeft: "auto" }}
					onClick={() => setShowNewProject(true)}
				>
					+ New Project
				</Btn>
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
				{filtered.map((p) => {
					const sm = STATUS_M[p.status] || STATUS_M["Draft"];
					return (
						<Card key={p.id} t={t} p={18} style={{ cursor: "pointer" }}>
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "2.5fr 0.8fr 1fr 1fr 1fr 1fr",
									alignItems: "center",
									gap: 12,
								}}
							>
								<div style={{ display: "flex", gap: 10, alignItems: "center" }}>
									<CDot client={p.client} clients={CLIENTS} />
									<div>
										<div
											style={{
												fontSize: 14,
												fontWeight: 700,
												color: t.text,
												marginBottom: 2,
											}}
										>
											{p.name}
										</div>
										<div style={{ fontSize: 11, color: t.textSub }}>
											{p.client}
										</div>
									</div>
								</div>
								<Tag t={t}>{p.type}</Tag>
								<Pill color={sm.color} dim={sm.dim} small>
									{p.status}
								</Pill>
								<div>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											fontSize: 10,
											color: t.textMuted,
											marginBottom: 4,
										}}
									>
										<span>{p.progress}%</span>
										<span>Due {p.deadline}</span>
									</div>
									<ProgressBar
										value={p.progress}
										max={100}
										color={sm.color}
										t={t}
										height={4}
									/>
								</div>
								<div>
									<div
										style={{
											fontSize: 12,
											fontWeight: 700,
											color: t.text,
											fontFamily: "'Geist Mono',monospace",
										}}
									>
										${p.billed.toLocaleString()}
									</div>
									<div style={{ fontSize: 10, color: t.textMuted }}>
										of ${p.budget.toLocaleString()}
									</div>
								</div>
								<div>
									<div
										style={{
											fontSize: 12,
											fontWeight: 700,
											color: t.text,
											fontFamily: "'Geist Mono',monospace",
										}}
									>
										{p.hours}h
									</div>
									<div style={{ fontSize: 10, color: t.textMuted }}>
										of {p.estHours}h est.
									</div>
								</div>
							</div>
							<div style={{ display: "flex", gap: 4, marginTop: 12 }}>
								{p.tags.map((tag) => (
									<Tag key={tag} t={t}>
										{tag}
									</Tag>
								))}
							</div>
						</Card>
					);
				})}
			</div>
			<Modal
				show={showNewProject}
				t={t}
				title="New Project"
				onClose={() => setShowNewProject(false)}
			>
				<form onSubmit={handleNewProject}>
					<Field t={t} label="Project Name">
						<Input t={t} name="name" placeholder="Design System v2" />
					</Field>
					<Field t={t} label="Client">
						<Select t={t} name="client" options={CLIENTS.map((c) => c.name)} />
					</Field>
					<div
						style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
					>
						<Field t={t} label="Status">
							<Select
								t={t}
								name="status"
								options={[
									"Draft",
									...Object.keys(STATUS_M).filter((k) => k !== "Draft"),
								]}
							/>
						</Field>
						<Field t={t} label="Type">
							<Select t={t} name="type" options={PROJECT_TYPES} />
						</Field>
					</div>
					<div
						style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
					>
						<Field t={t} label="Budget ($)">
							<Input t={t} name="budget" type="number" placeholder="5000" />
						</Field>
						<Field t={t} label="Est. Hours">
							<Input t={t} name="estHours" type="number" placeholder="80" />
						</Field>
					</div>
					<Field t={t} label="Deadline">
						<Input t={t} name="deadline" placeholder="Mar 28" />
					</Field>
					<div style={{ display: "flex", gap: 8, marginTop: 16 }}>
						<Btn t={t} type="submit" primary style={{ flex: 1 }}>
							Save Project
						</Btn>
						<Btn t={t} type="button" onClick={() => setShowNewProject(false)}>
							Cancel
						</Btn>
					</div>
				</form>
			</Modal>
		</div>
	);
}
