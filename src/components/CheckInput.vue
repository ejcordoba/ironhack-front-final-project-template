<template>
  <div class="w-full flex justify-center my-3">
    <input
      class="w-4 h-4 accent-yellow-400 text-teal-400 bg-gray-100 rounded-md border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      type="checkbox"
      v-model="task.is_complete"
      @change="checkCompletion(task.id, task.is_complete)"
    />
    <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >Complete</label
    >
  </div>
</template>

<script setup>
import { useTaskStore } from "../store/task.js";
import { ref } from "vue";
const props = defineProps(["task"]);
const tasksStore = useTaskStore();

async function checkCompletion(id, complete) {
  const response = await tasksStore.toggleCompletionTask(id, complete);
}
</script>

<style lang="scss" scoped></style>
