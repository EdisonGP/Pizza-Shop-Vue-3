<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" :to="{ name: 'dashboard' }" />
        <v-list-item prepend-icon="mdi-pizza" title="Pizzas" :to="{ name: 'pizza-manager' }" />
        <v-list-item prepend-icon="mdi-leaf" title="Ingredients" :to="{ name: 'ingredient-manager' }" />
      </v-list>
      
      <template v-slot:append>
        <div class="pa-2">
            <v-btn block color="grey-lighten-3" to="/" prepend-icon="mdi-home">
                Public Shop
            </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="red-darken-4" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="font-weight-bold">🍕 Pizza Shop Admin</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const drawer = ref(true)
const router = useRouter()
const authStore = useAuthStore()

function logout() {
  authStore.logout()
  router.push('/admin/login')
}
</script>
