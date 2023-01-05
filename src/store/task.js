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
    },
    async createTask(taskToInsert) {
      try {
        const { data, error } = await supabase.from("tasks").insert([
          {
            user_id: taskToInsert.user_id,
            title: taskToInsert.title,
            is_complete: false,
          },
        ]);
        this.fetchTasks();
      } catch (error) {
        throw error;
      }
    },
    async editTask(id) {},
    async deleteTask(id) {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .delete()
          .eq("id", id);
      } catch (error) {
        console.log(error);
        //throw error;
      }
      console.log(id);
    },
    async toggleCompletionTask(id) {},
    // Hacer POST
    // Hacer el PUT (edit)
    // Hacer el delete
    // Hacer el PUT (cambiar entre completada y pendiente)
  },
});
