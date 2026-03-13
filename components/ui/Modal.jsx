export function Modal({ show, t, title, onClose, children, width = 480 }) {
	return (
		<>
			{show ? (
				<div
					className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm"
					onClick={onClose}
				>
					<div
						style={{
							background: t.surface,
							border: `1px solid ${t.borderB}`,
							borderRadius: 10,
							padding: 28,
							width,
							maxHeight: "85vh",
							overflowY: "auto",
						}}
						onClick={(e) => e.stopPropagation()}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: 22,
							}}
						>
							<span
								style={{
									fontSize: 15,
									fontWeight: 700,
									color: t.text,
									letterSpacing: -0.3,
								}}
							>
								{title}
							</span>
							<button
								onClick={onClose}
								style={{
									width: 28,
									height: 28,
									borderRadius: 6,
									border: `1px solid ${t.border}`,
									background: t.surfaceAlt,
									color: t.textSub,
									cursor: "pointer",
									fontSize: 14,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								×
							</button>
						</div>
						{children}
					</div>
				</div>
			) : null}
		</>
	);
}
