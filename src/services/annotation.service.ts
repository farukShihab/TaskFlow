import {api} from "@/lib/api";

import {
  Study,
  AnnotationImage,
  Point,
} from "@/types/annotation";

export const getStudies =
  async (): Promise<Study[]> => {
    const response =
      await api.get(
        "/studies/"
      );

    return response.data;
  };

export const getStudy = async (
  studyId: number
): Promise<Study> => {
  const response = await api.get(
    `/studies/${studyId}/`
  );

  return response.data;
};

export const createStudy = async (
  data: {
    title: string;
    description: string;
  }
): Promise<Study> => {
  const response = await api.post(
    "/studies/",
    data
  );

  return response.data;
};

export const uploadImages = async (
  studyId: number,
  files: File[]
) => {
  const formData =
    new FormData();

  files.forEach((file) => {
    formData.append(
      "images",
      file
    );
  });

  const response =
    await api.post(
      `/studies/${studyId}/images/`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
};

export const deleteStudy = async (
  id: number
) => {
  await api.delete(
    `/studies/${id}/delete/`
  );
};

export const createPolygon = async (
  imageId: number,
  data: {
    points: Point[];
    hidden: boolean;
  }
) => {
  const response = await api.post(
    `/studies/images/${imageId}/polygons/`,
    data
  );

  return response.data;
};

export const deletePolygon = async (
  polygonId: number
) => {
  await api.delete(
    `/studies/polygons/${polygonId}/delete/`
  );
};