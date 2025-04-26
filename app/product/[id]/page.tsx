"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchProductById } from "@/lib/redux/slices/productsSlice"
import { addToCart, openCart } from "@/lib/redux/slices/cartSlice"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
import { mockImageUrls } from "@/lib/mock-data"

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { selectedProduct, status, error } = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProductById(params.id))
  }, [dispatch, params.id])

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct))
      dispatch(openCart())
    }
  }

  if (status === "loading") {
    return <ProductSkeleton />
  }

  if (status === "failed" || !selectedProduct) {
    // If product not found, redirect to 404 page
    if (error === "Product not found") {
      router.push("/not-found")
      return null
    }

    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error || "Failed to load product. Please try again later."}</p>
        <Button asChild className="mt-4">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    )
  }

  // Format the image URL
  let imageUrl = "/placeholder.svg?height=600&width=600"

  if (selectedProduct.thumbnail) {
    // Check if it's a mock image
    if (selectedProduct.thumbnail.startsWith("mock-") && mockImageUrls[selectedProduct.thumbnail]) {
      imageUrl = mockImageUrls[selectedProduct.thumbnail].replace("300", "600")
    } else {
      // Real API image
      imageUrl = `https://admin.refabry.com/storage/product/${selectedProduct.thumbnail}`
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-primary mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={selectedProduct.name || "Product image"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-4">
            <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
              {selectedProduct.category_name || "Uncategorized"}
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-2">{selectedProduct.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${star <= (selectedProduct.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {selectedProduct.rating ? `${selectedProduct.rating} rating` : "No ratings yet"}
            </span>
          </div>

          <div className="text-2xl font-bold text-primary mb-6">
            ${selectedProduct.price ? selectedProduct.price.toFixed(2) : "Price unavailable"}
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-2">Description</h2>
            <div className="text-gray-700">
              {selectedProduct.description ? (
                <div dangerouslySetInnerHTML={{ __html: selectedProduct.description }} />
              ) : (
                <p>{selectedProduct.short_description || "No description available"}</p>
              )}
            </div>
          </div>

          {selectedProduct.stock_status && (
            <div className="mb-6">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm ${
                  selectedProduct.stock_status === "in_stock"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {selectedProduct.stock_status === "in_stock" ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 flex items-center justify-center" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" className="flex-1 flex items-center justify-center">
              <Heart className="h-5 w-5 mr-2" />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

function ProductSkeleton() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="h-6 w-32 mb-6">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="h-[400px] md:h-[500px] rounded-lg" />

        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-24" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-24 w-full" />
          </div>
          <Skeleton className="h-8 w-32" />
          <div className="flex flex-col sm:flex-row gap-3">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </div>
      </div>
    </main>
  )
}
