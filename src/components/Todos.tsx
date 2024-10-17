import { memo } from "react";
import { Todo as TodoType } from "../../types";
import { Todo } from "./Todo";

type Props = {
  todos: TodoType[],
  updateTodo: (_todo: Partial<TodoType>) => void,
  deleteTodo: (_id: number) => void
}

// Dumb component
export const Todos = memo(({ updateTodo, todos, deleteTodo }: Props) => {
  console.log("Todos Re-rendered");
  return (
    <section className="w-9/12 mx-auto p-4 h-fit flex flex-col items-center content-center justify-center gap-4">
      {todos.map((todo) => <Todo key={todo.id} deleteTodo={deleteTodo} todo={todo} updateTodo={updateTodo} />)}
    </section>
  );
}, (prevProps: Props, nextProps: Props) => {
  // Compare completed tasks accumulated value.
  const _prevAcc = prevProps.todos.reduce((acc, currentValue) => acc + +currentValue.completed, 0)
  const _nextAcc = nextProps.todos.reduce((acc, currentValue) => acc + +currentValue.completed, 0)
  return prevProps.todos.length === nextProps.todos.length && _prevAcc === _nextAcc;
});
