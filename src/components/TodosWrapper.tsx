import { useEffect, useMemo } from "react"
import { AddTodo } from "./AddTodo";
import { Todos } from "./Todos";
import { useTodos } from "../hooks/useTodos";
import { Widgets } from "./Widgets";

export const TodosWrapper = () => {
  const { data, error, addTodo, updateTodo, getTodos, deleteTodo, completedTodos } = useTodos();

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const totalLength = useMemo(() => data.length, [data.length]);

  return (
    <section>
      {error && <p className="text-xl text-red-400 tracking-wide">{error.toString()}</p>}
      {data && data.length >= 1 && <div>
        <section className="pb-10">
          <Widgets completedTodos={completedTodos} totalLength={totalLength} />
        </section>
        <AddTodo addTodo={addTodo} />
        <Todos todos={data} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      </div>
      }
    </section>
  )
}
