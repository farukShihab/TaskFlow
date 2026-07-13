"use client";

import {
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";

import {
  useAnnotationStore,
  useCurrentImage,
} from "@/store/annotation.store";

export function PolygonList() {
  const currentImage =
    useCurrentImage();

  const polygons =
    currentImage?.polygons ?? [];

  const deletePolygon =
    useAnnotationStore(
      (state) =>
        state.deletePolygon
    );

  const toggleVisibility =
    useAnnotationStore(
      (state) =>
        state.togglePolygonVisibility
    );

  return (
    <div className="h-full rounded-xl border p-4">
      <h2 className="mb-4 font-semibold">
        Polygons
      </h2>

      {polygons.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No polygons yet.
        </p>
      ) : (
        <div className="space-y-2">
          {polygons.map(
            (polygon, index) => (
              <div
                key={polygon.id}
                className="flex items-center justify-between rounded-lg border p-2"
              >
                <span>
                  Polygon {index + 1}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      toggleVisibility(
                        polygon.id
                      )
                    }
                  >
                    {polygon.hidden ? (
                      <EyeOff
                        size={18}
                      />
                    ) : (
                      <Eye
                        size={18}
                      />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      deletePolygon(
                        polygon.id
                      )
                    }
                  >
                    <Trash2
                      size={18}
                    />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}