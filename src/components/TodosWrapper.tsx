import { useCallback, useEffect, useMemo, useState } from "react"
import { CreateTodoType, Todo as TodoType } from "../../types";
import { AddTodo } from "./AddTodo";
import { Todos } from "./Todos";
import { useGet } from "../hooks/useGet";

type AddTodoProps = {
  title: TodoType["title"],
  description: TodoType["description"],
}

export const TodosWrapper = () => {
  const { data, isLoading, error, revalidate } = useGet<TodoType[]>(import.meta.env.VITE_TODO_URL as string);
  const [todos, setTodos] = useState<TodoType[]>([]);

  // Fetch from Todo Url
  useEffect(() => {
    const _localTodos: string | null = localStorage.getItem("todos");
    // load items from localStorage
    if (_localTodos) {
      const localTodos: TodoType[] = JSON.parse(_localTodos) as TodoType[];
      setTodos(localTodos);
      revalidate();
      return;
    }
  }, [revalidate]);
  useEffect(() => {
    if (data) setTodos(data);
  }, [data]);

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

  const sortedTodos = useMemo(() => {
    console.log("Here");
    return todos.toSorted((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    })
  }, [todos]);

  const updateTodo = useCallback((_todo: TodoType) => {
    console.log("Updated Todo");
    // update before request
    const updatedTodos: TodoType[] = todos.map((todo) => {
      return todo.id === _todo.id ? _todo : todo;
    });
    setTodos(updatedTodos);
    fetch(`${import.meta.env.VITE_TODO_URL}/${_todo.id}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(_todo),
    });
  }, [todos]);

  const addTodo = useCallback(({ title, description }: AddTodoProps) => {
    const newTodo: CreateTodoType = {
      title,
      description,
    }
    fetch(import.meta.env.VITE_TODO_URL, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    }).then(res => res.json()).then((data: { id: number, completed: boolean }) => {
      const _new: TodoType = {
        ...newTodo,
        id: data.id,
        completed: data.completed,
      }
      setTodos((prev) => [...prev, _new]);
    });
  }, []);

  return (
    <>
      {isLoading ? <p className="text-2xl tracking-wide text-center text-slate-100">Loading..</p> :
        <>
          <AddTodo addTodo={addTodo} />
          <Todos sortedTodos={sortedTodos} updateTodo={updateTodo} />
        </>
      }
    </>
  )

}
