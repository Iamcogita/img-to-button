import Styled from "styled-components";

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

export const Button = ({ color }) => {
  return <StyledButton color={color} />;
};

export const Break = ({ color }) => {
  return (
    <>
      <StyledButton color={color} />
      <StyledDiv />
    </>
  );
};