"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/design/forms/Button";

import { useTasksStore } from "@/store/task.store";
import { useUIStore } from "@/store/ui.store";

export function DeleteTaskDialog() {
  const [loading, setLoading] =
    useState(false);

  const deletingTask = useUIStore(
    (state) => state.deletingTask
  );

  const closeDeleteTask = useUIStore(
    (state) => state.closeDeleteTask
  );

  const deleteTask = useTasksStore(
    (state) => state.deleteTask
  );

  const setIgnoreNextEditClose =
    useUIStore(
      (state) =>
        state.setIgnoreNextEditClose
    );

  const closeEditTask = useUIStore(
    (state) => state.closeEditTask
  );

  return (
    <Dialog
      open={!!deletingTask}

      onOpenChange={(open) => {
        if (!open) {
          closeDeleteTask();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete Task?
          </DialogTitle>

          <DialogDescription>
            This action cannot be
            undone. The task{" "}
            <span className="font-medium">
              {deletingTask?.title}
            </span>{" "}
            will be permanently
            deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setIgnoreNextEditClose(true);
              closeDeleteTask();
            }}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            loading={loading}
            onClick={async () => {
              if (
                !deletingTask ||
                loading
              ) {
                return;
              }

              try {
                setLoading(true);

                await deleteTask(
                  deletingTask.id
                );

                closeDeleteTask();
                closeEditTask();
              } finally {
                setLoading(false);
              }
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}