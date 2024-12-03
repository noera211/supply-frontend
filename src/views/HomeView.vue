<template>
  <div
    class="home-view d-flex flex-column align-items-center justify-content-center min-vh-100 bg-custom text-white"
  >
    <div class="text-center mb-4 welcome-text">
      <h1 class="display-4 fw-bold mb-3">Welcome to AXICODE</h1>

      <p class="lead mb-4">
        A powerful platform to efficiently manage your inventory and streamline
        operations.
      </p>
    </div>

    <div class="auth-container bg-light p-4 rounded shadow">
      <transition name="fade" mode="out-in">
        <component :is="activeComponent" @switch="setActiveComponent" />
      </transition>
    </div>
  </div>
</template>

<script>
import Login from "@/components/auth/Login.vue";

import Register from "@/components/auth/Register.vue";

export default {
  components: {
    Login,

    Register,
  },

  data() {
    return {
      activeComponent: "Login",
    };
  },

  methods: {
    setActiveComponent(component) {
      this.activeComponent = component;
    },
  },
};
</script>

<style scoped>
.home-view {
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  background-color: #4b3f6b;

  min-height: 100vh;

  overflow: auto;

  padding: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.auth-container {
  width: 100%;

  max-width: 400px;

  margin-top: 20px;
}

.welcome-text {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .home-view {
    padding: 10px;
  }

  .auth-container {
    padding: 15px;

    margin-top: 10px;
  }

  .welcome-text {
    margin-top: 10px;
  }
}
</style>
