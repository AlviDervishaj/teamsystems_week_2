import clsx from "clsx";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react"

type ChildProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(function InputForwardRef(props: ChildProps, ref: ForwardedRef<HTMLInputElement>) {
  const { className, ...otherProps } = props;
  return <input
    className={clsx("transition-all duration-300 ease-in-out focus:border-sky-500 focus:border-b-2 bg-transparent text-slate-100 text-xl border-b border-slate-100 p-2 outline-none", className)}
    ref={ref}
    {...otherProps}
  />
})
