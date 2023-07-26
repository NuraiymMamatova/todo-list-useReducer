import React, { forwardRef } from "react";
import { styled } from "styled-components";

const Input = forwardRef(
  ({ placeholder, type = "text", onChange, checked }, ref) => {
    return (
      <StyledInput
        placeholder={placeholder}
        type={type}
        checked={checked}
        onChange={onChange}
        ref={ref}
      ></StyledInput>
    );
  }
);

export default Input;

const StyledInput = styled.input`
  outline: none;
  border: 1px solid #004aad;
  padding: 5px;
  width: 20rem;
`;
