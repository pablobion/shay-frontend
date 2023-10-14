
import { Flex, Tooltip, Button, useToast } from "@chakra-ui/react";
import {MdOutlineContentCopy} from 'react-icons/md'

const RoomIdComponent = ({roomIdState}) => {
    const toast = useToast();
    const handleCopy = (text) => {
        toast({
            title: "Copiado!",
            description: "O código foi copiado para a área de transferência.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        navigator.clipboard.writeText(text);
    };

    return (
        <Flex justify="end" w="100%">
            <Tooltip label="Clique para copiar">
                <Button gap={3} colorScheme="yellow" onClick={() => handleCopy("teste copiando")}>
                    <MdOutlineContentCopy />
                    {roomIdState}
                </Button>
            </Tooltip>
        </Flex>
    );
};

export default RoomIdComponent;
