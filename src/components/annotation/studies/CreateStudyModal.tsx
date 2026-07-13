"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/design/forms/Button";
import { Input } from "@/components/design/forms/Input";
import { Textarea } from "@/components/ui/textarea";

import { useAnnotationStore } from "@/store/annotation.store";

interface CreateStudyModalProps {
  open: boolean;
  onOpenChange: (
    open: boolean
  ) => void;
}

interface FormData {
  title: string;
  description: string;
}

export function CreateStudyModal({
  open,
  onOpenChange,
}: CreateStudyModalProps) {
  const createStudy =
    useAnnotationStore(
      (state) =>
        state.createStudy
    );

  const [formData, setFormData] =
    useState<FormData>({
      title: "",
      description: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      if (
        !formData.title.trim()
      ) {
        return;
      }

      try {
        setLoading(true);

        await createStudy(
          formData.title,
          formData.description
        );

        setFormData({
          title: "",
          description: "",
        });

        onOpenChange(false);
      } finally {
        setLoading(false);
      }
    };

  return (
    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Study
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >
          <Input
            placeholder="Study title"
            value={
              formData.title
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                title:
                  e.target
                    .value,
              })
            }
          />

          <Textarea
            placeholder="Description"
            value={
              formData.description
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                description:
                  e.target
                    .value,
              })
            }
          />

          <Button
            type="submit"
            disabled={
              loading
            }
            className="w-full"
          >
            {loading
              ? "Creating..."
              : "Create Study"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}