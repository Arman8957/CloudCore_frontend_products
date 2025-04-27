import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "@/types"
import { mockProducts } from "@/lib/mock-data"

interface ProductsState {
  items: Product[]
  selectedProduct: Product | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  status: "idle",
  error: null,
}

// Async thunk for fetching all products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    const response = await fetch("https://admin.refabry.com/api/all/product/get")
    if (!response.ok) {
      console.warn("API request failed, using mock data")
      return mockProducts
    }
    
    const data = await response.json()
    console.log(data)
    // If API returns empty data or not an array, use mock data
    const products = Array.isArray(data.data) && data.data.length > 0 ? data.data : mockProducts
    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    // Return mock data if API fails
    return mockProducts
  }

  
})

// Async thunk for fetching a single product
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: string, { rejectWithValue }) => {
    try {
      // First try to get from API
      const response = await fetch("https://admin.refabry.com/api/all/product/get")

      if (!response.ok) {
        // If API fails, look in mock data
        const mockProduct = mockProducts.find((p) => p.id.toString() === id)
        if (mockProduct) return mockProduct
        return rejectWithValue("Product not found")
      }

      const data = await response.json()
  
      const products = Array.isArray(data.data) ? data.data : []
      console.log("products data" ,products)
      let product = products.find((p: Product) => p.id.toString() === id)

      if (!product) {
        product = mockProducts.find((p) => p.id.toString() === id)
        if (!product) {
          return rejectWithValue("Product not found")
        }
      }

      return product
    } catch (error) {
      console.error("Error fetching product:", error)

      // Try to find in mock data as fallback
      const mockProduct = mockProducts.find((p) => p.id.toString() === id)
      if (mockProduct) return mockProduct

      return rejectWithValue("Failed to fetch product")
    }
  },
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded"
        state.items = Array.isArray(action.payload) ? action.payload : []
        state.error = null
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch products"
        // Use mock data as fallback
        state.items = mockProducts
      })
      // Handle fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = "succeeded"
        state.selectedProduct = action.payload
        state.error = null
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch product"
      })
  },
})

export const { clearSelectedProduct } = productsSlice.actions
export default productsSlice.reducer
