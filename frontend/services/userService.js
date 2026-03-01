import { api } from './api.js';

export const userService = {
    getAllUsers: async () => {
        return await api.get('/ranking'); // Use ranking for sorted list
    },
    getUserById: async (id) => {
        return await api.get(`/users/${id}`);
    },
    getProfile: async (id) => {
        return await api.get(`/users/${id}/profile`);
    },
    /**
     * Upload une photo de profil
     */
    uploadAvatar: async (userId, file) => {
        const formData = new FormData();
        formData.append('avatar', file);

        // Assuming api.post can handle FormData directly and set appropriate headers
        const response = await api.post(`/users/${userId}/avatar`, formData);

        // The api service should ideally handle error responses and throw
        // If api.post doesn't throw on non-2xx, you might need to check response.ok
        // For now, we'll assume api.post throws or returns data directly.
        return response;
    },
    register: async (data) => {
        return await api.post('/auth/register', data);
    },
    login: async (email, password) => {
        return await api.post('/auth/login', { email, password });
    }
};
