import {useEffect, useState} from 'react'
import io from 'socket.io-client';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';

//import baseInfo from'../../app/config/baseInfo' 

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {

  const socket = io('http://localhost:3000');

  const router = useRouter();
  const [teemas, setTemas] = useState([{}])

  const getTemas = async () => {
    try {

      const response = await fetch (`${socket}/getTemas`)
      const data = await response.json()
      setTemas(data)
    }catch(e){
      console.log(e)
    }
  }
  const handleInitMentoria = async () => {
    const response = await fetch (`${socket}/startMentoria`)
    const data = await response.json()
    socket.emit(`start room`, {pid: 11223})
    router.push({
      pathname: '/iniciou-mentoria',
      query: { pid: data.pid },
    });
    console.log(data)
  }

  const joinRoom = () => {
    socket.emit(`join room`, {pid: 11223})
  }

  useEffect(() => {
   // console.log(baseInfo.serverUrl , 'hwuheuh')
    const responseTemas = getTemas();
    
    // Conectar ao servidor Socket.io
   

    // Configurar ouvintes para eventos do servidor Socket.io
    socket.on('connect', () => {
      console.log('Conectado ao servidor Socket.io');
    });

    socket.on('mensagem', (mensagem) => {
      console.log('Mensagem recebida do servidor:', mensagem);
    });

    // Desconectar quando o componente é desmontado
    return () => {
      socket.disconnect();
    };
    
  }, []);

  return (
    <Container fixed>
      <button onClick={() => handleInitMentoria()}>INiciar mentoria</button>
     
      <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          // value={temas}
          label="Age"
          // onChange={handleChange}
        >
          {teemas && teemas.map(elem => (
            <MenuItem value={elem.value}>
            <em>{elem.label}</em>
          </MenuItem>
          ))}

          
        
          
         
        </Select>
          
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <Button onClick={joinRoom} variant="contained">Contained</Button>
    </Container>
  )
}