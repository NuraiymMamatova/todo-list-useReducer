import React, { useState } from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { styled } from "styled-components";
import Modal from "./UI/Modal";

const TodoItem = ({ id, title, completed, onDelete, onUpdate }) => {
  const [isFormShow, setIsFormShow] = useState(false);
  const onDeleteTodo = (id) => {
    onDelete(id);
    toggleIsFormShow();
  };

  const toggleIsFormShow = () => {
    setIsFormShow(!isFormShow);
  };
  return (
    <>
      <StyledTodoItem>
        <TodoTitle completed={completed}>{title}</TodoTitle>
        <DeleteWithCheckboxWrapper>
          <CheckboxStyledInput
            type={"checkbox"}
            checked={completed}
            onChange={() => onUpdate({ id, title, completed: !completed })}
          />
          <Button bgColor={"#ff5758"} onClick={toggleIsFormShow}>
            Delete
          </Button>
        </DeleteWithCheckboxWrapper>
      </StyledTodoItem>
      {isFormShow && (
        <Modal toggleIsFormShow={toggleIsFormShow}>
          <h2>Are you sure you want to delete this task?</h2>
          <ButtonsWrapper>
            <Button bgColor={"#fe0101"} onClick={toggleIsFormShow}>
              No
            </Button>
            <Button bgColor={"#017f01"} onClick={() => onDeleteTodo(id)}>
              Yes
            </Button>
          </ButtonsWrapper>
        </Modal>
      )}
    </>
  );
};

export default TodoItem;

const StyledTodoItem = styled.li`
  background-color: #1c93d2;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
`;

const CheckboxStyledInput = styled.input.attrs({ type: "checkbox" })`
  display: flex;
  align-items: center;
  justify-content: center;

&:checked {
  background: #00bf63;
  appearance: none;
  width: 12px;
  height: 12px;
  border: 1px solid gray;
}

&::after {
  font-weight: 900;
  content: "\2713";
  font-size: 8px;
  color: white;
}
`;

const DeleteWithCheckboxWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const TodoTitle = styled.p`
  text-decoration: ${(p) => (p.completed ? "line-through #e53b43" : "none")};
`;
