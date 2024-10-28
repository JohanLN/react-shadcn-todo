import { compareDateFromNow } from '@/core/date/dateFormatter'
import Todo from '@/core/models/entities/Todo.entity'
import { cn } from '@/lib/utils'
import { Edit, Trash2 } from 'lucide-react'
import TodoForm from '../todoForm/TodoForm'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog'

interface ITodoItemProps {
    todo: Todo
    completeTodo: (id: string) => void
    deleteTodo: (id: string) => void
    setTodos: (value: Todo[]) => void
}

const TodoItem = (props: ITodoItemProps) => {
    return (
        <div
            className={cn(
                'group rounded p-1',
                props.todo.isCompleted
                    ? 'border border-green-300 bg-green-100'
                    : 'hover:bg-gray-100'
            )}
        >
            <div className="flex flex-row items-center justify-between gap-5 p-2">
                <div className="flex flex-row items-center gap-2 overflow-hidden">
                    <Checkbox
                        checked={props.todo.isCompleted}
                        onCheckedChange={() =>
                            props.completeTodo(props.todo.id)
                        }
                        className={cn(
                            props.todo.isCompleted
                                ? ''
                                : 'hidden group-hover:block'
                        )}
                    />
                    <div className="flex w-full flex-row items-center gap-2 overflow-hidden">
                        <h4 className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                            {props.todo.title}
                        </h4>
                        {props.todo.dueDate ? (
                            <span className="whitespace-nowrap">
                                - {compareDateFromNow(props.todo.dueDate)}
                            </span>
                        ) : null}
                    </div>
                </div>
                <div className="flw-row flex w-fit gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="hidden h-6 w-6 group-hover:flex"
                                onClick={(event) => {
                                    event.stopPropagation()
                                }}
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
                                setTodos={props.setTodos}
                                todo={props.todo}
                            />
                        </DialogContent>
                    </Dialog>
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
                                    onClick={() =>
                                        props.deleteTodo(props.todo.id)
                                    }
                                >
                                    Confirm
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    )
}

export default TodoItem
