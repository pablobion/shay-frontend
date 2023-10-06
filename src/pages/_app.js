import '@/styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ChakraProvider, DarkMode } from '@chakra-ui/react'
import theme from './theme'
export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
