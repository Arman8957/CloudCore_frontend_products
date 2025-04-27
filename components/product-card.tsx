
"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/types"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/lib/redux/hooks"
import { addToCart, openCart } from "@/lib/redux/slices/cartSlice"
import { mockImageUrls } from "@/lib/mock-data"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()

  // Format the image URL
  // let imageUrl = "/placeholder.svg?height=300&width=300"
  let imageUrl = `https://admin.refabry.com/storage/product/${product.image}`

  if (product.thumbnail) {
    // Check if it's a mock image
    if (product.thumbnail.startsWith("mock-") && mockImageUrls[product.thumbnail]) {
      imageUrl = mockImageUrls[product.thumbnail]
    } else {
      // Real API image
      imageUrl = `https://admin.refabry.com/storage/product/${product.thumbnail}`
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation
    e.stopPropagation() // Stop event propagation
    dispatch(addToCart(product))
    dispatch(openCart())
  }

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <Link href={`/product/${product.id}`} className="flex flex-col h-full">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.short_desc || "No description available"}
          </p>
          <div className="mt-auto flex justify-between items-center">
            <span className="font-bold text-primary">${product.price ? product.price.toFixed(2) : "N/A"}</span>
            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
              {product?.category?.name || "Uncategorized"}
            </span>
          </div>
          
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="mt-3 w-full   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to
          </Button>
        </div>
      </Link>
    </div>
  )
}
