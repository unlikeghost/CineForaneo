import Head from "next/head";
import "@/styles/App.css";
import { ChakraProvider } from '@chakra-ui/react'


function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page);

	return getLayout(
		<>
			<Head>
				<title> Ingecine | Viernes de Blockbusters</title>
			</Head>
			<ChakraProvider cssVarsRoot='#app'>
				<title> Ingecine | Viernes de </title>
				<Component {...pageProps} />
			</ChakraProvider>
		</>
	);
}

export default MyApp;