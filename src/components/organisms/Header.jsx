import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import SearchBar from "@/components/molecules/SearchBar"
import CategoryFilter from "@/components/molecules/CategoryFilter"

const Header = ({ 
  onAddProduct, 
  onSearch, 
  categories, 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-card">
                <ApperIcon name="Package" className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  StockKeep
                </h1>
                <p className="text-sm text-slate-500">Inventory Management</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-64">
                <SearchBar onSearch={onSearch} placeholder="Search products..." />
              </div>
              
              <div className="w-48">
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={onCategoryChange}
                />
              </div>
            </div>

            <Button
              onClick={onAddProduct}
              variant="primary"
              className="flex items-center space-x-2 px-4 py-2 rounded-xl shadow-card"
            >
              <ApperIcon name="Plus" size={18} />
              <span>Add Product</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header