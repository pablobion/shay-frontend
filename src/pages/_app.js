import "@/styles/globals.css";
import "regenerator-runtime/runtime";
import { ChakraProvider, DarkMode } from "@chakra-ui/react";
import theme from "./theme";
import WithAction from "../components/sidebar/menuzao";
import { ContextProvider } from "../context/context";

export default function App({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <ContextProvider>
                <WithAction>
                    <Component {...pageProps} />
                </WithAction>
            </ContextProvider>
        </ChakraProvider>
    );
}
