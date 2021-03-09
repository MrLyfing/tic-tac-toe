import { io } from 'socket.io-client'

const socket = io('ws://localhost:8080', {
  transports: ['websocket'],
  autoConnect: false
})

socket.onAny((event, ...args) => {
  console.log(event, args)
})

socket.on('connect_error', err => {
  console.log(err)
})

export default socket
