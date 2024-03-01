// Utilities
import axios from "axios";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    dataProduct: [],
  }),
  getters: {
    getAllProduct: (state) => state.dataProduct,
  },
  actions: {
    async getProduct() {
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}products`;
        const token = localStorage.getItem("token");
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.dataProduct = response.data.data;

        return true;
      } catch (error) {
        alert(error.response.data.errors);

        return false;
      }
    },
    // async addCategory(request) {
    //   try {
    //     const url = `${import.meta.env.VITE_API_BASE_URL}categories`;
    //     const token = localStorage.getItem("token");
    //     const response = await axios.post(url, request, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     this.dataCategory = response.data.data;

    //     return true;
    //   } catch (error) {
    //     alert(error.response.data.errors);

    //     return false;
    //   }
    // },
    // async editCategory(categoryId, request) {
    //   try {
    //     const url = `${
    //       import.meta.env.VITE_API_BASE_URL
    //     }categories/${categoryId}`;
    //     const token = localStorage.getItem("token");
    //     const response = await axios.patch(url, request, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     this.dataCategory = response.data.data;

    //     return true;
    //   } catch (error) {
    //     alert(error.response.data.errors);

    //     return false;
    //   }
    // },
    // async deleteCategory(categoryId) {
    //   try {
    //     const url = `${
    //       import.meta.env.VITE_API_BASE_URL
    //     }categories/${categoryId}`;
    //     const token = localStorage.getItem("token");
    //     const response = await axios.delete(url, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     this.dataCategory = response.data.data;

    //     return true;
    //   } catch (error) {
    //     alert(error.response);

    //     return false;
    //   }
    // },
  },
});
