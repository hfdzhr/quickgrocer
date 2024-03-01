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
        <th class="text-left">Id</th>
        <th class="text-left">Nama Kategori</th>
        <th class="text-left">Di Tambahkan</th>
        <th class="text-left">Di Edit</th>
        <th class="text-left">Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(category, index) in dataCategory" :key="category.id">
        <td>{{ index + 1 }}</td>
        <td>{{ category.id }}</td>
        <td>{{ category.name }}</td>
        <td>{{ category.created_at }}</td>
        <td>{{ category.updated_at }}</td>
        <td>
          <v-row dense>
            <v-btn
              class="rounded-pill"
              append-icon="mdi-pencil"
              color="primary"
              @click="openEditDialog(category)"
              >Edit</v-btn
            >
            <div class="mx-2"></div>
            <v-btn
              class="rounded-pill"
              append-icon="mdi-delete"
              color="red"
              @click="deleteSubmit(category.id)"
              >Hapus</v-btn
            >
          </v-row>
        </td>
      </tr>
    </tbody>
  </v-table>

  <!-- Create Category -->
  <div class="pa-4 text-center">
    <v-dialog v-model="dialogTambah" max-width="600">
      <v-card prepend-icon="mdi-shape" title="Kategori">
        <v-card-text>
          <v-row dense>
            <v-col>
              <v-text-field
                label="Nama Kategori"
                v-model="categoryName"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="dialogTambah = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="addSubmit"
          ></v-btn>
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
import { useCategoryStore } from "../../store/category.js";

import { mapState, mapActions } from "pinia";
export default {
  data: () => ({
    dialogTambah: false,
    dialogEdit: false,
    categoryName: "",
    editCategoryName: "",
    selectedCategoryId: null,
  }),
  computed: {
    ...mapState(useCategoryStore, ["dataCategory"]),
  },
  methods: {
    ...mapActions(useCategoryStore, [
      "getCategory",
      "addCategory",
      "editCategory",
      "deleteCategory",
    ]),
    async addSubmit() {
      const request = {
        name: this.categoryName,
      };
      await this.addCategory(request);

      this.getCategory();

      this.dialogTambah = false;
    },

    openEditDialog(category) {
      this.dialogEdit = true;
      this.editCategoryName = category.name; // Set category name for editing
      this.selectedCategoryId = category.id; // Store selected category ID
    },

    async editSubmit() {
      const request = {
        name: this.editCategoryName,
      };

      await this.editCategory(this.selectedCategoryId, request);

      this.getCategory(); // Refresh data after edit

      this.dialogEdit = false;
      this.editCategoryName = ""; // Reset form
      this.selectedCategoryId = null; // Clear stored ID
    },

    async deleteSubmit(categoryId) {
      console.log(categoryId);
      await this.deleteCategory(categoryId);

      this.getCategory();

      this.dialogTambah = false;
    },
  },
  mounted() {
    this.getCategory();
  },
};
</script>
