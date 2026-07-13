"use client";

import { Button } from "@/components/design/forms/Button";
import { Input } from "@/components/design/forms/Input";
import { Select } from "@/components/design/forms/Select";
import { Textarea } from "@/components/design/forms/Textarea";

import {
  TaskFormData,
  TaskPriority,
  TaskStatus,
} from "@/types/task";

import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
} from "@/constants/task";

interface TaskFormProps {
  form: TaskFormData;

  showDelete?: boolean;

  tagInput: string;

  onFieldChange: <
    K extends keyof TaskFormData
  >(
    field: K,
    value: TaskFormData[K]
  ) => void;

  onTagChange: (value: string) => void;

  submitLabel?: string;
  loading?: boolean;

  onSubmit: (data: TaskFormData) => Promise<void> | void;
  onDelete?: () => void;
}

export function TaskForm({
  form,
  tagInput,
  onFieldChange,
  onTagChange,
  submitLabel = "Create Task",
  loading = false,
  onSubmit,
  showDelete,
  onDelete,
}: TaskFormProps) {


  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    await onSubmit({
      ...form,
      tags: tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <Input
        label="Title"
        placeholder="Task title"
        value={form.title}
        required
        onChange={(e) =>
          onFieldChange("title", e.target.value)
        }
      />

      <Textarea
        label="Description"
        placeholder="Describe this task..."
        value={form.description}
        onChange={(e) =>
          onFieldChange("description", e.target.value)
        }
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Status"
          value={form.status}
          options={STATUS_OPTIONS}
          onValueChange={(value) =>
            onFieldChange(
              "status",
              value as TaskStatus
            )
          }
        />

        <Select
          label="Priority"
          value={form.priority}
          options={PRIORITY_OPTIONS}
          onValueChange={(value) =>
            onFieldChange(
              "priority",
              value as TaskPriority
            )
          }
        />
      </div>

      <Input
        type="date"
        label="Due Date"
        value={form.due_date}
        onChange={(e) =>
          onFieldChange("due_date", e.target.value)
        }
      />

      <Input
        label="Tags"
        placeholder="frontend, ui, urgent"
        helperText="Separate tags with commas"
        value={tagInput}
        onChange={(e) =>
          onTagChange(e.target.value)
        }
      />

      {showDelete ? (
        <Button
          type="button"
          variant="danger"
          onClick={onDelete}
        >
          Delete Task
        </Button>
      ) : (
         <div /> 
         ) }

      <Button
        type="submit"
        className="w-full"
        loading={loading}
      >
        {submitLabel}
      </Button>

    </form>
  );
}