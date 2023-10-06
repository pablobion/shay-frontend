// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
    styles: {
        global: {
            "button": {
                bg: "blue.500", // Define a cor de fundo padrão para todos os botões
            },
            "input": {
                bg: "gray.200", // Define a cor de fundo padrão para todos os inputs
            },
        },
    },
}

// 3. extend the theme
const theme = extendTheme({ config })

export default theme