import TodoContext from '@/core/context/todo.context'
import { formatDate } from '@/core/date/dateFormatter'
import Todo from '@/core/models/entities/Todo.entity'
import { cn } from '@/lib/utils'
import { useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog'
import DeleteTodo from './DeleteTodo'
import EditTodo from './EditTodo'
import TodoContent from './TodoContent'

interface ITodoItemProps {
    todo: Todo
    completeTodo: (id: string) => void
    deleteTodo: (id: string) => void
}

const TodoItem = (props: ITodoItemProps) => {
    const { setTodos } = useContext(TodoContext)
    const { todo, completeTodo, deleteTodo } = props
    return (
        <Dialog>
            <div
                className={cn(
                    'group cursor-pointer rounded p-1',
                    todo.isCompleted
                        ? 'border border-green-300 bg-green-100'
                        : 'hover:bg-gray-100'
                )}
            >
                <div className="flex flex-row items-center justify-between p-2">
                    <DialogTrigger className="flex h-full w-full flex-row">
                        <TodoContent todo={todo} completeTodo={completeTodo} />
                    </DialogTrigger>
                    <div id="todo-actions" className="flw-row flex w-fit gap-2">
                        <EditTodo todo={todo} setTodos={setTodos} />
                        <DeleteTodo todo={todo} deleteTodo={deleteTodo} />
                    </div>
                </div>
            </div>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{todo.title}</DialogTitle>
                </DialogHeader>
                {todo.description ? (
                    <p>{todo.description}</p>
                ) : (
                    <p>No description...</p>
                )}
                {todo.dueDate ? (
                    <span>This task is due for {formatDate(todo.dueDate)}</span>
                ) : (
                    <span>No due date given</span>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default TodoItem
