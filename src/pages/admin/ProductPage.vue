<template>
  <v-btn
    class="float-right mt-5 rounded-pill"
    append-icon="mdi-plus"
    color="green"
    @click="dialogTambah = true"
    >Tambah</v-btn
  >
  <v-table height="300px" class="mt-10 ml-10" fixed-header>
    <thead>
      <tr>
        <th class="text-left">No.</th>
        <th class="text-left">Nama</th>
        <th class="text-left">Gambar</th>
        <th class="text-left">Kuantitas</th>
        <th class="text-left">Harga</th>
        <th class="text-left">Kategori</th>
        <th class="text-left">Merk</th>
        <th class="text-left">Deskripsi</th>
        <th class="text-left">Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(product, index) in dataProduct" :key="product.id">
        <td>{{ index + 1 }}</td>
        <td>{{ product.name }}</td>
        <td>
          <v-img
            :width="150"
            aspect-ratio="4/3"
            cover
            :src="'http://localhost:3000/' + product.image_url"
          ></v-img>
        </td>
        <td>{{ product.quantity }}</td>
        <td>Rp. {{ product.price }}</td>
        <td>{{ product.category.name }}</td>
        <td>{{ product.brand.name }}</td>
        <td>{{ product.description }}</td>
        <td>
          <v-col dense>
            <v-btn
              class="rounded-pill"
              append-icon="mdi-pencil"
              color="primary"
              @click="openEditDialog(category)"
              >Edit</v-btn
            >
            <div class="my-2"></div>
            <v-btn
              class="rounded-pill"
              append-icon="mdi-delete"
              color="red"
              @click="deleteSubmit(category.id)"
              >Hapus</v-btn
            >
          </v-col>
        </td>
      </tr>
    </tbody>
  </v-table>

  <!-- Create Category -->
  <div class="pa-4 text-center">
    <v-dialog v-model="dialogTambah" max-width="600">
      <v-card prepend-icon="mdi-archive" title="Produk">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                label="Nama Produk"
                v-model="addProductProductName"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-file-input
                label="Gambar"
                v-model="addProductImage"
                accept="image/*"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Kuantitas"
                v-model="addProductQuantity"
                type="number"
                required
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Harga"
                v-model="addProductPrice"
                type="number"
                required
              />
            </v-col>
            <v-col cols="6">
              <v-select
                :items="dataCategory.map((category) => category.name)"
                :value="dataCategory.map((category) => category.id)"
                label="Kategori"
                v-model="addProductCategory"
                required
              />
            </v-col>
            <v-col cols="6">
              <v-select
                :items="dataBrand.map((brand) => brand.name)"
                :value="dataBrand.map((brand) => brand.id)"
                label="Merk"
                v-model="addProductBrand"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-textarea label="Deskripsi" v-model="addProductDescription" />
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialogTambah = false" />

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="addSubmit"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialoag Edit -->
    <v-dialog v-model="dialogEdit" max-width="600">
      <v-card prepend-icon="mdi-shape" title="Edit Kategori">
        <v-card-text>
          <v-row dense>
            <v-col>
              <v-text-field
                label="Nama Kategori"
                v-model="editCategoryName"
                required
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialogEdit = false" />

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="editSubmit"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { useCategoryStore } from "@/store/category.js";
import { useProductStore } from "../../store/product.js";

import { mapState, mapActions } from "pinia";
import { useBrandStore } from "@/store/brand.js";
export default {
  data: () => ({
    dialogTambah: false,
    dialogEdit: false,
    addProductProductName: "",
    addProductImage: null,
    addProductQuantity: 0,
    addProductPrice: 0,
    addProductCategory: null,
    addProductBrand: null,
    addProductDescription: "",
  }),
  computed: {
    ...mapState(useProductStore, ["dataProduct"]),
    ...mapState(useCategoryStore, ["dataCategory"]),
    ...mapState(useBrandStore, ["dataBrand"]),
  },
  methods: {
    ...mapActions(useProductStore, ["getProduct"]),
    ...mapActions(useCategoryStore, ["getCategory"]),
    ...mapActions(useBrandStore, ["getBrand"]),
    async addSubmit() {
      const formData = new FormData();
      formData.append("name", this.addProductProductName);
      formData.append("image", this.addProductImage);
      formData.append("quantity", this.addProductQuantity);
      formData.append("price", this.addProductPrice);
      formData.append("category_id", this.addProductCategory.id); // Use category ID
      formData.append("brand_id", this.addProductBrand.id); // Use brand ID
      formData.append("description", this.addProductDescription);

      await this.addProduct(formData); // Assuming "addProduct" action exists

      this.getProduct(); // Refresh data after adding

      this.dialogTambah = false;
      this.resetAddProductForm(); // Reset form after submission
    },

    // openEditDialog(category) {
    //   this.dialogEdit = true;
    //   this.editCategoryName = category.name; // Set category name for editing
    //   this.selectedCategoryId = category.id; // Store selected category ID
    // },

    // async editSubmit() {
    //   const request = {
    //     name: this.editCategoryName,
    //   };

    //   await this.editCategory(this.selectedCategoryId, request);

    //   this.getCategory(); // Refresh data after edit

    //   this.dialogEdit = false;
    //   this.editCategoryName = ""; // Reset form
    //   this.selectedCategoryId = null; // Clear stored ID
    // },

    // async deleteSubmit(categoryId) {
    //   console.log(categoryId);
    //   await this.deleteCategory(categoryId);

    //   this.getCategory();

    //   this.dialogTambah = false;
    // },
  },
  mounted() {
    this.getProduct();
    this.getCategory();
    this.getBrand();
  },
};
</script>
