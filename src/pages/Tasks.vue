<template>
  <TaskCreator></TaskCreator>
  <div class="max-w-screen-2xl mx-auto px-4 py-10 flex">
    <TaskController dataControl="to-do" componentTitle="To-Do"></TaskController>
    <TaskController dataControl="completed" componentTitle="Completed"></TaskController>
  </div>
</template>

<script setup>
//import { ref } from "vue";
import TaskCreator from "../components/TaskCreator.vue";
import TaskController from "../components/TaskController.vue";
import { useTaskStore } from "../store/task.js";
import { useUserStore } from "../store/user.js";
import { uid } from "uid";

const editInput = $ref(null);
const taskComplete = $ref(false);
const tasksStore = useTaskStore();
const userStore = useUserStore();
let tasksLoaded = false;
let tasksArray = $ref([]);
let tasksToDo = $ref([]);
let tasksCompleted = $ref([]);
let allDone = $ref(false);

getTasks();

async function getTasks() {
  try {
    await tasksStore.fetchTasks();
    tasksArray = tasksStore.tasks;
    tasksToDo = tasksStore.tasksToDo;
    tasksCompleted = tasksStore.tasksCompleted;
  } catch (error) {
    errorMsg = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg = null;
    }, 5000);
  }
}

/* async function saveTasks() {
  try {
    const response = await tasksStore.createTask(tasksArray);
    console.log(response);
  } catch (error) {
    errorMsg = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg = null;
    }, 5000);
  }
} */
</script>

<style lang="scss" scoped></style>
