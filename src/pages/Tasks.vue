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
      <form @submit.prevent="saveTasks" class="flex flex-col gap-y-5 w-full">
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
            @keyup.enter="addTask"
          />
        </div>

        <button
          @click="addTask"
          type="button"
          class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
        >
          Add task
        </button>
        <hr />
        <!-- <button
          v-if="tasksArray && tasksArray.length > 0"
          type="submit"
          class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
        >
          Save task(s)
        </button> -->
      </form>
    </div>
  </div>
  <div class="max-w-screen-2xl mx-auto px-4 py-10 flex">
    <div
      class="flex items-start bg-light-grey rounded-md shadow-lg w-2/5 mx-auto flex-col"
      v-if="tasksArray && tasksArray.length > 0"
    >
      <h1 class="mx-auto py-3 text-2xl text-at-light-green">To-Do task list</h1>
      <div class="flex items-start bg-light-grey w-full" v-if="tasksArray.length > 0">
        <div class="flex flex-col gap-y-5 w-full">
          <div v-for="(task, index) in tasksArray" class="flex flex-row align-middle">
            <div v-if="!task.complete" class="flex">
              <div class="flex flex-col">
                <input
                  type="text"
                  required
                  class="p-2 text-gray-500 focus:outline-none"
                  id="task-title"
                  v-model="task.title"
                  :readonly="task.isDisabled"
                  :disabled="task.isDisabled"
                />
              </div>
              <div class="flex items-center mr-3">
                <input
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  type="checkbox"
                  v-model="task.complete"
                />
                <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Complete</label
                >
              </div>
              <div class="flex flex-row">
                <button
                  @click="editTask(index)"
                  type="button"
                  class="my-1 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
                >
                  Edit
                </button>
                <button
                  @click="deleteTask(task.id)"
                  type="button"
                  class="my-1 py-2 px-6 rounded-sm self-start text-sm text-white bg-red-500 border-solid border-2 border-transparent hover:border-red-500 hover:bg-white hover:text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex items-start bg-light-grey rounded-md shadow-lg w-2/5 mx-auto flex-col"
      v-if="tasksArray && tasksArray.length > 0"
    >
      <h1 class="mx-auto py-3 text-2xl text-at-light-green">Complete task list</h1>
      <div class="flex items-start bg-light-grey w-full">
        <div class="flex flex-col gap-y-5 w-full">
          <div v-for="(task, index) in tasksArray" class="flex flex-row align-middle">
            <div v-if="task.complete" class="flex">
              <div class="flex flex-col">
                <input
                  ref="editInput"
                  type="text"
                  required
                  class="p-2 text-gray-500 focus:outline-none"
                  id="task-title"
                  v-model="task.title"
                  :readonly="task.isDisabled"
                  :disabled="task.isDisabled"
                />
              </div>
              <div class="flex items-center">
                <input
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  type="checkbox"
                  v-model="task.complete"
                />
                <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Complete</label
                >
              </div>
              <div class="flex flex-row">
                <button
                  @click="editTask(index)"
                  type="button"
                  class="my-1 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
                >
                  Edit
                </button>
                <button
                  @click="deleteTask(task.id)"
                  type="button"
                  class="my-1 py-2 px-6 rounded-sm self-start text-sm text-white bg-red-500 border-solid border-2 border-transparent hover:border-red-500 hover:bg-white hover:text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//import { ref } from "vue";
import { useTaskStore } from "../store/task.js";
import { useUserStore } from "../store/user.js";
import { uid } from "uid";

const editInput = $ref(null);
const taskTitle = $ref("");
const taskComplete = $ref(false);
const statusMsg = $ref(null);
const errorMsg = $ref(null);
const tasksStore = useTaskStore();
const userStore = useUserStore();
let tasksArray = $ref([]);

async function getTasks() {
  await tasksStore.fetchTasks();
  tasksArray = tasksStore.tasks;
}

getTasks();

const addTask = async () => {
  try {
    if (taskTitle !== "") {
      const response = await tasksStore.createTask({
        user_id: userStore.user.id,
        title: taskTitle,
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
  return;
};
async function deleteTask(id) {
  const response = await tasksStore.deleteTask(id);
  getTasks();
}
function editTask(index) {
  this.tasksArray[index].isDisabled = !this.tasksArray[index].isDisabled;
}

const saveTasks = async () => {
  try {
    const response = await tasksStore.createTask(tasksArray);
    console.log(response);
  } catch (error) {
    errorMsg = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg = null;
    }, 5000);
  }
  return;
};
</script>

<style lang="scss" scoped></style>
