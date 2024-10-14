import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className, children, ...otherProps } = props;
  return <button
    className={clsx("disabled:bg-gray-700/60 disabled:text-slate-500 disabled:border-slate-700 disabled:shadow-none text-slate-200 p-3 border-slate-300 rounded-md hover:bg-slate-400/70 transition-all duration-300 ease-in-out", className)}
    {...otherProps}
  >
    {children}
  </button>
}
