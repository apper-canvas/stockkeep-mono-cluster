import { useState, useEffect } from "react"
import Modal from "@/components/atoms/Modal"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import { toast } from "react-toastify"

const StockAdjustModal = ({ 
  isOpen, 
  onClose, 
  product, 
  onAdjust 
}) => {
  const [adjustmentType, setAdjustmentType] = useState("increase")
  const [quantity, setQuantity] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setAdjustmentType("increase")
      setQuantity("")
      setReason("")
    }
  }, [isOpen])

  const calculateNewStock = () => {
if (!product || !quantity) return product?.currentStock_c || 0
    
    const qty = parseInt(quantity)
    if (adjustmentType === "increase") {
      return product.currentStock_c + qty
    } else {
      return Math.max(0, product.currentStock_c - qty)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!quantity || parseInt(quantity) <= 0) {
      toast.error("Please enter a valid quantity", { hideProgressBar: true })
      return
    }
    
    if (!reason.trim()) {
      toast.error("Please provide a reason for the adjustment", { hideProgressBar: true })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const newStock = calculateNewStock()
      await onAdjust(product.Id, newStock, reason)
      
      toast.success("Stock adjusted successfully", { hideProgressBar: true })
      onClose()
    } catch (error) {
      toast.error("Failed to adjust stock", { hideProgressBar: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!product) return null

const newStock = calculateNewStock()
  const stockDifference = newStock - product.currentStock_c

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Adjust Stock Level"
      size="md"
    >
      <div className="space-y-6">
        <div className="bg-slate-50 rounded-lg p-4 border">
          <h3 className="font-semibold text-slate-800 mb-2">{product.Name}</h3>
          <div className="text-sm text-slate-600">
            <div>SKU: <span className="font-mono">{product.sku_c}</span></div>
            <div>Current Stock: <span className="font-semibold text-slate-800">{product.currentStock_c}</span></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Adjustment Type
            </label>
            <Select
              value={adjustmentType}
              onChange={(e) => setAdjustmentType(e.target.value)}
              className="w-full"
            >
              <option value="increase">Increase Stock</option>
              <option value="decrease">Decrease Stock</option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Quantity
            </label>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Reason
            </label>
            <Select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full"
            >
              <option value="">Select reason</option>
              <option value="Received shipment">Received shipment</option>
              <option value="Sale">Sale</option>
              <option value="Damaged goods">Damaged goods</option>
              <option value="Return">Return</option>
              <option value="Inventory correction">Inventory correction</option>
              <option value="Transfer">Transfer</option>
              <option value="Other">Other</option>
            </Select>
          </div>

          {quantity && (
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4 border border-primary-200">
              <h4 className="font-semibold text-primary-800 mb-2">Stock Preview</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
<span className="text-slate-600">Current Stock:</span>
                  <span className="font-semibold text-slate-800">{product.currentStock_c}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Adjustment:</span>
                  <span className={`font-semibold ${stockDifference >= 0 ? "text-success-700" : "text-error-700"}`}>
                    {stockDifference >= 0 ? "+" : ""}{stockDifference}
                  </span>
                </div>
                <div className="flex justify-between border-t border-primary-200 pt-1">
                  <span className="text-slate-600">New Stock:</span>
                  <span className="font-bold text-slate-800">{newStock}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-4 border-t border-slate-200">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={adjustmentType === "increase" ? "success" : "warning"}
              disabled={isSubmitting}
              className="min-w-[100px]"
            >
              {isSubmitting ? "Adjusting..." : "Adjust Stock"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default StockAdjustModal