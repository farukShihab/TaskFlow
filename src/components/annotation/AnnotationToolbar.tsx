"use client";

import {
    ZoomIn,
    ZoomOut,
    RotateCcw,
    MousePointer2,
    Pencil,
} from "lucide-react";

import { IconButton } from "@/components/design/forms/IconButton";

import { useAnnotationStore } from "@/store/annotation.store";

export function AnnotationToolbar() {
    const zoomIn =
        useAnnotationStore(
            (state) => state.zoomIn
        );

    const zoomOut =
        useAnnotationStore(
            (state) => state.zoomOut
        );

    const resetZoom =
        useAnnotationStore(
            (state) => state.resetZoom
        );

    const resetView =
        useAnnotationStore(
            (state) => state.resetView
        );

    const mode =
        useAnnotationStore(
            (state) => state.mode
        );

    const setMode =
        useAnnotationStore(
            (state) => state.setMode
        );

    const scale =
        useAnnotationStore(
            (s) => s.scale
        );

    return (
        <div className="flex gap-2">
            
            <IconButton
                onClick={zoomIn}
                aria-label="Zoom in"
            >
                <ZoomIn className="h-4 w-4" />
            </IconButton>

            <IconButton
                onClick={zoomOut}
                aria-label="Zoom out"
            >
                <ZoomOut className="h-4 w-4" />
            </IconButton>

            <span className="mx-2 text-sm text-muted-foreground">
                {Math.round(scale * 100)}%
            </span>

            <IconButton
                onClick={() => {
                    //resetZoom();
                    resetView();
                }}
                aria-label="Reset zoom"
            >
                <RotateCcw className="h-4 w-4" />
            </IconButton>

            <div className="mx-2 h-6 w-px bg-border" />

            <IconButton
                aria-label="Draw mode"
                onClick={() => setMode("draw")}
                className={
                    mode === "draw"
                        ? "border-primary bg-primary text-primary-foreground"
                        : ""
                }
            >
                <Pencil className="h-4 w-4" />
            </IconButton>

            <IconButton
                aria-label="Pan mode"
                onClick={() => setMode("pan")}
                className={
                    mode === "pan"
                        ? "border-primary bg-primary text-primary-foreground"
                        : ""
                }
            >
                <MousePointer2 className="h-4 w-4" />
            </IconButton>
        </div>
    );
}