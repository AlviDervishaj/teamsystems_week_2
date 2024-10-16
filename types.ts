export type Todo = {
  id: number,
  title: string,
  description: string,
  completed: boolean,
}

export type CreateTodoType = {
  title: string,
  description: string,
}

export type AddTodoProps = {
  title: Todo["title"],
  description: Todo["description"],
}