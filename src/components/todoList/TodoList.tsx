import TodoContext from '@/core/context/todo.context'
import { dateDiff, now } from '@/core/date/dateFormatter'
import Todo from '@/core/models/entities/Todo.entity'
import { useContext } from 'react'
import { toast } from 'sonner'
import TodoItem from '../todoItem/TodoItem'
import EmptyState from './EmptyState'

interface ITodoListProps {
    filterCondition: 'all' | 'done' | 'undone'
}

const TodoList = (props: ITodoListProps) => {
    const context = useContext(TodoContext);
    const {filterCondition} = props;
    const {todos, setTodos} = context;

    const completeTodo = (id: string) => {
        const updatedTodo = todos.find((todo) => todo.id === id)

        setTodos(
            todos
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
        setTodos(todos.filter((todo) => todo.id !== id))
        toast.error(`Task deleted at ${now()}`)
    }

    return (
        <div className="flex h-full flex-col gap-1">
            {todos.length ? (
                todos
                    .filter((todo: Todo) => {
                        if (filterCondition === 'done') {
                            return todo.isCompleted
                        } else if (filterCondition === 'undone') {
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
                            />
                        )
                    })
            ) : (
                <EmptyState filterCondition={filterCondition} />
            )}
        </div>
    )
}

export default TodoList
