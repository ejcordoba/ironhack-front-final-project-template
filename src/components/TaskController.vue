<template>
  <div
    v-if="tasksArray.length > 0"
    class="flex items-start bg-light-grey rounded-md shadow-lg w-2/5 mx-auto flex-col"
  >
    <h1 class="mx-auto py-3 text-2xl text-at-light-green">
      {{ componentTitle }}
    </h1>
    <div class="flex items-start bg-light-grey w-full">
      <div class="flex flex-col gap-y-5 w-full">
        <div v-for="(task, index) in tasksArray" class="flex flex-row align-middle">
          <div class="flex">
            <div class="flex flex-col">
              <task-input :task="task"></task-input>
            </div>
            <div class="flex items-center mr-3">
              <check-input :task="task"></check-input>
            </div>
            <div class="flex flex-row">
              <edit-input :task="task"></edit-input>
              <delete-input :task="task"></delete-input>
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
