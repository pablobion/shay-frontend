import { Accordion, AccordionPanel, AccordionItem, Box, AccordionButton, AccordionIcon, Flex, Text, Button, Tooltip } from "@chakra-ui/react";
import {LockIcon, UnlockIcon} from '@chakra-ui/icons'
import {useState} from  'react'

const AttachComponent = (props) => {
    const [isUnlock, setIsUnlock] = useState(false);

    const handleLock = () => {
        setIsUnlock(true);
    }
    return (
        <Box>
            <Accordion allowToggle mt={3} bg={isUnlock ? 'teal.700' : ''} borderRadius={10}>
                <AccordionItem border={0}>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                Section 1 title
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>

                    <AccordionPanel pb={4}>
                        <Flex>
                            <Box w='95%'>
                                <Text>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </Text>
                            </Box>
                            <Box w='5%'>
                                <Tooltip label={isUnlock ? 'Impresso Enviado!' : 'Enviar impresso'}>

 
                                    <Button _hover={{ bg: "teal.400" }} onClick={handleLock} bg={ isUnlock ? 'teal.400' : 'gray' } isDisabled={isUnlock}>
                                        {isUnlock ? <UnlockIcon color='white'/> : <LockIcon color='white'/>}    
                                    </Button>
                                    </Tooltip>
                            </Box>
                        </Flex>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    );
};

export default AttachComponent;
