import "./styles.css";
import React, { useState, useEffect } from "react";
import { imgPath, xLength, yLength } from "./controler";
import { extractPixels } from "./pixelExtractor";
import { Break , Button } from "./components";

const Matrix = () => {
  // String[] promise from pixelExtractor
  const [bgColor, setBgColor] = useState(["rgba(0, 0, 0, 1.0)"]);
  useEffect(() => {
    (async function(){
      const colors = await extractPixels(imgPath);
      setBgColor(colors);
    })();
  }, []);
  // Array of Buttons
  const buttonArray = [];
  for (let i = 0; i < xLength*yLength; i++) {buttonArray.push(i);}
  return (
    <div className="matrix">
      {buttonArray.map((_, i) =>
        (i + 1) % xLength === 0 
        ? (<Break key={i} color={bgColor[i]} />) 
        : (<Button key={i} color={bgColor[i]} />)
      )}
    </div>
  );
};

export default function App() {
  return <Matrix />;
}