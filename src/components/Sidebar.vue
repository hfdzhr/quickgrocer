<template>
  <v-app id="inspire">
    <v-navigation-drawer app :permanent="true" v-model="drawer">
      <v-sheet class="pa-4" color="grey-lighten-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

        <div>john@google.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text, to] in links"
          :key="icon"
          :prepend-icon="icon"
          :title="text"
          @click="navigate(to)"
          link
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-btn class="ma-2" color="red">
        Logout
        <v-icon icon="mdi-logout" end></v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const cards = ["Today", "Yesterday"];
const links = [
  ["mdi-home", "Statistik", "/admin"],
  ["mdi-shape", "Kategori", "/admin/CategoryPage"],
  ["mdi-watermark", "Merk", "/admin/BrandPage"],
  ["mdi-archive", "Product", "/admin/ProductPage"],
];

const drawer = ref(null);
</script>

<script>
useAuthStore;
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "@/store/auth.js";
export default {
  methods: {
    navigate(to) {
      this.$router.push(to); // Navigasi menggunakan Vue Router
    },
  },
};
</script>
