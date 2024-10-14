import { useRef } from "react";
import { Todo as TodoType } from "../../types";
import { Button } from "./Button";
import { Input } from "./Input";

type AddTodoProps = {
  title: TodoType["title"],
  description: TodoType["description"],
}

type addTodoFunction = {
  addTodo: ({ title, description }: AddTodoProps) => void
};

export const AddTodo = ({ addTodo }: addTodoFunction) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleNewTodo = () => {
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    if (!title) return;
    if (!description) return;
    addTodo({ title, description });
    titleRef.current.value = "";
    descriptionRef.current.value = "";
  }

  return (
    <section className="w-9/12 mx-auto flex flex-col items-center content-center justify-center gap-4">
      <Input ref={titleRef} placeholder="Todo title..."/>
      <Input ref={descriptionRef} placeholder="Description title..."/>
      <Button onClick={handleNewTodo}>Add New Todo</Button>
    </section>
  )
}
