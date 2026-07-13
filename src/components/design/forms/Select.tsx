"use client";

import {
  Select as UISelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  helperText?: string;
  error?: string;

  value: string;
  onValueChange: (value: string) => void;

  placeholder?: string;

  options: SelectOption[];
}

export function Select({
  label,
  helperText,
  error,
  value,
  onValueChange,
  placeholder,
  options,
}: SelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-zinc-200">
          {label}
        </label>
      )}

      <UISelect
        value={value}
        onValueChange={onValueChange}
      >
        <SelectTrigger
          className="
            h-11
            rounded-xl
            border-white/10
            bg-zinc-900
            text-white
            focus:ring-violet-500
          "
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="border-white/10 bg-zinc-900 text-white">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </UISelect>

      {error ? (
        <p className="text-sm text-red-400">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-sm text-zinc-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}