import { useState, useEffect } from "react";
import { Box, Button, useColorModeValue } from "@chakra-ui/react";

export default function (props) {

    const [timer, setTimer] = useState(0); // Estado para armazenar o valor do timer
    const [isTimerRunning, setIsTimerRunning] = useState(false);


    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60)
            .toString()
            .padStart(2, "0");
        const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    // Função para começar o timer
    const startTimer = () => {
        setIsTimerRunning(true);
    };

    useEffect(() => {
        // Atualiza o timer a cada segundo, se o timer estiver em execução
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }


        return () => {
            clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
        };
    }, [isTimerRunning]);

    return (
        <Box align="center" p={5} spacing={4} flex={1} borderRadius="xl" bg={useColorModeValue("gray.100", "gray.700")}>
            <Box>
                <Button w={130} colorScheme={isTimerRunning ? "teal" : "gray"}>
                    {formatTime(timer)}
                </Button>
            </Box>
            <Button colorScheme="blue" onClick={startTimer} isDisabled={isTimerRunning}>
                Começar
            </Button>
        </Box>
    );
}
