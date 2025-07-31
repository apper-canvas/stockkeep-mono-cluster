import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ 
  className,
  variant = "default",
  size = "md",
  children,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center font-semibold rounded-full"
  
  const variants = {
    default: "bg-slate-100 text-slate-700",
    success: "badge-success",
    warning: "badge-warning", 
    error: "badge-error",
    info: "bg-gradient-to-r from-primary-500 to-primary-600 text-white"
  }
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm"
  }
  
  return (
    <span
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge