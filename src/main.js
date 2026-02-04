import { createApp } from 'vue'
import { createPinia } from 'pinia' 
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'
import './assets/main.css'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    primary: '#d32f2f',   // Pizza Red
                    secondary: '#5d4037', // Brown/Crust
                    accent: '#ffb300',    // Cheese Yellow
                    error: '#c62828',
                    info: '#0277bd',
                    success: '#2e7d32',   // Basil Green
                    warning: '#ef6c00',   // Oven Orange
                    background: '#fafafa',
                    surface: '#ffffff'
                }
            }
        }
    }
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
