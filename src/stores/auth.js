import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authAPI } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || null)
    const user = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const isAuthenticated = computed(() => !!token.value)

    async function login(username, password) {
        loading.value = true
        error.value = null

        try {
            const formData = new URLSearchParams()
            formData.append('username', username)
            formData.append('password', password)

            const response = await authAPI.login(formData)
            token.value = response.data.access_token
            localStorage.setItem('token', token.value)

            // Store username for display
            user.value = { username }

            return true
        } catch (err) {
            error.value = err.response?.data?.detail || 'Login failed'
            return false
        } finally {
            loading.value = false
        }
    }

    function logout() {
        token.value = null
        user.value = null
        localStorage.removeItem('token')
    }

    function checkAuth() {
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
            token.value = storedToken
        }
    }

    return {
        token,
        user,
        loading,
        error,
        isAuthenticated,
        login,
        logout,
        checkAuth
    }
})
