export interface Point {
  x: number;
  y: number;
}

export interface Polygon {
  id: number | string;
  points: Point[];
  hidden: boolean;
  created_at?: string;
}

export interface Study {
  id: number;
  title: string;
  description: string;
  images: AnnotationImage[];
}

export interface AnnotationImage {
  id: number;
  image_url: string;
  order: number;
  polygons: Polygon[];
}