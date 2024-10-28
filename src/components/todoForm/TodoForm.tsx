import { formatDate, now } from '@/core/date/dateFormatter'
import Todo from '@/core/models/entities/Todo.entity'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { DialogClose, DialogFooter } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Popover } from '../ui/popover'
import { Textarea } from '../ui/textarea'

interface ITodoFormProps {
    setTodos: (value: Todo[]) => void
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
    const form = useForm<z.infer<typeof todoFormSchema>>({
        resolver: zodResolver(todoFormSchema),
        defaultValues: {
            todoTitle: props.todo?.title ?? '',
            todoDescription: props.todo?.description ?? '',
            dueDate: props.todo?.dueDate ?? null,
        },
    })

    const onSubmit = (values: z.infer<typeof todoFormSchema>) => {
        const { todoTitle, todoDescription, dueDate } = values
        console.log(values)
        console.log('ça passe ici ? ===>', values, props.todo)

        if (props.todo) {
            props.setTodos((prevTodos: Todo[]) =>
                prevTodos.map((todo: Todo) => {
                    if (todo.id === props.todo?.id) {
                        todo.title = todoTitle
                        todo.description = todoDescription
                        todo.dueDate = dueDate
                    }

                    return todo
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

            props.setTodos((prev: Todo[]) =>
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
                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Todo task due date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                'flex w-fit flex-row gap-3 px-4 text-start',
                                                !field.value &&
                                                    'text-muted-foreground'
                                            )}
                                        >
                                            {field.value ? (
                                                formatDate(field.value)
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto rounded bg-white p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value ?? new Date()}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date('1900-01-01')
                                            }
                                            {...field}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
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
