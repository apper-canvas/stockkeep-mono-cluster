import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import StockBadge from "@/components/molecules/StockBadge"
import QuickStockAdjust from "@/components/molecules/QuickStockAdjust"

const ProductTable = ({ 
  products, 
  onEditProduct, 
  onDeleteProduct, 
  onStockAdjust, 
  onShowStockModal 
}) => {
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

const sortedProducts = [...products].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]
    
    // Handle lookup objects (e.g., category_c)
    if (aValue && typeof aValue === 'object' && aValue.Name) {
      aValue = aValue.Name
    }
    if (bValue && typeof bValue === 'object' && bValue.Name) {
      bValue = bValue.Name
    }
    
    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const SortButton = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-slate-700 hover:text-primary-600 transition-colors duration-200"
    >
      <span>{children}</span>
      <div className="flex flex-col">
        <ApperIcon 
          name="ChevronUp" 
          size={12} 
          className={`${sortField === field && sortDirection === "asc" ? "text-primary-600" : "text-slate-400"}`} 
        />
        <ApperIcon 
          name="ChevronDown" 
          size={12} 
          className={`${sortField === field && sortDirection === "desc" ? "text-primary-600" : "text-slate-400"} -mt-1`} 
        />
      </div>
    </button>
  )

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <tr>
<th className="text-left px-6 py-4 font-semibold text-slate-700">
                <SortButton field="Name">Product Name</SortButton>
              </th>
              <th className="text-left px-6 py-4 font-semibold text-slate-700">
                <SortButton field="sku_c">SKU</SortButton>
              </th>
              <th className="text-left px-6 py-4 font-semibold text-slate-700">
                <SortButton field="category_c">Category</SortButton>
              </th>
              <th className="text-right px-6 py-4 font-semibold text-slate-700">
                <SortButton field="price_c">Price</SortButton>
              </th>
              <th className="text-center px-6 py-4 font-semibold text-slate-700">
                <SortButton field="currentStock_c">Stock</SortButton>
              </th>
              <th className="text-center px-6 py-4 font-semibold text-slate-700">Status</th>
              <th className="text-center px-6 py-4 font-semibold text-slate-700">Quick Adjust</th>
              <th className="text-center px-6 py-4 font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedProducts.map((product) => (
              <tr key={product.Id} className="table-hover-row">
<td className="px-6 py-4">
                  <div className="font-medium text-slate-800">{product.Name}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded">
                    {product.sku_c}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600">{product.category_c?.Name || product.category_c}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-semibold text-slate-800">
                    ${product.price_c?.toFixed(2) || '0.00'}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-bold text-lg text-slate-800">
                    {product.currentStock_c}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <StockBadge 
                    currentStock={product.currentStock_c}
                    lowStockThreshold={product.lowStockThreshold_c}
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <QuickStockAdjust
                    product={product}
                    onAdjust={onStockAdjust}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onShowStockModal(product)}
                      className="p-2 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                      title="Adjust Stock"
                    >
                      <ApperIcon name="Package" size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEditProduct(product)}
                      className="p-2 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                      title="Edit Product"
                    >
                      <ApperIcon name="Edit" size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteProduct(product.Id)}
                      className="p-2 text-slate-500 hover:text-error-600 hover:bg-error-50 rounded-lg"
                      title="Delete Product"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductTable