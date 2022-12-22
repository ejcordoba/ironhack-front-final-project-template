// /store/user.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      console.log(error);
      if (user) this.user = user;
      console.log(user);
    },
    async signIn(email, password) {
      try {
        const { user, error } = await supabase.auth.signIn({
          email: email,
          password: password,
        });
        console.log(error);
        if (error) throw error;
      } catch (error) {
        console.log("bye");
        throw error;
      }
      //if (error) throw error;
      if (user) this.user = user;      
    },
    async logout() {
      const { user, error } = await supabase.auth.signOut();
    },
    // Hacer log out
    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});
