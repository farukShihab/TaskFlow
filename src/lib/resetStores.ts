import { useTasksStore } from "@/store/task.store";
import { useUIStore } from "@/store/ui.store";

export function resetAllStores() {
    useTasksStore.getState().reset();
    useUIStore.getState().reset();
    useUIStore.persist.clearStorage(); // wipes the saved drafts in localStorage
}