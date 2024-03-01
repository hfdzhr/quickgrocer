// Utilities
import axios from "axios";
import { defineStore } from "pinia";

export const useBrandStore = defineStore("brand", {
  state: () => ({
    dataBrand: [],
  }),
  getters: {
    getAllBrand: (state) => state.dataBrand,
  },
  actions: {
    async getBrand() {
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}brands`;
        const token = localStorage.getItem("token");
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.dataBrand = response.data.data;

        return true;
      } catch (error) {
        alert(error.response.data.errors);

        return false;
      }
    },
    async addBrand(request) {
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}brands`;
        const token = localStorage.getItem("token");
        const response = await axios.post(url, request, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.dataBrand = response.data.data;

        return true;
      } catch (error) {
        alert(error.response.data.errors);

        return false;
      }
    },
    async editBrand(brandId, request) {
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}brands/${brandId}`;
        const token = localStorage.getItem("token");
        const response = await axios.patch(url, request, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.dataBrand = response.data.data;

        return true;
      } catch (error) {
        alert(error.response.data.errors);

        return false;
      }
    },
    async deleteBrand(brandId) {
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}brands/${brandId}`;
        const token = localStorage.getItem("token");
        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.dataBrand = response.data.data;

        return true;
      } catch (error) {
        alert(error.response);

        return false;
      }
    },
  },
});
