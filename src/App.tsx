import { Plus } from 'lucide-react'
import { useMemo } from 'react'
import TodoForm from './components/todoForm/TodoForm'
import TodoList from './components/todoList/TodoList'
import { Button } from './components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './components/ui/dialog'
import { Toaster } from './components/ui/sonner'
import TodoContext from './core/context/todo.context'
import Todo from './core/models/entities/Todo.entity'
import useLocalStorage from './shared/hooks/useLocalStorage'

const App = () => {
    const [todos, setTodos] = useLocalStorage<Todo[]>('todos', [])
    const contextValue = useMemo(() => ({
        todos,
        setTodos
    }), [todos, setTodos])

    return (
        <TodoContext.Provider value={contextValue}>
            <h1 className="py-5 text-center">React TodoList</h1>
            <Dialog>
                <div className="grid grid-cols-1 gap-2 px-20 py-12 md:grid-cols-4 lg:px-80">
                    <DialogTrigger asChild>
                        <div className="fixed bottom-10 right-10 z-10">
                            <Button className="rounded-full p-6" size="icon">
                                <Plus />
                            </Button>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add a new task</DialogTitle>
                            <DialogDescription>
                                Enter informations to create a new task to do.
                            </DialogDescription>
                        </DialogHeader>
                        <TodoForm setTodos={setTodos} />
                    </DialogContent>
                    <div className="col-span-4 overflow-hidden rounded border px-6 py-3">
                        <h3 className="w-full bg-white">All tasks</h3>
                        <div className="h-full max-h-80 min-h-40 flex-col overflow-y-auto">
                            <div className="h-full">
                                <TodoList
                                    filterCondition="all"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 h-full overflow-hidden rounded border px-6 py-3">
                        <h3 className="w-full bg-white">Done tasks</h3>
                        <div className="h-full max-h-80 min-h-40 flex-col overflow-y-auto">
                            <div className="h-full">
                                <TodoList
                                    filterCondition="done"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 h-full overflow-hidden rounded border px-6 py-3">
                        <h3 className="w-full bg-white">Undone tasks</h3>
                        <div className="h-full max-h-80 min-h-40 flex-col overflow-y-auto">
                            <div className="h-full">
                                <TodoList
                                    filterCondition="undone"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
            <Toaster richColors duration={3000} closeButton />
        </TodoContext.Provider>
    )
}

export default App
