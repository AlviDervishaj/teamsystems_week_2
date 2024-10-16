import { useCallback, useState } from "react"
import { CreateTodoType, Todo as TodoType, AddTodoProps } from "../../types";

type ResponseBodyData = { id: number, completed: boolean };
export const useTodos = () => {
  const [data, setData] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const deleteTodo = useCallback((_id: number) => {
    fetch(`${import.meta.env.VITE_TODO_URL}/${_id}`, {
      method: "DELETE",
    }).then(() => {
      setData((prev) => [...prev.toSpliced(prev.findIndex((todo) => todo.id === _id), 1)])
    })
      .catch((error) => setError(`${error}`))
      .finally(() => setIsLoading(false));
  }, [])


  const getTodos = useCallback(() => {
    fetch(import.meta.env.VITE_TODO_URL)
      .then(res => res.json() as Promise<TodoType[]>)
      .then(_data => setData(_data))
      .catch((error) => setError(`${error}`))
      .finally(() => setIsLoading(false));
  }, []);

  const addTodo = useCallback(({ title, description }: AddTodoProps) => {
    setIsLoading(true);
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
      .then((data) => {
        setData((prev) => [...prev, {
          ...newTodo,
          id: data.id,
          completed: data.completed,
        }])
      }).catch((error) => setError(`${error}`))
      .finally(() => setIsLoading(false));
  }, []);

  const updateTodo = useCallback((_todo: Partial<TodoType>) => {
    fetch(`${import.meta.env.VITE_TODO_URL}/${_todo.id}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(_todo),
    }).then(res => res.json() as Promise<TodoType>)
      .then((_data) => {
        setData((prev) => {
          return prev.map((_todo) => _todo.id === _data.id ? _data : _todo)
        })
      }).catch((error) => setError(`${error}`))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error, addTodo, updateTodo, getTodos, deleteTodo }
}
