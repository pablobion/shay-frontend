import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Center, useColorModeValue, Icon } from '@chakra-ui/react';
import { AiFillFileAdd } from 'react-icons/ai';

export default function Dropzone({ onFileAccepted }) {

    

  const onDrop = useCallback((acceptedFiles) => {
    onFileAccepted({file: acceptedFiles[0]});
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: '.torrent', maxFiles: 1, multiple: false,
  });

  const dropText = isDragActive ? 'Solte a imagem para selecionar...' : 'Arraste a imagem aqui, ou clique para selecionar';

  const activeBg = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue(
    isDragActive ? 'teal.300' : 'gray.300',
    isDragActive ? 'teal.500' : 'gray.500',
  );

  return (
    <Center
      p={5}
      mx={10}
      w={250}
      cursor="pointer"
      bg={isDragActive ? activeBg : 'transparent'}
      _hover={{ bg: activeBg }}
      transition="background-color 0.2s ease"
      borderRadius={4}
      border="3px dashed"
      borderColor={borderColor}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Icon as={AiFillFileAdd} mr={2} />
      <p>Clique para selecionar</p>
    </Center>
  );
}