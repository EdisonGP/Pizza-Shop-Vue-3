<template>
  <v-container>
    <v-row class="mb-6">
      <v-col>
        <h1 class="text-h4 font-weight-bold">Ingredient Management</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-card class="elevation-2">
          <v-card-title class="bg-primary text-white">Add New Ingredient</v-card-title>
          <v-card-text class="pt-4">
            <v-text-field
              v-model="newIngredientName"
              label="Ingredient Name"
              variant="outlined"
              hide-details
              class="mb-4"
              @keyup.enter="addIngredient"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="flat"
              :loading="ingredientStore.loading"
              :disabled="!newIngredientName"
              @click="addIngredient"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="elevation-2">
          <v-list hover>
            <v-list-item v-if="ingredientStore.loading" class="text-center py-4">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-list-item>
            <v-list-item v-else-if="ingredientStore.ingredients.length === 0" class="text-center py-4 grey--text">
              No ingredients found. Add one to get started.
            </v-list-item>
            <v-list-item
              v-for="ing in ingredientStore.ingredients"
              :key="ing.id"
              :title="ing.name"
              prepend-icon="mdi-leaf"
            >
              <template v-slot:append>
                <!-- Delete could be added here if backend supported it -->
                   <v-icon size="small" color="red" @click="confirmDelete(ing)">  mdi-delete </v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
        <!-- Delete Confirmation -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">Delete Ingredient?</v-card-title>
        <v-card-text>Are you sure you want to delete <strong>{{ itemToDelete?.name }}</strong>?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="red" variant="flat" @click="deleteItem2">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIngredientStore } from '@/stores/ingredient'

const ingredientStore = useIngredientStore()
const newIngredientName = ref('')
const itemToDelete = ref(null)
const deleteDialog = ref(false)

onMounted(() => {
  ingredientStore.fetchIngredients()
})


const confirmDelete = (item) => {
  itemToDelete.value = item
  deleteDialog.value = true
}

const deleteItem2 = async () => {
  if (itemToDelete.value) {
    try {
      await ingredientStore.deleteIngredient(itemToDelete.value.id)
      deleteDialog.value = false
      itemToDelete.value = null
    } catch (error) {
      console.error('Error deleting ingredient:', error)
      alert(error.response?.data?.detail || 'Failed to delete ingredient. It might be used in a pizza.')
      deleteDialog.value = false
    }
  }
}

const addIngredient = async () => {
  if (newIngredientName.value) {
    try {
      await ingredientStore.addIngredient(newIngredientName.value)
      newIngredientName.value = ''
    } catch (error) {
      console.error('Error adding ingredient:', error)
    }
  }
}
</script>
