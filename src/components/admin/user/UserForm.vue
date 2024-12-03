<template>
  <form @submit.prevent="submitForm" class="user-form">
    <div class="mb-3">
      <label for="username" class="form-label">Username</label>

      <input
        type="text"
        v-model="form.username"
        id="username"
        class="form-control"
        required
      />
    </div>

    <div class="mb-3">
      <label for="email" class="form-label">Email</label>

      <input
        type="email"
        v-model="form.email"
        id="email"
        class="form-control"
        required
      />
    </div>

    <div v-if="!isEdit" class="mb-3">
      <label for="password" class="form-label">Password</label>

      <input
        type="password"
        v-model="form.password"
        id="password"
        class="form-control"
        required
      />
    </div>

    <div v-if="!isEdit" class="mb-3">
      <label for="confirmPassword" class="form-label">Confirm Password</label>

      <input
        type="password"
        v-model="form.confirmPassword"
        id="confirmPassword"
        class="form-control"
        required
      />
    </div>

    <div class="mb-3">
      <label for="role" class="form-label">Role</label>

      <select v-model="form.role" id="role" class="form-select" required>
        <option value="ADMIN">ADMIN</option>

        <option value="USER">USER</option>
      </select>
    </div>

    <div v-if="form.error" class="alert alert-danger">{{ form.error }}</div>

    <button type="submit" class="btn btn-success w-100">
      {{ isEdit ? "Simpan Perubahan" : "Tambah Pengguna" }}
    </button>
  </form>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },

    isEdit: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "USER",
        error: "",
      },
    };
  },

  watch: {
    user: {
      immediate: true,

      handler(newUser) {
        if (this.isEdit) {
          this.form = {
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
          };
        } else {
          this.resetForm();
        }
      },
    },
  },

  methods: {
    resetForm() {
      this.form = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "USER",
        error: "",
      };
    },

    async submitForm() {
      try {
        if (!this.isEdit) {
          if (this.form.password !== this.form.confirmPassword) {
            this.form.error = "Passwords do not match";

            return;
          }
        }

        this.form.error = "";

        const payload = {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          role: this.form.role,
        };

        console.log("Sending data to server:", payload);

        if (this.isEdit) {
          await axios.patch(`/users/${this.user.id}`, payload);
        } else {
          const response = await axios.post("/users", payload);
          console.log("User created:", response.data);
        }

        this.$emit("submit", this.form);
        this.resetForm();
      } catch (error) {
        console.error("Failed to submit form:", error);
        this.form.error = "Failed to submit form: " + error.message;
      }
    },
  },
};
</script>

<style scoped>

.user-form .form-label {
margin-top: 1rem;
}

.alert {
margin-top: 1rem;
}

</style>
