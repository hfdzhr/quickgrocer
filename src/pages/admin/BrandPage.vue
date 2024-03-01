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
        <th class="text-left">Nama Merk</th>
        <th class="text-left">Di Tambahkan</th>
        <th class="text-left">Di Edit</th>
        <th class="text-left">Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(brand, index) in dataBrand" :key="brand.id">
        <td>{{ index + 1 }}</td>
        <td>{{ brand.id }}</td>
        <td>{{ brand.name }}</td>
        <td>{{ brand.created_at }}</td>
        <td>{{ brand.updated_at }}</td>
        <td>
          <v-row dense>
            <v-btn
              class="rounded-pill"
              append-icon="mdi-pencil"
              color="primary"
              @click="openEditDialog(brand)"
              >Edit</v-btn
            >
            <div class="mx-2"></div>
            <v-btn
              class="rounded-pill"
              append-icon="mdi-delete"
              color="red"
              @click="deleteSubmit(brand.id)"
              >Hapus</v-btn
            >
          </v-row>
        </td>
      </tr>
    </tbody>
  </v-table>

  <!-- Create brand -->
  <div class="pa-4 text-center">
    <v-dialog v-model="dialogTambah" max-width="600">
      <v-card prepend-icon="mdi-watermark" title="Merk">
        <v-card-text>
          <v-row dense>
            <v-col>
              <v-text-field
                label="Nama Merk"
                v-model="brandName"
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
      <v-card prepend-icon="mdi-watermark" title="Edit Merk">
        <v-card-text>
          <v-row dense>
            <v-col>
              <v-text-field
                label="Nama Merk"
                v-model="editBrandName"
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
import { useBrandStore } from "../../store/brand.js";

import { mapState, mapActions } from "pinia";
export default {
  data: () => ({
    dialogTambah: false,
    dialogEdit: false,
    brandName: "",
    editBrandName: "",
    selectedBrandId: null,
  }),
  computed: {
    ...mapState(useBrandStore, ["dataBrand"]),
  },
  methods: {
    ...mapActions(useBrandStore, [
      "getBrand",
      "addBrand",
      "editBrand",
      "deleteBrand",
    ]),
    async addSubmit() {
      const request = {
        name: this.brandName,
      };
      await this.addBrand(request);

      this.getBrand();

      this.dialogTambah = false;
    },

    openEditDialog(brand) {
      this.dialogEdit = true;
      this.editBrandName = brand.name;
      this.selectedBrandId = brand.id;
    },

    async editSubmit() {
      const request = {
        name: this.editBrandName,
      };

      await this.editBrand(this.selectedBrandId, request);

      this.getBrand(); // Refresh data after edit

      this.dialogEdit = false;
      this.editBrandName = ""; // Reset form
      this.selectedBrandId = null; // Clear stored ID
    },

    async deleteSubmit(brandId) {
      await this.deleteBrand(brandId);

      this.getBrand();

      this.dialogTambah = false;
    },
  },
  mounted() {
    this.getBrand();
  },
};
</script>
