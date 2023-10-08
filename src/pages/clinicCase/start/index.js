import React, { useState } from 'react';
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
  useSteps,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
} from '@chakra-ui/react';

const steps = [
  { title: 'Checklist', description: 'Escolha de checklist' },
  { title: 'Tempo', description: 'Definição de tempo' },
  { title: 'Finalização', description: 'Começar Checklist' },
];

function Example() {
    const { activeStep, goToNext, goToPrevious } = useSteps({
        index: 0,
        count: steps.length,
      });
    
      const handleNext = () => {
        if (activeStep < steps.length - 1) {
            goToNext();
        } else {
          // Lógica adicional que você deseja executar quando todas as etapas forem concluídas.
          // Por exemplo, mostrar uma mensagem de sucesso ou fazer uma ação final.
          console.log('Todas as etapas foram concluídas!');
        }
      };
    
      const handlePrev = () => {
        goToPrevious();
      };

  return (
    <Box>
      <Stepper index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>
        <Button
          onClick={handlePrev}
          disabled={activeStep === 0}
          mr={4}
        >
          Voltar
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button onClick={handleNext}>Avançar</Button>
        ) : (
          <Button>Concluir</Button>
        )}
      </Box>
    </Box>
  );
}

export default Example;
