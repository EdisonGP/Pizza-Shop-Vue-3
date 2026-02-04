import { defineStore } from 'pinia'
import { ref } from 'vue'
import { pizzasAPI } from '@/services/api'

export const usePizzaStore = defineStore('pizza', () => {
    const pizzas = ref([])
    const adminPizzas = ref([])
    const loading = ref(false)
    const error = ref(null)

    async function fetchPizzas() {
        loading.value = true
        try {
            const response = await pizzasAPI.getAll()
            pizzas.value = response.data
        } catch (err) {
            error.value = err.response?.data?.detail || 'Failed to fetch pizzas'
        } finally {
            loading.value = false
        }
    }

    async function fetchAdminPizzas() {
        loading.value = true
        try {
            const response = await pizzasAPI.getAllAdmin()
            adminPizzas.value = response.data
        } catch (err) {
            error.value = err.response?.data?.detail || 'Failed to fetch admin pizzas'
        } finally {
            loading.value = false
        }
    }

    async function createPizza(pizzaData) {
        try {
            const response = await pizzasAPI.create(pizzaData)
            adminPizzas.value.push(response.data)
            return response.data
        } catch (err) {
            error.value = err.response?.data?.detail || 'Failed to create pizza'
            throw err
        }
    }

    async function updatePizza(id, pizzaData) {
        try {
            const response = await pizzasAPI.update(id, pizzaData)
            const index = adminPizzas.value.findIndex(p => p.id === id)
            if (index !== -1) {
                adminPizzas.value[index] = response.data
            }
            return response.data
        } catch (err) {
            error.value = err.response?.data?.detail || 'Failed to update pizza'
            throw err
        }
    }

    async function deletePizza(id) {
        try {
            await pizzasAPI.delete(id)
            adminPizzas.value = adminPizzas.value.filter(p => p.id !== id)
        } catch (err) {
            error.value = err.response?.data?.detail || 'Failed to delete pizza'
            throw err
        }
    }

    return {
        pizzas,
        adminPizzas,
        loading,
        error,
        fetchPizzas,
        fetchAdminPizzas,
        createPizza,
        updatePizza,
        deletePizza
    }
})
