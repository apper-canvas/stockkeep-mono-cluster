class ProductService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'product_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "sku_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "currentStock_c" } },
          { field: { Name: "lowStockThreshold_c" } },
          { field: { Name: "lastUpdated_c" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching products:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching products:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "sku_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "currentStock_c" } },
          { field: { Name: "lowStockThreshold_c" } },
          { field: { Name: "lastUpdated_c" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching product with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error(`Error fetching product with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  }

  async create(productData) {
    try {
      // Only include Updateable fields
      const updateableData = {
        Name: productData.Name,
        sku_c: productData.sku_c,
        category_c: parseInt(productData.category_c) || productData.category_c,
        price_c: parseFloat(productData.price_c),
        currentStock_c: parseInt(productData.currentStock_c),
        lowStockThreshold_c: parseInt(productData.lowStockThreshold_c),
        lastUpdated_c: new Date().toISOString()
      };
      
      const params = {
        records: [updateableData]
      };
      
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create products ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating product:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error creating product:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async update(id, productData) {
    try {
      // Only include Updateable fields that are provided
      const updateableData = {
        Id: parseInt(id)
      };
      
      if (productData.Name !== undefined) updateableData.Name = productData.Name;
      if (productData.sku_c !== undefined) updateableData.sku_c = productData.sku_c;
      if (productData.category_c !== undefined) updateableData.category_c = parseInt(productData.category_c) || productData.category_c;
      if (productData.price_c !== undefined) updateableData.price_c = parseFloat(productData.price_c);
      if (productData.currentStock_c !== undefined) updateableData.currentStock_c = parseInt(productData.currentStock_c);
      if (productData.lowStockThreshold_c !== undefined) updateableData.lowStockThreshold_c = parseInt(productData.lowStockThreshold_c);
      if (productData.lastUpdated_c !== undefined) updateableData.lastUpdated_c = productData.lastUpdated_c;
      
      const params = {
        records: [updateableData]
      };
      
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update products ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating product:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error updating product:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete products ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting product:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error deleting product:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async getLowStock() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "sku_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "currentStock_c" } },
          { field: { Name: "lowStockThreshold_c" } },
          { field: { Name: "lastUpdated_c" } }
        ],
        where: [
          {
            FieldName: "currentStock_c",
            Operator: "LessThanOrEqualTo",
            Values: ["lowStockThreshold_c"]
          }
        ]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching low stock products:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching low stock products:", error.message);
        throw new Error(error.message);
      }
    }
  }
}

export default new ProductService()