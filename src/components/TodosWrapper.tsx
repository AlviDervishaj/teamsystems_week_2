import { useCallback, useEffect, useState } from "react"
import { Todo as TodoType } from "../../types";
import { v4 } from "uuid";
import dayjs from "dayjs";
import { AddTodo } from "./AddTodo";
import { Todos } from "./Todos";
import { useGet } from "../hooks/useGet";
import { InitialTodos } from "../utils";

type AddTodoProps = {
  title: TodoType["title"],
  description: TodoType["description"],
}

export const TodosWrapper = () => {
  const { data, isLoading, error, revalidate } = useGet<TodoType[]>(import.meta.env.VITE_TODO_URL as string);
  const [todos, setTodos] = useState<TodoType[]>(InitialTodos);

  // Fetch from Todo Url
  useEffect(() => {
    revalidate();
  }, [revalidate]);

  useEffect(() => {
    const _localTodos: string | null = localStorage.getItem("todos");
    // load items from localStorage
    if (_localTodos) {
      const localTodos: TodoType[] = JSON.parse(_localTodos) as TodoType[];
      setTodos(localTodos);
      return;
    }
    else if (data) return setTodos(data);
  }, [data])

  const saveTodos = useCallback(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Load into localStorage before un-mouting component
  useEffect(() => {
    window.addEventListener("beforeunload", saveTodos);

    return () => {
      window.removeEventListener("beforeunload", saveTodos);
    }
  }, [saveTodos]);

  const updateTodo = useCallback((_todo: TodoType) => {
    console.log("Updated Todo");
    const updatedTodos: TodoType[] = todos.map((todo) => {
      return todo.id === _todo.id ? _todo : todo;
    });
    setTodos(updatedTodos);
  }, [todos]);

  const addTodo = useCallback(({ title, description }: AddTodoProps) => {
    console.log("Added Todo");
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
  }, []);

  return (
    <>
      {isLoading ? <p className="text-2xl tracking-wide text-center text-slate-100">Loading..</p> :
        <>
          <AddTodo addTodo={addTodo} />
          <Todos todos={todos} updateTodo={updateTodo} />
        </>
      }
    </>
  )

}
