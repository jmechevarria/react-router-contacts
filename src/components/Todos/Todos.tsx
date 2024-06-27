import { useState } from "react";
import TodoComponent from "../Todo/Todo";
import { Todo } from "./types";

type Props = {
  items: Todo[];
};

const Todos = ({ items }: Props) => {
  const [todos, setTodos] = useState(items);

  const onClickTodo = (id: Todo["id"]) => {
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    ]);
  };

  const onDestroyTodo = (id: Todo["id"]) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  return (
    <ul className="todo-list">
      {todos.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <TodoComponent
            data={item}
            onClick={() => {
              onClickTodo(item.id);
            }}
            onDestroy={onDestroyTodo}
          />
        </li>
      ))}
    </ul>
  );
};

export default Todos;
