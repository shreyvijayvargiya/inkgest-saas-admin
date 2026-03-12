import React from "react";
import RealEstateLayout from "../app/admin/RealEstateLayout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
	return (
		<RealEstateLayout>
			<Component {...pageProps} />
		</RealEstateLayout>
	);
}
