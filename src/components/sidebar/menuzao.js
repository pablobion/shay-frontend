"use client";

// const  element = document.querySelector('.layout-container');
// element.id = 'setCodRoom';
import { Box, Flex, Avatar, HStack, Text, IconButton, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, useColorMode } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = (props) => {
    const { children } = props;
    return (
        <Box
            as="a"
            px={2}
            py={1}
            rounded={"md"}
            _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.200", "gray.700"),
            }}
            href={"#"}
        >
            {children}
        </Box>
    );
};

export default function WithAction(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const router = useRouter();

    return (
        <Box borderRadius="xl" bg={useColorModeValue("gray.200", "gray.800")} p={7}>
            <Box bg={useColorModeValue("white", "gray.900")} px={4} m={2} borderRadius="xl">
                <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                    <IconButton size={"md"} icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} aria-label={"Open Menu"} display={{ md: "none" }} onClick={isOpen ? onClose : onOpen} />
                    <Button onClick={toggleColorMode}>{colorMode === "light" ? "Dark Mode" : "Light Mode"}</Button>
                    <HStack spacing={8} alignItems={"center"}>
                        <Box>Logo</Box>
                        <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
                            <Button bg="transparent" onClick={() => router.push("/clinicCase/create")}>
                                Criar checklist
                            </Button>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={"center"}>
                        <Menu>
                            <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                                <Button variant={"solid"} colorScheme={"teal"} size={"sm"} mr={4} leftIcon={<AddIcon />}>
                                    Começar
                                </Button>
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => router.push("/clinicCase/listall")}>Criar sala</MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={() => router.push("/clinicCase/joinroom")}>Entrar em uma sala já criada ✅</MenuItem>
                            </MenuList>
                        </Menu>

                        <Menu>
                            <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                                <Avatar
                                    size={"sm"}
                                    src={"https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Link 1</MenuItem>
                                <MenuItem>Link 2</MenuItem>
                                <MenuDivider />
                                <MenuItem>Link 3</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: "none" }}>
                        <Stack as={"nav"} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
            <Box borderRadius="xl" bg={useColorModeValue("white", "gray.900")} m={2} p={7}>
                {props.children}
            </Box>
        </Box>
    );
}
