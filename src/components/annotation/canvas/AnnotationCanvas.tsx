"use client";

import Konva from "konva";
import { Stage } from "react-konva";

import { useRef } from "react";

import { ImageLayer } from "./ImageLayer";
import { PolygonLayer } from "./PolygonLayer";
import { CurrentPolygonLayer } from "./CurrentPolygonLayer";

import { useAnnotationStore } from "@/store/annotation.store";

import { cn } from "@/lib/utils";

export function AnnotationCanvas() {
    const scale =
        useAnnotationStore(
            (state) => state.scale
        );

    const points =
        useAnnotationStore(
            (state) => state.currentPoints
        );

    const addPoint =
        useAnnotationStore(
            (state) => state.addPoint
        );

    const completePolygon =
        useAnnotationStore(
            (state) => state.completePolygon
        );

    const position = useAnnotationStore(
        (state) => state.position
    );

    const setPosition = useAnnotationStore(
        (state) => state.setPosition
    );

    const mode = useAnnotationStore(
        (state) => state.mode
    );

    const nextImage = useAnnotationStore(
        (state) => state.nextImage
    );

    const previousImage =
        useAnnotationStore(
            (state) => state.previousImage
        );

    const isDrawing =
        useAnnotationStore(
            (state) => state.currentPoints.length > 0
        );

    const setMousePosition =
        useAnnotationStore(
            (state) =>
                state.setMousePosition
        );

    const handleClick = (
        e: Konva.KonvaEventObject<MouseEvent>
    ) => {
        if (mode !== "draw") {
            return;
        }
        const stage =
            e.target.getStage();

        if (!stage) return;

        const pointer =
            stage.getPointerPosition();

        if (!pointer) return;

        const pos = {
            x:
                (pointer.x - stage.x()) /
                stage.scaleX(),
            y:
                (pointer.y - stage.y()) /
                stage.scaleY(),
        };

        if (!pos) {
            return;
        }

        if (points.length >= 3) {
            const first = points[0];

            const distance = Math.sqrt(
                (pos.x - first.x) ** 2 +
                (pos.y - first.y) ** 2
            );

            if (distance < 15) {
                completePolygon();
                return;
            }
        }

        addPoint(pos);
    };

    const lastScroll =
        useRef(0);

    const handleWheel = (
        e: React.WheelEvent
    ) => {
        const now = Date.now();

        if (now - lastScroll.current < 100) {
            return;
        }

        lastScroll.current = now;

        if (isDrawing) {
            return;
        }

        if (e.deltaY > 0) {
            nextImage();
        } else {
            previousImage();
        }
    };

    return (
        <div
            onWheel={handleWheel}
            className={cn(
                "overflow-hidden rounded-2xl border",
                mode === "draw"
                    ? "cursor-crosshair"
                    : "cursor-grab",
            )}>
            <Stage
                width={800}
                height={600}
                scaleX={scale}
                scaleY={scale}
                x={position.x}
                y={position.y}
                draggable={mode === "pan"}
                onClick={handleClick}
                onMouseMove={(e) => {
                    if (mode !== "draw") {
                        return;
                    }

                    const stage =
                        e.target.getStage();

                    if (!stage) return;

                    const pointer =
                        stage.getPointerPosition();

                    if (!pointer) return;

                    const pos = {
                        x:
                            (pointer.x - stage.x()) /
                            stage.scaleX(),
                        y:
                            (pointer.y - stage.y()) /
                            stage.scaleY(),
                    };

                    setMousePosition(pos);
                }}
                onMouseLeave={() => {
                    setMousePosition(null);
                }}
                onDragEnd={(e) =>
                    setPosition({
                        x: e.target.x(),
                        y: e.target.y(),
                    })
                }
            >
                <ImageLayer />
                <PolygonLayer />
                <CurrentPolygonLayer />
            </Stage>
        </div >
    );
}