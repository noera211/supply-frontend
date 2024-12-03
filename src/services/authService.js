import apiClient from "@/plugins/axios";
import { useAuthStore } from "@/store/authStore";

export const login = async (username, password) => {
  try {
    const response = await apiClient.post("./auth/login", {
      username,
      password,
    });
    console.log("Login response:", response.data);

    if (!response.data || !response.data.data || !response.data.data.token) {
      throw new Error("Invalid response from serve");
    }

    const { token, role } = response.data.data;
    console.log("Token and role from login service:", token, role);

    const authStore = useAuthStore();
    authStore.setToken(token);
    authStore.setRole(role);

    console.log(
      "Token and role saved in store:",
      authStore.token,
      authStore.role
    );
    return response.data.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error(
            error.response.data.message || "Username or password is incorrect"
          );

        case 401:
          throw new Error(error.response.data.message || "Invalid credentials");

        default:
          throw new Error(error.response.data.message || "An error occurred");
      }
    } else {
      console.error("Error during login:", error);

      throw new Error(error.message || "An unexpected error occurred");
    }
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await apiClient.post("./auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error(error.response.data.message || "User already exists");

        default:
          throw new Error(error.response.data.message || "An error occurred");
      }
    } else {
      console.error("Error during registration:", error);

      throw new Error(error.message || "An unexpected error occurred");
    }
  }
};
