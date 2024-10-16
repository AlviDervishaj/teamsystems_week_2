import { ReactNode } from "react"

export const Widget = ({ children }: {  children: ReactNode }) => {
  return <h2 className="text-center text-3xl text-slate-300">
    {children}
  </h2>
}
