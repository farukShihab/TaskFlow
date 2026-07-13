"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Slider } from "@/components/ui/slider";
import { IconButton } from "@/components/design/forms/IconButton";

import { useAnnotationStore } from "@/store/annotation.store";

export function ImageNavigator() {
  const currentStudy =
    useAnnotationStore(
      (state) => state.currentStudy
    );

  const currentImageIndex =
    useAnnotationStore(
      (state) => state.currentImageIndex
    );

  const nextImage =
    useAnnotationStore(
      (state) => state.nextImage
    );

  const previousImage =
    useAnnotationStore(
      (state) => state.previousImage
    );

  const setCurrentImage =
    useAnnotationStore(
      (state) => state.setCurrentImage
    );

  const isDrawing =
    useAnnotationStore(
      (state) =>
        state.currentPoints.length > 0
    );

  if (
    !currentStudy ||
    !currentStudy.images ||
    currentStudy.images.length === 0
  ) {
    return null;
  }

  const imageCount =
    currentStudy.images.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <IconButton
          onClick={previousImage}
          aria-label="Previous image"
          disabled={
            currentImageIndex === 0 ||
            isDrawing
          }
        >
          <ChevronLeft />
        </IconButton>

        <h2 className="text-lg font-semibold">
          Slice{" "}
          {currentImageIndex + 1}
          {" / "}
          {imageCount}
        </h2>

        <IconButton
          onClick={nextImage}
          aria-label="Next image"
          disabled={
            currentImageIndex ===
            imageCount - 1 ||
            isDrawing
          }
        >
          <ChevronRight />
        </IconButton>
      </div>

      <Slider
        value={[currentImageIndex]}
        min={0}
        max={imageCount - 1}
        step={1}
        disabled={isDrawing}
        onValueChange={(
          value
        ) =>
          setCurrentImage(
            value[0]
          )
        }
      />
    </div>
  );
}