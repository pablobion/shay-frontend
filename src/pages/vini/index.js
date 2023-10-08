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
} from "@chakra-ui/react";

function ChecklistScreen() {
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
    
    *ATENÇÃO! VOCÊ DEVERÁ REALIZAR AS TAREFAS NA SEQUÊNCIA DESCRITA ACIMA.*`

    return (
        <Box p={4}>
            <Box align="center" mb={5}>
                <Heading color="teal" fontSize="3xl">
                    Novo checklist
                </Heading>
            </Box>
            <Select placeholder="Selecione" mt={2}>
                <option value="Clinica">Clínica</option>
                <option value="Cirurgia">Cirurgia</option>
                <option value="Go">Go</option>
                <option value="Pediatria">Pediatria</option>
                <option value="Preventiva">Preventiva</option>
            </Select>
            <Input placeholder="Nome do tema" mt={2} />
            <Textarea placeholder="Definição do tema" mt={2} />

            <Box bg="transparent" mt={4}>
                <Flex align="center" gap={5}>
                    <Text>Cenário de atuação</Text>
                    <Button onClick={openCenarioModal}>Modelos</Button>
                </Flex>
                <Textarea mt={2} />

                <Modal isOpen={isCenarioModalOpen} onClose={closeCenarioModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modelos</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>Modelos de Cenarios de atuação</Text>
                            <Select placeholder="Selecione" mt={2} mb={20}>
                                <option value="primaria">
                                    Unidade de Atenção Primária
                                </option>
                                <option value="secundaria">
                                    Unidade de Atenção Secundária
                                </option>
                                <option value="terciaria">
                                    Unidade de Atenção Terciária
                                </option>
                            </Select>
                        </ModalBody>
                        <ModalFooter gap={5}>
                            <Button
                                colorScheme="teal"
                                onClick={closeRoteiroModal}
                            >
                                Salvar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>

            <Box bg="transparent" mt={4}>
                <Flex align="center" gap={5}>
                    <Text>Roteiro do ator/atriz</Text>
                    <Button onClick={openRoteiroModal}>Modelos</Button>
                </Flex>
                <Textarea mt={2} />

                <Modal isOpen={isRoteiroModalOpen} onClose={closeRoteiroModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modelos</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>Modelo de roteiros</Text>
                            <Select placeholder="Selecione" mt={2} mb={20}>
                                <option value="primaria">
                                    Dados pessoas
                                </option>
                              
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="teal"
                                onClick={closeRoteiroModal}
                            >
                                Salvar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>

            <Box bg="transparent" mt={4}>
                <Flex align="center" gap={5}>
                    <Text>Tarefas</Text>
                </Flex>
                <Textarea mt={2} value={sss} minH={300}>
                   
                </Textarea>

                <Modal isOpen={isTarefasModalOpen} onClose={closeTarefasModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modelos</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>{/* Conteúdo do modal */}</ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                onClick={closeTarefasModal}
                            >
                                Fechar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>

            <Box bg="transparent" mt={4}>
                <Input type="file" />
            </Box>

            <Button mt={4} onClick={addItem}>
                Adicionar Item
            </Button>

            {items.map((item, index) => (
                <Box key={index} mt={4}>
                    <Textarea
                        placeholder="Texto"
                        value={item.text}
                        onChange={(e) =>
                            handleItemChange(index, "text", e.target.value)
                        }
                    />
                    <Input
                        placeholder="Input"
                        value={item.input}
                        onChange={(e) =>
                            handleItemChange(index, "input", e.target.value)
                        }
                        mt={2}
                        p={4}
                    />
                    <Select
                        placeholder="Selecione"
                        value={item.selectValue}
                        onChange={(e) =>
                            handleItemChange(
                                index,
                                "selectValue",
                                e.target.value
                            )
                        }
                        mt={2}
                    >
                        <option value="Opção 1">Opção 1</option>
                        <option value="Opção 2">Opção 2</option>
                        <option value="Opção 3">Opção 3</option>
                    </Select>
                </Box>
            ))}
        </Box>
    );
}

export default ChecklistScreen;
