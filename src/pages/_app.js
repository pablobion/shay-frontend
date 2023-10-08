import '@/styles/globals.css'
import { ChakraProvider, DarkMode } from '@chakra-ui/react'
import theme from './theme'
import WithAction from '../components/sidebar/menuzao'


export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <WithAction>

        <Component {...pageProps} />
      </WithAction>
     
  
    </ChakraProvider>
  );
}
