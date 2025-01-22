import "./styles.css";
import React, { useState, useEffect } from "react";
import { matrixSquare , imgPath} from "./controler";
import { extractPixels } from "./pixelExtractor";
import { Break , Button } from "./components";

const Matrix = () => {
  //Promise String[] from pixelExtractor
  const [bgColor, setBgColor] = useState(["rgba(0, 0, 0, 1.0)"]);
  useEffect(() => {
    const fetchColors = async () => {
      const colors = await extractPixels(imgPath);
      setBgColor(colors);
    };
    fetchColors();
  }, []);
  // Array of number of Buttons
  const matrixArray = [];
  for (let i = 0; i < matrixSquare * matrixSquare; i++) {matrixArray.push(i);}
  return (
    <div className="matrix">
      {matrixArray.map((_, i) =>
        (i + 1) % matrixSquare === 0 
        ? (<Break key={i} color={bgColor[i]} />) 
        : (<Button key={i} color={bgColor[i]} />)
      )}
    </div>
  );
};

export default function App() {
  return <Matrix />;
}