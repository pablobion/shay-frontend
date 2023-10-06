import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {Stack, FormGroup, FormControlLabel, Container} from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import EmptyTextarea from '../../components/ui/textArea'
import AlertDialog from '../../components/ui/AlertDialog'

function Formulario() {
  const [linhas, setLinhas] = useState([]);

  const adicionarLinha = () => {
    setLinhas([...linhas, { texto: '', checked: false, selecionado: '' }]);
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

  return (
    <Container sx={{minWidth: '100vw', minHeight: '100vh', padding: 0, margin: 0}}>
      <h1>Formulário com Seções</h1>
      {linhas.map((linha, index) => (
        <Stack direction='row' key={index}>
          <EmptyTextarea/>
          <Stack justifyContent="center" sx={{padding: 10}} spacing={{ xs: 1, sm: 2 }} direction="column" useFlexGap flexWrap="wrap">
            <FormControlLabel control={<Checkbox defaultChecked />} label="Mostrar para atriz" />
            <FormControlLabel control={<Checkbox defaultChecked />} label="Mostrar para médico" />
          </Stack>
          <AlertDialog/>
          <Select
            value={linha.selecionado}
            onChange={(event) => handleSelectChange(event, index)}
            sx={{minWidth: 200, maxHeight: 70}}
          >
            <MenuItem value="opcao1">Opção 1</MenuItem>
            <MenuItem value="opcao2">Opção 2</MenuItem>
            <MenuItem value="opcao3">Opção 3</MenuItem>
          </Select>
          <Button
            onClick={() => excluirLinha(index)}
            variant="contained"
            color="secondary"
            sx={{maxHeight: 50}}
          >
            Excluir
          </Button>
        </Stack>
      ))}
      <Button onClick={adicionarLinha} variant="contained" color="primary">
        Adicionar
      </Button>
    </Container>
  );
}

export default Formulario;
