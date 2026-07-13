import { Layer, Image } from "react-konva";
import useImage from "use-image";

import {
  useCurrentImage,
} from "@/store/annotation.store";

export function ImageLayer() {
  const currentImage =
    useCurrentImage();

  const [image] =
    useImage(
      currentImage?.image_url ??
        ""
    );

  if (!image) {
    return null;
  }

  return (
    <Layer>
      <Image
        image={image}
        width={1000}
        height={700}
      />
    </Layer>
  );
}