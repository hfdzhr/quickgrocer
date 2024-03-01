<template>
  <div class="d-flex flex-wrap ga-3 mt-5 ml-4">
    <v-card class="mx-auto rounded" width="260" max-width="500" color="primary">
      <v-card-item title="Kategori">
        <template v-slot:subtitle> </template>
      </v-card-item>

      <v-card-text class="py-0">
        <v-row align="center" no-gutters>
          <v-col class="text-h2" cols="6">{{ dataCategory.length }}</v-col>

          <v-col class="text-right" cols="6">
            <v-icon icon="mdi-shape" size="88"></v-icon>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mx-auto rounded" width="260" max-width="500" color="green">
      <v-card-item title="Merk">
        <template v-slot:subtitle> </template>
      </v-card-item>

      <v-card-text class="py-0">
        <v-row align="center" no-gutters>
          <v-col class="text-h2" cols="6">{{ dataBrand.length }}</v-col>

          <v-col class="text-right" cols="6">
            <v-icon icon="mdi-watermark" size="88"></v-icon>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mx-auto rounded" width="260" max-width="500" color="red">
      <v-card-item title="Produk">
        <template v-slot:subtitle> </template>
      </v-card-item>

      <v-card-text class="py-0">
        <v-row align="center" no-gutters>
          <v-col class="text-h2" cols="6">{{ dataProduct.length }}</v-col>

          <v-col class="text-right" cols="6">
            <v-icon icon="mdi-archive" size="88"></v-icon>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { useCategoryStore } from "@/store/category.js";
import { useBrandStore } from "@/store/brand.js";
import { useProductStore } from "@/store/product.js";

import { mapState, mapActions } from "pinia";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(useBrandStore, ["dataBrand"]),
    ...mapState(useCategoryStore, ["dataCategory"]),
    ...mapState(useProductStore, ["dataProduct"]),
  },
  methods: {
    ...mapActions(useBrandStore, ["getBrand"]),
    ...mapActions(useCategoryStore, ["getCategory"]),
    ...mapActions(useProductStore, ["getProduct"]),
  },
  mounted() {
    this.getBrand();
    this.getCategory();
    this.getProduct();
  },
};
</script>
