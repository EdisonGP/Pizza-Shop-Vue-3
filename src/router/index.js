import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Layouts
import PublicLayout from '@/layouts/PublicLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// Public views
import Home from '@/views/public/Home.vue'

// Admin views
import Login from '@/views/admin/Login.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import PizzaManager from '@/views/admin/PizzaManager.vue'
import IngredientManager from '@/views/admin/IngredientManager.vue'

//Inyección en Cascada:
    //Vue carga App.vue.
    //Dentro del <router-view /> de App.vue, inyecta el AdminLayout.vue.
    //Dentro del <router-view /> que debe tener el AdminLayout, inyecta el PizzaManager.vue.

const routes = [
    {
        path: '/',
        component: PublicLayout,
        children: [
            {
                path: '',
                name: 'home',
                component: Home
            }
        ]
    },
    {
        path: '/admin/login',
        name: 'login',
        component: Login,
        meta: { requiresGuest: true }
    },
    {
        path: '/admin',
        component: AdminLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'dashboard',
                component: Dashboard
            },
            {
                path: 'pizzas',
                name: 'pizza-manager',
                component: PizzaManager
            },
            {
                path: 'ingredients',
                name: 'ingredient-manager',
                component: IngredientManager
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'login' })
    } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
        next({ name: 'dashboard' })
    } else {
        next()
    }
})

export default router
