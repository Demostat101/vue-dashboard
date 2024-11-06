import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'; // Vuetify CSS styles
import { createVuetify } from 'vuetify'; // Vuetify 3.x import method

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Create Vuetify instance
const vuetify = createVuetify();

// Use Vuetify in your Vue app
app.use(vuetify);
app.mount('#app')
