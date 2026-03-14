import React from "react";
import RealEstateLayout from "../app/RealEstateLayout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
	return (
		<RealEstateLayout>
			<Component {...pageProps} />
		</RealEstateLayout>
	);
}
