import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ingredientsAPI } from '@/services/api'

export const useIngredientStore = defineStore('ingredient', () => {
    const ingredients = ref([])
    const loading = ref(false)
    const error = ref(null)

    async function fetchIngredients() {
        loading.value = true
        try {
            const response = await ingredientsAPI.getAll()
            ingredients.value = response.data
        } catch (err) {
            error.value = err.response?.data?.detail || 'Failed to fetch ingredients'
        } finally {
            loading.value = false
        }
    }

    async function addIngredient(name) {
        try {
            const response = await ingredientsAPI.create({ name })
            ingredients.value.push(response.data)
            return response.data
        } catch (err) {
            error.value = err.response?.data?.detail || 'Failed to add ingredient'
            throw err
        }
    }

    async function deleteIngredient(id) {
        try {
            await ingredientsAPI.delete(id)
            const index = ingredients.value.findIndex(ing => ing.id === id)
            if (index !== -1) {
                ingredients.value.splice(index, 1)
            }
        } catch (err) {
            error.value = err.response?.data?.detail || 'Failed to delete ingredient'
            throw err
        }
    }

    return {
        ingredients,
        loading,
        error,
        fetchIngredients,
        addIngredient,
        deleteIngredient
    }
})
