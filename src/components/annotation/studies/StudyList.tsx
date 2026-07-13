"use client";

import { useEffect } from "react";

import { useAnnotationStore }
from "@/store/annotation.store";

export function StudyList() {
  const studies =
    useAnnotationStore(
      (s) => s.studies
    );

  const fetchStudies =
    useAnnotationStore(
      (s) => s.fetchStudies
    );

  const fetchStudy =
    useAnnotationStore(
      (s) => s.fetchStudy
    );

  useEffect(() => {
    fetchStudies();
  }, [fetchStudies]);

  return (
    <div className="space-y-2">
      {studies.map((study) => (
        <button
          key={study.id}
          onClick={() =>
            fetchStudy(
              study.id
            )
          }
          className="
            w-full
            rounded-xl
            border
            p-3
            text-left
          "
        >
          <p className="font-medium">
            {study.title}
          </p>

          <p className="text-xs text-muted-foreground">
            {
              study.description
            }
          </p>
        </button>
      ))}
    </div>
  );
}