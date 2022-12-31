<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <div
      v-if="statusMsg || errorMsg"
      class="mb-10 p-4 bg-light-grey rounded-md shadow-lg"
    >
      <p class="text-at-light-green">{{ statusMsg }}</p>
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>
    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <form class="flex flex-col gap-y-5 w-full">
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
        <div class="flex flex-col">
          <label for="task-title" class="mb-1 text-sm text-at-light-green"
            >Task complete?</label
          >
          <input
            type="checkbox"
            v-model="taskComplete"
            true-value="yes"
            false-value="no"
          />
        </div>
        <button
          type="button"
          class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
        >
          Add task
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../store/task.js";

const tasksArray = ref([]);
const taskTitle = ref("");
const taskComplete = ref(false);
const statusMsg = ref(null);
const errorMsg = ref(null);
</script>

<style lang="scss" scoped></style>
