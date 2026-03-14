"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import crmdata from "../data";
import { Avatar } from "../components/ui";

const CRMContext = createContext(null);
export function useCRM() {
	const ctx = useContext(CRMContext);
	if (!ctx) throw new Error("useCRM must be used within RealEstateLayout");
	return ctx;
}

const PAGE_TITLES = {
	dashboard: "Good morning, Sofia 👋",
	leads: "Leads",
	listings: "Listings",
	pipeline: "Pipeline",
	calendar: "Calendar",
	outreach: "Outreach",
	tasks: "Tasks",
	reports: "Reports",
	settings: "Settings",
};

const PAGE_SUB = {
	dashboard: "Here's what's happening across your pipeline today.",
	leads: "Manage and track all your leads.",
	listings: "All active, under contract, and sold properties.",
	pipeline: "Drag deals between stages to update status.",
	calendar: "Showings, open houses, and key appointments.",
	outreach: "Email templates and automated sequences.",
	tasks: "Everything on your plate, organised by due date.",
	reports: "Performance analytics and revenue breakdown.",
	settings: "Agency profile, agents, integrations, and billing.",
};

export default function RealEstateLayout({ children }) {
	const { NAV_MAIN, NAV_BOTTOM, agents, themes, tasks } = crmdata;
	const router = useRouter();
	const [mounted, setMounted] = useState(false);
	const [darkMode, setDarkMode] = useState(true);
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [notifOpen, setNotifOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [taskList, setTaskList] = useState(tasks);

	const path = router.asPath || "";
	const activePage = path.replace("/", "") || "dashboard";
	const title = PAGE_TITLES[activePage] || activePage;
	const sub = PAGE_SUB[activePage] || "";
	const t = themes[darkMode ? "dark" : "light"];
	const contextValue = { t, darkMode, setDarkMode, taskList, setTaskList };

	useEffect(() => {
		setMounted(true);
		const stored =
			typeof window !== "undefined" && localStorage.getItem("crm-theme");
		if (stored) setDarkMode(stored === "dark");
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;
		document.documentElement.setAttribute(
			"data-theme",
			darkMode ? "dark" : "light",
		);
		localStorage.setItem("crm-theme", darkMode ? "dark" : "light");
	}, [darkMode]);

	useEffect(() => {
		const mq =
			typeof window !== "undefined" && window.matchMedia("(max-width: 768px)");
		if (!mq) return;
		const handler = () => {
			setIsMobile(mq.matches);
			if (mq.matches) setSidebarOpen(false);
		};
		handler();
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	const handleNavClick = (id) => {
		router.push(id === "dashboard" ? "/" : `/${id}`);
		if (isMobile) setSidebarOpen(false);
	};

	const isActive = (id) =>
		activePage === id ||
		(id === "dashboard" && (activePage === "" || activePage === "index"));

	const navItems = [...NAV_MAIN, ...NAV_BOTTOM];

	if (!mounted) {
		return (
			<CRMContext.Provider value={contextValue}>
				<div
					style={{
						minHeight: "100vh",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						background: "#09090b",
						color: "#f0efe8",
						fontFamily: "'Plus Jakarta Sans', sans-serif",
					}}
				>
					Loading…
				</div>
			</CRMContext.Provider>
		);
	}

	return (
		<CRMContext.Provider value={contextValue}>
			<div
				className="crm-app"
				style={{
					fontFamily: "'Plus Jakarta Sans', 'Helvetica Neue', sans-serif",
					background: t.bg,
					color: t.text,
					minHeight: "100vh",
					height: "100vh",
					display: "flex",
					flexDirection: "row",
					overflow: "hidden",
					transition: "background 0.3s, color 0.3s",
				}}
				suppressHydrationWarning
			>
				<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&display=swap');
				*{box-sizing:border-box;margin:0;padding:0;}
				::-webkit-scrollbar{width:4px;height:4px;}
				::-webkit-scrollbar-thumb{background:${t.surfaceB};border-radius:4px;}
				.crm-ni{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:9px;font-size:13px;font-weight:500;cursor:pointer;transition:all 0.15s;white-space:nowrap;overflow:hidden;color:${t.textSub};user-select:none;}
				.crm-ni:hover{background:${t.surfaceAlt};color:${t.text};}
				.crm-ni.act{background:${t.accentDim};color:${t.accent};font-weight:700;}
				.crm-tbtn{width:34px;height:34px;border-radius:9px;background:transparent;border:1px solid ${t.border};display:flex;align-items:center;justify-content:center;cursor:pointer;color:${t.textSub};font-size:15px;transition:all 0.15s;}
				.crm-tbtn:hover{background:${t.surfaceAlt};color:${t.text};}
				.crm-srch{background:${t.surfaceAlt};border:1px solid ${t.border};border-radius:9px;padding:7px 12px 7px 32px;font-size:13px;color:${t.text};outline:none;width:220px;transition:all 0.2s;font-family:inherit;}
				.crm-srch:focus{border-color:${t.accent};width:260px;background:${t.surface};}
				.crm-srch::placeholder{color:${t.textMuted};}
				.crm-badge{min-width:18px;height:18px;border-radius:9px;background:${t.red};color:#fff;font-size:10px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;padding:0 5px;margin-left:auto;flex-shrink:0;}
				.crm-pe{animation:crmFu 0.22s ease both;}
				@keyframes crmFu{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
				select option{background:${t.surface};color:${t.text};}
				.crm-rh:hover{background:${t.surfaceAlt}!important;}
				@media (max-width: 768px) {
					.crm-sidebar{position:fixed;top:0;left:0;bottom:0;z-index:100;transform:translateX(-100%);transition:transform 0.25s ease, box-shadow 0.25s ease;}
					.crm-sidebar.crm-sidebar-open{transform:translateX(0);box-shadow:8px 0 24px rgba(0,0,0,0.3);}
					.crm-sidebar-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:99;opacity:0;pointer-events:none;transition:opacity 0.2s ease;}
					.crm-sidebar-overlay.crm-sidebar-overlay-visible{opacity:1;pointer-events:auto;}
					.crm-sidebar{width:228px!important;min-width:228px!important;}
				}
			`}</style>

				{isMobile && (
					<div
						className={`crm-sidebar-overlay ${sidebarOpen ? "crm-sidebar-overlay-visible" : ""}`}
						onClick={() => setSidebarOpen(false)}
						aria-hidden="true"
					/>
				)}

				<aside
					className={`crm-sidebar ${sidebarOpen ? "crm-sidebar-open" : ""}`}
					style={{
						width: isMobile ? 228 : sidebarCollapsed ? 64 : 228,
						minWidth: isMobile ? 228 : sidebarCollapsed ? 64 : 228,
						background: t.surface,
						borderRight: `1px solid ${t.border}`,
						display: "flex",
						flexDirection: "column",
						padding: "18px 10px",
						flexShrink: 0,
						transition: "width 0.22s ease",
						overflow: "hidden",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							paddingLeft: 4,
							marginBottom: 26,
						}}
					>
						{!sidebarCollapsed && !isMobile && (
							<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
								<div
									style={{
										width: 34,
										height: 34,
										borderRadius: 10,
										background: `linear-gradient(135deg,${t.accent} 0%,#8a6020 100%)`,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: 18,
										flexShrink: 0,
									}}
								>
									⌂
								</div>
								<div>
									<div
										style={{
											fontSize: 15,
											fontWeight: 800,
											letterSpacing: -0.4,
											color: t.text,
											lineHeight: 1.2,
										}}
									>
										EstateOS
									</div>
									<div style={{ fontSize: 10, color: t.textMuted }}>
										Real Estate CRM
									</div>
								</div>
							</div>
						)}
						{(sidebarCollapsed || isMobile) && (
							<div
								style={{
									width: 34,
									height: 34,
									borderRadius: 10,
									background: `linear-gradient(135deg,${t.accent},#8a6020)`,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: 18,
									margin: isMobile ? "0 auto" : "0",
								}}
							>
								⌂
							</div>
						)}
						{!sidebarCollapsed && !isMobile && (
							<button
								onClick={() => setSidebarCollapsed(true)}
								style={{
									width: 24,
									height: 24,
									borderRadius: 6,
									background: t.surfaceB,
									border: `1px solid ${t.border}`,
									cursor: "pointer",
									color: t.textSub,
									fontSize: 11,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexShrink: 0,
								}}
							>
								‹
							</button>
						)}
					</div>
					{sidebarCollapsed && !isMobile && (
						<button
							onClick={() => setSidebarCollapsed(false)}
							style={{
								width: 32,
								height: 32,
								borderRadius: 8,
								background: t.surfaceB,
								border: `1px solid ${t.border}`,
								cursor: "pointer",
								color: t.textSub,
								fontSize: 12,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								margin: "0 auto 18px",
							}}
						>
							›
						</button>
					)}

					{(!sidebarCollapsed || isMobile) && (
						<>
							<div
								style={{
									fontSize: 10,
									fontWeight: 700,
									color: t.textMuted,
									letterSpacing: 1.2,
									paddingLeft: 6,
									marginBottom: 8,
								}}
							>
								MAIN
							</div>
							{NAV_MAIN.map((item) => (
								<div
									key={item.id}
									className={`crm-ni ${isActive(item.id) ? " act" : ""}`}
									onClick={() => handleNavClick(item.id)}
									title={sidebarCollapsed && !isMobile ? item.label : undefined}
									style={{
										justifyContent:
											sidebarCollapsed && !isMobile ? "center" : "flex-start",
										padding:
											sidebarCollapsed && !isMobile ? "10px" : "9px 12px",
									}}
								>
									<span
										style={{
											fontSize: 16,
											width: 20,
											textAlign: "center",
											flexShrink: 0,
											fontFamily: "monospace",
										}}
									>
										{item.icon}
									</span>
									{(!sidebarCollapsed || isMobile) && (
										<>
											<span style={{ flex: 1 }}>{item.label}</span>
											{item.badge && (
												<span className="crm-badge">{item.badge}</span>
											)}
										</>
									)}
								</div>
							))}

							<div
								style={{
									fontSize: 10,
									fontWeight: 700,
									color: t.textMuted,
									letterSpacing: 1.2,
									paddingLeft: 6,
									marginTop: 20,
									marginBottom: 8,
								}}
							>
								AGENTS
							</div>
							{agents.map((a) => (
								<div key={a.code} className="crm-ni" style={{ gap: 8 }}>
									<Avatar
										code={a.code}
										color={
											a.code === "SR"
												? "#c8a96e"
												: a.code === "JM"
													? "#60a5fa"
													: a.code === "KL"
														? "#4ade80"
														: "#a78bfa"
										}
										size={26}
									/>
									<div style={{ flex: 1, minWidth: 0 }}>
										<div
											style={{
												fontSize: 12,
												fontWeight: 600,
												color: t.text,
												overflow: "hidden",
												textOverflow: "ellipsis",
												whiteSpace: "nowrap",
											}}
										>
											{a.name}
										</div>
										<div style={{ fontSize: 10, color: t.textMuted }}>
											{a.volume}
										</div>
									</div>
								</div>
							))}
						</>
					)}

					<div style={{ marginTop: "auto" }}>
						{(!sidebarCollapsed || isMobile) && (
							<div
								style={{
									background: t.surfaceAlt,
									borderRadius: 11,
									padding: "12px 14px",
									marginBottom: 10,
								}}
							>
								<div
									style={{
										fontSize: 11,
										color: t.accent,
										fontWeight: 700,
										marginBottom: 4,
									}}
								>
									Q1 Target
								</div>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "flex-end",
										marginBottom: 6,
									}}
								>
									<span
										style={{ fontSize: 20, fontWeight: 800, color: t.text }}
									>
										51%
									</span>
									<span style={{ fontSize: 11, color: t.textSub }}>
										$14.2M / $28M
									</span>
								</div>
								<div
									style={{ height: 5, borderRadius: 3, background: t.surfaceB }}
								>
									<div
										style={{
											height: "100%",
											width: "51%",
											borderRadius: 3,
											background: `linear-gradient(90deg,${t.accent},#a07830)`,
										}}
									/>
								</div>
							</div>
						)}
						{NAV_BOTTOM.map((item) => (
							<div
								key={item.id}
								className={`crm-ni ${isActive(item.id) ? " act" : ""}`}
								onClick={() => handleNavClick(item.id)}
								style={{
									justifyContent:
										sidebarCollapsed && !isMobile ? "center" : "flex-start",
									padding: sidebarCollapsed && !isMobile ? "10px" : "9px 12px",
								}}
							>
								<span
									style={{
										fontSize: 16,
										width: 20,
										textAlign: "center",
										flexShrink: 0,
										fontFamily: "monospace",
									}}
								>
									{item.icon}
								</span>
								{(!sidebarCollapsed || isMobile) && <span>Settings</span>}
							</div>
						))}
						<button
							onClick={() => setDarkMode(!darkMode)}
							style={{
								width: "100%",
								padding: sidebarCollapsed && !isMobile ? "10px" : "8px 12px",
								borderRadius: 9,
								border: `1px solid ${t.border}`,
								background: "transparent",
								color: t.textSub,
								fontSize: 12,
								cursor: "pointer",
								fontFamily: "inherit",
								fontWeight: 500,
								display: "flex",
								alignItems: "center",
								gap: 8,
								marginTop: 6,
								justifyContent:
									sidebarCollapsed && !isMobile ? "center" : "flex-start",
							}}
						>
							<span style={{ fontSize: 14 }}>{darkMode ? "☀️" : "🌙"}</span>
							{(!sidebarCollapsed || isMobile) && (
								<span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
							)}
						</button>
					</div>
				</aside>

				<div
					style={{
						flex: 1,
						display: "flex",
						flexDirection: "column",
						overflow: "hidden",
						minWidth: 0,
					}}
				>
					<header
						style={{
							height: 58,
							background: t.surface,
							borderBottom: `1px solid ${t.border}`,
							display: "flex",
							alignItems: "center",
							padding: "0 24px",
							gap: 14,
							flexShrink: 0,
							flexWrap: "wrap",
						}}
					>
						{isMobile && (
							<button
								onClick={() => setSidebarOpen(true)}
								className="crm-tbtn"
								style={{ flexShrink: 0 }}
								aria-label="Open menu"
							>
								≡
							</button>
						)}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								flex: 1,
								minWidth: 0,
							}}
						>
							<span style={{ fontSize: 12, color: t.textMuted }}>EstateOS</span>
							<span
								style={{ color: t.textMuted, margin: "0 6px", fontSize: 12 }}
							>
								›
							</span>
							<span
								style={{
									fontSize: 12,
									fontWeight: 600,
									color: t.text,
									textTransform: "capitalize",
								}}
							>
								{activePage}
							</span>
						</div>
						<div style={{ position: "relative" }}>
							<span
								style={{
									position: "absolute",
									left: 10,
									top: "50%",
									transform: "translateY(-50%)",
									fontSize: 13,
									color: t.textMuted,
								}}
							>
								🔍
							</span>
							<input
								className="crm-srch"
								placeholder="Search leads, listings..."
							/>
						</div>
						<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
							<div style={{ position: "relative" }}>
								<div
									className="crm-tbtn"
									onClick={() => setNotifOpen(!notifOpen)}
								>
									🔔
								</div>
								<div
									style={{
										position: "absolute",
										top: 6,
										right: 6,
										width: 7,
										height: 7,
										borderRadius: "50%",
										background: t.red,
										border: `2px solid ${t.surface}`,
									}}
								/>
								{notifOpen && (
									<div
										style={{
											position: "absolute",
											right: 0,
											top: 42,
											width: 300,
											maxWidth: "90vw",
											background: t.surface,
											border: `1px solid ${t.border}`,
											borderRadius: 14,
											padding: 16,
											zIndex: 200,
											boxShadow: t.shadowLg,
										}}
									>
										<div
											style={{
												fontSize: 13,
												fontWeight: 700,
												marginBottom: 12,
											}}
										>
											Notifications
										</div>
										{[
											{
												text: "Dev Patel offer expires in 2 days",
												time: "Now",
												dot: t.red,
											},
											{
												text: "Marcus Webb — no follow-up in 5d",
												time: "1h ago",
												dot: t.amber,
											},
											{
												text: "2847 Lakeview showing confirmed",
												time: "2h ago",
												dot: t.green,
											},
										].map((n, i) => (
											<div
												key={i}
												style={{
													display: "flex",
													gap: 10,
													padding: "8px 0",
													borderBottom:
														i < 2 ? `1px solid ${t.border}` : "none",
													alignItems: "flex-start",
												}}
											>
												<div
													style={{
														width: 8,
														height: 8,
														borderRadius: "50%",
														background: n.dot,
														flexShrink: 0,
														marginTop: 4,
													}}
												/>
												<div style={{ flex: 1 }}>
													<div
														style={{
															fontSize: 12,
															color: t.text,
															fontWeight: 500,
														}}
													>
														{n.text}
													</div>
													<div
														style={{
															fontSize: 11,
															color: t.textMuted,
															marginTop: 2,
														}}
													>
														{n.time}
													</div>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
							<div className="crm-tbtn">⚙</div>
							<div
								style={{
									width: 34,
									height: 34,
									borderRadius: 9,
									background: t.accentDim,
									color: t.accent,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: 13,
									fontWeight: 800,
									cursor: "pointer",
									border: `1px solid ${t.border}`,
								}}
							>
								SR
							</div>
						</div>
					</header>

					<main
						style={{
							flex: 1,
							overflow: "auto",
							padding: "26px 28px",
							background: t.bgSubtle,
						}}
						onClick={() => notifOpen && setNotifOpen(false)}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "flex-start",
								marginBottom: 22,
								flexWrap: "wrap",
								gap: 12,
							}}
						>
							<div>
								<h1
									style={{
										fontSize: 22,
										fontWeight: 800,
										letterSpacing: -0.5,
										color: t.text,
									}}
								>
									{title}
								</h1>
								<p style={{ fontSize: 13, color: t.textSub, marginTop: 3 }}>
									{sub}
								</p>
							</div>
							<div style={{ display: "flex", gap: 8 }}>
								{activePage === "dashboard" && (
									<>
										<button
											style={{
												padding: "9px 16px",
												borderRadius: 9,
												background: t.surfaceAlt,
												border: `1px solid ${t.border}`,
												color: t.textSub,
												fontSize: 13,
												fontWeight: 600,
												cursor: "pointer",
												fontFamily: "inherit",
											}}
										>
											Export CSV
										</button>
										<button
											style={{
												padding: "9px 18px",
												borderRadius: 9,
												background: t.accent,
												color: t.bg,
												border: "none",
												fontSize: 13,
												fontWeight: 700,
												cursor: "pointer",
												fontFamily: "inherit",
											}}
										>
											+ New Lead
										</button>
									</>
								)}
								{activePage === "reports" && (
									<button
										style={{
											padding: "9px 16px",
											borderRadius: 9,
											background: t.accent,
											color: t.bg,
											border: "none",
											fontSize: 13,
											fontWeight: 700,
											cursor: "pointer",
											fontFamily: "inherit",
										}}
									>
										Export PDF
									</button>
								)}
							</div>
						</div>
						<div className="crm-pe" key={activePage}>
							{children}
						</div>
					</main>
				</div>
			</div>
		</CRMContext.Provider>
	);
}
