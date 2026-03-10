"use client";

import { useState, useCallback } from "react";
import {
	DndContext,
	DragOverlay,
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
	useDroppable,
} from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, MoreVertical, Paperclip, MessageCircle, X } from "lucide-react";
import { roadmapItems, changelogEntries } from "../../data";

const COLUMNS = [
	{ id: "backlog", label: "Backlog" },
	{ id: "in_progress", label: "In Progress" },
	{ id: "done", label: "Done" },
];

function TaskModal({ item, onClose, onSave }) {
	const [form, setForm] = useState(
		item
			? {
					title: item.title || "",
					description: item.description || "",
					status: item.status || "backlog",
					priority: item.priority || "medium",
					assigned: (item.assigned || []).join(", "),
					progress: item.progress ?? 0,
					attachments: item.attachments ?? 0,
					comments: item.comments ?? 0,
				}
			: {}
	);

	const handleChange = (field, value) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave({
			...item,
			...form,
			assigned: form.assigned
				? form.assigned.split(",").map((s) => s.trim()).filter(Boolean)
				: [],
			progress: Number(form.progress) || 0,
			attachments: Number(form.attachments) || 0,
			comments: Number(form.comments) || 0,
		});
		onClose();
	};

	if (!item) return null;

	return (
		<>
			<div className="task-modal-overlay" onClick={onClose} />
			<div className="task-modal" onClick={(e) => e.stopPropagation()}>
				<div className="task-modal-header">
					<h3 className="task-modal-title">Edit Task</h3>
					<button type="button" className="task-modal-close" onClick={onClose} aria-label="Close">
						<X size={18} strokeWidth={2} />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="task-modal-body">
					<div className="task-modal-field">
						<label>Title</label>
						<input
							type="text"
							value={form.title}
							onChange={(e) => handleChange("title", e.target.value)}
							placeholder="Task title"
							required
						/>
					</div>
					<div className="task-modal-field">
						<label>Description</label>
						<textarea
							value={form.description}
							onChange={(e) => handleChange("description", e.target.value)}
							placeholder="Add a description..."
							rows={3}
						/>
					</div>
					<div className="task-modal-row">
						<div className="task-modal-field">
							<label>Status</label>
							<select
								value={form.status}
								onChange={(e) => handleChange("status", e.target.value)}
							>
								{COLUMNS.map((col) => (
									<option key={col.id} value={col.id}>
										{col.label}
									</option>
								))}
							</select>
						</div>
						<div className="task-modal-field">
							<label>Priority</label>
							<select
								value={form.priority}
								onChange={(e) => handleChange("priority", e.target.value)}
							>
								<option value="high">High</option>
								<option value="medium">Medium</option>
								<option value="low">Low</option>
							</select>
						</div>
					</div>
					<div className="task-modal-row">
						<div className="task-modal-field">
							<label>Assigned (comma-separated)</label>
							<input
								type="text"
								value={form.assigned}
								onChange={(e) => handleChange("assigned", e.target.value)}
								placeholder="EC, GR, HL"
							/>
						</div>
						<div className="task-modal-field">
							<label>Progress (%)</label>
							<input
								type="number"
								min={0}
								max={100}
								value={form.progress}
								onChange={(e) => handleChange("progress", e.target.value)}
							/>
						</div>
					</div>
					<div className="task-modal-row">
						<div className="task-modal-field">
							<label>Attachments</label>
							<input
								type="number"
								min={0}
								value={form.attachments}
								onChange={(e) => handleChange("attachments", e.target.value)}
							/>
						</div>
						<div className="task-modal-field">
							<label>Comments</label>
							<input
								type="number"
								min={0}
								value={form.comments}
								onChange={(e) => handleChange("comments", e.target.value)}
							/>
						</div>
					</div>
					<div className="task-modal-actions">
						<button type="button" className="btn" onClick={onClose}>
							Cancel
						</button>
						<button type="submit" className="btn btn-primary">
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

function KanbanCard({ item, isOverlay = false }) {
	const progress = item.progress ?? 0;
	const isDone = item.status === "done" || progress === 100;

	return (
		<div
			className={`kanban-card ${isOverlay ? "kanban-card-dragging" : ""}`}
			style={isOverlay ? { cursor: "grabbing", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" } : {}}
		>
			<div className="kanban-card-title">{item.title}</div>
			{item.description && (
				<div className="kanban-card-desc">{item.description}</div>
			)}
			<div className="kanban-card-footer">
				<div className="kanban-card-assignees">
					{(item.assigned || []).map((initials, i) => (
						<span key={i} className="kanban-avatar" title={initials}>
							{initials}
						</span>
					))}
				</div>
				<div className="kanban-card-progress">
					{isDone ? (
						<span className="kanban-progress-done">100%</span>
					) : (
						<span className="kanban-progress-arc" style={{ "--pct": progress }}>
							{progress}%
						</span>
					)}
				</div>
			</div>
			<div className="kanban-card-meta">
				<span className={`kanban-priority kanban-priority-${(item.priority || "medium").toLowerCase()}`}>
					{item.priority || "Medium"}
				</span>
				<div className="kanban-card-counts">
					<span className="kanban-count" title="Attachments">
						<Paperclip size={12} strokeWidth={2} />
						{item.attachments ?? 0}
					</span>
					<span className="kanban-count" title="Comments">
						<MessageCircle size={12} strokeWidth={2} />
						{item.comments ?? 0}
					</span>
				</div>
			</div>
		</div>
	);
}

function SortableKanbanCard({ item, columnId, onCardClick }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: item.id,
		data: { type: "card", item, columnId },
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	const handleClick = (e) => {
		if (!isDragging && onCardClick) {
			e.stopPropagation();
			onCardClick(item);
		}
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="kanban-card-wrapper"
			onClick={handleClick}
		>
			<KanbanCard item={item} />
		</div>
	);
}

function KanbanColumn({ column, items, onAddCard, onCardClick }) {
	const sortableIds = items.map((i) => i.id);
	const { setNodeRef, isOver } = useDroppable({
		id: `column-${column.id}`,
		data: { columnId: column.id },
	});

	return (
		<div
			ref={setNodeRef}
			className={`kanban-column ${isOver ? "kanban-column-over" : ""}`}
			data-column-id={column.id}
		>
			<div className="kanban-column-header">
				<div className="kanban-column-title-row">
					<span className="kanban-column-label">{column.label}</span>
					<span className="kanban-column-count">{items.length}</span>
				</div>
				<div className="kanban-column-actions">
					<button
						type="button"
						className="kanban-header-btn"
						aria-label="Column options"
						onClick={() => {}}
					>
						<MoreVertical size={16} strokeWidth={2} />
					</button>
					<button
						type="button"
						className="kanban-header-btn kanban-add-btn"
						aria-label="Add task"
						onClick={() => onAddCard(column.id)}
					>
						<Plus size={16} strokeWidth={2.5} />
					</button>
				</div>
			</div>
			<SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
				<div className="kanban-column-cards">
					{items.map((item) => (
						<SortableKanbanCard
							key={item.id}
							item={item}
							columnId={column.id}
							onCardClick={onCardClick}
						/>
					))}
				</div>
			</SortableContext>
		</div>
	);
}

export default function RoadmapPage() {
	const [items, setItems] = useState(roadmapItems);
	const [activeId, setActiveId] = useState(null);
	const [selectedTask, setSelectedTask] = useState(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 8 },
		})
	);

	const getItemsForColumn = useCallback(
		(status) => items.filter((i) => i.status === status),
		[items]
	);

	const handleDragStart = (event) => {
		setActiveId(event.active.id);
	};

	const getTargetColumnId = (over) => {
		if (!over) return null;
		const data = over.data.current;
		return data?.columnId ?? data?.item?.status ?? null;
	};

	const handleDragEnd = (event) => {
		const { active, over } = event;
		setActiveId(null);

		const targetColumnId = getTargetColumnId(over);
		const activeData = active.data.current;
		if (!activeData?.item || !targetColumnId) return;

		if (activeData.item.status !== targetColumnId) {
			setItems((prev) =>
				prev.map((i) =>
					i.id === active.id
						? {
								...i,
								status: targetColumnId,
								progress: targetColumnId === "done" ? 100 : targetColumnId === "backlog" ? 0 : (i.progress ?? 50),
							}
						: i
				)
			);
		}
	};


	const handleAddCard = (columnId) => {
		const newId = `r${Date.now()}`;
		const newItem = {
			id: newId,
			title: "New task",
			description: "Add a description for this task.",
			status: columnId,
			priority: "medium",
			assigned: [],
			progress: columnId === "done" ? 100 : columnId === "backlog" ? 0 : 50,
			attachments: 0,
			comments: 0,
		};
		setItems((prev) => [...prev, newItem]);
		setSelectedTask(newItem);
	};

	const handleTaskSave = (updatedItem) => {
		setItems((prev) =>
			prev.map((i) => (i.id === updatedItem.id ? updatedItem : i))
		);
	};

	const activeItem = activeId ? items.find((i) => i.id === activeId) : null;

	return (
		<div className="animate-in">
			<div className="page-header">
				<div className="page-title">Roadmap & Changelog</div>
				<div className="page-desc">Product roadmap and release notes</div>
			</div>

			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<div className="kanban-board">
					{COLUMNS.map((col) => (
						<KanbanColumn
							key={col.id}
							column={col}
							items={getItemsForColumn(col.id)}
							onAddCard={handleAddCard}
							onCardClick={setSelectedTask}
						/>
					))}
				</div>

				<DragOverlay>
					{activeItem ? <KanbanCard item={activeItem} isOverlay /> : null}
				</DragOverlay>
			</DndContext>

			{selectedTask && (
				<TaskModal
					item={selectedTask}
					onClose={() => setSelectedTask(null)}
					onSave={handleTaskSave}
				/>
			)}

			<div className="card" style={{ marginTop: 24 }}>
				<div className="card-header">
					<div className="card-title">Changelog</div>
				</div>
				{changelogEntries.map((entry, i) => (
					<div
						key={i}
						style={{
							padding: "12px 0",
							borderBottom:
								i < changelogEntries.length - 1 ? "1px solid var(--border)" : "none",
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 12,
								marginBottom: 8,
							}}
						>
							<span
								style={{
									fontFamily: "var(--font-mono)",
									fontWeight: 600,
									color: "var(--accent)",
								}}
							>
								v{entry.version}
							</span>
							<span style={{ fontSize: 11, color: "var(--text3)" }}>{entry.date}</span>
						</div>
						<ul style={{ margin: 0, paddingLeft: 20, fontSize: 12, color: "var(--text2)" }}>
							{entry.items.map((it, j) => (
								<li key={j} style={{ marginBottom: 4 }}>
									{it}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}
