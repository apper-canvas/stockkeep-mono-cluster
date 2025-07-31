import { useState, useEffect } from "react"
import Modal from "@/components/atoms/Modal"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import { toast } from "react-toastify"

const ProductModal = ({ 
  isOpen, 
  onClose, 
  product, 
  categories, 
  onSave 
}) => {
const [formData, setFormData] = useState({
    Name: "",
    sku_c: "",
    category_c: "",
    price_c: 0,
    currentStock_c: 0,
    lowStockThreshold_c: 5
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
if (product) {
      setFormData({
        Name: product.Name || "",
        sku_c: product.sku_c || "",
        category_c: product.category_c?.Name || product.category_c || "",
        price_c: product.price_c || 0,
        currentStock_c: product.currentStock_c || 0,
        lowStockThreshold_c: product.lowStockThreshold_c || 5
      })
    } else {
      setFormData({
        Name: "",
        sku_c: "",
        category_c: "",
        price_c: 0,
        currentStock_c: 0,
        lowStockThreshold_c: 5
      })
    }
    setErrors({})
  }, [product, isOpen])

  const validateForm = () => {
    const newErrors = {}
    
if (!formData.Name.trim()) {
      newErrors.Name = "Product name is required"
    }
    
    if (!formData.sku_c.trim()) {
      newErrors.sku_c = "SKU is required"
    }
    
    if (!formData.category_c.trim()) {
      newErrors.category_c = "Category is required"
    }
    
    if (formData.price_c <= 0) {
      newErrors.price_c = "Price must be greater than 0"
    }
    
    if (formData.currentStock_c < 0) {
      newErrors.currentStock_c = "Stock cannot be negative"
    }
    
    if (formData.lowStockThreshold_c < 0) {
      newErrors.lowStockThreshold_c = "Threshold cannot be negative"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fix the form errors", { hideProgressBar: true })
      return
    }
    
    setIsSubmitting(true)
    
    try {
await onSave({
        Name: formData.Name,
        sku_c: formData.sku_c,
        category_c: formData.category_c,
        price_c: parseFloat(formData.price_c),
        currentStock_c: parseInt(formData.currentStock_c),
        lowStockThreshold_c: parseInt(formData.lowStockThreshold_c),
        lastUpdated_c: new Date().toISOString()
      })
      
      toast.success(
        product ? "Product updated successfully" : "Product added successfully",
        { hideProgressBar: true }
      )
      onClose()
    } catch (error) {
      toast.error("Failed to save product", { hideProgressBar: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? "Edit Product" : "Add New Product"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Product Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter product name"
              error={!!errors.name}
              className="w-full"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-error-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              SKU
            </label>
            <Input
              value={formData.sku}
              onChange={(e) => handleInputChange("sku", e.target.value.toUpperCase())}
              placeholder="Enter SKU"
              error={!!errors.sku}
              className="w-full font-mono"
            />
            {errors.sku && (
              <p className="mt-1 text-sm text-error-600">{errors.sku}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Category
            </label>
            <Select
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              error={!!errors.category}
              className="w-full"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.Id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Select>
            {errors.category && (
              <p className="mt-1 text-sm text-error-600">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Price ($)
            </label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              placeholder="0.00"
              error={!!errors.price}
              className="w-full"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-error-600">{errors.price}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Current Stock
            </label>
            <Input
              type="number"
              min="0"
              value={formData.currentStock}
              onChange={(e) => handleInputChange("currentStock", e.target.value)}
              placeholder="0"
              error={!!errors.currentStock}
              className="w-full"
            />
            {errors.currentStock && (
              <p className="mt-1 text-sm text-error-600">{errors.currentStock}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Low Stock Threshold
            </label>
            <Input
              type="number"
              min="0"
              value={formData.lowStockThreshold}
              onChange={(e) => handleInputChange("lowStockThreshold", e.target.value)}
              placeholder="5"
              error={!!errors.lowStockThreshold}
              className="w-full"
            />
            {errors.lowStockThreshold && (
              <p className="mt-1 text-sm text-error-600">{errors.lowStockThreshold}</p>
            )}
          </div>
        </div>

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
            variant="primary"
            disabled={isSubmitting}
            className="min-w-[100px]"
          >
            {isSubmitting ? "Saving..." : (product ? "Update" : "Add Product")}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default ProductModal