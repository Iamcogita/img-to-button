import {xLength, yLength}from "./controler"

export function resizeImage(inputPixels, inputWidth , inputHeight) {
  const outputPixels = Array.from({ length: yLength }, () => Array(xLength).fill([0, 0, 0, 0]));

  function processRegion(startX, endX, startY, endY, outputX, outputY) {
      // Base case: If the region corresponds to one output pixel
      if (endX - startX === 1 && endY - startY === 1) {
          outputPixels[outputY][outputX] = inputPixels[startY][startX];
          return;
      }

      // Initialize variables to calculate the average color
      let sumR = 0, sumG = 0, sumB = 0, sumA = 0, count = 0;

      // Loop through the pixels in the current region
      for (let y = startY; y < endY; y++) {
          for (let x = startX; x < endX; x++) {
              const [r, g, b, a] = inputPixels[y][x];
              sumR += r;
              sumG += g;
              sumB += b;
              sumA += a;
              count++;
          }
      }

      // Compute the average color
      const avgR = Math.floor(sumR / count);
      const avgG = Math.floor(sumG / count);
      const avgB = Math.floor(sumB / count);
      const avgA = Math.floor(sumA / count);

      // Assign the average color to the output pixel
      outputPixels[outputY][outputX] = [avgR, avgG, avgB ,avgA];
  }

  // Helper function to recursively divide the input image into smaller blocks
  function divideAndConquer(startX, endX, startY, endY, outputX, outputY) {
      if (startX >= endX || startY >= endY) {
          return;
      }

      // Process this region
      processRegion(startX, endX, startY, endY, outputX, outputY);
  }

  // Scaling factors
  const scaleX = inputWidth / xLength;
  const scaleY = inputHeight / yLength;

  // Start the recursion for each output pixel
  for (let outputY = 0; outputY < yLength; outputY++) {
      for (let outputX = 0; outputX < xLength; outputX++) {
          const startX = Math.floor(outputX * scaleX);
          const endX = Math.floor((outputX + 1) * scaleX);
          const startY = Math.floor(outputY * scaleY);
          const endY = Math.floor((outputY + 1) * scaleY);

          divideAndConquer(startX, endX, startY, endY, outputX, outputY);
      }
  }

  const returnArr = [];
  const flatArray = outputPixels.flat();
  flatArray.forEach((e) => {returnArr.push("rgba("+ e +")");});
  return returnArr;
}