export function Input({ t, placeholder, type = "text", defaultValue, value, onChange, name, ...rest }) {
	return (
		<input
			name={name}
			type={type}
			placeholder={placeholder}
			defaultValue={defaultValue}
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
		/>
	);
}
