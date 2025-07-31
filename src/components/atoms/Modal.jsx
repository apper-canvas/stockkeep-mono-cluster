import { forwardRef, useEffect } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Modal = forwardRef(({ 
  isOpen,
  onClose,
  title,
  children,
  className,
  size = "md",
  ...props 
}, ref) => {
  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg", 
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 modal-backdrop"
        onClick={onClose}
      />
      
      <div
        ref={ref}
        className={cn(
          "relative w-full glass-effect rounded-xl shadow-modal animate-slideUp",
          sizes[size],
          className
        )}
        {...props}
      >
        {title && (
          <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>
        )}
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
})

Modal.displayName = "Modal"

export default Modal