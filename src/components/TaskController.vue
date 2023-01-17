<template>
  <div class="flex items-start bg-light-grey rounded-md shadow-lg w-2/5 mx-auto flex-col">
    <h1 class="mx-auto py-3 text-2xl text-at-light-green">
      {{ componentTitle }}
    </h1>
    <div class="flex items-start bg-light-grey w-full">
      <div class="flex flex-col gap-y-5 w-full">
        <div v-for="(task, index) in tasksArray" class="flex flex-row align-middle">
          <div class="flex">
            <div class="flex flex-col">
              <input
                type="text"
                required
                class="p-2 text-gray-500 focus:outline-none"
                id="task-title"
                v-model="task.title"
                :readonly="task.isDisabled"
                :disabled="task.isDisabled"
                @keyup.enter="editTask(index)"
              />
            </div>
            <div class="flex items-center mr-3">
              <input
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
                v-model="task.is_complete"
                @change="checkCompletion(task.id, task.is_complete)"
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
</template>

<script setup>
import { useTaskStore } from "../store/task.js";
import { useUserStore } from "../store/user.js";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
const tasksStore = useTaskStore();
const userStore = useUserStore();
let tasksArray = ref([]);
let tasksToDo = ref([]);
let tasksComplete = ref([]);
const props = defineProps({
  componentTitle: String,
  dataControl: String,
});

onLoad();

async function onLoad() {
  if (props.dataControl === "to-do") {
    await tasksStore.fetchTasks();
    try {
      tasksArray.value = tasksStore.tasksToDo;
    } catch (error) {
      console.log(error);
    }
    watch(
      tasksStore,
      (tasksStore) => {
        tasksArray.value = tasksStore.tasksToDo;
      },
      { deep: true }
    );
  } else {
    await tasksStore.fetchTasks();
    try {
      tasksArray.value = tasksStore.tasksCompleted;
    } catch (error) {
      console.log(error);
    }
    console.log(tasksArray.value);
    watch(
      tasksStore,
      (tasksStore) => {
        tasksArray.value = tasksStore.tasksCompleted;
      },
      { deep: true }
    );
  }
}

async function updateTasks() {
  await tasksStore.fetchTasks();

  tasksToDo.value = tasksStore.tasksToDo;
  if (tasksToDo.value) {
    tasksToDo.value = tasksToDo.value.map((obj) => ({
      ...obj,
      isDisabled: true,
    }));
  }

  tasksComplete.value = tasksStore.tasksComplete;
  if (tasksComplete.value) {
    tasksComplete.value = tasksComplete.value.map((obj) => ({
      ...obj,
      isDisabled: true,
    }));
  }

  tasksArray.value =
    props.dataControl === "to-do" ? tasksToDo.value : tasksComplete.value;

  /*  watch(tasksArray.value, async (newQuestion, oldQuestion) => {
    console.log(newQuestion);
    console.log(oldQuestion);
    console.log(tasksArray.value);
  }); */
}

/* async function editTask(index) {
  let updateTaskData = this.tasksArray[index];
  const response = await tasksStore.editTask(updateTaskData.id, updateTaskData);
  this.tasksArray[index].isDisabled = !this.tasksArray[index].isDisabled;
} */

/* async function deleteTask(id) {
  const response = await tasksStore.deleteTask(id);
  updateTasks();
} */

/* async function checkCompletion(id, complete) {
  const response = await tasksStore.toggleCompletionTask(id, complete);
  let found = tasksArray.find((e) => e.is_complete === true);
  if (this.tasksArray.some(tasksArray.is_complete)) {
    allDone = false;
  } else {
    allDone = true;
  }
} */
</script>

<style lang="scss" scoped></style>
