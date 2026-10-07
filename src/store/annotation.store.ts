import { create } from "zustand";

import * as annotationService from "@/services/annotation.service";

import {
  Point,
  Polygon,
  AnnotationImage,
  Study,
} from "@/types/annotation";

type CanvasMode = "draw" | "pan";

interface AnnotationStore {
  deletingStudy: Study | null;

  openDeleteStudy: (
    study: Study
  ) => void;

  closeDeleteStudy: () => void;

  deleteStudy: (
    id: number
  ) => Promise<void>;
  mousePosition: Point | null
  setMousePosition: (
    point: Point | null
  ) => void;
  mode: CanvasMode;
  setMode: (
    mode: CanvasMode
  ) => void;

  studies: Study[];
  currentStudy: Study | null;

  setStudies: (
    studies: Study[]
  ) => void;

  setCurrentStudy: (
    study: Study | null
  ) => void;

  fetchStudies: () => Promise<void>;
  fetchStudy: (
    id: number
  ) => Promise<void>;

  createStudy: (
    title: string,
    description: string
  ) => Promise<void>;

  uploadImages: (
    studyId: number,
    files: File[]
  ) => Promise<void>;

  currentImageIndex: number;

  setCurrentImage: (
    index: number
  ) => void;

  nextImage: () => void;
  previousImage: () => void;

  currentPoints: Point[];

  addPoint: (
    point: Point
  ) => void;

  clearCurrentPolygon: () => void;

  completePolygon: () => Promise<void>

  deletePolygon: (id: string | number) => void;

  togglePolygonVisibility: (id: string | number) => void;

  setImages: (
    images: AnnotationImage[]
  ) => void;

  scale: number;

  position: {
    x: number;
    y: number;
  };

  setPosition: (
    position: {
      x: number;
      y: number;
    }
  ) => void;

  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  resetView: () => void;
}

