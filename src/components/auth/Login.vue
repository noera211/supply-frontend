<template>
  <div class="login-form">
    <h2 class="h4 fw-bold mb-3 text-custom">Login</h2>

    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>

        <input
          type="text"
          id="username"
          v-model="username"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>

        <input
          type="password"
          id="password"
          v-model="password"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
    <!-- alert penanganan kesalahan -->
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    
    <div class="mt-3 text-center">
      <p class="text-muted">
        Don't have an account?

        <a
          href="#"
          @click.prevent="$emit('switch', 'Register')"
          class="text-custom"
        >
          Register here
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import { login as loginService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },

  methods: {
    async login() {
      try {
        const { token, role } = await loginService(
          this.username,
          this.password
        );

        const authStore = useAuthStore();
        authStore.setToken(token);
        authStore.setRole(role);

        if (role === "ADMIN") {
          this.$router.push({ name: "admin" ,params: { component: "dashboard" }});
        } else if (role === "USER") {
          this.$router.push({ name: "user", params: { component: "dashboard" } });
        }
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
.text-custom {
  color: #4b3f6b;
}

.form-label {
  color: #000;
}
</style>
