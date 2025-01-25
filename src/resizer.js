import { matrixSquare, xLength } from "./controler";

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
     return newArr;
    }