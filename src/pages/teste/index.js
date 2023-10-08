import React, { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    Input,
    Select,
    Textarea,
    DarkMode,
    Flex,
    Text,
    Container,
    Heading,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";


import FileInput from "../../components/ui/fileInput";

import { baseUrl } from "../../config/baseInfos";

function Formulario() {
    const [linhas, setLinhas] = useState([]);
    const [files, setFiles] = useState([]);


    const formik = useFormik({
        initialValues: {
            name: "a",
            description: "",
            cod: "a",
            infos: [
                // {
                //     text: "aaa",
                //     checked: false,
                //     selecionado: "",
                //     visibleTo: { medical: true, actor: false },
                //     type: "",
                // },
            ],
            attachs: [],
            questions: []
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
            description: Yup.string().max(20, "Must be 20 characters or less"),
            cod: Yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            // Handle form submission here
            console.log(values); // You can access the form values here

             const x = await fetch(`${baseUrl}/createClinicCase`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formik.values),
            });
        },
    });

    const adicionarLinha = (name) => {
        formik.setFieldValue(name, [
            ...formik.values[name],
            { },
        ]);
    };

    const handleTextoChange = (event, index) => {
        const newLinhas = [...linhas];
        newLinhas[index].texto = event.target.value;
        setLinhas(newLinhas);
    };

    const handleCheckboxChange = (event, index) => {
        const newLinhas = [...linhas];
        newLinhas[index].checked = event.target.checked;
        setLinhas(newLinhas);
    };

    const handleSelectChange = (event, index) => {
        const newLinhas = [...linhas];
        newLinhas[index].selecionado = event.target.value;
        setLinhas(newLinhas);
    };

    const removeInfoAtIndex = ({indexToRemove, name}) => {
        formik.setFieldValue(
            name,
            formik.values[name].filter((_, index) => index !== indexToRemove)
        );
    };

    const sendForm = async () => {
        // const x = await fetch(`${baseUrl}/createClinicCase`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         name: {
        //             dsc: "teste",
        //         },
        //     }),
        // });
    };

    const onFileAccepted = ({ file, index }) => {
        //chaneg only file index

        console.log(file, "ehehe");
        const newFiles = files;
        newFiles[index] = file;
        setFiles(newFiles);

        console.log(files);
    };

    const infosArray = formik?.values?.infos;
    const attachsArray = formik?.values?.attachs;

    return (
        <Box p="20">
            <Flex justify="center" mb={10}>
                <Text fontSize="xl">Formulário com Seções</Text>
            </Flex>
            <form onSubmit={formik.handleSubmit}>
                <Box bg="gray.900" p="5" rounded="2xl" boxShadow="lg">
                    <Heading align="center" mb="5">
                        Informações gerais
                    </Heading>
                    <FormControl isRequired mb="4">
                        <FormLabel>Nome</FormLabel>
                        <Input
                            placeholder="Digite o nome"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    <FormControl mb="4">
                        <FormLabel>Descrição</FormLabel>
                        <Input
                            placeholder="Digite a descrição"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    <FormControl isRequired mb="4">
                        <FormLabel>Código</FormLabel>
                        <Input
                            placeholder="Digite o código"
                            name="cod"
                            value={formik.values.cod}
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                </Box>

                <Box bg="gray.900" p="5" rounded="2xl" boxShadow="lg" mt="5">
                    <Flex justify="center" align="center" gap={10}>
                    <Heading fontSize="4xl">Textos</Heading>
                        <Button onClick={() => adicionarLinha('infos')} colorScheme="blue">
                            Adicionar
                        </Button>
                    </Flex>

                    {infosArray.map((linha, index) => (
                        <Box
                        borderBottomWidth="1px"
                        key={index}
                        alignItems="center"
                        display={{ xl: 'flex', lg: 'column' }}
                        direction="column" align='center'
                        p={5}
                        >
                            <Textarea
                                variant="filled"
                                w={700}
                                h={300}
                                placeholder="text"
                                name={`infos[${index}].text`}
                                value={formik.values.infos[index]?.text}
                                onChange={formik.handleChange}
                            />

                            <Flex direction="column" align='center' mx={10} my={5}>
                                <Text fontSize="xl">Visualização inicial</Text>

                                <Checkbox
                                    isChecked={
                                        formik.values.infos[index]?.visibleTo
                                            ?.medical
                                    }
                                    name={`infos[${index}].visibleTo.medical`}
                                    value={
                                        formik.values.infos[index]?.visibleTo
                                            ?.medical
                                    }
                                    onChange={formik.handleChange}
                                >
                                    <Text minW={100}>Médica</Text>
                                </Checkbox>
                                <Checkbox
                                    isChecked={
                                        formik.values.infos[index]?.visibleTo
                                            ?.actor
                                    }
                                    name={`infos[${index}].visibleTo.actor`}
                                    value={
                                        formik.values.infos[index]?.visibleTo
                                            ?.actor
                                    }
                                    onChange={formik.handleChange}
                                >
                                    <Text minW={100}>Atriz</Text>
                                </Checkbox>
                            </Flex>
                            
                            
                            <Select
                                variant="filled"
                                w={400}
                                placeholder="Selecione o tipo"
                                name={`infos[${index}].type`}
                                value={formik.values.infos[index].type}
                                onChange={formik.handleChange}
                            >
                                <option value="opcao1">Opção 1</option>
                                <option value="opcao2">Opção 2</option>
                                <option value="opcao3">Opção 3</option>
                            </Select>
                            

                            <Button
                                onClick={() => removeInfoAtIndex({indexToRemove: index, name: 'infos'})}
                                colorScheme="red"
                                m={5}
                            >
                                Excluir
                            </Button>
                            
                        </Box>
                    ))}
                </Box>







                <Box bg="gray.900" p="5" rounded="2xl" boxShadow="lg" mt="5">
                    <Flex justify="center" align="center" gap={10}>
                    <Heading fontSize="4xl">Anexos</Heading>
                        <Button onClick={() => adicionarLinha('attachs')} colorScheme="blue">
                            Adicionar
                        </Button>
                    </Flex>

                    {attachsArray.map((linha, index) => (
                        <Box
                            borderBottomWidth="1px"
                            key={index}
                            alignItems="center"
                            display={{ xl: 'flex', lg: 'column' }}
                            direction="column" align='center'
                            p={5}
                        >
                            <Textarea
                                variant="filled"
                                w={700}
                                h={300}
                                placeholder="text"
                                name={`attachs[${index}].text`}
                                value={formik.values.attachs[index]?.text}
                                onChange={formik.handleChange}
                            />
                            <Flex direction="column" align="center">
                                <FileInput
                                    onFileAccepted={({ file }) =>
                                        onFileAccepted({ file, index })
                                    }
                                />
                                <Text
                                    fontSize="xl"
                                    onClick={() =>
                                        console.log(files[index]?.path)
                                    }
                                >
                                    aaa
                                </Text>
                            </Flex>
                            <Flex direction="column" mx={10} direction="column" align='center'>
                                <Text fontSize="xl">Visualização inicial</Text>

                                <Checkbox
                                    isChecked={
                                        formik.values.attachs[index]?.visibleTo
                                            ?.medical
                                    }
                                    name={`attachs[${index}].visibleTo.medical`}
                                    value={
                                        formik.values.attachs[index]?.visibleTo
                                            ?.medical
                                    }
                                    onChange={formik.handleChange}
                                >
                                    <Text minW={100}>Médica</Text>
                                </Checkbox>
                                <Checkbox
                                    isChecked={
                                        formik.values.attachs[index]?.visibleTo
                                            ?.actor
                                    }
                                    name={`attachs[${index}].visibleTo.actor`}
                                    value={
                                        formik.values.attachs[index]?.visibleTo
                                            ?.actor
                                    }
                                    onChange={formik.handleChange}
                                >
                                    <Text minW={100}>Atriz</Text>
                                </Checkbox>
                            </Flex>
                            <Select
                                variant="filled"
                                w={400}
                                placeholder="Selecione o tipo"
                                name={`attachs[${index}].type`}
                                value={formik.values.attachs[index]?.type}
                                onChange={formik.handleChange}
                            >
                                <option value="opcao1">Opção 1</option>
                                <option value="opcao2">Opção 2</option>
                                <option value="opcao3">Opção 3</option>
                            </Select>

                            <Button
                                onClick={() => removeInfoAtIndex({indexToRemove: index, name: 'attachs'})}
                                colorScheme="red"
                                m={5}
                            >
                                Excluir
                            </Button>
                        </Box>
                    ))}
                </Box>
                

                

                <Box align="end" mt="10">
                    <Button
                        size="lg"
                        mr={5}
                        colorScheme="gray"
                        onClick={sendForm}
                    >
                        salvar
                    </Button>
                    <Button
                        type="submit"
                        size="lg"
                        colorScheme="green"
                        onClick={sendForm}
                    >
                        salvar
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default Formulario;
