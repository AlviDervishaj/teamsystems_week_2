import { useState } from "react";
import { Todo as TodoType } from "../../types";
import { Button } from "./Button";
export const Todo = ({ todo }: { todo: TodoType }) => {
  const [t, setT] = useState<TodoType>(todo);
  const markTodoAsCompleted = () => {
    const _todo: TodoType = {
      ...todo,
      completed: true,
    }
  }
  return (
    <div className="flex flex-row items-center content-center justify-between p-3 border border-slate-300 w-full h-fit rounded-lg">
      <div className="flex flex-col items-start content-center justify-center gap-2">
        <p className="text-xl">
          {todo.title}
        </p>
        <p className="text-base tracking-wide">{todo.createdAt.fromNow()}</p>
      </div>

      <Button onClick={markTodoAsCompleted}>
        <img src="correct.png" alt="Mark As Completed Button" className="w-8 max-w-8 h-8 max-h-8" />
      </Button>
    </div>
  );
}
