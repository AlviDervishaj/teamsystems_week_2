import clsx from "clsx";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react"

type ChildProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(function InputForwardRef(props: ChildProps, ref: ForwardedRef<HTMLInputElement>) {
  const { className, ...otherProps } = props;
  return <input
    className={clsx("border-b border-slate-800 p-2", className)}
    ref={ref}
    {...otherProps}
  />
})
