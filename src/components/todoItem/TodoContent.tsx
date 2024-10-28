import { compareDateFromNow } from '@/core/date/dateFormatter'
import Todo from '@/core/models/entities/Todo.entity'
import { cn } from '@/lib/utils'
import { Checkbox } from '../ui/checkbox'

interface ITodoContentProps {
    todo: Todo
    completeTodo: (id: string) => void
}

const TodoContent = (props: ITodoContentProps) => {
    const { todo, completeTodo } = props
    return (
        <div className="flex flex-row items-center gap-2 overflow-hidden">
            <Checkbox
                id="checkbox"
                onClick={(event) => event.stopPropagation()}
                checked={todo.isCompleted}
                onCheckedChange={() => completeTodo(todo.id)}
                className={cn(
                    todo.isCompleted ? '' : 'hidden group-hover:block'
                )}
            />
            <div className="flex w-full flex-row items-center gap-2 overflow-hidden">
                <h4 className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                    {todo.title}
                </h4>
                {todo.dueDate ? (
                    <span className="whitespace-nowrap">
                        - {compareDateFromNow(todo.dueDate)}
                    </span>
                ) : null}
            </div>
        </div>
    )
}

export default TodoContent
