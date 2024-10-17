import { useCallback, useEffect, useState } from "react";
import { Todo as TodoType } from "../../types";
import { Button } from "./Button";
import { useDebounceCallback } from "usehooks-ts";
export const Todo = ({ todo, updateTodo, deleteTodo }: { todo: TodoType, updateTodo: (_todo: Partial<TodoType>) => void, deleteTodo: (_id: number) => void }) => {
  const [newTitle, setNewTitle] = useState<string>(todo.title);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Mark current Todo as Completed
  const markTodoAs = useCallback((_completed: boolean) => {
    const _todo: Partial<TodoType> = {
      id: todo.id,
      completed: _completed,
    }
    updateTodo(_todo);
  }, [updateTodo, todo.id]);

  const handleNewTitleChange = useDebounceCallback((value: string) => {
    setNewTitle(value);
  }, 300);

  useEffect(() => {
    if (newTitle !== todo.title) {
      setHasChanges(true);
      return;
    };
    setHasChanges(false);
  }, [newTitle, todo.title]);

  const changeTitle = useCallback(() => {
    const _newTodo: Partial<TodoType> = {
      id: todo.id,
      title: newTitle,
    };
    updateTodo(_newTodo);
    setHasChanges(false);
  }, [updateTodo, newTitle, todo.id]);


  const handleTodoDeletion = useCallback(() => {
    deleteTodo(todo.id);
  }, [deleteTodo, todo.id])



  return (
    <div className={`${todo.completed ? "order-last opacity-50" : "order-first opacity-100"} flex flex-row items-center content-center justify-between p-3 border border-slate-300 w-full h-fit rounded-lg`}>
      <div className="w-full flex flex-col items-start content-center justify-center gap-2 pr-4">
        <input onChange={(event) => handleNewTitleChange(event.target.value)} defaultValue={newTitle} className={`${todo.completed ? "line-through" : "decoration-none"} text-xl w-full bg-transparent text-slate-200 outline-none`} />
        <p className="text-xl tracking-wide text-slate-300">{todo.description}</p>
      </div>

      {todo.completed ?
        <Button onClick={() => markTodoAs(false)}>
          <img src="undo.png" alt="Undo Mark As Completed" className="w-8 max-w-8 h-8 max-h-8" />
        </Button>
        :
        <Button onClick={() => markTodoAs(true)}>
          <img src="correct.png" alt="Mark As Completed Button" className="w-8 max-w-8 h-8 max-h-8" />
        </Button>
      }
      <Button onClick={handleTodoDeletion}>
        <img src="remove.png" alt="Delete Todo" className="w-8 max-w-8 h-8 max-h-8" />
      </Button>
      {hasChanges && <Button onClick={changeTitle} className="inline text-lg">Save</Button>}
    </div>
  );
}
