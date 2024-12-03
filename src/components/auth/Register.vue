<template>
  <div class="register-form">
    <h2 class="h4 fw-bold mb-3 text-custom">Register</h2>

    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>

        <input type="text" id="username" v-model="username" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>

        <input type="email" id="email" v-model="email" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>

        <input type="password" id="password" v-model="password" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="confirm-password" class="form-label">Confirm Password</label>

        <input type="password" id="confirm-password" v-model="confirmPassword" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-success w-100">Register</button>
    </form>

    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>

    <div class="mt-3 text-center">
      <p class="text-muted">
        Already have an account?

        <a href="#" @click.prevent="$emit('switch', 'Login')" class="text-custom">
          Login here
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import { register as registerService } from "@/services/authService";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
    };
  },

  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const response = await registerService(
          this.username,
          this.email,
          this.password
        );
        console.log("Registration successful:", response);
        alert("Registration successful!");
        this.$emit("switch", "Login");
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message || "Invalid request";
        } else {
          this.error = error.message || "An unexpected error occurred";
        }
        console.error("Registration failed:", this.error);
        alert("Registration failed!");
      }
    },
  }
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
