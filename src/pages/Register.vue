<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>
    <div class="relative">
      <div
        class="absolute -inset-0.5 bg-gradient-to-r from-teal-500 via-white to-yellow-400 blur opacity-50 hover:opacity-100 transition duration-200"
      ></div>
      <form
        @submit.prevent="register"
        class="relative p-8 flex flex-col bg-white rounded-md shadow-lg"
      >
        <h1 class="text-3xl text-at-light-green mb-4">Register</h1>
        <div class="flex flex-col mb-2">
          <label for="email" class="mb-1 text-sm text-at-light-green">Email</label>
          <input
            type="text"
            required
            class="p-2 text-gray-500 bg-light-grey border-2 border-solid border-teal-300 rounded-md"
            id="email"
            v-model="email"
          />
        </div>

        <div class="flex flex-col mb-2">
          <label for="password" class="mb-1 text-sm text-at-light-green">Password</label>
          <input
            type="password"
            required
            class="p-2 text-gray-500 bg-light-grey border-2 border-solid border-teal-300 rounded-md"
            id="password"
            v-model="password"
          />
        </div>

        <div class="flex flex-col mb-2">
          <label for="confirmPassword" class="mb-1 text-sm text-at-light-green"
            >Confirm Password</label
          >
          <input
            type="password"
            required
            class="p-2 text-gray-500 bg-light-grey border-2 border-solid border-teal-300 rounded-md"
            id="confirmPassword"
            v-model="confirmPassword"
          />
        </div>

        <button
          type="submit"
          class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
        >
          Register
        </button>
        <router-link class="text-sm mt-6 text-center" :to="{ name: 'Login' }"
          >Already have an account?
          <span class="text-at-light-green">Login</span></router-link
        >
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user.js";
import { useRouter } from "vue-router";

const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);
const router = useRouter();
const userStore = useUserStore();
const register = async () => {
  if (password.value === confirmPassword.value) {
    try {
      const response = userStore.signUp(email.value, password.value);
      router.push({ name: "Login" });
    } catch (error) {
      console.log(error);
      errorMsg.value = `Error: ${error.message}`;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Error: Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
};
</script>

<style lang="scss" scoped></style>
