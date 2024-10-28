import TodoContext from '@/core/context/todo.context'
import { now } from '@/core/date/dateFormatter'
import Todo from '@/core/models/entities/Todo.entity'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { Button } from '../ui/button'
import { DialogClose, DialogFooter } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import DueDateFormItem from './DueDateFormItem'

interface ITodoFormProps {
    todo?: Todo
}

const todoFormSchema = z.object({
    todoTitle: z.string().min(2, {
        message: 'The todo task title must contains at least 2 characters.',
    }),
    todoDescription: z.string().optional(),
    dueDate: z.date().nullable().optional(),
})

const TodoForm = (props: ITodoFormProps) => {
    const {setTodos} = useContext(TodoContext)
    const {todo} = props;

    const form = useForm<z.infer<typeof todoFormSchema>>({
        resolver: zodResolver(todoFormSchema),
        defaultValues: {
            todoTitle: todo?.title ?? '',
            todoDescription: todo?.description ?? '',
            dueDate: todo?.dueDate ?? null,
        },
    })

    const onSubmit = (values: z.infer<typeof todoFormSchema>) => {
        const { todoTitle, todoDescription, dueDate } = values

        if (todo && todo.id) {
            setTodos((prevTodos: Todo[]) =>
                prevTodos.map((todoItem: Todo) => {
                    if (todoItem.id === todo?.id) {
                        todoItem.title = todoTitle
                        todoItem.description = todoDescription
                        todoItem.dueDate = dueDate
                    }

                    return todoItem
                })
            )
            toast.success('The task has been successfuly edited.')
        } else {
            const newTodo = new Todo(
                uuidv4(),
                todoTitle,
                false,
                todoDescription,
                dueDate
            )

            setTodos((prev: Todo[]) =>
                [...prev, newTodo].sort((todo: Todo) =>
                    todo.isCompleted ? 1 : -1
                )
            )

            toast.success('New task has been successfuly added.', {
                description: `${values.todoTitle}, added at ${now()}`,
            })
        }
        form.reset()
    }

    return (
        <div className="flex flex-col rounded border px-14 py-5">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                >
                    <FormField
                        control={form.control}
                        name="todoTitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Todo task title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Todo task title"
                                        {...field}
                                        required
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="todoDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Todo task description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Todo task description"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <DueDateFormItem formControl={form.control} />
                    <DialogFooter>
                        <div className="flex w-fit flex-row gap-5">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="submit">Submit</Button>
                            </DialogClose>
                        </div>
                    </DialogFooter>
                </form>
            </Form>
        </div>
    )
}

export default TodoForm
