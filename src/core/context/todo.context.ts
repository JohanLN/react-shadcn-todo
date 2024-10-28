import { createContext } from "react";
import Todo from "../models/entities/Todo.entity";

interface TodoContextType {
  todos: Todo[]
  setTodos: (value: Todo[]) => void
}

const TodoContext = createContext<TodoContextType>({
  todos: [],
  setTodos: (_: Todo[]) => {},
})

export default TodoContext;