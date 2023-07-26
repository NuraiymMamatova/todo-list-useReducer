import { useEffect, useReducer, useRef } from "react"; /* реакттан useEffect, useReducer менен useRef ти импорта */
import "./App.css";
import Button from "./components/UI/Button";
import Input from "./components/UI/Input";
import TodoItem from "./components/TodoItem";
import { styled } from "styled-components";

/* Бул функцияда биз состояниелерди тибине карап озгортуп жатабыз. */
const reducer = (prevState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "ADD_TODO":
      return { ...prevState, todos: payload };
    case "IS_ONLOAD":
      return { ...prevState, onLoading: payload };
    default:
      return prevState;
  }
};

/* Начальный состояние туздук*/
const initalState = {
  todos: [],
  onLoading: false,
};

function App() {
  const todoRef =
    useRef(
      ""
    ); /* биздин инпуттагы маанини алыш учун useRef re-render кылбаш учун */
  const [state, dispatch] = useReducer(
    reducer,
    initalState
  ); /* бул жака бердик */

  const onAdd = async () => {
    if (!todoRef.current.value) {
      return alert("The field must be filled!");
    }
    try {
      await fetch("https://todo-fa4ee-default-rtdb.firebaseio.com/todo.json", {
        method: "POST",
        body: JSON.stringify({
          title: todoRef.current.value,
          completed: false,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    getTodos();
  };

  const getTodos = async () => {
    /* Тиги reduce методка ушинтип маанилерди жонотобуз тибине карап тиги жак дальнейший действиелерди жасайт payload та биздин основной данныйларыбыз эмнени озгортуп жатабыз дегендей или эмнени жаны салып жатабыз */
    dispatch({ type: "IS_ONLOAD", payload: true });
    try {
      const response = await fetch(
        "https://todo-fa4ee-default-rtdb.firebaseio.com/todo.json"
      );
      const result = await response.json();
      console.log(result);

      const todos =
        result /* бизге келген данныйлар ушундай болуп келет  биз аны в дальшейшем майпатетиш учун аны массивке айландырыш керек 
    {
      -NaFOUt1dLTQ9mwpl9Bc {
        completed:false,
        title: "todo"
      }
    }
      и сгенерированный ключту биз id ге алмаштырышыбыз керек ошону астындагы код кылат
      */
          ? Object.entries(result).map(
              (
                [
                  id,
                  value,
                ] /* келип жаткан массивти сразу деструктаризация кылып жатабыз */
              ) => {
                /* Object.entries(result) биздин объекттин свойстволорун алып берет дальше ал свойстволор бир массив болот ошону биз map менен аралап жатабыз            */
                return {
                  /* и жаны объектке салып кайра кайтарып жатабыз */ id,
                  ...value,
                };
              }
            )
          : []; /* ушул жакта так же тернарный оператор колдонулуп жатат эгерде result пустой эмес болсо анда 
        биз пустой массивти берип койобуз чтобы бизде кийинчиреек is not iterable же map is not a function деген ошибка чыкпаш учун
        */
      dispatch({ type: "IS_ONLOAD", payload: false });
      dispatch({ type: "ADD_TODO", payload: todos });
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteTodo = async (id) => {
    try {
      await fetch(
        `https://todo-fa4ee-default-rtdb.firebaseio.com/todo/${id}.json`,
        { method: "DELETE" }
      );
    } catch (error) {
      console.log(error);
    }
    getTodos();
  };

  const onUpdateTodo = async (todo) => {
    try {
      await fetch(
        `https://todo-fa4ee-default-rtdb.firebaseio.com/todo/${todo.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(todo),
        }
      );
    } catch (error) {
      console.log(error);
    }
    getTodos();
  };

  /* биздин компонент mount болгон сайын то есть экранга жаны пайда болгон сайын биз сервверге запрос жонотуп тудуларды алып жатабыз */
  useEffect(() => {
    getTodos();
  }, []);

  if (state.onLoading) {
    /* Эгерде onloading true болсо анда биз гифти коросотобуз */
    return (
      <LoadingImageBox>
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/16823f41070057.5797d9ef4eed4.gif"
          alt="loading gif"
        />
      </LoadingImageBox>
    );
  }

  return (
    <StyledApp>
      <MainContainer>
        <StyledForm>
          <label htmlFor="todo-input">
            <MainHeading>TODO - LIST</MainHeading>
          </label>
          <StyledInputForTitle
            id={"todo-input"}
            placeholder={"Enter new todo..."}
            ref={todoRef}
          />
          <Button onClick={onAdd} bgColor={"#e2316c"}>
            Add
          </Button>
        </StyledForm>
        <StyledUl>
          {/* условный рендеринг эгерде массив пустой болсо анда  not found сообщение чыгат бар болсо тудалар озулору чыгат*/}
          {state.todos.length ? (
            state.todos.map((todo) => (
              <TodoItem
                key={todo.id}
                {...todo}
                onDelete={onDeleteTodo}
                onUpdate={onUpdateTodo}
              />
            ))
          ) : (
            <NotFoundBox>
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/task-not-found-4810738-4009510.png"
                alt="tasks not foun"
              />
              <h3>Tasks are done!</h3>
            </NotFoundBox>
          )}
        </StyledUl>
      </MainContainer>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  background-color: #68c5ff;
  padding: 120px;
  height: 100vh;
`;

const StyledInputForTitle = styled(Input)`
  outline: none;
  border: 1px solid #004aad;
  padding: 5px;
  width: 20rem;
`;

const StyledForm = styled.div`
  text-align: center;
  padding-top: 30px;
  & > label {
    color: #004aad;
  }
  & > button {
    width: 15%;
  }
`;

const StyledUl = styled.ul`
  padding: 20px;
  list-style: none;
  display: flex;
  flex-direction: column;
  color: white;
  gap: 10px;
`;

const MainContainer = styled.div`
  margin: auto;
  background-color: white;
  width: 600px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MainHeading = styled.h1`
  padding-bottom: 20px;
`;

const LoadingImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const NotFoundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #474a51;
  & > img {
    object-fit: cover;
    width: 30%;
  }
`;
