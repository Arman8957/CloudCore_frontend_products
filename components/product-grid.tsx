"use client"

import { useEffect } from "react"
import ProductCard from "./product-card"
import { Loader2 } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchProducts } from "@/lib/redux/slices/productsSlice"

export default function ProductGrid() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.products)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading products...</span>
      </div>
    )
  }

  if (status === "failed") {
    return (
      <div className="text-center text-red-500 p-8">
        <p>{error || "Failed to load products. Please try again later."}</p>
      </div>
    )
  }

  // Add a check to ensure items is an array
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <div className="text-center p-8">
        <p>No products found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
