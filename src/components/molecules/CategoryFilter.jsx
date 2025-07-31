import Select from "@/components/atoms/Select"
import ApperIcon from "@/components/ApperIcon"

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Filter" className="h-4 w-4 text-slate-400" />
      </div>
      <Select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="pl-10 pr-8 py-3 text-sm bg-white shadow-sm border-slate-200 focus:border-primary-500 focus:ring-primary-500 rounded-xl appearance-none cursor-pointer"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.Id} value={category.name}>
            {category.name}
          </option>
        ))}
      </Select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <ApperIcon name="ChevronDown" className="h-4 w-4 text-slate-400" />
      </div>
    </div>
  )
}

export default CategoryFilter