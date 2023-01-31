<template>
  <div
    v-if="tasksArray.length > 0"
    class="w-full lg:w-2/5 flex items-center bg-white rounded-md shadow-yellow-400/50 shadow-md drop-shadow-md mx-auto my-3 flex-col p-3"
  >
    <h1 class="mx-auto py-3 text-2xl text-at-light-green">
      {{ componentTitle }}
    </h1>
    <div class="w-full flex flex-wrap justify-evenly align-middle bg-transparent">
      <div
        v-for="(task, index) in tasksArray"
        class="flex flex-row w-full flex-wrap my-3"
      >
        <div class="w-full">
          <task-input :task="task"></task-input>
          <check-input :task="task"></check-input>
        </div>
        <div class="w-full">
          <edit-input :task="task"></edit-input>
          <delete-input :task="task"></delete-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "../store/task.js";
import { useUserStore } from "../store/user.js";
import { ref, watch } from "vue";
import CheckInput from "../components/CheckInput.vue";
import DeleteInput from "../components/DeleteInput.vue";
import EditInput from "../components/EditInput.vue";
import TaskInput from "../components/TaskInput.vue";
const tasksStore = useTaskStore();
const userStore = useUserStore();
let tasksArray = ref([]);
let tasksToDo = ref([]);
let tasksComplete = ref([]);
const props = defineProps({
  componentTitle: String,
  dataControl: String,
});

loadTasks();

async function loadTasks() {
  if (props.dataControl === "to-do") {
    await tasksStore.fetchTasks();
    try {
      tasksArray.value = tasksStore.tasksToDo;
    } catch (error) {
      throw error;
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
      throw error;
    }
    watch(
      tasksStore,
      (tasksStore) => {
        tasksArray.value = tasksStore.tasksCompleted;
      },
      { deep: true }
    );
  }
}
</script>

<style lang="scss" scoped></style>
