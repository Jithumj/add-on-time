import { create } from "zustand";
import axios from "axios";

export const scoreStore=create((set) => ({
    scores: [],
    loading: false,
    error: null,
    fetchScores: async () => {
      set({ loading: true, error: null });
      try {
        // Replace with your chosen API and endpoint
        const res = await axios.get(
          'https://www.thesportsdb.com/api/v1/json/1/livescore.php?l=English_Premier_League'
        );
        set({ scores: res.data.events || [], loading: false });
      } catch (err) {
        set({ error: 'Failed to fetch scores', loading: false });
      }
    },
  }));
  