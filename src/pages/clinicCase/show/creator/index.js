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
    VStack,
    Spinner, // Adicione VStack para criar uma coluna menor
} from "@chakra-ui/react";

import { MdOutlineContentCopy } from "react-icons/md";

import { useRouter } from "next/router"; // Importe o useRouter do Next.js

import { baseUrl } from "../../../../config/baseInfos";

import { myContext } from "../../../../context/context";

import TimeComponent from "../components/timer";
import UsersStatus from "../components/usersStatus";
import RoomIdComponent from "../components/roomid";
import AttachsComponent from "../components/attachs";

function ChecklistViewScreen() {
    const toast = useToast();
    const router = useRouter(); // Use o useRouter para obter o ID da rota
    const { roomId } = router.query; // Obtenha o ID do checklist da rota
    const [checklistData, setChecklistData] = useState(null);

    const [roomIdState, setRoomIdState] = useState("");
    const [visiterJoinedRoom, setVisiterJoinedRoom] = useState(false);

    const { socket, currentChecklist } = myContext();

    useEffect(() => {
        setRoomIdState(roomId);

        socket.on("visiterJoinedRoom", (response) => {
            console.log("chegou visitante");
            setVisiterJoinedRoom(true);
        });
    }, []);

    return (
        <Flex>
            <Box w="85%" flex={1}>
                <Flex mb={2} bg={useColorModeValue("teal.400", "teal.400")} borderRadius="lg" p={5} w="100%" align="center" justify="center" h="90px">
                    <Heading color="white" fontSize="xl">
                        <Flex align="center">
                            <Text bg={useColorModeValue("teal.300", "teal.300")} borderRadius={10} p={2}>
                                {currentChecklist.type}
                            </Text>
                            <Divider orientation="vertical" mx={2} />
                            <Text>{currentChecklist.name}</Text>
                        </Flex>
                    </Heading>
                    <RoomIdComponent roomIdState={roomIdState} />
                </Flex>
                {currentChecklist ? (
                    <>
                        <Box mb={2} bg={useColorModeValue("gray.100", "gray.700")} borderRadius="lg" p={5} w="100%">
                            <Heading color={useColorModeValue("teal.700", "white")} fontSize="2xl">
                                <Text>Cenário</Text>
                            </Heading>
                            <Text>{currentChecklist.roadmap}</Text>
                        </Box>
                        <Box mb={2} bg={useColorModeValue("gray.100", "gray.700")} borderRadius="lg" p={5} w="100%">
                            <Heading color={useColorModeValue("teal.700", "white")} fontSize="2xl">
                                <Text>Roteiro</Text>
                            </Heading>
                            <Text>{currentChecklist.roadmap}</Text>
                        </Box>
                        <Box mb={2} bg={useColorModeValue("gray.100", "gray.700")} borderRadius="lg" p={5} w="100%">
                            <Heading color={useColorModeValue("teal.700", "white")} fontSize="2xl">
                                <Text>Tarefas</Text>
                            </Heading>
                            <Text>{currentChecklist.roadmap}</Text>
                        </Box>
                        <Box mb={2} bg={useColorModeValue("gray.100", "gray.700")} borderRadius="lg" p={5} w="100%">
                            <Heading color={useColorModeValue("teal.700", "white")} fontSize="2xl">
                                <Text>Impressos</Text>
                            </Heading>
                            <Box mt={5} borderRadius={10}>
                                {currentChecklist.attachs &&
                                    (currentChecklist?.attachs).map((attach, index) => (
                                        <Box bg={useColorModeValue("gray.300", "gray.600")} borderRadius={10}>
                                            <AttachsComponent items={currentChecklist.attachs} />
                                        </Box>
                                    ))}
                            </Box>
                        </Box>
                        <Box borderBottom={5} borderWidth={2} my={5} />
                        <Box mb={2} bg={useColorModeValue("gray.100", "gray.700")} borderRadius="lg" p={5} w="100%">
                            <Heading color={useColorModeValue("teal.700", "white")} fontSize="2xl">
                                <Text>Pep</Text>
                            </Heading>
                            <Box mt={5} borderRadius={10}>
                                {currentChecklist.questions &&
                                    (currentChecklist?.questions).map((question, index) => (
                                        <>
                                            <Flex borderRadius={10}>
                                                <Box w='90%'>
                                                    <Text>{question.text}</Text>
                                                </Box>
                                                <Box ml={2}>
                                                 
                                                </Box>
                                            </Flex>
                                            <Text>{question.comment}</Text>
                                            <Box borderBottom={2} borderWidth={2} my={3} />
                                        </>
                                    ))}
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Text>Carregando dados do checklist...</Text>
                )}
            </Box>

            <Box w="15%" ml={3}>
                <UsersStatus visiterJoinedRoom={visiterJoinedRoom} />
                <TimeComponent />
            </Box>
        </Flex>
    );
}

export default ChecklistViewScreen;
