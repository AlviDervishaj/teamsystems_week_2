import { useEffect, useState } from "react"
import { Todo as TodoType } from "../types";
import { Todos } from "./components/Todos";
import { InitialTodos } from "./utils";
import { v4 } from "uuid";
import dayjs from "dayjs";
import { AddTodo } from "./components/AddTodo";

type AddTodoProps = {
  title: TodoType["title"],
  description: TodoType["description"],
}


function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    setTodos(InitialTodos);
  }, [])

  useEffect(() => {
    const saveTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    window.addEventListener("beforeunload", saveTodos);

    return () => {
      window.removeEventListener("beforeunload", saveTodos);
    }
  }, [todos]);

  const addTodo = ({ title, description }: AddTodoProps) => {
    const newTodo: TodoType = {
      id: v4(),
      title,
      description,
      editedAt: null,
      completed: false,
      createdAt: dayjs(),
      timestamp: dayjs().valueOf(),
    }
    setTodos((prev) => [...prev, newTodo]);
  }

  return (
    <main className="w-dvw h-dvh p-4">
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} />
    </main>
  )
}

export default App
