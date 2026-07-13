"use client";

import {
  Layer,
  Line,
  Label,
  Tag,
  Text,
} from "react-konva";

import {
  useCurrentImage,
} from "@/store/annotation.store";

export function PolygonLayer() {
  const currentImage =
    useCurrentImage();

  const polygons =
    currentImage?.polygons ?? [];

  return (
    <Layer>
      {polygons
        .filter(
          (polygon) =>
            !polygon.hidden
        )
        .map(
          (
            polygon,
            index
          ) => {
            const firstPoint =
              polygon.points[0];

            if (!firstPoint) {
              return null;
            }

            return (
              <>
                <Line
                  key={polygon.id}
                  points={polygon.points.flatMap(
                    (point) => [
                      point.x,
                      point.y,
                    ]
                  )}
                  closed
                  stroke="#7C3AED"
                  fill="rgba(124,58,237,0.2)"
                  strokeWidth={2}
                />

                <Label
                  x={
                    firstPoint.x +
                    8
                  }
                  y={
                    firstPoint.y -
                    8
                  }
                >
                  <Tag
                    fill="#18181B"
                    cornerRadius={
                      4
                    }
                  />

                  <Text
                    text={`${index + 1}`}
                    fill="white"
                    padding={4}
                    fontSize={14}
                  />
                </Label>
              </>
            );
          }
        )}
    </Layer>
  );
}