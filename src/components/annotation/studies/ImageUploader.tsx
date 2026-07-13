"use client";

import { useRef, useState } from "react";

import { Button }
  from "@/components/design/forms/Button";


import {
  useAnnotationStore,
} from "@/store/annotation.store";

export function ImageUploader() {
  console.log("ImageUploader rendered");
  const currentStudy =
    useAnnotationStore(
      (s) =>
        s.currentStudy
    );

  const fetchStudy =
    useAnnotationStore(
      (s) => s.fetchStudy
    );

  const inputRef =
    useRef<HTMLInputElement>(null);

  const uploadImages =
    useAnnotationStore(
      (s) => s.uploadImages
    );

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      !currentStudy ||
      !e.target.files
    ) {
      return;
    }

    const files = Array.from(
      e.target.files
    );

    await uploadImages(
      currentStudy.id,
      files
    );

    e.target.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      <Button
        variant="outline"
        onClick={() =>
          inputRef.current?.click()
        }
      >
        Upload Images
      </Button>
    </>
  );
}