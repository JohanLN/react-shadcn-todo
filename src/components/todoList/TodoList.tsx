import { dateDiff, now } from '@/core/date/dateFormatter'
import Todo from '@/core/models/entities/Todo.entity'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import TodoItem from '../todoItem/TodoItem'
import { Button } from '../ui/button'
import { DialogTrigger } from '../ui/dialog'

interface ITodoListProps {
    todos: Todo[]
    setTodos: (value: Todo[]) => void
    filterCondition: 'all' | 'done' | 'undone'
}

const TodoList = (props: ITodoListProps) => {
    const completeTodo = (id: string) => {
        const updatedTodo = props.todos.find((todo) => todo.id === id)

        props.setTodos(
            props.todos
                .map((todo) =>
                    todo.id === id
                        ? { ...todo, isCompleted: !todo.isCompleted }
                        : todo
                )
                .sort((a, b) =>
                    a.dueDate && b.dueDate ? dateDiff(a.dueDate, b.dueDate) : -1
                )
                .sort((todo) => (todo.isCompleted ? 1 : -1))
        )
        toast.info(
            `Task ${!updatedTodo?.isCompleted ? 'Completed' : 'Not completed'}`
        )
    }
    const deleteTodo = (id: string) => {
        props.setTodos(props.todos.filter((todo) => todo.id !== id))
        toast.error(`Task deleted at ${now()}`)
    }

    return (
        <div className="flex h-full flex-col gap-1">
            {props.todos.length ? (
                props.todos
                    .filter((todo: Todo) => {
                        if (props.filterCondition === 'done') {
                            return todo.isCompleted
                        } else if (props.filterCondition === 'undone') {
                            return !todo.isCompleted
                        }
                        return todo
                    })
                    .map((todo: Todo) => {
                        return (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                completeTodo={completeTodo}
                                deleteTodo={deleteTodo}
                                setTodos={props.setTodos}
                            />
                        )
                    })
            ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                    <h4>This list is empty</h4>
                    {props.filterCondition === 'all' ? (
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Plus />
                                Start by creating a new task
                            </Button>
                        </DialogTrigger>
                    ) : null}
                </div>
            )}
        </div>
    )
}

export default TodoList
