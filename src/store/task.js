// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
    tempTask: {
      title: "",
      completed: false,
    },
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      console.log(this.tasks);
    },
    async createTask(taskToInsert) {
      console.log(taskToInsert);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: taskToInsert.user_id,
          title: taskToInsert.title,
          is_complete: false,
        },
      ]);
    },
    async editTask(id) {},
    async deleteTask(id) {},
    async toggleCompletionTask(id) {},
    // Hacer POST
    // Hacer el PUT (edit)
    // Hacer el delete
    // Hacer el PUT (cambiar entre completada y pendiente)
  },
});
