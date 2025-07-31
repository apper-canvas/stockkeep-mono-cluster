import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const LowStockAlert = ({ lowStockProducts }) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible || lowStockProducts.length === 0) return null

  return (
    <div className="bg-gradient-to-r from-warning-500 to-warning-600 text-white p-4 rounded-xl shadow-card mb-6 animate-fadeIn">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <ApperIcon name="AlertTriangle" className="h-6 w-6 text-white animate-pulseSubtle" />
          </div>
          <div>
            <h3 className="font-semibold text-base">Low Stock Alert</h3>
            <p className="text-warning-100 text-sm mt-1">
              {lowStockProducts.length} product{lowStockProducts.length !== 1 ? "s" : ""} running low on stock
            </p>
            <div className="mt-2 space-y-1">
              {lowStockProducts.slice(0, 3).map((product) => (
                <div key={product.Id} className="text-sm text-warning-100">
                  <span className="font-medium">{product.name}</span> - {product.currentStock} left
                </div>
              ))}
              {lowStockProducts.length > 3 && (
                <div className="text-sm text-warning-100">
                  and {lowStockProducts.length - 3} more...
                </div>
              )}
            </div>
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsVisible(false)}
          className="text-white hover:bg-warning-600 hover:bg-opacity-30 p-1 rounded-lg"
        >
          <ApperIcon name="X" size={16} />
        </Button>
      </div>
    </div>
  )
}

export default LowStockAlert