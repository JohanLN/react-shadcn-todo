import TodoContext from '@/core/context/todo.context'
import Todo from '@/core/models/entities/Todo.entity'
import { cn } from '@/lib/utils'
import { useContext } from 'react'
import DeleteTodo from './DeleteTodo'
import EditTodo from './EditTodo'
import TodoContent from './TodoContent'

interface ITodoItemProps {
    todo: Todo
    completeTodo: (id: string) => void
    deleteTodo: (id: string) => void
}

const TodoItem = (props: ITodoItemProps) => {
    const {setTodos} = useContext(TodoContext);
    const {todo, completeTodo, deleteTodo} = props;
    return (
        <div
            className={cn(
                'group rounded p-1',
                todo.isCompleted
                    ? 'border border-green-300 bg-green-100'
                    : 'hover:bg-gray-100'
            )}
        >
            <div className="flex flex-row items-center justify-between gap-5 p-2">
                <TodoContent todo={todo} completeTodo={completeTodo} />
                <div id="todo-actions" className="flw-row flex w-fit gap-2">
                    <EditTodo todo={todo} setTodos={setTodos} />
                    <DeleteTodo todo={todo} deleteTodo={deleteTodo} />
                </div>
            </div>
        </div>
    )
}

export default TodoItem
