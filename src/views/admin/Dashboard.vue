<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-4 font-weight-bold primary--text">Admin Dashboard</h1>
        <p class="text-subtitle-1 grey--text text--darken-1">Manage your Pizza Shop inventory and settings.</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-card class="elevation-4 pizza-card" link :to="{ name: 'pizza-manager' }">
          <v-card-text class="d-flex align-center">
            <v-icon x-large color="primary" class="mr-4">mdi-pizza</v-icon>
            <div>
              <div class="text-h5 font-weight-bold">Manage Pizzas</div>
              <div class="text-caption">Add, edit, or remove pizzas from the menu.</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="elevation-4 pizza-card" link :to="{ name: 'ingredient-manager' }">
          <v-card-text class="d-flex align-center">
            <v-icon x-large color="secondary" class="mr-4">mdi-leaf</v-icon>
            <div>
              <div class="text-h5 font-weight-bold">Manage Ingredients</div>
              <div class="text-caption">Define ingredients available for your recipes.</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="elevation-4 pizza-card" link to="/">
          <v-card-text class="d-flex align-center">
            <v-icon x-large color="accent" class="mr-4">mdi-eye</v-icon>
            <div>
              <div class="text-h5 font-weight-bold">View Public Shop</div>
              <div class="text-caption">See how the shop looks for your customers.</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12">
        <v-card class="elevation-2">
          <v-card-title>Quick Info</v-card-title>
          <v-card-text>
            <p>Welcome back, Admin. Use the navigation menu or cards above to manage the pizza catalog.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Dashboard logic can be expanded here (e.g. fetching counts)
</script>

<style scoped>
.pizza-card {
  transition: transform 0.3s ease;
  border-left: 5px solid #d32f2f; /* Pizza red */
}
.pizza-card:hover {
  transform: translateY(-5px);
}
</style>
