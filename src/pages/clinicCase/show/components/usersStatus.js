
import React from "react";
import { Box, Flex, Text, useColorModeValue, Spinner } from "@chakra-ui/react";

const UserStatus = ({ visiterJoinedRoom }) => {


    return (
        <Box align="center" mb={2} p={5} spacing={4} flex={1} borderRadius="xl" bg={useColorModeValue("gray.100", "gray.700")}>
                    <Flex align="center">
                        <Box bg="green" w={3} h={3} borderRadius="50%" mr={3} align="center" />
                        <Text>Atriz (você)</Text>
                    </Flex>
                    <Flex align="center">
                        <Box bg={visiterJoinedRoom ? "green" : "gray"} w={3} h={3} borderRadius="50%" mr={3} align="center" />
                        <Text>Médico(a)</Text>
                        {visiterJoinedRoom ? <></> : <Spinner ml={2} size="sm" />}
                    </Flex>
                </Box>
    )
}

export default UserStatus;