import socketIOClient from 'socket.io-client';

const serverSocketUri = process.env.REACT_APP_SERVER_SOCKET_URL;
const SocketContext = socketIOClient(serverSocketUri);

export default SocketContext;
