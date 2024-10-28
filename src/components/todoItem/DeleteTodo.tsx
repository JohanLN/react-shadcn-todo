import Todo from '@/core/models/entities/Todo.entity'
import { Trash2 } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'

interface IDeleteTodoProps {
  todo: Todo
  deleteTodo: (id: string) => void
}

const DeleteTodo = (props: IDeleteTodoProps) => {
  const {todo, deleteTodo} = props;
  
  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button
                variant="outline"
                size="icon"
                className="hidden h-6 w-6 group-hover:flex"
                onClick={(event) => {
                    event.stopPropagation()
                }}
            >
                <Trash2 />
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Delete task</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to delete this task?
                    Is this action irreversible.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    onClick={() => deleteTodo(todo.id)}
                >
                    Confirm
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTodo
