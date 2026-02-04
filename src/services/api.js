import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor to add JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/admin/login'
        }
        return Promise.reject(error)
    }
)

// Auth endpoints
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }),
    getMe: () => api.get('/auth/me')
}

// Ingredients endpoints
export const ingredientsAPI = {
    getAll: () => api.get('/ingredients/'),
    create: (data) => api.post('/ingredients/', data),
    delete: (id) => api.delete(`/ingredients/${id}`)
}

// Pizzas endpoints
export const pizzasAPI = {
    getAll: () => api.get('/pizzas/'),
    getAllAdmin: () => api.get('/pizzas/admin'),
    create: (data) => api.post('/pizzas/', data),
    update: (id, data) => api.put(`/pizzas/${id}`, data),
    delete: (id) => api.delete(`/pizzas/${id}`)
}

export default api
