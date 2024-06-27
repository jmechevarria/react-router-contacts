import './App.css'
import Todos from './components/Todos/Todos'
import { Todo } from './components/Todos/types'

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
]

const App = (): JSX.Element => {
  return (
    <div className="todoapp">
      <Todos items={mockTodos} />
    </div>
  )
}

export default App
