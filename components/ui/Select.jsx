export function Select({ t, options, name, value, onChange, ...rest }) {
	return (
		<select
			name={name}
			value={value}
			onChange={onChange}
			{...rest}
			style={{
				width: "100%",
				padding: "8px 12px",
				borderRadius: 6,
				border: `1px solid ${t.border}`,
				background: t.surfaceAlt,
				color: t.text,
				fontSize: 13,
				outline: "none",
				fontFamily: "inherit",
			}}
		>
			{options.map((o) => (
				<option key={o} value={o}>{o}</option>
			))}
		</select>
	);
}
