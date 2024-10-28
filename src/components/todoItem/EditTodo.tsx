import TodoContext from '@/core/context/todo.context'
import Todo from '@/core/models/entities/Todo.entity'
import { Edit } from 'lucide-react'
import { useContext } from 'react'
import TodoForm from '../todoForm/TodoForm'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

interface IEditTodoProps {
  todo: Todo
}

const EditTodo = (props: IEditTodoProps) => {
    const {setTodos} = useContext(TodoContext);
  const {todo} = props;
  
  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button
              variant="outline"
              size="icon"
              className="hidden h-6 w-6 group-hover:flex"
              onClick={(event) => event.stopPropagation()}
          >
              <Edit />
          </Button>
      </DialogTrigger>
      <DialogContent>
          <DialogHeader>
              <DialogTitle>Edit task</DialogTitle>
              <DialogDescription>
                  You can now edit the task.
              </DialogDescription>
          </DialogHeader>
          <TodoForm
              setTodos={setTodos}
              todo={todo}
          />
      </DialogContent>
  </Dialog>
  )
}

export default EditTodo
