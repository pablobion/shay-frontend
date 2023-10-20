import { Accordion, AccordionPanel, AccordionItem, Box, AccordionButton, AccordionIcon, Flex, Text, Button, Tooltip, Textarea } from "@chakra-ui/react";
import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { useState } from "react";

const AttachComponent = ({ index, attach, handleSendAttach }) => {
    const [isUnlock, setIsUnlock] = useState(false);

    const handleUnlock = () => {
        setIsUnlock(true);
        handleSendAttach(index);
    };

    const textareaStyle = {
        border: 'none',
        height: 300,
        fontSize: 14
      };
      


    return (
        <Box>
            <Accordion allowToggle mt={3} bg={isUnlock ? "teal.700" : ""} borderRadius={10}>
                <AccordionItem border={0}>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                {attach.name}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>

                    <AccordionPanel pb={4}>
                        <Flex>
                            <Box w="95%">
                                <Textarea readOnly style={textareaStyle}>{attach.text}</Textarea>
                            </Box>
                            <Flex w="5%" ml={5} align='center' justify='center'>
                                <Tooltip label={isUnlock ? "Impresso Enviado!" : "Enviar impresso"}>
                                    <Button _hover={{ bg: "teal.400" }} onClick={handleUnlock} bg={isUnlock ? "teal.400" : "gray"} isDisabled={false}>
                                        {isUnlock ? <UnlockIcon color="white" /> : <LockIcon color="white" />}
                                    </Button>
                                </Tooltip>
                            </Flex>
                        </Flex>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    );
};

export default AttachComponent;
