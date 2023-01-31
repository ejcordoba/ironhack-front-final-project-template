<template>
  <input
    type="text"
    required
    class="w-full p-2 text-gray-500 bg-light-grey border-2 border-solid border-teal-300 rounded-md"
    id="task-title"
    v-model="task.title"
    :readonly="task.isDisabled"
    :disabled="task.isDisabled"
    @keyup.enter="editTask(task)"
  />
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
