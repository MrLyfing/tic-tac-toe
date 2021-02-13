import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'
import Menu from './pages/Menu.vue'
import PickTeam from './pages/Pickteam.vue'

const routes = [
  { path: '/', component: Menu },
  { path: '/pick', component: PickTeam }
]

const router = createRouter({ 
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
