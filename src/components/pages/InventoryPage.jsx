import { useState, useEffect, useMemo } from "react"
import { toast } from "react-toastify"

import Header from "@/components/organisms/Header"
import ProductTable from "@/components/organisms/ProductTable"
import ProductModal from "@/components/organisms/ProductModal"
import StockAdjustModal from "@/components/organisms/StockAdjustModal"
import LowStockAlert from "@/components/molecules/LowStockAlert"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"

import productService from "@/services/api/productService"
import categoryService from "@/services/api/categoryService"
import stockAdjustmentService from "@/services/api/stockAdjustmentService"

const InventoryPage = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isStockModalOpen, setIsStockModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [adjustingProduct, setAdjustingProduct] = useState(null)

  const loadData = async () => {
    setLoading(true)
    setError("")
    
    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getAll(),
        categoryService.getAll()
      ])
      
      setProducts(productsData)
      setCategories(categoriesData)
    } catch (err) {
      setError("Failed to load inventory data")
      console.error("Error loading data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = 
        product.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku_c?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const categoryName = product.category_c?.Name || product.category_c
      const matchesCategory = !selectedCategory || categoryName === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

const lowStockProducts = useMemo(() => {
    return products.filter(product => 
      product.currentStock_c <= product.lowStockThreshold_c && product.currentStock_c > 0
    )
  }, [products])

  const handleAddProduct = () => {
    setEditingProduct(null)
    setIsProductModalOpen(true)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setIsProductModalOpen(true)
  }

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return
    }
    
    try {
      await productService.delete(productId)
      setProducts(prev => prev.filter(p => p.Id !== productId))
      toast.success("Product deleted successfully", { hideProgressBar: true })
    } catch (err) {
      toast.error("Failed to delete product", { hideProgressBar: true })
    }
  }

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        const updatedProduct = await productService.update(editingProduct.Id, productData)
        setProducts(prev => prev.map(p => p.Id === editingProduct.Id ? updatedProduct : p))
      } else {
        const newProduct = await productService.create(productData)
        setProducts(prev => [...prev, newProduct])
      }
    } catch (err) {
      throw new Error("Failed to save product")
    }
  }

  const handleShowStockModal = (product) => {
    setAdjustingProduct(product)
    setIsStockModalOpen(true)
  }

  const handleStockAdjust = async (productId, newStock, reason) => {
    try {
      const product = products.find(p => p.Id === productId)
      if (!product) return
      
const adjustmentData = {
        Name: `Stock adjustment for ${product.Name}`,
        productId_c: productId,
        type_c: newStock > product.currentStock_c ? "increase" : "decrease",
        quantity_c: Math.abs(newStock - product.currentStock_c),
        reason_c: reason,
        timestamp_c: new Date().toISOString()
      }
      
      await stockAdjustmentService.create(adjustmentData)
      
      const updatedProduct = await productService.update(productId, {
        currentStock_c: newStock,
        lastUpdated_c: new Date().toISOString()
      })
      
      setProducts(prev => prev.map(p => p.Id === productId ? updatedProduct : p))
    } catch (err) {
      throw new Error("Failed to adjust stock")
    }
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />
  }

  return (
    <div className="min-h-screen">
      <Header
        onAddProduct={handleAddProduct}
        onSearch={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LowStockAlert lowStockProducts={lowStockProducts} />
        
        {filteredProducts.length === 0 ? (
          <Empty
            title={searchTerm || selectedCategory ? "No products match your filters" : "No products in inventory"}
            message={
              searchTerm || selectedCategory 
                ? "Try adjusting your search terms or category filter to find products."
                : "Get started by adding your first product to the inventory."
            }
            onAction={searchTerm || selectedCategory ? undefined : handleAddProduct}
            actionText="Add Your First Product"
            icon="Package"
          />
        ) : (
          <ProductTable
            products={filteredProducts}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            onStockAdjust={handleStockAdjust}
            onShowStockModal={handleShowStockModal}
          />
        )}
      </main>

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={editingProduct}
        categories={categories}
        onSave={handleSaveProduct}
      />

      <StockAdjustModal
        isOpen={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        product={adjustingProduct}
        onAdjust={handleStockAdjust}
      />
    </div>
  )
}

export default InventoryPage