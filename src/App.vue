<template>
  <div class="min-h-full font-Poppins box-border">
    <Navigation />
    <section>
      <router-view class="app-main" />
    </section>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./store/user.js";
import Navigation from "./components/Navigation.vue";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      router.push({ path: "/login" });
    } else {
      // continue to tasks page
      router.push({ path: "/tasks" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>
