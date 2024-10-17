import { memo } from "react"
import { Widget } from "./Widget"

export const Widgets = memo(({ totalLength, completedTodos }: { totalLength: number, completedTodos: number }) => {
  return (
    <div>
      <Widget>
        <p className="inline text-green-500 font-bold">Completed:</p> {completedTodos}
      </Widget>
      <Widget>
        <p className="inline text-red-400 font-bold">To be Completed:</p> {totalLength - completedTodos}
      </Widget>
    </div>
  )
});
