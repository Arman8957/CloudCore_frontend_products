"use client"

import { useState } from "react"
import { ShoppingCart, X, Trash2, Plus, Minus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { closeCart, removeFromCart, updateQuantity, clearCart } from "@/lib/redux/slices/cartSlice"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { mockImageUrls } from "@/lib/mock-data"
import CheckoutForm from "./checkout-form"

export default function CartDrawer() {
  const dispatch = useAppDispatch()
  const { items, isOpen } = useAppSelector((state) => state.cart)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + (item.price || 0) * item.quantity, 0)

  const handleClose = () => {
    if (isCheckingOut) {
      setIsCheckingOut(false)
    } else {
      dispatch(closeCart())
    }
  }

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    dispatch(updateQuantity({ id, quantity: newQuantity }))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
  }

  const handleCancelCheckout = () => {
    setIsCheckingOut(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader className="px-1">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center">
              {isCheckingOut ? (
                "Checkout"
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Your Cart ({totalItems})
                </>
              )}
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </SheetHeader>

        <Separator className="my-4" />

        {isCheckingOut ? (
          <CheckoutForm onCancel={handleCancelCheckout} />
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-12">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">Your cart is empty</p>
            <Button variant="outline" className="mt-4" onClick={handleClose}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-2">
                {items.map((item) => {
                  // Format the image URL
                  let imageUrl = "/placeholder.svg?height=80&width=80"

                  if (item.thumbnail) {
                    // Check if it's a mock image
                    if (item.thumbnail.startsWith("mock-") && mockImageUrls[item.thumbnail]) {
                      imageUrl = mockImageUrls[item.thumbnail].replace("300", "80")
                    } else {
                      // Real API image
                      imageUrl = `https://admin.refabry.com/storage/product/${item.thumbnail}`
                    }
                  }

                  return (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={item.name || "Product"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-muted-foreground text-xs">{item.category_name || "Uncategorized"}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              ${item.price ? (item.price * item.quantity).toFixed(2) : "N/A"}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove item</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>

            <div className="space-y-4 mt-4">
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <SheetFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" className="w-full sm:w-auto" onClick={handleClearCart}>
                  Clear Cart
                </Button>
                <Button className="w-full sm:w-auto" onClick={handleCheckout}>
                  Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
