import React, { useState } from "react";
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
    Tooltip,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { baseUrl } from "../../../config/baseInfos";

import FileInput from "../../../components/ui/fileInput";

function ChecklistScreen() {
    const toast = useToast();
    const [isCenarioModalOpen, setCenarioModalOpen] = useState(false);
    const [isRoteiroModalOpen, setRoteiroModalOpen] = useState(false);
    const [isTarefasModalOpen, setTarefasModalOpen] = useState(false);
    const [items, setItems] = useState([]);

    const openCenarioModal = () => setCenarioModalOpen(true);
    const closeCenarioModal = () => setCenarioModalOpen(false);
    const openRoteiroModal = () => setRoteiroModalOpen(true);
    const closeRoteiroModal = () => setRoteiroModalOpen(false);
    const openTarefasModal = () => setTarefasModalOpen(true);
    const closeTarefasModal = () => setTarefasModalOpen(false);

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(""); // Armazena a URL da imagem selecionada

    const openImageModal = (imageUrl) => {
        console.log(imageUrl, "eita");
        setSelectedImage(imageUrl);
        setIsImageModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImageUrl("");
        setIsModalOpen(false);
    };

    const addItem = () => {
        const newItem = {
            text: "",
            input: "",
            selectValue: "",
        };
        setItems([...items, newItem]);
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    const sss = `1. Realizar anamnese do paciente;
    2. Solicitar e interpretar exame físico;
    3. Estabelecer e comunicar a hipótese diagnóstica;
    4. Solicitar exames complementares, se necessário, descrevendo os achados;
    5. Propor conduta terapêutica;
    6. Dar orientações ao paciente e sanar dúvidas.
    
    *ATENÇÃO! VOCÊ DEVERÁ REALIZAR AS TAREFAS NA SEQUÊNCIA DESCRITA ACIMA.*`;

    const formik = useFormik({
        initialValues: {
            type: "",
            name: "",
            description: "",
            scene: "",
            roadmap: "",
            tasks: "",
            attachs: [],
            questions: [
                {
                    text: `[Item do PEP AQUI]\n*Adequado:*\n*Parcialmente adequado:*\n*Inadequado:*`,
                    points: "0,0.5,1",
                },
            ],
        },
        validationSchema: Yup.object({
            name: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
            description: Yup.string().max(20, "Must be 20 characters or less"),
            cod: Yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            console.log("Formulário enviado com os valores:", values);
            // ... resto da sua lógica de onSubmit
        },
    });

    const adicionarLinha = (name) => {
        formik.setFieldValue(name, [...formik.values[name], {}]);
    };

    const removeInfoAtIndex = ({ indexToRemove, name }) => {
        formik.setFieldValue(
            name,
            formik.values[name].filter((_, index) => index !== indexToRemove)
        );
    };

    const sendForm = async () => {
        console.log(formik?.values);
        
        try {
            const x = await fetch(`${baseUrl}/createClinicCase`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formik.values),
            });
            const response = await x.json();
            if(x.status === 200){
                toast({
                    title: "Checklist salvo com sucesso",
                    description: "Nós salvamos o checklist para você",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }
            console.log(response)
        }catch(e){
            toast({
                title: ":(",
                description: "ops algo aconteceu",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
       
    };

    const readFile = (event, index) => {
        const selectedFile = event.target.files[0]; // Pega o primeiro arquivo selecionado

        if (selectedFile) {
            const blob = new Blob([selectedFile], { type: selectedFile.type });
            console.log(blob); // Aqui você terá o objeto Blob representando o arquivo selecionado

            // Crie uma nova cópia do objeto allAttachs e atualize a propriedade 'file' do item específico
            const updatedAttachs = [...formik.values.attachs];
            updatedAttachs[index] = {
                ...updatedAttachs[index],
                file: blob,
            };

            // Atualize o campo 'attachs' no formik com a nova cópia
            formik.setFieldValue("attachs", updatedAttachs);
        }
    };

    const questionsArray = formik?.values?.questions;
    const attachsArray = formik?.values?.attachs;
    return (
        <form onSubmit={formik.handleSubmit}>
            <Box p={4}>
                <Box align="center" mb={5} bg={useColorModeValue("teal.400", "teal.300")} borderRadius="lg" p={3}>
                    <Heading color={useColorModeValue("white", "black")} fontSize="3xl">
                        Novo checklist
                    </Heading>
                </Box>
                <Select placeholder="Selecione" mt={2} name="type" value={formik.values.type} onChange={formik.handleChange}>
                    <option value="Clinica">Clínica</option>
                    <option value="Cirurgia">Cirurgia</option>
                    <option value="Go">Go</option>
                    <option value="Pediatria">Pediatria</option>
                    <option value="Preventiva">Preventiva</option>
                </Select>
                <Input placeholder="Nome do tema" mt={2} name="name" value={formik.values.name} onChange={formik.handleChange} />
                <Textarea placeholder="Definição do tema" mt={2} name="description" value={formik.values.description} onChange={formik.handleChange} />

                <Box bg="transparent" mt={4}>
                    <Flex align="center" gap={5}>
                        <Heading size="md">Cenário de atuação</Heading>
                        <Button onClick={openCenarioModal}>Modelos</Button>
                    </Flex>
                    <Textarea placeholder="Cenário de atuação" mt={2} name="scene" value={formik.values.scene} onChange={formik.handleChange} />

                    <Modal isOpen={isCenarioModalOpen} onClose={closeCenarioModal}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Modelos</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text>Modelos de Cenarios de atuação</Text>
                                <Select placeholder="Selecione" mt={2} mb={20}>
                                    <option value="primaria">Unidade de Atenção Primária</option>
                                    <option value="secundaria">Unidade de Atenção Secundária</option>
                                    <option value="terciaria">Unidade de Atenção Terciária</option>
                                </Select>
                            </ModalBody>
                            <ModalFooter gap={5}>
                                <Button colorScheme="teal" onClick={closeRoteiroModal}>
                                    Salvar
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>

                <Box bg="transparent" mt={4}>
                    <Flex align="center" gap={5}>
                        <Heading size="md">Roteiro do ator/atriz</Heading>
                        <Button onClick={openRoteiroModal}>Modelos</Button>
                    </Flex>
                    <Textarea placeholder="Orientaçõe do Ator \ Atriz" mt={2} name="roadmap" value={formik.values.roadmap} onChange={formik.handleChange} />

                    <Modal isOpen={isRoteiroModalOpen} onClose={closeRoteiroModal}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Modelos</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text>Modelo de roteiros</Text>
                                <Select placeholder="Selecione" mt={2} mb={20}>
                                    <option value="primaria">Dados pessoas</option>
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="teal" onClick={closeRoteiroModal}>
                                    Salvar
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>

                <Box bg="transparent" mt={4}>
                    <Flex align="center" gap={5}>
                        <Heading size="md">Tarefas</Heading>
                    </Flex>
                    <Textarea placeholder="Tarefas" mt={2} minH={300} name="tasks" value={formik.values.tasks} onChange={formik.handleChange}></Textarea>

                    <Modal isOpen={isTarefasModalOpen} onClose={closeTarefasModal}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Modelos</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>{/* Conteúdo do modal */}</ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" onClick={closeTarefasModal}>
                                    Fechar
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>

                <Flex align="center" mt={10} gap={5}>
                    <Heading size="md">impressos</Heading>
                    <Button onClick={() => adicionarLinha("attachs")}>Adicionar Item</Button>
                </Flex>

                {attachsArray.map((item, index) => (
                    <Flex key={index} borderTopWidth={index === 0 ? 0 : 5} borderColor="teal.700" mt={index === 0 ? 0 : 10} pt={10} gap={10}>
                        <Box gap={5} w='30%'>
                            <Input placeholder="Nome do impresso" mb={10} name={`attachs[${index}].name`} value={formik.values.attachs[index]?.name} onChange={formik.handleChange} />
                            <Tooltip label="Ainda não temos como hospedar imagens :(">
                                <Input name={`attachs[${index}].file`} onChange={(event) => readFile(event, index)} type="file" pt={4} h={16} disabled />
                            </Tooltip>

                            {/* <Text
                                onClick={() =>
                                    openImageModal(
                                        formik.values.attachs[index]?.file
                                    )
                                }
                            >
                                Visualizar Imagem
                            </Text> */}

                            <Modal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} size="full">
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        {selectedImage && (
                                            <img
                                                src={selectedImage}
                                                alt="Imagem em Tela Cheia"
                                                style={{
                                                    maxWidth: "100%",
                                                    maxHeight: "100%",
                                                }}
                                            />
                                        )}
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                        </Box>
                        <Box w='60%'>
                            <Textarea
                                placeHolder="Texto do impresso"
                                boxShadow="base"
                                w={900}
                                h={190}
                                name={`attachs[${index}].text`}
                                value={formik.values.attachs[index]?.text}
                                onChange={formik.handleChange}
                            ></Textarea>
                        </Box>
                        <Flex align="center" w='5.5%'>
                            <Button
                                type="submit"
                                colorScheme="red"
                                onClick={() =>
                                    removeInfoAtIndex({
                                        indexToRemove: index,
                                        name: "attachs",
                                    })
                                }
                            >
                                Exluir
                            </Button>
                        </Flex>
                    </Flex>
                ))}

                <Flex align="center" mt={10} gap={5}>
                    <Heading size="md">Checklists</Heading>
                    <Button onClick={() => adicionarLinha("questions")}>Adicionar Item</Button>
                </Flex>

                {questionsArray.map((item, index) => (
                    <Flex key={index} borderTopWidth={index === 0 ? 0 : 5} borderColor="teal.700" mt={index === 0 ? 0 : 10} pt={10} gap={20}>
                        <Box w="65%">
                            <Textarea
                                defaultValue={formik.values.questions[index]?.text}
                                h={200}
                                w="110%"
                                placeholder="Texto"
                                name={`questions[${index}].text`}
                                value={formik.values.questions[index]?.text}
                                onChange={formik.handleChange}
                            />
                            <Input
                                w="110%"
                                placeholder="Comentário do item"
                                name={`questions[${index}].comment`}
                                value={formik.values.questions[index]?.comment}
                                onChange={formik.handleChange}
                                mt={2}
                                p={4}
                            />
                        </Box>
                        <Flex ml={10} justify="end" w="35%">
                            <Box mr={10}>
                                <Input placeholder="Input" name={`questions[${index}].points`} value={formik.values.questions[index]?.points} onChange={formik.handleChange} />
                                <Select placeholder="Selecione" mt={2} name={`questions[${index}].category`} value={formik.values.questions[index]?.category} onChange={formik.handleChange}>
                                    <option value="ac" selected>
                                        Acolhimento
                                    </option>
                                    <option value="an">Anamnese</option>
                                    <option value="ex">Exame Físico</option>
                                    <option value="im">Exame de Imagem</option>
                                    <option value="lab">Laboratório</option>
                                    <option value="dx">Diagnóstico</option>
                                    <option value="ct">Conduta</option>
                                </Select>
                            </Box>
                            <Button
                                type="submit"
                                colorScheme="red"
                                onClick={() =>
                                    removeInfoAtIndex({
                                        indexToRemove: index,
                                        name: "questions",
                                    })
                                }
                            >
                                Exluir
                            </Button>
                        </Flex>
                    </Flex>
                ))}
            </Box>
            <Flex justify="end" mt={10}>
                <Button type="submit" size="lg" colorScheme="green" onClick={sendForm}>
                    Salvar
                </Button>
            </Flex>
        </form>
    );
}

export default ChecklistScreen;
