import { Dayjs } from "dayjs";

export type Todo = {
  id: string,
  title: string,
  description: string,
  timestamp: number,
  createdAt: Dayjs,
  editedAt: Dayjs | null,
  completed: boolean,
}
