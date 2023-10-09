import React, { useState } from "react";
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

function Example() {

    const router = useRouter();
    return (
        <Box h='60vh' direction='column' align='center'>
            <Box mb={400}>
            <AutoComplete/>
            </Box>
            <Button size='lg' colorScheme='teal' onClick={() => router.push("/clinicCase/show")}>Começar 🚀</Button>
        </Box>
    );
}

export default Example;
