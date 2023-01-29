<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <div
      v-if="statusMsg || errorMsg"
      class="mb-10 p-4 bg-light-grey rounded-md shadow-lg"
    >
      <p class="text-at-light-green">{{ statusMsg }}</p>
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>
    <div class="relative">
      <div
        class="absolute -inset-0.5 bg-gradient-to-r from-teal-500 via-white to-yellow-400 blur opacity-50 hover:opacity-100 transition duration-200"
      ></div>
      <div class="relative p-8 flex items-start bg-white rounded-md shadow-lg">
        <form @submit.prevent="addTask" class="flex flex-col gap-y-5 w-full">
          <h1 class="text-2xl text-at-light-green">Create a Task</h1>
          <div class="flex flex-col">
            <label for="task-title" class="mb-1 text-sm text-at-light-green"
              >Task title</label
            >
            <input
              type="text"
              required
              class="p-2 text-gray-500 focus:outline-none"
              id="task-title"
              v-model="taskTitle"
            />
          </div>

          <button
            type="submit"
            class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
          >
            Add task
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user.js";
import { useTaskStore } from "../store/task.js";

const userStore = useUserStore();
const tasksStore = useTaskStore();
const statusMsg = ref(null);
const errorMsg = ref(null);
const taskTitle = ref("");

async function addTask() {
  try {
    if (taskTitle.value !== "") {
      await tasksStore.createTask({
        user_id: userStore.user.id,
        title: taskTitle.value,
        is_complete: 0,
      });
    } else {
      errorMsg = `Error: You must type a task title`;
      setTimeout(() => {
        errorMsg = null;
      }, 5000);
    }
  } catch (error) {
    errorMsg = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg = null;
    }, 5000);
  }
}
</script>

<style lang="scss" scoped></style>
