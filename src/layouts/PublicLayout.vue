<template>
  <v-app>
    <v-app-bar app color="white" elevation="1">
      <v-container class="d-flex align-center">
        <v-btn variant="text" :to="{ name: 'home' }" class="text-h5 font-weight-black text-red-darken-4 pa-0">
          🍕 PIZZA SHOP
        </v-btn>
        
        <v-spacer />

        <v-btn v-if="!authStore.isAuthenticated" to="/admin/login" variant="text" prepend-icon="mdi-account-lock">
          Admin
        </v-btn>
        <v-btn v-else :to="{ name: 'dashboard' }" color="red-darken-4" variant="tonal" prepend-icon="mdi-view-dashboard">
          Go to Dashboard
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-5">
      <router-view />
    </v-main>

    <v-footer class="bg-grey-darken-4 text-white text-center d-flex flex-column pa-8">
      <div class="text-h6 mb-2">PIZZA SHOP</div>
      <div class="mb-4">Crafting happiness, one slice at a time.</div>
      <v-divider color="white" class="mb-4" style="width: 200px" />
      <div>{{ new Date().getFullYear() }} — <strong>FastAPI + Vue Pizza App</strong></div>
    </v-footer>
  </v-app>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>
