import { type Todo } from '../Todos/types'

type Props = {
  data: Todo
  onClick: () => void
  onDestroy: (id: Todo['id']) => void
}

const TodoComponent = ({ data, onClick, onDestroy }: Props) => {
  return (
    <>
      <input
        className={`${data.completed ? 'completed' : ''} toggle`}
        id={`todo-${data.id}`}
        type="checkbox"
        checked={data.completed}
        onChange={() => {
          onClick()
        }}
      />
      <label htmlFor={`todo-${data.id}`}>{data.title}</label>
      <button
        className="destroy"
        onClick={() => {
          onDestroy(data.id)
        }}
      ></button>
    </>
  )
}

export default TodoComponent
