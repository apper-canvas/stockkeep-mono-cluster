import stockAdjustmentsData from "../mockData/stockAdjustments.json"

class StockAdjustmentService {
  constructor() {
    this.adjustments = [...stockAdjustmentsData]
  }

  async getAll() {
    await this.delay(250)
    return [...this.adjustments]
  }

  async getById(id) {
    await this.delay(150)
    const adjustment = this.adjustments.find(a => a.Id === parseInt(id))
    if (!adjustment) {
      throw new Error("Stock adjustment not found")
    }
    return { ...adjustment }
  }

  async getByProductId(productId) {
    await this.delay(200)
    return this.adjustments.filter(a => a.productId === parseInt(productId))
  }

  async create(adjustmentData) {
    await this.delay(350)
    const newId = Math.max(...this.adjustments.map(a => a.Id)) + 1
    const newAdjustment = {
      Id: newId,
      ...adjustmentData,
      timestamp: new Date().toISOString()
    }
    this.adjustments.push(newAdjustment)
    return { ...newAdjustment }
  }

  async update(id, adjustmentData) {
    await this.delay(300)
    const index = this.adjustments.findIndex(a => a.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Stock adjustment not found")
    }
    
    this.adjustments[index] = {
      ...this.adjustments[index],
      ...adjustmentData,
      Id: parseInt(id)
    }
    
    return { ...this.adjustments[index] }
  }

  async delete(id) {
    await this.delay(200)
    const index = this.adjustments.findIndex(a => a.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Stock adjustment not found")
    }
    
    this.adjustments.splice(index, 1)
    return true
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default new StockAdjustmentService()