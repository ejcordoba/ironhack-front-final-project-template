<template>
  <button
    @click="editTask(task)"
    type="button"
    class="my-1 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
  >
    Edit
  </button>
</template>

<script setup>
import { useTaskStore } from "../store/task.js";
import { ref } from "vue";
const props = defineProps(["task"]);
const tasksStore = useTaskStore();

async function editTask(task) {
  const response = await tasksStore.editTask(task.id, task);
  task.isDisabled = !task.isDisabled;
}
</script>

<style lang="scss" scoped></style>
