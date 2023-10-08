import { Box, Button, Center, ChakraProvider, Text, VStack } from '@chakra-ui/react';

function IniciarMentoria() {
  return (
    <ChakraProvider>
      <Center height="100vh">
        <VStack spacing={4} align="center">
          <Text fontSize="2xl">Iniciar Mentoria</Text>
          <Text fontSize="lg">Escolha qual modo você irá começar</Text>
          <Box>
            <Button size="lg" colorScheme="teal" variant="outline">
              Médico(a)
            </Button>
          </Box>
          <Box>
            <Button size="lg" colorScheme="teal" variant="outline">
              Paciente
            </Button>
          </Box>
        </VStack>
      </Center>
    </ChakraProvider>
  );
}

export default IniciarMentoria;
