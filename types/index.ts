export interface Product {
  id: number
  name: string
  slug?: string
  short_description?: string
  description?: string
  price?: number
  thumbnail?: string
  category_name?: string
  stock_status?: "in_stock" | "out_of_stock"
  rating?: number
  [key: string]: any // For any additional properties from the API
}
