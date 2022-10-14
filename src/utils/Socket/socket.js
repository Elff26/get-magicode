import React from 'react';
import io from 'socket.io-client';

export const socket = io("http://192.168.15.12:3000", {
    transports: ['websocket']
});

export const SocketContext = React.createContext();