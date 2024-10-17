import { useCallback, useEffect, useMemo, useReducer, useState } from "react"
import { CreateTodoType, Todo as TodoType, AddTodoProps } from "../../types";

type ResponseBodyData = { id: number, completed: boolean };

type TodosReducerState = { todos: TodoType[] };
type TodosReducerAction = { type: "add_todo", todo: TodoType } | { type: "add_multiple", todos: TodoType[] } | { type: "sort_by_completion" } | { type: "remove_todo", todoId: number } | { type: "update_todo", todo: Partial<TodoType> };

type TodosReducer = (state: TodosReducerState, action: TodosReducerAction) => TodosReducerState;
const todosReducer = (state: TodosReducerState, action: TodosReducerAction) => {
  switch (action.type) {
    case "add_todo":
      return { todos: [...state.todos, action.todo] }
    case "add_multiple": {
      const result = state.todos.map((todo) => action.todos.some((curr) => curr.id === todo.id) ? null : todo).filter((a) => a !== null);
      return { todos: [...result, ...action.todos] }
    }
    case "update_todo":
      return { todos: state.todos.map((todo) => todo.id === action.todo.id ? { ...todo, ...action.todo } : todo) }
    case "remove_todo":
      return { todos: state.todos.filter((todo) => todo.id !== action.todoId) }
    default:
      throw new Error();
  }
}

export const useTodos = () => {
  const [state, dispatch] = useReducer<TodosReducer>(todosReducer, {
    todos: localStorage && localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos") as string) as TodoType[] : []
  });
  const [error, setError] = useState<string>("");

  // Store
  useEffect(() => {
    const storeToLocalstorage = () => localStorage.setItem("todos", JSON.stringify(state.todos));
    window.addEventListener("beforeunload", storeToLocalstorage);
    return () => {
      window.removeEventListener("beforeunload", storeToLocalstorage)
    }
  }, [state.todos]);


  const completedTodos: number = useMemo(() => {
    const result: number = [...state.todos].reduce((acc, currentValue) => acc + +currentValue.completed, 0)
    return result;
  }, [[...state.todos].reduce((acc, currentValue) => acc + +currentValue.completed, 0)]);

  const getTodos = useCallback(() => {
    fetch(import.meta.env.VITE_TODO_URL)
      .then(res => res.json() as Promise<TodoType[]>)
      .then(_data => dispatch({ type: "add_multiple", todos: _data }))
      .catch((error) => setError(`${error}`))
  }, []);

  const addTodo = useCallback(({ title, description }: AddTodoProps) => {
    const newTodo: CreateTodoType = {
      title,
      description,
    }
    // Post Request
    fetch(import.meta.env.VITE_TODO_URL, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    })
      .then(res => res.json() as Promise<ResponseBodyData>)
      .then((data) => dispatch({ type: "add_todo", todo: { ...newTodo, id: data.id, completed: data.completed } }))
      .catch((error) => setError(`${error}`))
  }, []);

  const updateTodo = useCallback((_todo: Partial<TodoType>) => {
    fetch(`${import.meta.env.VITE_TODO_URL}/${_todo.id}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(_todo),
    }).then(res => res.json() as Promise<TodoType>)
      .then((data) => dispatch({ type: "update_todo", todo: data }))
      .catch((error) => setError(`${error}`))
  }, []);

  const deleteTodo = useCallback((_id: number) => {
    fetch(`${import.meta.env.VITE_TODO_URL}/${_id}`, {
      method: "DELETE",
    }).then(() => dispatch({ type: "remove_todo", todoId: _id }))
      .catch((error) => setError(`${error}`))
  }, [])

  return { data: state.todos, error, addTodo, updateTodo, getTodos, deleteTodo, completedTodos }
}
