import { createCanvas, loadImage } from "canvas";
import { matrixSquare } from "./controler";

export async function extractPixels(img) {
  try {
    const image = await loadImage(img);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const buttonProps = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = ((data[index + 3]) / 255).toFixed(2);
        buttonProps.push(`rgba(${r}, ${g}, ${b}, ${a})`);
      }
    }
    // TODO better resizer ; This one only works on a 1:1 ratio; currently not resizing
    const mult = Math.floor((canvas.width * canvas.height) / (matrixSquare * matrixSquare));
    const buttonPropsArr = buttonProps.filter((_, index) => index % mult === 0);
    
    return buttonPropsArr;
  } catch (error) {
    console.error(error);
    return [];
  }
}