"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/design/forms/Button";

import { useAnnotationStore } from "@/store/annotation.store";

export function DeleteStudyDialog() {
  const [loading, setLoading] =
    useState(false);

  const deletingStudy =
    useAnnotationStore(
      (state) =>
        state.deletingStudy
    );

  const closeDeleteStudy =
    useAnnotationStore(
      (state) =>
        state.closeDeleteStudy
    );

  const deleteStudy =
    useAnnotationStore(
      (state) =>
        state.deleteStudy
    );

  return (
    <Dialog
      open={!!deletingStudy}
      onOpenChange={(open) => {
        if (!open) {
          closeDeleteStudy();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete Study?
          </DialogTitle>

          <DialogDescription>
            This action cannot be
            undone. The study{" "}
            <span className="font-medium">
              {deletingStudy?.title}
            </span>{" "}
            and all of its uploaded
            images will be permanently
            deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={
              closeDeleteStudy
            }
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            loading={loading}
            onClick={async () => {
              if (
                !deletingStudy ||
                loading
              ) {
                return;
              }

              try {
                setLoading(true);

                await deleteStudy(
                  deletingStudy.id
                );

                closeDeleteStudy();
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