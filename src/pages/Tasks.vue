<template>
  <TaskCreator></TaskCreator>
  <div class="max-w-screen-2xl mx-auto px-4 py-10 flex flex-wrap">
    <TaskController componentTitle="To-Do Task List" dataControl="to-do"></TaskController>
    <TaskController
      componentTitle="Complete Task List"
      dataControl="complete"
    ></TaskController>
  </div>
</template>

<script setup>
import TaskCreator from "../components/TaskCreator.vue";
import TaskController from "../components/TaskController.vue";
</script>

<style lang="scss" scoped></style>
