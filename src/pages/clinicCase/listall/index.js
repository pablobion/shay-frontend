import React, { useState, useEffect, useMemo } from "react";
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

import { baseUrl } from "../../../config/baseInfos";

import { MdOutlineContentCopy } from "react-icons/md";

import { useRouter } from "next/router"; // Importe o useRouter do Next.js

import Table from "../../../components/ui/table";

function ChecklistViewScreen() {
    const toast = useToast();
    const router = useRouter(); // Use o useRouter para obter o ID da rota

    const [dataTable, setDataTable] = useState([]);

    const data = useMemo(
        () => [
            {
                type: "fsdf",
                name: "Please disable this account",
                account: "Account 1",
            },
            {
                type: "bbb",
                name: "Please disable this account",
                account: "Account 1",
            },
            {
                type: "ccc",
                name: "beyonce",
                account: "Account 1",
            },
        ],
        []
    );

    const fetchBack = async () => {
        try {
            const res = await fetch(`${baseUrl}/checklist/getall`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setDataTable(data);
            return data;
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchBack();
    }, []);

    return (
        <Flex p={4} justify="center">
            <Table data={dataTable} />
        </Flex>
    );
}

export default ChecklistViewScreen;
