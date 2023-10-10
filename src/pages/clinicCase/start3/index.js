import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
    Box,
    Button,
    Text,
    Textarea,
    Input,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,
    Heading,
    useToast,
    useColorModeValue,
    useSteps,
    Stepper,
    Step,
    StepIndicator,
    StepStatus,
    StepIcon,
    StepNumber,
    StepTitle,
    StepDescription,
    StepSeparator,
    Spinner,
} from "@chakra-ui/react";

import AutoComplete from "../../../components/ui/autoComplete";
const steps = [
    { title: "Checklist", description: "Escolha de checklist" },
    { title: "Tempo", description: "Definição de tempo" },
    { title: "Finalização", description: "Começar Checklist" },
];

import { baseUrl } from "../../../config/baseInfos";

import { myContext } from "../../../context/context";
import io from "socket.io-client";

import Table from "../../../components/ui/table";

function Example() {
    const [loading, setLoading] = useState(false);
    const { activeStep, goToNext, goToPrevious } = useSteps({
        index: 0,
        count: steps.length,
    });
    const { currentChecklist, setSocket, socket } = myContext();

    const connectToSocket = async () => {
        // const newSocket = io(`${baseUrl}`, {
        //     withCredentials: true, // Permite compartilhar cookies/credenciais com o servidor
        // });
        // setSocket(newSocket);
        // console.log(1);
        socket.on("connect", () => {
            console.log("Conectado ao servidor Socket.io");
        });

        socket.on("create_room:response", (response) => {
            if (response.status === "success") {
                console.log("oie");
                setLoading(true);
                setTimeout(() => {
                    router.push({
                        pathname: "/clinicCase/show",
                    });
                }, 3000);
            }
        });
    };

    const router = useRouter();
    const toast = useToast();
    const data = router.query;

    useEffect(() => {
        connectToSocket();
    }, []);

    useEffect(() => {
        if (!currentChecklist.type) {
            router.push({
                pathname: "/clinicCase/listall",
            });
        }
        console.log(currentChecklist);
    }, []);

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            goToNext();
        } else {
            // Lógica adicional que você deseja executar quando todas as etapas forem concluídas.
            // Por exemplo, mostrar uma mensagem de sucesso ou fazer uma ação final.
            console.log("Todas as etapas foram concluídas!");
        }
    };

    const handlePrev = () => {
        if (loading) {
            toast({
                title: ":(",
                description: "Estamos criando a sala, não é possivel voltar.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        goToPrevious();
    };

    const step0 = () => {
        return (
            <Flex align="center" gap={3} direction="column">
                {/* <Table data={dataTable}/> */}
                <Flex gap={10}>
                    <Button colorScheme="teal">{currentChecklist.type}</Button>
                    <Heading color="teal.300">{currentChecklist.name}</Heading>
                </Flex>
                <Text>{currentChecklist.description}</Text>
            </Flex>
        );
    };
    const step1 = () => {
        return (
            <Box>
                <Text>Defina a quantidade de tempo</Text>
                <Select placeholder="Selecione o tempo">
                    <option value="10">10 minutos</option>
                    <option value="5">5 minutos</option>
                    <option value="3">3 minutos</option>
                </Select>
            </Box>
        );
    };

    const createRoom = () => {
        socket.emit("create_room", (response) => {});
    };

    const step2 = () => {
        return (
            <Flex direction="column" gap={10} align="center">
                {loading ? (
                    <>
                        <Heading size="sm" mt={10}>
                            Estamos criando a sala para você, assim que estiver pronta você será redirecionado(a)
                        </Heading>
                        <Spinner hickness="1px" speed="0.65s" emptyColor="gray.200" size="xl" color="teal" />
                    </>
                ) : (
                    <>
                        <Button mt={20} colorScheme="teal" onClick={createRoom} size="lg">
                            <Text>Criar Sala</Text>
                        </Button>
                    </>
                )}
            </Flex>
        );
    };

    return (
        <Box>
            <Stepper index={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                        </StepIndicator>

                        <Box flexShrink="0">
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>{step.description}</StepDescription>
                        </Box>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
            <Box h="300" mt={5}>
                {activeStep === 0 && step0()}
                {activeStep === 1 && step1()}
                {activeStep === 2 && step2()}
            </Box>
            <Box mt={4} align="end">
                <Button onClick={handlePrev} disabled={activeStep === 0} mr={10} colorScheme={loading ? "gray.600" : "gray"}>
                    Voltar
                </Button>
                {activeStep < steps.length - 1 ? (
                    <Button onClick={handleNext} colorScheme="blue">
                        Avançar
                    </Button>
                ) : (
                    <Button onClick={createRoom} colorScheme={loading ? "gray.600" : "blue"}>
                        Criar Sala
                    </Button>
                )}
            </Box>
        </Box>
    );
}

export default Example;
