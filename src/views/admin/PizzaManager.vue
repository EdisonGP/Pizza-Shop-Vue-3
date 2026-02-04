<template>
  <v-container>
    <v-row class="align-center mb-6">
      <v-col>
        <h1 class="text-h4 font-weight-bold">Pizza Management</h1>
      </v-col>
      <v-col class="text-right">
        <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreateDialog">
          Add New Pizza
        </v-btn>
      </v-col>
    </v-row>

    <v-card class="elevation-2">
      <v-data-table
        :headers="headers"
        :items="pizzaStore.adminPizzas"
        :loading="pizzaStore.loading"
        hover
      >
        <template v-slot:item.image_url="{ item }">
          <v-avatar size="40" rounded="sm">
            <v-img :src="item.image_url || '/placeholder-pizza.png'" cover />
          </v-avatar>
        </template>
        
        <template v-slot:item.price="{ item }">
          ${{ item.price.toFixed(2) }}
        </template>

        <template v-slot:item.ingredients="{ item }">
          <v-chip
            v-for="ing in item.ingredients"
            :key="ing.id"
            size="x-small"
            class="mr-1"
          >
            {{ ing.name }}
          </v-chip>
        </template>

        <template v-slot:item.is_active="{ item }">
          <v-chip
            :color="item.is_active ? 'success' : 'grey'"
            variant="flat"
            size="x-small"
          >
            {{ item.is_active ? 'Visible' : 'Hidden' }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon size="small" class="mr-2" color="blue" @click="editPizza(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" color="red" @click="confirmDelete(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <!-- Create/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="bg-primary text-white">
          <span class="text-h6">{{ isEditing ? 'Edit Pizza' : 'New Pizza' }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="form.name" label="Pizza Name*" required variant="outlined" />
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="form.description" label="Description" variant="outlined" rows="3" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model.number="form.price" label="Price*" type="number" prefix="$" variant="outlined" />
              </v-col>
              <v-col cols="12" md="6">
                <v-switch v-model="form.is_active" label="Visible to Public" color="success" />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="form.image_url" label="Image URL" variant="outlined" />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="form.ingredient_ids"
                  :items="ingredientStore.ingredients"
                  item-title="name"
                  item-value="id"
                  label="Ingredients"
                  multiple
                  chips
                  variant="outlined"
                />
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" variant="flat" :loading="pizzaStore.loading" @click="savePizza">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">Delete Pizza?</v-card-title>
        <v-card-text>Are you sure you want to delete <strong>{{ itemToDelete?.name }}</strong>?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="red" variant="flat" @click="deleteItem">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { usePizzaStore } from '@/stores/pizza'
import { useIngredientStore } from '@/stores/ingredient'

const pizzaStore = usePizzaStore()
const ingredientStore = useIngredientStore()

const dialog = ref(false)
const deleteDialog = ref(false)
const isEditing = ref(false)
const itemToDelete = ref(null)

const headers = [
  { title: 'Image', key: 'image_url', sortable: false },
  { title: 'Name', key: 'name' },
  { title: 'Price', key: 'price' },
  { title: 'Ingredients', key: 'ingredients', sortable: false },
  { title: 'Status', key: 'is_active' },
  { title: 'Actions', key: 'actions', sortable: false, align: 'end' },
]

const defaultForm = {
  id: null,
  name: '',
  description: '',
  price: 0,
  image_url: '',
  is_active: true,
  ingredient_ids: []
}

const form = reactive({ ...defaultForm })

onMounted(async () => {
  await pizzaStore.fetchAdminPizzas()
  await ingredientStore.fetchIngredients()
})

const openCreateDialog = () => {
  isEditing.value = false
  Object.assign(form, defaultForm)
  dialog.value = true
}

const editPizza = (item) => {
  isEditing.value = true
  Object.assign(form, {
    ...item,
    ingredient_ids: item.ingredients.map(i => i.id)
  })
  dialog.value = true
}

const confirmDelete = (item) => {
  itemToDelete.value = item
  deleteDialog.value = true
}

const deleteItem = async () => {
  if (itemToDelete.value) {
    await pizzaStore.deletePizza(itemToDelete.value.id)
    deleteDialog.value = false
    itemToDelete.value = null
  }
}

const savePizza = async () => {
  try {
    if (isEditing.value) {
      await pizzaStore.updatePizza(form.id, form)
    } else {
      await pizzaStore.createPizza(form)
    }
    dialog.value = false
  } catch (error) {
    console.error('Error saving pizza:', error)
  }
}
</script>
