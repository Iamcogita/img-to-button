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

    // TODO better resizer ; This is messed up but works for mult 4
    const mult = Math.floor((width * height) / (matrixSquare * matrixSquare));
    if(mult > 1){
      const buttonPropsArr = buttonProps.filter((_, index) => index % Math.sqrt(mult) === 0 );
      const newArr = [];
      let arrCounter = 0;
      for(let y = 0 ; y < height ; y++){
        for(let x = 0 ; x < matrixSquare ; x++){
          arrCounter++;
          if(y % 2 === 0 ){ newArr.push(buttonPropsArr[arrCounter]) };
      }
     }
     return newArr
    }
    else return buttonProps;
    }
    catch (error) {
    console.error(error);
    return [];
  }
}