import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ 
  className,
  type = "text",
  error,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "form-input w-full px-3 py-2 border rounded-lg bg-white text-slate-800 placeholder-slate-400 transition-all duration-200",
        error 
          ? "border-error-500 focus:border-error-500 focus:ring-error-500" 
          : "border-slate-300 focus:border-primary-500 focus:ring-primary-500",
        className
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input