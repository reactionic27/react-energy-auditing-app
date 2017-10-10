import socketClient from 'socket.io-client'
const SOCKET_ENDPOINT = window.location.origin;
const io = socketClient.connect(SOCKET_ENDPOINT, {timeout: 5000})

export default io
