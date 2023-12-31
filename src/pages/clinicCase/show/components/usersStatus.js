import React from "react";
import { Box, Flex, Text, useColorModeValue, Spinner } from "@chakra-ui/react";

const UserStatus = ({ visiterJoinedRoom, whoIs }) => {
    return (
        <Flex fontSize={18} w="100%" h="90px" direction="column" justify="center" mb={2} p={5} spacing={4} flex={1} borderRadius="xl" bg={useColorModeValue("gray.100", "gray.700")}>
            <Flex align="center">
                <Box bg="green" w={3} h={3} borderRadius="50%" mr={3} align="center" />
                <Text>Atriz {whoIs === 'actor' ? '(Você)' : '' }</Text>
            </Flex>
            <Flex align="center">
                <Box bg={visiterJoinedRoom || whoIs === 'visiter'   ? "green" : "gray"} w={3} h={3} borderRadius="50%" mr={3} align="center" />
                <Text>Médico(a) {whoIs === 'visiter' ? '(Você)' : '' }</Text>
                {visiterJoinedRoom || whoIs === 'visiter' ? <></> : <Spinner ml={2} size="sm" />}
            </Flex>
        </Flex>
    );
};

export default UserStatus;
