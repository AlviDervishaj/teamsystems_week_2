import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className, children, ...otherProps } = props;
  return <button
    className={clsx("p-3 border-slate-300 rounded-md hover:bg-slate-400/70 transition-all duration-300 ease-in-out", className)}
    {...otherProps}
  >
    {children}
  </button>
}
