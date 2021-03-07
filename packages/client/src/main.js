import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createStore } from 'vuex'
import { io } from 'socket.io-client'

import { ROUTE } from './constants'

import App from './App.vue'
import Menu from './pages/Menu.vue'
import PickTeam from './pages/PickTeam.vue'
import Game from './pages/Game.vue'

const socket = io('wss://localhost:8080', {
  transports: ['websocket']
})

socket.onAny((event, ...args) => {
  console.log(event, args)
})
socket.on('connect_error', err => {
  console.log(err)
})
socket.emit('hello')

const routes = [
  { path: ROUTE.MENU.PATH, component: Menu },
  { path: ROUTE.PICK_TEAM.PATH, component: PickTeam },
  { path: ROUTE.GAME.PATH, component: Game }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const store = createStore({
  state() {}
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
