class StockAdjustmentService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'stock_adjustment_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "productId_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "quantity_c" } },
          { field: { Name: "reason_c" } },
          { field: { Name: "timestamp_c" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ],
        orderBy: [
          {
            fieldName: "timestamp_c",
            sorttype: "DESC"
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
        console.error("Error fetching stock adjustments:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching stock adjustments:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "productId_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "quantity_c" } },
          { field: { Name: "reason_c" } },
          { field: { Name: "timestamp_c" } },
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
        console.error(`Error fetching stock adjustment with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error(`Error fetching stock adjustment with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  }

  async getByProductId(productId) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "productId_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "quantity_c" } },
          { field: { Name: "reason_c" } },
          { field: { Name: "timestamp_c" } }
        ],
        where: [
          {
            FieldName: "productId_c",
            Operator: "EqualTo",
            Values: [parseInt(productId)]
          }
        ],
        orderBy: [
          {
            fieldName: "timestamp_c",
            sorttype: "DESC"
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
        console.error(`Error fetching stock adjustments for product ${productId}:`, error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error(`Error fetching stock adjustments for product ${productId}:`, error.message);
        throw new Error(error.message);
      }
    }
  }

  async create(adjustmentData) {
    try {
      // Only include Updateable fields
      const updateableData = {
        Name: adjustmentData.Name,
        productId_c: parseInt(adjustmentData.productId_c),
        type_c: adjustmentData.type_c,
        quantity_c: parseInt(adjustmentData.quantity_c),
        reason_c: adjustmentData.reason_c,
        timestamp_c: adjustmentData.timestamp_c || new Date().toISOString()
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
          console.error(`Failed to create stock adjustments ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error creating stock adjustment:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error creating stock adjustment:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async update(id, adjustmentData) {
    try {
      // Only include Updateable fields that are provided
      const updateableData = {
        Id: parseInt(id)
      };
      
      if (adjustmentData.Name !== undefined) updateableData.Name = adjustmentData.Name;
      if (adjustmentData.productId_c !== undefined) updateableData.productId_c = parseInt(adjustmentData.productId_c);
      if (adjustmentData.type_c !== undefined) updateableData.type_c = adjustmentData.type_c;
      if (adjustmentData.quantity_c !== undefined) updateableData.quantity_c = parseInt(adjustmentData.quantity_c);
      if (adjustmentData.reason_c !== undefined) updateableData.reason_c = adjustmentData.reason_c;
      if (adjustmentData.timestamp_c !== undefined) updateableData.timestamp_c = adjustmentData.timestamp_c;
      
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
          console.error(`Failed to update stock adjustments ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
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
        console.error("Error updating stock adjustment:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error updating stock adjustment:", error.message);
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
          console.error(`Failed to delete stock adjustments ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting stock adjustment:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error deleting stock adjustment:", error.message);
        throw new Error(error.message);
      }
    }
  }
}

export default new StockAdjustmentService()