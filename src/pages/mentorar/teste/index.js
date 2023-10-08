import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  Select
} from '@chakra-ui/react';

function MentoriaPage() {
  const [selectedOption, setSelectedOption] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [sessionCode, setSessionCode] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const generateRandomCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 10);
    setSessionCode(randomCode);
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(sessionCode);
  };

  return (
    <ChakraProvider>
      <Center height="100vh">
        <VStack spacing={4} align="center">
          <Box width="400px" p={4} borderWidth="1px" borderRadius="lg">
            {selectedOption === '' ? (
              <Stack spacing={4}>
                <Heading size="lg">Bem-vindo ao modo de mentoria médico</Heading>
                <Text>
                  Aqui você deve escolher as configurações de como irá funcionar esta mentoria.
                </Text>
                <Select
                  placeholder="Selecione uma opção"
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <option value="opcao1">Opção 1</option>
                  <option value="opcao2">Opção 2</option>
                  <option value="opcao3">Opção 3</option>
                </Select>
                <Button colorScheme="teal">Continuar</Button>
              </Stack>
            ) : (
              <Stack spacing={4}>
                <Heading size="lg">Configurar Sessão de Mentoria</Heading>
                <Text>Informe a duração da sessão e gere um código único.</Text>
                <Input
                  placeholder="Tempo da sessão (minutos)"
                  value={sessionTime}
                  onChange={(e) => setSessionTime(e.target.value)}
                />
                <Button colorScheme="teal" onClick={generateRandomCode}>
                  Gerar Código
                </Button>
                {sessionCode && (
                  <>
                    <Text>Código da Sessão:</Text>
                    <Box borderWidth="1px" p={2} borderRadius="md">
                      <Text>{sessionCode}</Text>
                    </Box>
                    <Button colorScheme="teal" onClick={copyCodeToClipboard}>
                      Copiar Código
                    </Button>
                  </>
                )}
              </Stack>
            )}
          </Box>
        </VStack>
      </Center>
    </ChakraProvider>
  );
}

export default MentoriaPage;
