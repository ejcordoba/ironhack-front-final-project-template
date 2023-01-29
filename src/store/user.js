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
      try {
        const { user, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (user) this.user = user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async signIn(email, password) {
      try {
        const { user, error } = await supabase.auth.signIn({
          email: email,
          password: password,
        });
        if (user) this.user = user;
        if (error) throw error;
      } catch (error) {
        throw error;
      }
    },
    async logout() {
      const { user, error } = await supabase.auth.signOut();
      this.user = null;
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
