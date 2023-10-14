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

import { baseUrl } from "../../../config/baseInfos";

import { myContext } from "../../../context/context";

import TimeComponent from "./components/timer";
import UsersStatus from "./components/usersStatus";
import RoomIdComponent from "./components/roomid";

function ChecklistViewScreen() {
    const toast = useToast();
    const router = useRouter(); // Use o useRouter para obter o ID da rota
    const { roomId } = router.query; // Obtenha o ID do checklist da rota
    const [checklistData, setChecklistData] = useState(null);

    const [roomIdState, setRoomIdState] = useState("");
    const [visiterJoinedRoom, setVisiterJoinedRoom] = useState(false);

    const { socket } = myContext();



    useEffect(() => {
       

        setRoomIdState(roomId);

        socket.on("visiterJoinedRoom", (response) => {
            console.log('chegou visitante');
            setVisiterJoinedRoom(true);
        });


    }, []);


    return (
        <Flex p={4}>
            <Box flex={1} w="70vw">
                <Flex mb={5} bg={useColorModeValue("gray.100", "gray.700")} borderRadius="lg" p={3} w="70vw" align="center">
                    <Heading color={useColorModeValue("teal.800", "white")} fontSize="3xl">
                        blablalkalsaklassasaasassas
                    </Heading>
                    <RoomIdComponent roomIdState={roomIdState}/>
                </Flex>
                {checklistData ? (
                    <>
                        <Text>Tipo: {checklistData.type}</Text>
                        <Text>Nome do Tema: {checklistData.name}</Text>
                        <Text>Definição do Tema: {checklistData.description}</Text>

                        {/* Aqui você pode exibir outras informações do checklist, como cenário, roteiro, tarefas, anexos, etc. */}
                        {/* Lembre-se de que esta é uma página de visualização, então você só exibirá os dados, não os editará. */}
                    </>
                ) : (
                    <Text>Carregando dados do checklist...</Text>
                )}
            </Box>

            <Box ml={0} w={300}>
                
                <UsersStatus visiterJoinedRoom={visiterJoinedRoom} />
                <TimeComponent />
            </Box>
        </Flex>
    );
}

export default ChecklistViewScreen;
