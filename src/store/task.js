// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
    tasksCompleted: null,
    tasksToDo: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      this.tasks = this.tasks.map((obj) => ({ ...obj, isDisabled: true }));
      this.tasksCompleted = this.tasks.filter((obj) => obj.is_complete);
      this.tasksToDo = this.tasks.filter((obj) => !obj.is_complete);
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
        return data;
      } catch (error) {
        throw error;
      }
    },
    async editTask(id, taskData) {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .update({
            title: taskData.title,
            is_complete: taskData.is_complete,
          })
          .eq("id", id);
      } catch (error) {
        throw error;
      }
    },
    async deleteTask(id) {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .delete()
          .eq("id", id);
        this.fetchTasks();
      } catch (error) {
        throw error;
      }
    },
    async toggleCompletionTask(id, complete) {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .update({ is_complete: complete })
          .eq("id", id);
        this.fetchTasks();
      } catch (error) {
        throw error;
      }
    },
  },
});
