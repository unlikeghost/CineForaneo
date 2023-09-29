import Head from "next/head";
import "@/styles/app.css";

function MyApp({ Component, pageProps }) {

	return(
		<>
			<Head>
				<title> Ingecine | Viernes de Blockbusters</title>
			</Head>

			<Component {...pageProps} />
		</>
	);
}

export default MyApp;