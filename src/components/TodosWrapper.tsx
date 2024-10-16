import { useEffect, useMemo } from "react"
import { AddTodo } from "./AddTodo";
import { Todos } from "./Todos";
import { Widget } from "./Widget";
import { useTodos } from "../hooks/useTodos";

export const TodosWrapper = () => {
  const { data, isLoading, error, addTodo, updateTodo, getTodos, deleteTodo } = useTodos();
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const sortedTodos = useMemo(() => {
    if(data.length <= 0) return [];
    console.log("Sorted Todos ...");
    return [...data].toSorted((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    })
  }, [data]);


  // Solved by using the same function as dep array
  const getCompletedTodosLength = useMemo(() => {
    console.log("Completed Length...");
    const sum = [...data].reduce((acc, currentValue) => acc + +currentValue.completed, 0)
    return sum;
  }, [[...data].reduce((acc, currentValue) => acc + +currentValue.completed, 0)]);

  return (
    <>
      {error && <p className="text-xl text-red-400 tracking-wide">{error.toString()}</p>}
      {isLoading ? <p className="text-2xl tracking-wide text-center text-slate-100">Loading..</p> :
        <>
          <section className="pb-10">
            <Widget>
              <p className="inline text-green-500 font-bold">Completed:</p> {getCompletedTodosLength}
            </Widget>
            <Widget>
              <p className="inline text-red-400 font-bold">To be Completed:</p> {data.length - getCompletedTodosLength}
            </Widget>
          </section>
          <AddTodo addTodo={addTodo} />
          <Todos sortedTodos={sortedTodos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        </>
      }
    </>
  )
}
