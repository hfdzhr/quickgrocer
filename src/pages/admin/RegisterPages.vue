<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Email</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="email"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Password
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        v-model="password"
        @click:append-inner="visible = !visible"
      ></v-text-field>
      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Nama Lengkap
      </div>

      <v-text-field
        density="compact"
        placeholder="Enter your Full Name"
        prepend-inner-icon="mdi-text"
        variant="outlined"
        v-model="fullName"
      ></v-text-field>
      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Nama Toko
      </div>

      <v-text-field
        density="compact"
        placeholder="Enter your Merchant"
        prepend-inner-icon="mdi-store"
        variant="outlined"
        v-model="merchantName"
      ></v-text-field>
      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Nomor Telepon
      </div>

      <v-text-field
        density="compact"
        placeholder="Enter your Phone Number"
        prepend-inner-icon="mdi-phone"
        variant="outlined"
        type="tel"
        v-model="phoneNumber"
      ></v-text-field>

      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        @click="signup"
        block
      >
        Signup
      </v-btn>
    </v-card>
  </div>
</template>
<script>
import { useAuthStore } from "../../store/auth.js";

export default {
  data: () => ({
    email: "",
    password: "",
    fullName: "",
    merchantName: "",
    phoneNumber: "",
    visible: false,
  }),
  methods: {
    signup() {
      try {
        const request = {
          email: this.email,
          password: this.password,
          full_name: this.fullName,
          merchant_name: this.merchantName,
          phone_number: this.phoneNumber,
        };
        
        const register = useAuthStore().merchantRegister(request);

        if (register) {
          this.$router.push("/admin/LoginPages");
        } else {
          alert("asjak");
        }
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>
