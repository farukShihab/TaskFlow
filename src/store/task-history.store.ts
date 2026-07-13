import { create } from "zustand";

import { TaskHistory } from "@/types/task-history";
import * as historyService from "@/services/task-history.service";

interface TaskHistoryStore {
  history: TaskHistory[];
  loading: boolean;

  fetchHistory: () => Promise<void>;
}

export const useTaskHistoryStore =
  create<TaskHistoryStore>((set) => ({
    history: [],
    loading: false,

    fetchHistory: async () => {
      set({ loading: true });

      try {
        const history =
          await historyService.getTaskHistory();

        set({
          history,
          loading: false,
        });
      } catch (error) {
        set({
          loading: false,
        });

        console.error(error);
      }
    },
  }));