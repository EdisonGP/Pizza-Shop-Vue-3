<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1 class="text-primary">🍕 Pizza Shop Admin</h1>
          <p>Sign in to manage your menu</p>
        </div>

        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="username"
            label="Username"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            :disabled="loading"
            color="primary"
            required
          />

          <v-text-field
            v-model="password"
            label="Password"
            prepend-inner-icon="mdi-lock"
            type="password"
            variant="outlined"
            :disabled="loading"
            color="primary"
            required
          />

          <v-alert v-if="error" type="error" variant="tonal" density="compact" class="mb-4">
            {{ error }}
          </v-alert>

          <v-btn
            type="submit"
            color="primary"
            size="large"
            block
            elevation="4"
            :loading="loading"
          >
            Login
          </v-btn>
          
          <v-btn
            variant="text"
            block
            class="mt-4"
            to="/"
            prepend-icon="mdi-arrow-left"
          >
            Back to Public Shop
          </v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')

const loading = computed(() => authStore.loading)
const error = computed(() => authStore.error)

async function handleLogin() {
  const success = await authStore.login(username.value, password.value)
  if (success) {
    router.push('/admin')
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #d32f2f 0%, #ffb300 100%);
  padding: 2rem;
}

.login-container {
  width: 100%;
  max-width: 450px;
}

.login-card {
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #546e7a;
  margin: 0;
}

.v-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
