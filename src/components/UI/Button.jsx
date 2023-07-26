import React from "react";
import { styled } from "styled-components";

const Button = ({ onClick, children, bgColor }) => {
  return (
    <StyledButton bgColor={bgColor} onClick={onClick} type="button">
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  border-radius: 13px;
  padding: 7px 15px;
  background-color: ${(p) => p.bgColor};
  color: #fff;
  border: none;
  border-radius: 9px;
  font-size: medium;
  height: 5vh;
  vertical-align: middle;
  cursor: pointer;
`;
