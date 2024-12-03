<template>
  <header :class="{ expanded: !isSidebarVisible }">
    <button class="toggle-btn" @click="toggleSidebar">☰</button>

    <div class="header-content">
      <div class="search-bar-container">
        <input
          type="text"
          v-model="search"
          @input="emitSearch"
          placeholder="Search"
          class="search-bar form-control"
        />
      </div>

      <div class="role-selection">
        <button
          @click="selectRole('admin')"
          :class="{ active: currentRole === 'admin' }"
          class="btn btn-secondary"
        >
          Admin
        </button>

        <button
          @click="selectRole('user')"
          :class="{ active: currentRole === 'user' }"
          class="btn btn-secondary"
        >
          User
        </button>
      </div>

      <div class="logout-container">
        <button class="logout-btn btn btn-outline-light" @click="logout">
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },

  props: {
    currentRole: {
      type: String,
      required: true,
    },

    isSidebarVisible: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    selectRole(role) {
      this.$emit("update-role", role);
      const authRole = localStorage.getItem("role");
      const isAuthenticated = Boolean(localStorage.getItem("auth"));
      if (isAuthenticated && authRole === role) {
        this.$router.push({ name: role, params: { component: "items" } });
      } else {
        alert("You do not have permission to switch to this role.");
        this.$router.push({ name: "login" });
        this.$emit("toggle-sidebar", false);
      }
    },

    toggleSidebar() {
      this.$emit("toggle-sidebar");
    },

    emitSearch() {
      EventBus.emit("search", this.search);
    },

    logout() {
      // Menghapus autentikasi dan peran dari localStorage
      localStorage.removeItem("auth");
      localStorage.removeItem("role");
      
      // Arahkan ke halaman login
      this.$router.push({ name: "login" });
    },
  },
};
</script>


<style scoped>
header {
  background-color: #595dd1;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  height: 60px;
  width: calc(100% - 200px);
  position: fixed;
  top: 0;
  left: 200px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease, left 0.3s ease;
}

header.expanded {
  width: 100%;
  left: 0;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  margin-right: 10px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  align-items: center;
}

.search-bar-container {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  margin-right: 8px;
}

.search-bar {
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 250px;
  font-size: 14px;
  outline: none;
}

.role-selection {
  display: flex;
  justify-content: center;
  background-color: #595dd1;
  padding: 10px;
}

.logout-container {
  display: flex;
  align-items: center;
}

.logout-btn {
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #2328b7;
}

button.active {
  background-color: #111580;
}

@media (max-width: 991.98px) {
  header {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center align header content */
    height: auto;
    padding: 10px;
  }

  .header-content {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center align header content */
    width: 100%; /* Ensure it takes full width */
  }

  .search-bar-container {
    width: 80%; /* Increase width for better visibility */
    margin: 10px 0; /* Add margin to separate elements */
  }

  .search-bar {
    width: 100%; /* Full width search bar */
    padding: 10px; /* Add padding for better touch targets */
  }

  .role-selection {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
  }

  .logout-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .toggle-btn {
    margin-bottom: 4px;
  }
}
</style>
