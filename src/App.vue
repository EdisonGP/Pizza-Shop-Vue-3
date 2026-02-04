<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

/*
Cuando el usuario entra o refresca la página, se ejecuta checkAuth. Esta función va al localStorage, 
busca el token y le pregunta al backend si el usuario sigue siendo válido. 
Así se evita que el usuario pierda su sesión al presionar F5.
 */
onMounted(() => {
  authStore.checkAuth()
})
</script>
