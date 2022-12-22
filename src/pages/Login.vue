<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <form
      @submit.prevent="login"
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-at-light-green mb-4">Login</h1>
      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green">Email</label>
        <input
          type="text"
          required
          class="p-2 text-grey-500 focus:outline-none"
          id="email"
          v-model="email"
        />
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-at-light-green">Password</label>
        <input
          type="password"
          required
          class="p-2 text-grey-500 focus:outline-none"
          id="password"
          v-model="password"
        />
      </div>

      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
      >
        Login
      </button>
      <router-link class="text-sm mt-6 text-center" :to="{ name: 'Register' }"
        >Don't have an account?
        <span class="text-at-light-green">Register</span></router-link
      >
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user.js";
import { useRouter } from "vue-router";

const email = ref(null);
const password = ref(null);
const errorMsg = ref(null);
const router = useRouter();
const userStore = useUserStore();
const login = async () => {
  try {
    const { error } = userStore.signIn(email.value, password.value);
    console.log(error);
    if (error) throw error;
    //router.push({ name: "Dashboard" });
  } catch (error) {
    console.log(error);
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
  return;
};
</script>

<style lang="scss" scoped></style>
