import React from "react";
import ReactDOM from "react-dom";
import { styled } from "styled-components";

const Modal = ({ children, toggleIsFormShow }) => {
  return ReactDOM.createPortal(
    <Backdrop onClick={toggleIsFormShow}>
      <StyledModal>{children}</StyledModal>
    </Backdrop>,
    document.getElementById("modals")
  );
};

export default Modal;

const StyledModal = styled.div`
  background-color: #fff;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  position: absolute;
  top: 0;
  align-items: center;
  display: flex;
  justify-content: center;
`;
