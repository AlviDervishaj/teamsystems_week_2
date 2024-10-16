import { Todo as TodoType } from "../../types";
import { Todo } from "./Todo";

export const Todos = ({ updateTodo, sortedTodos }: { sortedTodos: TodoType[], updateTodo: (_todo: TodoType) => void }) => {

  return (
    <section className="w-9/12 mx-auto p-4 h-fit flex flex-col items-center content-center justify-center gap-4">
      {sortedTodos.map((todo) => <Todo key={todo.id} todo={todo} updateTodo={updateTodo} />)}
    </section>
  );
}
