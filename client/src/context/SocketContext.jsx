import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';


export const SocketContext = createContext();

const socket = io(`import.meta.env.VITE_BASE_URL`);

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connet', () => {
            console.log("Connect to server");
        });

        socket.on('disconnet', () => {
            console.log('Disconneted from server');
        })
    }, []);

    return (
        <SocketProvider.Provider value={{ socket }}>
            {children}
        </SocketProvider.Provider>
    )
};


export default SocketProvider;