import { defineStore } from 'pinia';
import apiClient from '@/plugins/axios';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
  }),

  actions: {

    async fetchUsers() {
        try {
          const response = await apiClient.get('/users');
          console.log('Fetched users:', response.data);
          this.users = response.data;
        } catch (error) {
            console.error('Error fetching users:', error); // Log lengkap error
            if (error.response && error.response.status === 401) {
              console.error('Unauthorized: Token might be invalid or expired.');
              // Opsi: Redirect ke login page
            } else {
              console.error('Failed to fetch users:', error.message);
            }
        }

      },
      
    async addUser(user) {
      try {
        const response = await apiClient.post('/users', user);
        this.users.push(response.data);
      } catch (error) {
        console.error('Failed to add user:', error.message);
      }
    },

    async updateUser(user) {
      try {
        const response = await apiClient.patch(`/users/${user.id}`, user);
        const index = this.users.findIndex((u) => u.id === user.id);

        if (index !== -1) {
          this.users.splice(index, 1, response.data);
        }
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    },

    async deleteUser(id) {
      try {
        await apiClient.delete(`/users/${id}`);

        this.users = this.users.filter((user) => user.id !== id);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    },
  },
});
