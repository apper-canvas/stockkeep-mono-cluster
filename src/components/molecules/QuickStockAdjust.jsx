import { useState } from "react"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { toast } from "react-toastify"

const QuickStockAdjust = ({ product, onAdjust }) => {
  const [isAdjusting, setIsAdjusting] = useState(false)

  const handleAdjust = async (type, amount = 1) => {
    if (isAdjusting) return

    setIsAdjusting(true)
    
    try {
      const newStock = type === "increase" 
        ? product.currentStock + amount 
        : Math.max(0, product.currentStock - amount)
      
      await onAdjust(product.Id, newStock, `Quick ${type} by ${amount}`)
      
      toast.success(
        `Stock ${type === "increase" ? "increased" : "decreased"} successfully`,
        { hideProgressBar: true }
      )
    } catch (error) {
      toast.error("Failed to adjust stock", { hideProgressBar: true })
    } finally {
      setIsAdjusting(false)
    }
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleAdjust("decrease")}
        disabled={isAdjusting || product.currentStock === 0}
        className="p-1.5 rounded-lg border-slate-300 text-slate-600 hover:border-error-500 hover:text-error-600 hover:bg-error-50"
      >
        <ApperIcon name="Minus" size={14} />
      </Button>
      
      <span className="mx-2 font-semibold text-slate-700 min-w-[2rem] text-center">
        {product.currentStock}
      </span>
      
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleAdjust("increase")}
        disabled={isAdjusting}
        className="p-1.5 rounded-lg border-slate-300 text-slate-600 hover:border-success-500 hover:text-success-600 hover:bg-success-50"
      >
        <ApperIcon name="Plus" size={14} />
      </Button>
    </div>
  )
}

export default QuickStockAdjust