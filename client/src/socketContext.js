// @flow

import socketIOClient from 'socket.io-client';

const apiUrl = 'http://localhost:3001/';
const SocketContext = socketIOClient(apiUrl);

export default SocketContext;
