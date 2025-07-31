import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No products found", 
  message = "Get started by adding your first product to the inventory.",
  onAction,
  actionText = "Add Product",
  icon = "Package"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center shadow-card">
          <ApperIcon name={icon} className="h-10 w-10 text-slate-500" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-card">
          <ApperIcon name="Plus" className="h-4 w-4 text-white" />
        </div>
      </div>
      
      <div className="text-center space-y-3 max-w-md">
        <h3 className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-slate-500 leading-relaxed">
          {message}
        </p>
      </div>

      {onAction && (
        <Button
          onClick={onAction}
          variant="primary"
          className="flex items-center space-x-2 px-6 py-3 rounded-xl shadow-card mt-6"
        >
          <ApperIcon name="Plus" size={18} />
          <span>{actionText}</span>
        </Button>
      )}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
        <div className="text-center p-4 bg-white rounded-lg shadow-card card-hover">
          <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-lg flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="Package" className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-slate-700 mb-1">Add Products</h4>
          <p className="text-sm text-slate-500">Create your product catalog</p>
        </div>
        
        <div className="text-center p-4 bg-white rounded-lg shadow-card card-hover">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="BarChart3" className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-slate-700 mb-1">Track Stock</h4>
          <p className="text-sm text-slate-500">Monitor inventory levels</p>
        </div>
        
        <div className="text-center p-4 bg-white rounded-lg shadow-card card-hover">
          <div className="w-12 h-12 bg-gradient-to-br from-warning-500 to-warning-600 rounded-lg flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="Bell" className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-slate-700 mb-1">Get Alerts</h4>
          <p className="text-sm text-slate-500">Stay informed on low stock</p>
        </div>
      </div>
    </div>
  )
}

export default Empty