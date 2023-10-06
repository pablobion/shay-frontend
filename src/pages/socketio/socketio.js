import React, { useEffect } from 'react';
import io from 'socket.io-client';

const SocketComponent = () => {
  useEffect(() => {
    // Conectar ao servidor Socket.io
    const socket = io('http://localhost:3000', {
  withCredentials: true, // Permite compartilhar cookies/credenciais com o servidor
});
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
    <div>
      <h1>Aplicativo React com Socket.io</h1>
    </div>
  );
};

export default SocketComponent;
