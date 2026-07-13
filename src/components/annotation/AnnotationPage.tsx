"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";

import { useEffect, useState } from "react";

import { AnnotationWorkspace } from "./AnnotationWorkspace";
import { CreateStudyModal } from "./studies/CreateStudyModal";
import { StudyList } from "./studies/StudyList";
import { ImageUploader } from "./studies/ImageUploader";
import { DeleteStudyDialog } from "./studies/DeletStudyDialog";

import { useAnnotationStore } from "@/store/annotation.store";

import { Button } from "../design";

export function AnnotationPage() {
  const [isCreateOpen, setIsCreateOpen] =
    useState(false);

  const studies =
    useAnnotationStore(
      (s) => s.studies
    );

  const fetchStudies =
    useAnnotationStore(
      (s) => s.fetchStudies
    );

  const currentStudy =
    useAnnotationStore(
      (s) => s.currentStudy
    );

  useEffect(() => {
    fetchStudies();
  }, [fetchStudies]);

  useEffect(() => {
    setIsCreateOpen(
      studies.length === 0
    );
  }, [studies]);


  const fetchStudy = useAnnotationStore(
    (s) => s.fetchStudy
  );

  const openDeleteStudy =
    useAnnotationStore(
      (s) => s.openDeleteStudy
    );


  return (
    <>
      <CreateStudyModal
        open={isCreateOpen}
        onOpenChange={
          setIsCreateOpen
        }
      />
      <DeleteStudyDialog />

      <div className="mb-4 flex items-center gap-2">
        <Button
          onClick={() =>
            setIsCreateOpen(true)
          }
        >
          New Study
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
          >
            <Button
              variant="outline"
            >
              {currentStudy
                ?.title ??
                "Studies"}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-56"
            align="start"
          >
            {studies.length === 0 ? (
              <DropdownMenuItem
                disabled
              >
                No studies
              </DropdownMenuItem>
            ) : (
              studies.map((study) => (
                <DropdownMenuItem
                  key={study.id}
                  onClick={() =>
                    fetchStudy(
                      study.id
                    )
                  }
                >
                  {study.title}
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        {currentStudy && (
          <>
            <ImageUploader />

            <Button
              variant="outline"
              size="icon"
              className="
        text-destructive
        hover:text-destructive
      "
              onClick={() =>
                openDeleteStudy(
                  currentStudy
                )
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      <div className="flex h-full gap-6">
        <div className="flex-1">
          <AnnotationWorkspace />
        </div>
      </div>
    </>
  );
}