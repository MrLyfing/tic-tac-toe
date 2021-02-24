import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createStore } from 'vuex'

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

const store = createStore({
  state () {

  }
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
