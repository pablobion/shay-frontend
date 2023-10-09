import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Text,
    Flex,
    Heading,
    Divider,
    Tooltip,
    useColorModeValue,
    useToast,
    VStack, // Adicione VStack para criar uma coluna menor
} from "@chakra-ui/react";

import {MdOutlineContentCopy} from 'react-icons/md'

import { useRouter } from "next/router"; // Importe o useRouter do Next.js

import { baseUrl } from "../../../config/baseInfos";

function ChecklistViewScreen() {
    const toast = useToast()
    const router = useRouter(); // Use o useRouter para obter o ID da rota
    const { id } = router.query; // Obtenha o ID do checklist da rota
    const [checklistData, setChecklistData] = useState(null);
    const [timer, setTimer] = useState(0); // Estado para armazenar o valor do timer
    const [isTimerRunning, setIsTimerRunning] = useState(false); // Estado para controlar se o timer está em execução

    // Função para formatar o tempo como "00:00"
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
        // Verifique se o ID é válido antes de buscar os dados do checklist
        if (id) {
            // Aqui, você pode buscar os dados do checklist com base no ID usando uma solicitação HTTP (por exemplo, fetch).
            // Substitua esta lógica com sua própria implementação.
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        `${baseUrl}/getChecklist/${id}`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setChecklistData(data); // Atualize o estado com os dados do checklist.
                    } else {
                        console.error("Erro ao buscar dados do checklist.");
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados do checklist:", error);
                }
            };

            fetchData();
        }
    }, [id]);

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

    const handleCopy = (text) => {
      toast({
        title: 'Copiado!',
        description: "O código foi copiado para a área de transferência.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })


      navigator.clipboard.writeText(text)

    }

    return (
        <Flex p={4}>
            <Box flex={1} w="70vw">
                <Flex
                    mb={5}
                    bg={useColorModeValue("gray.100", "gray.700")}
                    borderRadius="lg"
                    p={3}
                    w="70vw"
                    align="center"
                >
                    <Heading
                        color={useColorModeValue("teal.800", "white")}
                        fontSize="3xl"
                    >
                        blablalkalsaklassasaasassas
                    </Heading>
                    <Flex justify='end' w='100%'>
                    <Tooltip label='Clique para copiar'>

                        <Button gap={3} colorScheme='yellow' onClick={() => handleCopy('teste copiando')}><MdOutlineContentCopy/>asahah</Button>
                    </Tooltip>
                    </Flex>
                </Flex>
                {checklistData ? (
                    <>
                        <Text>Tipo: {checklistData.type}</Text>
                        <Text>Nome do Tema: {checklistData.name}</Text>
                        <Text>
                            Definição do Tema: {checklistData.description}
                        </Text>

                        {/* Aqui você pode exibir outras informações do checklist, como cenário, roteiro, tarefas, anexos, etc. */}
                        {/* Lembre-se de que esta é uma página de visualização, então você só exibirá os dados, não os editará. */}
                    </>
                ) : (
                    <Text>Carregando dados do checklist...</Text>
                )}
            </Box>
            <VStack
                align="center"
                ml={10}
                p={5}
                spacing={4}
                flex={1}
                borderRadius="xl"
                bg={useColorModeValue("gray.100", "gray.700")}
            >
                <Box>
                    <Button w={130} colorScheme={isTimerRunning ? 'teal' : 'gray'}>
                        {formatTime(timer)}
                    </Button>
                </Box>
                <Button
                    colorScheme="blue"
                    onClick={startTimer}
                    isDisabled={isTimerRunning}
                >
                    Começar
                </Button>
            </VStack>
        </Flex>
    );
}

export default ChecklistViewScreen;
