import { createCanvas, loadImage } from "canvas";
import { matrixSquare, xLength } from "./controler";

export async function extractPixels(img) {
  try {
    const image = await loadImage(img);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const pixelArray = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = ((data[index + 3]) / 255).toFixed(2);
        pixelArray.push(`rgba(${r}, ${g}, ${b}, ${a})`);
      }
    }
    //#TODO new logic
    const mult = Math.round((width * height) / matrixSquare);
    const squareMult = Math.round(Math.sqrt(mult));
    console.log(mult , squareMult);
    if(mult > 1 ){
      const buttonPropsArr = pixelArray.filter((_, index) => index % squareMult === 0 );
      const newArr = [];
      let arrCounter = 0;
      for(let y = 0 ; y < height ; y++){
        for(let x = 0 ; x < xLength ; x++){
          arrCounter++;
          if(y % squareMult === 0 ){ newArr.push(buttonPropsArr[arrCounter]) };
      }
     }
     return newArr
    }
    else return pixelArray;
    }
    catch (error) {
    console.error(error);
    return [];
  }
}