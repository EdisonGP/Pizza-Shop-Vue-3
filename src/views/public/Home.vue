<template>
  <v-container>
    <v-row class="mb-8">
      <v-col cols="12" class="text-center">
        <v-img src="/pizza-hero.jpg" height="300" cover class="rounded-xl mb-4 align-center justify-center text-white elevation-10">
            <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height bg-grey-lighten-2">
                    <v-icon size="x-large">mdi-pizza</v-icon>
                </div>
            </template>
            <div class="hero-overlay">
                <h1 class="text-h2 font-weight-black mb-2 shadow-text">Fresh, Hot & Delicious</h1>
                <p class="text-h5 shadow-text">The best artisanal pizzas in town.</p>
            </div>
        </v-img>
      </v-col>
    </v-row>

    <h2 class="text-h4 mb-6 font-weight-bold">Our Menu</h2>
    
    <v-row v-if="pizzaStore.loading">
      <v-col v-for="i in 6" :key="i" cols="12" sm="6" md="4">
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>

    <v-row v-else-if="pizzaStore.pizzas.length > 0">
      <v-col v-for="pizza in pizzaStore.pizzas" :key="pizza.id" cols="12" sm="6" md="4">
        <v-card class="pizza-shop-card h-100 elevation-6 rounded-lg overflow-hidden">
          <v-img
            :src="pizza.image_url || '/placeholder-pizza.png'"
            height="200"
            cover
            class="align-end"
          >
            <v-card-title class="text-white font-weight-bold pizza-name-shadow">{{ pizza.name }}</v-card-title>
          </v-img>

          <v-card-text class="pt-4">
            <p class="text-body-1 grey--text text--darken-2 mb-4">{{ pizza.description }}</p>
            
            <div class="mb-4">
              <v-chip
                v-for="ing in pizza.ingredients"
                :key="ing.id"
                size="small"
                variant="outlined"
                color="red-darken-2"
                class="mr-1 mb-1"
              >
                {{ ing.name }}
              </v-chip>
            </div>

            <div class="d-flex align-center justify-space-between mt-auto">
              <span class="text-h5 font-weight-bold text-red-darken-4">${{ pizza.price.toFixed(2) }}</span>
              <v-btn color="red-darken-3" rounded="pill" variant="flat">
                Order Now
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else class="text-center py-12">
      <v-col>
        <v-icon size="x-large" color="grey">mdi-pizza-off</v-icon>
        <p class="text-h6 grey--text">Our oven is resting. No pizzas available currently.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePizzaStore } from '@/stores/pizza'

const pizzaStore = usePizzaStore()

onMounted(() => {
  pizzaStore.fetchPizzas()
})
</script>

<style scoped>
.pizza-shop-card {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.pizza-shop-card:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2) !important;
}
.hero-overlay {
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.shadow-text {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
}
.pizza-name-shadow {
  background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  width: 100%;
}
</style>
