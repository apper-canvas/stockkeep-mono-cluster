import ApperIcon from "@/components/ApperIcon"

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-card animate-pulse">
          <ApperIcon name="Package" className="h-8 w-8 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-success-500 to-success-600 rounded-full animate-bounce"></div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-slate-700">Loading Inventory</h3>
        <p className="text-slate-500">Please wait while we fetch your products...</p>
      </div>

      <div className="w-full max-w-4xl space-y-4">
        {/* Table Header Skeleton */}
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4">
            <div className="grid grid-cols-8 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="h-4 bg-slate-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
          
          {/* Table Rows Skeleton */}
          <div className="divide-y divide-slate-100">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="px-6 py-4">
                <div className="grid grid-cols-8 gap-4 items-center">
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                  <div className="h-6 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-6 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-6 bg-slate-200 rounded-full animate-pulse"></div>
                  <div className="flex space-x-1">
                    <div className="h-8 w-8 bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-8 w-8 bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-8 w-8 bg-slate-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="h-8 w-8 bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-8 w-8 bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-8 w-8 bg-slate-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading