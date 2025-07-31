import { useState } from "react"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"

const SearchBar = ({ onSearch, placeholder = "Search products..." }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="h-5 w-5 text-slate-400" />
      </div>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-10 pr-4 py-3 text-base bg-white shadow-sm border-slate-200 focus:border-primary-500 focus:ring-primary-500 rounded-xl"
      />
    </div>
  )
}

export default SearchBar