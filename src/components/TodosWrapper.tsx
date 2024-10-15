import { useCallback, useEffect, useState } from "react"
import { Todo as TodoType } from "../../types";
import { InitialTodos } from "../utils";
import { v4 } from "uuid";
import dayjs from "dayjs";
import { AddTodo } from "./AddTodo";
import { Todos } from "./Todos";

type AddTodoProps = {
  title: TodoType["title"],
  description: TodoType["description"],
}

export const TodosWrapper = () => {
  const [todos, setTodos] = useState<TodoType[]>(InitialTodos);

  useEffect(() => {
    const _localTodos = localStorage.getItem("todos");
    // load items from localStorage
    if (_localTodos) {
      const localTodos: TodoType[] = JSON.parse(_localTodos) as TodoType[];
      setTodos(localTodos);
    }
  }, [])

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
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} updateTodo={updateTodo} />
    </>
  )

}
