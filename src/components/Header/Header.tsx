import { useState } from 'react';
import { Todo } from '../Todos/types';

type Props = {
  onAddTodo: (title: Todo['title']) => void;
};

const Header = ({ onAddTodo }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = inputValue.trim();
    if (!trimmed) return;

    onAddTodo(trimmed);
    setInputValue('');
  };

  return (
    <>
      <h1>
        todo
        <img
          width={50}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png"
          alt="ts-logo"
          title="™/®Microsoft, Public domain, via Wikimedia Commons"
        />
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          value={inputValue}
          placeholder="¿Qué quieres hacer?"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          autoFocus
        />
      </form>
    </>
  );
};

export default Header;
