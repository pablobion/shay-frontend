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
} from "@chakra-ui/react";

import AutoComplete from "../../../components/ui/autoComplete";
const steps = [
    { title: "Checklist", description: "Escolha de checklist" },
    { title: "Tempo", description: "Definição de tempo" },
    { title: "Finalização", description: "Começar Checklist" },
];

import { baseUrl } from "../../../config/baseInfos";

import {myContext} from '../../../context/context'
import io from 'socket.io-client';

import Table from "../../../components/ui/table";

function Example() {
    const { activeStep, goToNext, goToPrevious } = useSteps({
        index: 0,
        count: steps.length,
    });

    const connectToSocket = () => {}

    const socket = io(`${baseUrl}`, {
        withCredentials: true, // Permite compartilhar cookies/credenciais com o servidor
      });

    const {currentChecklist, setSocket} = myContext();
    const router = useRouter();
    const toast = useToast();
    const data = router.query;



    useEffect(() => {
        socket.on('connect', () => {
            console.log('Conectado ao servidor Socket.io');

            socket.on('create_room:response', () =>{
                console.log('Sala cheia')
            })
        });
      
        if (!currentChecklist.type) {
            setTimeout(() => {
                router.push({
                    pathname: "/clinicCase/listall",
                });
            }, 3000);
            toast({
                title: ":(",
                description: "Não foi possivel carregar os dados, vamos te redirecionar",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        console.log(currentChecklist)


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
        goToPrevious();
    };

    const step0 = () => {
        return (
            <Flex align='center' gap={3} direction='column'>
                {/* <Table data={dataTable}/> */}
                <Flex gap={10}>

                <Button colorScheme='teal'>{currentChecklist.type}</Button>
                <Heading color='teal.300'>{currentChecklist.name}</Heading>
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

    const joinRoom = () => {
        console.log('oie')
    
          socket.emit("create_room", (answer) => {
            // ...
          });
    }

    const step2 = () => {

    
        return (
            <Flex direction="column" gap={10} align='center'>
                <Heading>seila</Heading>
                
                <Button onClick={joinRoom} size="lg">
                    <Text>Criar Sala</Text>
                </Button>
                
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
                <Button onClick={handlePrev} disabled={activeStep === 0} mr={10}>
                    Voltar
                </Button>
                {activeStep < steps.length - 1 ? (
                    <Button onClick={handleNext} colorScheme="blue">
                        Avançar
                    </Button>
                ) : (
                    <Button onClick={() => router.push("/clinicCase/show")}>Concluir</Button>
                )}
            </Box>
        </Box>
    );
}

export default Example;
