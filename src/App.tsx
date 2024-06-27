import { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Todos from './components/Todos/Todos';
import { Todo } from './components/Todos/types';
import { TODO_FILTER } from './components/Filters/Filters';
import { TODO_FILTERS } from './components/Filters/constants';
import Header from './components/Header/Header';

const mockTodos: Todo[] = [
  {
    id: 1,
    title: 'todo 1',
    completed: false,
  },
  {
    id: 2,
    title: 'todo 2',
    completed: false,
  },
  {
    id: 3,
    title: 'todo 3',
    completed: false,
  },
];

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos);
  const [selectedFilter, setSelectedFilter] = useState<TODO_FILTER>(
    TODO_FILTERS.all
  );

  const handleChangeTodoStatus = (id: number) => {
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    ]);
  };

  const handleDestroyTodo = (id: number) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const handleFilterChange = (filter: TODO_FILTER) => {
    setSelectedFilter(filter);
  };

  const handleDestroyCompleted = () => {
    setTodos([...todos.filter((todo) => !todo.completed)]);
  };

  const handleAddTodo = (newTodoTitle: Todo['title']) => {
    setTodos([
      ...todos,
      {
        id: (todos[todos.length - 1]?.id || 0) + 1,
        completed: false,
        title: newTodoTitle,
      },
    ]);

    console.log(todos);
  };

  const filteredTodos = [
    ...todos.filter(
      (todo) =>
        (selectedFilter.value === 'completed' && todo.completed) ||
        (selectedFilter.value === 'active' && !todo.completed) ||
        selectedFilter.value === 'all'
    ),
  ];

  return (
    <>
      <div className="todoapp">
        <Header onAddTodo={handleAddTodo} />
        <Todos
          items={filteredTodos}
          onChangeTodoStatus={handleChangeTodoStatus}
          onDestroyTodo={handleDestroyTodo}
        />

        <Footer
          onDestroyCompleted={handleDestroyCompleted}
          todos={todos}
          onFilterChange={handleFilterChange}
          selectedFilter={selectedFilter}
        />
      </div>
    </>
  );
};

export default App;
