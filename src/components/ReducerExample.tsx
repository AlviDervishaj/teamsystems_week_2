import { useCallback, useEffect, useReducer } from "react";
import { Todo as TodoType } from "../../types";
import { Button } from "./Button";
import { Todo } from "./Todo";

type ReducerAction = { type: "add_todo", todo: TodoType } | { type: "sort_by_completion" } | { type: "remove_todo", todoId: number } | { type: "update_todo", todo: Partial<TodoType> };
type ReducerState = { todos: TodoType[] };

// type ActionType = "add_todo" | "sort_by_completion";

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  // inc and dec case
  switch (action.type) {
    case "add_todo":
      return { todos: [...state.todos, action.todo] }
    case "update_todo":
      return { todos: state.todos.map((todo) => todo.id === action.todo.id ? { ...todo, ...action.todo } : todo) }
    case "remove_todo":
      return { todos: state.todos.filter((todo) => todo.id !== action.todoId) }
    default:
      throw new Error();
  }
}
let id = 0;
export const ReducerExample = () => {
  const [state, dispatch] = useReducer(reducer, { todos: [] });

  useEffect(() => {
    console.log({ todos: state.todos });
  }, [state.todos]);


  const addTodo = useCallback(() => {
    const _tempTodo: TodoType = {
      id: id++,
      title: "Static Todo",
      description: "",
      completed: false,
    }
    dispatch({ todo: _tempTodo, type: "add_todo" });
  }, []);

  const deleteTodo = useCallback((_id: number) => {
    dispatch({ type: "remove_todo", todoId: _id })
  }, []);

  const updateTodo = useCallback((todo: Partial<TodoType>) => {
    dispatch({ type: "update_todo", todo: todo })
  }, []);

  return (
    <div className="space-y-8">
      <section className="flex flex-col items-center content-center gap-5 justify-center mx-auto w-[70dvw]">
        {state.todos.length >= 1 ? state.todos.map((todo) => <Todo key={todo.id} deleteTodo={deleteTodo} updateTodo={updateTodo} todo={todo} />) : <p className="text-2xl text-slate-200 text-center">No Todos Yet...</p>}
      </section>
      <section className="w-dvw flex items-center content-center justify-center gap-12">
        <Button onClick={addTodo}>Add Static Todo</Button>
      </section>
    </div>
  )
}