export const useAnnotationStore =
  create<AnnotationStore>(

    (set) => ({
      deletingStudy: null,
      openDeleteStudy: (
        study
      ) =>
        set({
          deletingStudy: study,
        }),

      closeDeleteStudy: () =>
        set({
          deletingStudy: null,
        }),

      deleteStudy: async (
        id
      ) => {
        await annotationService.deleteStudy(
          id
        );

        set((state) => {
          const studies =
            state.studies.filter(
              (study) =>
                study.id !== id
            );

          const deletedCurrent =
            state.currentStudy?.id ===
            id;

          return {
            studies,
            currentStudy:
              deletedCurrent
                ? studies[0] ?? null
                : state.currentStudy,
            deletingStudy: null,
          };
        });
      },
      mousePosition: null,
      setMousePosition: (
        mousePosition
      ) =>
        set({
          mousePosition,
        }),
      mode: "pan",

      setMode: (mode) =>
        set({
          mode,
        }),

      studies: [],

      currentStudy: null,

      setStudies: (
        studies
      ) =>
        set({
          studies,
        }),

      setCurrentStudy: (
        currentStudy
      ) =>
        set({
          currentStudy,
          currentImageIndex: 0,
          currentPoints: [],
          scale: 1,
          position: {
            x: 0,
            y: 0,
          },
        }),

      fetchStudies:
        async () => {
          const studies =
            await annotationService.getStudies();

          set({
            studies,
          });
        },

      fetchStudy:
        async (id) => {
          const study =
            await annotationService.getStudy(
              id
            );

          set({
            currentStudy:
              study,
            currentImageIndex: 0,
            currentPoints: [],
            scale: 1,
            position: {
              x: 0,
              y: 0,
            },
          });
        },

      createStudy:
        async (
          title,
          description
        ) => {
          const study =
            await annotationService.createStudy(
              {
                title,
                description,
              }
            );

          const studies =
            await annotationService.getStudies();

          set({
            studies,
            currentStudy:
              study,
            currentImageIndex: 0,
            currentPoints: [],
            scale: 1,
            position: {
              x: 0,
              y: 0,
            },
          });
        },

      uploadImages:
        async (
          studyId,
          files
        ) => {
          await annotationService.uploadImages(
            studyId,
            files
          );

          const study =
            await annotationService.getStudy(
              studyId
            );

          set({
            currentStudy:
              study,
            currentImageIndex: 0,
            currentPoints: [],
            scale: 1,
            position: {
              x: 0,
              y: 0,
            },
          });
        },

      currentImageIndex: 0,

      setCurrentImage: (
        index
      ) =>
        set({
          currentImageIndex:
            index,
          currentPoints: [],
          scale: 1,
          position: {
            x: 0,
            y: 0,
          },
        }),

      nextImage: () =>
        set((state) => {
          if (
            !state.currentStudy
          ) {
            return state;
          }

          return {
            currentImageIndex:
              Math.min(
                state.currentImageIndex +
                1,
                state
                  .currentStudy
                  .images.length -
                1
              ),
            currentPoints: [],
            scale: 1,
            position: {
              x: 0,
              y: 0,
            },
          };
        }),

      previousImage: () =>
        set((state) => ({
          currentImageIndex:
            Math.max(
              state.currentImageIndex -
              1,
              0
            ),
          currentPoints: [],
          scale: 1,
          position: {
            x: 0,
            y: 0,
          },
        })),

      currentPoints: [],

      addPoint: (
        point
      ) =>
        set((state) => ({
          currentPoints: [
            ...state.currentPoints,
            point,
          ],
        })),

      clearCurrentPolygon:
        () =>
          set({
            currentPoints:
              [],
          }),

      completePolygon: async () => {
        const state =
          useAnnotationStore.getState();

        if (
          !state.currentStudy ||
          state.currentPoints.length < 3
        ) {
          return;
        }

        const image =
          state.currentStudy.images[
          state.currentImageIndex
          ];

        if (!image) {
          return;
        }

        const tempId =
          `temp-${crypto.randomUUID()}`;

        const tempPolygon: Polygon = {
          id: tempId,
          points: state.currentPoints,
          hidden: false,
        };

        // optimistic update
        set((state) => {
          const images = [
            ...state.currentStudy!.images,
          ];

          images[
            state.currentImageIndex
          ] = {
            ...images[
            state.currentImageIndex
            ],
            polygons: [
              ...images[
                state.currentImageIndex
              ].polygons,
              tempPolygon,
            ],
          };

          return {
            currentStudy: {
              ...state.currentStudy!,
              images,
            },
            currentPoints: [],
          };
        });

        try {
          const polygon =
            await annotationService.createPolygon(
              image.id,
              {
                points:
                  tempPolygon.points,
                hidden: false,
              }
            );

          set((state) => {
            const images = [
              ...state.currentStudy!.images,
            ];

            images[
              state.currentImageIndex
            ] = {
              ...images[
              state.currentImageIndex
              ],
              polygons:
                images[
                  state.currentImageIndex
                ].polygons.map(
                  (p) =>
                    p.id === tempId
                      ? polygon
                      : p
                ),
            };

            return {
              currentStudy: {
                ...state.currentStudy!,
                images,
              },
            };
          });
        } catch {
          // rollback
          set((state) => {
            const images = [
              ...state.currentStudy!.images,
            ];

            images[
              state.currentImageIndex
            ] = {
              ...images[
              state.currentImageIndex
              ],
              polygons:
                images[
                  state.currentImageIndex
                ].polygons.filter(
                  (p) =>
                    p.id !== tempId
                ),
            };

            return {
              currentStudy: {
                ...state.currentStudy!,
                images,
              },
            };
          });
        }
      },

      deletePolygon:
        async (id) => {
          const state =
            useAnnotationStore.getState();

          if (!state.currentStudy) {
            return;
          }

          const image =
            state.currentStudy.images[
            state.currentImageIndex
            ];

          const polygon =
            image.polygons.find(
              (p) => p.id === id
            );

          if (!polygon) {
            return;
          }

          // optimistic remove
          set((state) => {
            const images = [
              ...state.currentStudy!.images,
            ];

            images[
              state.currentImageIndex
            ] = {
              ...images[
              state.currentImageIndex
              ],
              polygons:
                images[
                  state.currentImageIndex
                ].polygons.filter(
                  (p) =>
                    p.id !== id
                ),
            };

            return {
              currentStudy: {
                ...state.currentStudy!,
                images,
              },
            };
          });

          // don't call backend for temp polygons
          if (typeof id === "string") {
            return;
          }

          try {
            await annotationService.deletePolygon(
              id
            );
          } catch {
            // rollback
            set((state) => {
              const images = [
                ...state.currentStudy!.images,
              ];

              images[
                state.currentImageIndex
              ] = {
                ...images[
                state.currentImageIndex
                ],
                polygons: [
                  ...images[
                    state.currentImageIndex
                  ].polygons,
                  polygon,
                ],
              };

              return {
                currentStudy: {
                  ...state.currentStudy!,
                  images,
                },
              };
            });
          }
        },

      togglePolygonVisibility:
        (id) =>
          set((state) => {
            if (
              !state.currentStudy
            ) {
              return state;
            }

            const images = [
              ...state
                .currentStudy
                .images,
            ];

            images[
              state
                .currentImageIndex
            ] = {
              ...images[
              state
                .currentImageIndex
              ],
              polygons:
                images[
                  state
                    .currentImageIndex
                ].polygons.map(
                  (
                    polygon
                  ) =>
                    polygon.id ===
                      id
                      ? {
                        ...polygon,
                        hidden:
                          !polygon.hidden,
                      }
                      : polygon
                ),
            };

            return {
              currentStudy:
              {
                ...state.currentStudy,
                images,
              },
            };
          }),

      setImages:
        (images) =>
          set((state) => {
            if (
              !state.currentStudy
            ) {
              return state;
            }

            return {
              currentStudy:
              {
                ...state.currentStudy,
                images,
              },
            };
          }),

      scale: 1,

      position: {
        x: 0,
        y: 0,
      },

      setPosition: (
        position
      ) =>
        set({
          position,
        }),

      zoomIn: () =>
        set((state) => ({
          scale:
            state.scale +
            0.2,
        })),

      zoomOut: () =>
        set((state) => ({
          scale:
            Math.max(
              0.2,
              state.scale -
              0.2
            ),
        })),

      resetZoom: () =>
        set({
          scale: 1,
        }),

      resetView: () =>
        set({
          scale: 1,
          position: {
            x: 0,
            y: 0,
          },
        }),
    })
  );

export const useCurrentImage =
  () =>
    useAnnotationStore(
      (state) => {
        const images =
          state.currentStudy
            ?.images ?? [];

        return (
          images[
          state
            .currentImageIndex
          ] ?? null
        );
      }
    );