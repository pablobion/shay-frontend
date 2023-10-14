import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, Heading, Input, Text, Spinner, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, useColorMode } from "@chakra-ui/react";


import { myContext } from "@/context/context";
import { useRouter } from "next/router";

const JoinRoom = () => {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false); 

    const { socket, setCurrentChecklist } = myContext();

    const router = useRouter();

    const handlePasteClick = () => {
        navigator.clipboard.readText().then((text) => {
            setInputValue(text);
        });
    };

    useEffect(() => {
        socket.on('joinRoom:response', (response) => {
            
            let {message, status, data} = response;
            if(!data) return false
            data = data[0];
            console.log(data)
            if(status === 'success' && message === 'joinedRoom') {
                setCurrentChecklist(data);
                   router.push({
                        pathname: `/clinicCase/show`,
                        query: { roomId: inputValue },
                    });
            } else {
                setLoading(false);
            }
        })
    }, []);

    const handleJoinRoom = () => {
        setLoading(true);
        console.log('enviando joinroom', typeof inputValue);
        socket.emit("joinRoom", {pid: inputValue});
     
    }

    return (
        <Flex align="center" gap={5} direction="column" p={10}>
            <Heading>Digite ou cole o código da sala que deseja entrar</Heading>
            <Flex mt={10}>
                <Input  disabled={ loading && true} h={70} w={500} value={inputValue} onChange={(e) => setInputValue(e.target.value)} ref={inputRef}></Input>
                <Button isDisabled={loading && true} h={70} ml={1} onClick={handlePasteClick}>
                    <Text fontSize={22}>Colar código</Text>
                </Button>
            </Flex>
            <Box mt={10}>
                {
                    loading ? (
                        <Box align='center'>
                            <Text fontSize={40}>Entrando na sala...</Text>
                            <Spinner mt={5} hickness="1px" speed="0.65s" emptyColor="gray.200" size="xl" color="teal" />
                        </Box>
                    ) : (
                        <Button colorScheme='teal' h={70} onClick={handleJoinRoom}>
                            <Text fontSize={30}>Entrar na sala</Text>
                        </Button>
                    )
                }
            </Box>
       
        </Flex>
    );
};

export default JoinRoom;
