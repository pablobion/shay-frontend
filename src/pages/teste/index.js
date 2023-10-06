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
} from "@chakra-ui/react";

import Editor from "react-medium-editor";


import {baseUrl} from '../../config/baseInfos'

function Formulario() {
    const [linhas, setLinhas] = useState([]);

    const adicionarLinha = () => {
        setLinhas([...linhas, { texto: "", checked: false, selecionado: "" }]);
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

    const excluirLinha = (index) => {
        const newLinhas = [...linhas];
        newLinhas.splice(index, 1);
        setLinhas(newLinhas);
    };

    const sendForm = async () => {
     
      const x = await fetch(`${baseUrl}/createClinicCase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'pablitow' }),
      })
    }

    return (
        <Box>
            <Box p="3">
                <Flex justify="center" mb={10}>
                    <Text fontSize="xl">Formulário com Seções</Text>
                </Flex>
                <Flex justify="center" align="center" gap={10}>
                    <Text fontSize="xl">Textos</Text>
                    <Button onClick={adicionarLinha} colorScheme="blue">
                        Adicionar
                    </Button>
                </Flex>

                {linhas.map((linha, index) => (
                    <Box
                        borderBottomWidth="1px"
                        key={index}
                        display="flex"
                        alignItems="center"
                        p={5}
                    >
                        <Textarea
                            w={700}
                            placeholder="Texto"
                            value={linha.texto}
                            onChange={(event) =>
                                handleTextoChange(event, index)
                            }
                        />
                        <Flex direction="column" mx={10}>
                            <Text fontSize="xl">Visualização inicial</Text>

                            <Checkbox
                                isChecked={linha.checked}
                                onChange={(event) =>
                                    handleCheckboxChange(event, index)
                                }
                            >
                                Médica
                            </Checkbox>
                            <Checkbox
                                isChecked={linha.checked}
                                onChange={(event) =>
                                    handleCheckboxChange(event, index)
                                }
                            >
                                Atriz
                            </Checkbox>
                        </Flex>
                        <Select
                            w={400}
                            placeholder="Selecione"
                            value={linha.selecionado}
                            onChange={(event) =>
                                handleSelectChange(event, index)
                            }
                        >
                            <option value="opcao1">Opção 1</option>
                            <option value="opcao2">Opção 2</option>
                            <option value="opcao3">Opção 3</option>
                        </Select>
                        <Button
                            onClick={() => excluirLinha(index)}
                            colorScheme="red"
                            ml={2}
                        >
                            Excluir
                        </Button>
                    </Box>
                ))}
            </Box>

        
            <Box align="end" px={50}>
                <Button colorScheme="green" onClick={sendForm}>
                    salvar
                </Button>
            </Box>
        </Box>
    );
}

export default Formulario;
