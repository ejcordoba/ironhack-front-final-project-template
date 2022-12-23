<template>
  <header class="bg-at-light-green text-white">
    <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
      <div class="flex items-center gap-x-4">
        <img class="w-14" src="../assets/vue.svg" alt="" />
        <h1 class="text-lg">Fokuso app</h1>
      </div>
      <ul class="flex flex-1 justify-end gap-x-10">
        <router-link v-if="!userStore.user" class="cursor-pointer" :to="{ name: 'Login' }"
          >Login</router-link
        >
        <router-link
          v-if="!userStore.user"
          class="cursor-pointer"
          :to="{ name: 'Register' }"
          >Register</router-link
        >
        <router-link
          v-if="userStore.user"
          class="cursor-pointer"
          :to="{ name: 'Dashboard' }"
          >Dashboard</router-link
        >
        <li v-if="userStore.user" @click="logout" class="cursor-pointer">Logout</li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user.js";
const userStore = useUserStore();
const router = useRouter();

const logout = async () => {
  try {
    const { error } = userStore.logout();
    if (error) throw error;
    router.push({ name: "Login" });
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style lang="scss" scoped></style>
