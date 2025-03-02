import { createCanvas, loadImage } from "canvas";
import { resizeImage } from "./resizer";

export async function extractPixels(img) {
  try {
    const image = await loadImage(img);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const pixelArray = Array.from({ length: width }, () =>
      Array.from({ length: height }, () => []));

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];
        pixelArray[y][x]=[r,g,b,a];
      }

    }
    console.log(pixelArray)

    return resizeImage(pixelArray, width, height);
  }
  catch (error) {
    console.error(error);
    return [];
  }
}