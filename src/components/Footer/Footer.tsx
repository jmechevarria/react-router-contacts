import Filters, { TODO_FILTER } from '../Filters/Filters';
import { Todo } from '../Todos/types';

type Props = {
  todos: Todo[];
  onDestroyCompleted: () => void;
  onFilterChange: (filter: TODO_FILTER) => void;
  selectedFilter: TODO_FILTER;
};

const Footer = ({
  todos,
  onDestroyCompleted,
  onFilterChange,
  selectedFilter,
}: Props) => {
  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count">
        Pendientes: <strong>{activeCount}</strong>/
        <strong>{todos.length}</strong>
      </span>
      <Filters
        selectedFilter={selectedFilter}
        onFilterChange={onFilterChange}
      />
      <span className="clear-completed" onClick={onDestroyCompleted}>
        Eliminar completados
      </span>
    </footer>
  );
};

export default Footer;
