import { useMemo } from "react";
import { Todo as TodoType } from "../../types";
import { Todo } from "./Todo";

export const Todos = ({ todos, updateTodo }: { todos: TodoType[], updateTodo: (_todo: TodoType ) => void}) => {
  
  const sortedTodos = useMemo(() => {
    return todos.toSorted((a, b) => {
      if(a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    })
  }, [todos]);
  
  return (
    <section className="w-9/12 mx-auto p-4 h-fit flex flex-col items-center content-center justify-center gap-4">
      {sortedTodos.map((todo) => <Todo key={todo.id} todo={todo} updateTodo={updateTodo}/>)}
    </section>
  );
}
