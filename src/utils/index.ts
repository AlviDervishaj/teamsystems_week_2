import { v4 } from 'uuid';
import dayjs from 'dayjs';
import { Todo } from "../../types";
export const InitialTodos: Todo[] = [
  {
    id: v4(),
    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ",
    description: "",
    editedAt: dayjs(),
    timestamp: dayjs().valueOf(),
    completed: false,
    createdAt: dayjs(),
  },
  {
    id: v4(),
    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ",
    description: "",
    editedAt: dayjs(),
    timestamp: dayjs().valueOf(),
    completed: false,
    createdAt: dayjs(),
  },
  {
    id: v4(),
    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ",
    description: "",
    editedAt: dayjs(),
    timestamp: dayjs().valueOf(),
    completed: true,
    createdAt: dayjs(),
  },
]
