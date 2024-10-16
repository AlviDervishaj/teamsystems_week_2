import { useRef } from "react";
import { Todo as TodoType } from "../../types";
import { Button } from "./Button";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDebounceCallback } from "usehooks-ts";

dayjs.extend(relativeTime);
export const Todo = ({ todo, updateTodo }: { todo: TodoType, updateTodo: (_todo: TodoType) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // Mark current Todo as Completed
  const markTodoAsCompleted = () => {
    const _todo: TodoType = {
      ...todo,
      completed: true,
    }
    updateTodo(_todo);
  }
  // debounce to save app from too many re-renders
  const updateRef = useDebounceCallback((value: string) => {
    const newT: TodoType = { ...todo, title: value };
    updateTodo(newT);
  }, 500)
  return (
    <div className="flex flex-row items-center content-center justify-between p-3 border border-slate-300 w-full h-fit rounded-lg">
      <div className="w-full flex flex-col items-start content-center justify-center gap-2 pr-4">
        <input onChange={(event) => updateRef(event.target.value)} ref={inputRef} defaultValue={todo.title} className={`${todo.completed ? "line-through" : "decoration-none"} text-xl w-full bg-transparent text-slate-200 outline-none`} />
        <p className="text-xl tracking-wide text-slate-300">{todo.description}</p>
      </div>

      {todo.completed ? null :
        <Button onClick={markTodoAsCompleted}>
          <img src="correct.png" alt="Mark As Completed Button" className="w-8 max-w-8 h-8 max-h-8" />
        </Button>
      }
    </div>
  );
}
