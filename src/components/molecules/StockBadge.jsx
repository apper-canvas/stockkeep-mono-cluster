import Badge from "@/components/atoms/Badge"

const StockBadge = ({ currentStock, lowStockThreshold }) => {
  const getStockStatus = () => {
    if (currentStock === 0) {
      return { variant: "error", text: "Out of Stock" }
    } else if (currentStock <= lowStockThreshold) {
      return { variant: "warning", text: "Low Stock" }
    } else {
      return { variant: "success", text: "In Stock" }
    }
  }

  const status = getStockStatus()

  return (
    <Badge variant={status.variant} size="md" className="font-semibold">
      {status.text}
    </Badge>
  )
}

export default StockBadge