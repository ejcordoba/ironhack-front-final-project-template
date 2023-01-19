<template>
  <button
    @click="deleteTask(task.id)"
    type="button"
    class="w-1/2 my-1 py-2 px-6 rounded-sm self-start text-sm text-white bg-red-500 border-solid border-2 border-transparent hover:border-red-500 hover:bg-white hover:text-red-500"
  >
    Remove
  </button>
</template>

<script setup>
import { useTaskStore } from "../store/task.js";
import { ref } from "vue";
const props = defineProps(["task"]);
const tasksStore = useTaskStore();

async function deleteTask(id) {
  const response = await tasksStore.deleteTask(id);
}
</script>

<style lang="scss" scoped></style>
