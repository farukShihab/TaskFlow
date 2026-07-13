"use client";

import {
    Layer,
    Circle,
    Line,
} from "react-konva";

import { useAnnotationStore } from "@/store/annotation.store";

export function CurrentPolygonLayer() {
    const points =
        useAnnotationStore(
            (state) => state.currentPoints
        );

    const flattenedPoints =
        points.flatMap((point) => [
            point.x,
            point.y,
        ]);


    const mousePosition =
        useAnnotationStore(
            (state) =>
                state.mousePosition
        );

    const previewPoints =
        points.length > 0 &&
            mousePosition
            ? [
                points[
                    points.length - 1
                ].x,
                points[
                    points.length - 1
                ].y,
                mousePosition.x,
                mousePosition.y,
            ]
            : [];

    return (
        <Layer>
            {points.length > 0 && previewPoints.length > 0 && (
                <Line
                    points={previewPoints}
                    stroke="#7C3AED"
                    strokeWidth={2}
                    dash={[6, 6]}
                />
            )}

            {points.map((point, index) => (
                <Circle
                    key={index}
                    x={point.x}
                    y={point.y}
                    radius={5}
                    fill="#7C3AED"
                />
            ))}
        </Layer>
    );
}