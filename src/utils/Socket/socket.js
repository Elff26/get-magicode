import React from 'react';
import io from 'socket.io-client';

import { 
    URL
} from '@env';

export const socket = io(URL || "http://192.168.15.2:3000", {
    transports: ['websocket']
});

export const SocketContext = React.createContext();