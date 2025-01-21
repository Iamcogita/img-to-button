import "./styles.css";
import Styled from "styled-components";
import React, { useState, useEffect } from "react";
import { matrixSquare , imgPath} from "./controler";
import { createCanvas, loadImage } from "canvas";

const StyledButton = Styled.button`
  margin: 0px;
  border-radius: 10% / 50%;
  border-color: rgba(50, 255, 0, 0.5);
  min-width: 15px;
  min-height: 15px;
  background-color: ${(props) => props.color};
`;

const StyledDiv = Styled.div`
  height: 0px;
`;

const Button = ({ color }) => {
  return <StyledButton color={color} />;
};

const Break = ({ color }) => {
  return (
    <>
      <StyledButton color={color} />
      <StyledDiv />
    </>
  );
};

async function extractPixels(img) {
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
        const a = (data[index + 3] / 255).toFixed(2);
        buttonProps.push(`rgba(${r}, ${g}, ${b}, ${a})`);
      }
    }
    const mult = Math.floor((canvas.width * canvas.height) / (matrixSquare * matrixSquare));
    const buttonPropsArr = buttonProps.filter((_, index) => index % mult === 0);
    return buttonPropsArr;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const Matrix = () => {
  const [bgColor, setBgColor] = useState(["rgba(0, 0, 0, 0.5)"]);

  useEffect(() => {
    const fetchColors = async () => {
      const colors = await extractPixels(imgPath);
      setBgColor(colors);
    };
    fetchColors();
  }, []);

  const matrixArray = [];
  for (let i = 0; i < matrixSquare * matrixSquare; i++) {
    matrixArray.push(i);
  }

  return (
    <div className="matrix">
      {matrixArray.map((_, i) =>
        (i + 1) % matrixSquare === 0 ? (
          <Break key={i} color={bgColor[i]} />
        ) : (
          <Button key={i} color={bgColor[i]} />
        )
      )}
    </div>
  );
};

export default function App() {
  return <Matrix />;
}