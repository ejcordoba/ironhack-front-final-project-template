<template>
  <div class="relative group">
    <div
      class="absolute -inset-0.5 bg-gradient-to-r from-teal-500 via-white to-yellow-400 blur opacity-50 hover:opacity-100 transition duration-200"
    ></div>
    <header class="relative bg-white text-teal-500">
      <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
        <div class="flex items-center gap-x-10">
          <img class="w-20" src="../assets/brainwave-logo-2.png" alt="app-logo" />
          <h1 class="text-2xl">BrainWave Focus</h1>
        </div>
        <ul class="flex flex-1 justify-end gap-x-10">
          <router-link
            v-if="!userStore.user"
            class="cursor-pointer hover:text-yellow-400 transition duration-200"
            :to="{ name: 'Login' }"
            >Login</router-link
          >
          <router-link
            v-if="!userStore.user"
            class="cursor-pointer hover:text-yellow-400 transition duration-200"
            :to="{ name: 'Register' }"
            >Register</router-link
          >
          <!-- <router-link
            v-if="userStore.user"
            class="cursor-pointer hover:text-yellow-400 transition duration-200"
            :to="{ name: 'Dashboard' }"
            >Dashboard</router-link
          > -->
          <router-link
            v-if="userStore.user"
            class="cursor-pointer hover:text-yellow-400 transition duration-200"
            :to="{ name: 'Tasks' }"
            >Tasks</router-link
          >
          <li
            v-if="userStore.user"
            @click="logout"
            class="cursor-pointer hover:text-yellow-400 transition duration-200"
          >
            Logout
          </li>
        </ul>
      </nav>
    </header>
  </div>
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
