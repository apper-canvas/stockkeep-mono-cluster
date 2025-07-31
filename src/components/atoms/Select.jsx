import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Select = forwardRef(({ 
  className,
  children,
  error,
  ...props 
}, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "form-input w-full px-3 py-2 border rounded-lg bg-white text-slate-800 transition-all duration-200 cursor-pointer",
        error 
          ? "border-error-500 focus:border-error-500 focus:ring-error-500" 
          : "border-slate-300 focus:border-primary-500 focus:ring-primary-500",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
})

Select.displayName = "Select"

export default Select