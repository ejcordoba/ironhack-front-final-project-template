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
        <div class="flex">
          <label for="task-title" class="mb-1 text-sm text-at-light-green w-1/4"
            >Task complete?</label
          >
          <input class="w-3/4 align-middle" type="checkbox" v-model="taskComplete" />
        </div>
        <button
          @click="addTask"
          type="button"
          class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
        >
          Add task
        </button>
        <hr />
        <div class="flex-row" v-if="tasksArray.length > 0">
          <h1 class="text-2xl text-at-light-green">Task list</h1>
          <div v-for="(task, index) in tasksArray" class="flex">
            <div class="w-1/4">{{ task.title }}</div>
            <div class="w-1/4">
              <input class="w-3/4 align-middle" type="checkbox" v-model="task.complete" />
            </div>
            <div class="w-1/4">{{ index }}</div>
            <div class="w-1/4">
              <button
                @click="deleteTask(index)"
                type="button"
                class="my-1 py-2 px-6 rounded-sm self-start text-sm text-white bg-red-500 border-solid border-2 border-transparent hover:border-red-500 hover:bg-white hover:text-red-500"
              >
                remove
              </button>
            </div>
          </div>
        </div>
        <button
          @submit.prevent="saveTasks"
          v-if="tasksArray.length > 0"
          type="submit"
          class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
        >
          Save task(s)
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../store/task.js";
import { uid } from "uid";

const tasksArray = ref([]);
const taskTitle = ref("");
const taskComplete = ref(false);
const statusMsg = ref(null);
const errorMsg = ref(null);

const addTask = () => {
  if (taskTitle.value !== "") {
    tasksArray.value.push({ title: taskTitle.value, complete: taskComplete.value });
    console.log(tasksArray.value);
  } else {
    errorMsg.value = "Error: You must enter a task title";
    setTimeout(() => {
      errorMsg.value = false;
    }, 5000);
    return;
  }
};
function deleteTask(index) {
  if (tasksArray.value.length > 0) {
    tasksArray.value.splice(index, 1);
    return;
  }
  errorMsg.value = "Error: Cannot remove, you may have at least one task";
  setTimeout(() => {
    errorMsg.value = false;
  }, 5000);
}
const saveTasks = () => {};
</script>

<style lang="scss" scoped></style>
