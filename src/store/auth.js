// Utilities
import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    loginError: null,
  }),
  getters: {
    loginError: (state) => state.loginError,
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async merchantLogin(credentials) {
      try {
        const loginUrl = `${import.meta.env.VITE_API_BASE_URL}merchants/login`;
        const response = await axios.post(loginUrl, credentials);
        const token = response.data.data.token;

        localStorage.setItem("token", token);

        return true;
      } catch (error) {
        const errorMessage = error.response.data.errors || "Login Failed";

        return false;
      }
    },
    async merchantRegister(credentials) {
      try {
        const registerUrl = `${import.meta.env.VITE_API_BASE_URL}merchants`;
        const responseRegister = await axios.post(registerUrl, credentials);

        return true;
      } catch (error) {
        const errorMessage = error.response.data.errors || "Login Failed";

        return false;
      }
    },
    logout() {
      localStorage.removeItem("token");
      // window.location.href =
    },
  },
});
