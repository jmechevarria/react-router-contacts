import TodoComponent from '../Todo/Todo';
import { Todo } from './types';

type Props = {
  items: Todo[];
  onChangeTodoStatus: (id: number) => void;
  onDestroyTodo: (id: number) => void;
};

const Todos = ({ items, onChangeTodoStatus, onDestroyTodo }: Props) => {
  return (
    <ul className="todo-list">
      {items.map((item) => (
        <li key={item.id} className={item.completed ? 'completed' : ''}>
          <TodoComponent
            data={item}
            onClick={() => {
              onChangeTodoStatus(item.id);
            }}
            onDestroy={onDestroyTodo}
          />
        </li>
      ))}
    </ul>
  );
};

export default Todos;
