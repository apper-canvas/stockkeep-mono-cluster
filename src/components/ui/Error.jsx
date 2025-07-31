import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-error-500 to-error-600 rounded-xl flex items-center justify-center shadow-card">
          <ApperIcon name="AlertTriangle" className="h-8 w-8 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-warning-500 to-warning-600 rounded-full flex items-center justify-center">
          <ApperIcon name="X" className="h-3 w-3 text-white" />
        </div>
      </div>
      
      <div className="text-center space-y-2 max-w-md">
        <h3 className="text-xl font-bold bg-gradient-to-r from-error-600 to-error-700 bg-clip-text text-transparent">
          Oops! Something went wrong
        </h3>
        <p className="text-slate-600 leading-relaxed">
          {message}. Don't worry, this happens sometimes. Please try again.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="primary"
            className="flex items-center space-x-2 px-6 py-3 rounded-xl shadow-card"
          >
            <ApperIcon name="RefreshCw" size={18} />
            <span>Try Again</span>
          </Button>
        )}
        
        <Button
          onClick={() => window.location.reload()}
          variant="secondary"
          className="flex items-center space-x-2 px-6 py-3 rounded-xl"
        >
          <ApperIcon name="RotateCcw" size={18} />
          <span>Refresh Page</span>
        </Button>
      </div>

      <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200 max-w-md">
        <div className="flex items-start space-x-3">
          <ApperIcon name="Info" className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-slate-600">
            <p className="font-medium mb-1">Need help?</p>
            <p>If this problem persists, please check your internet connection or contact support.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error