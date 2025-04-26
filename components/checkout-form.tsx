"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { clearCart, closeCart } from "@/lib/redux/slices/cartSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CheckoutFormProps {
  onCancel: () => void
}

export default function CheckoutForm({ onCancel }: CheckoutFormProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    c_name: "",
    c_phone: "",
    address: "",
    courier: "steadfast", // Default courier
    cod_amount: "",
    delivery_charge: "80", // Default delivery charge
    advance: "",
    discount_amount: "",
  })

  // Calculate subtotal from cart items
  const subtotal = cartItems.reduce((total, item) => total + (item.price || 0) * item.quantity, 0)

  // Set default COD amount based on subtotal + delivery charge
  const defaultCodAmount = (subtotal + 80).toFixed(2)

  // Update form field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle courier selection
  const handleCourierChange = (value: string) => {
    setFormData((prev) => ({ ...prev, courier: value }))
  }

  // Prepare order data in the required format
  const prepareOrderData = () => {
    // Extract product IDs and quantities
    const productIds = cartItems.map((item) => item.id).join(",")
    const productQty = cartItems.map((item) => item.quantity).join(",")

    // Use entered COD amount or calculate from subtotal + delivery
    const codAmount = formData.cod_amount || defaultCodAmount

    return {
      product_ids: productIds,
      s_product_qty: productQty,
      c_name: formData.c_name,
      c_phone: formData.c_phone,
      address: formData.address,
      courier: formData.courier,
      cod_amount: codAmount,
      delivery_charge: formData.delivery_charge,
      advance: formData.advance || null,
      discount_amount: formData.discount_amount || null,
    }
  }

  // Submit the order
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Validate form
      if (!formData.c_name || !formData.c_phone || !formData.address) {
        throw new Error("Please fill in all required fields")
      }

      if (cartItems.length === 0) {
        throw new Error("Your cart is empty")
      }

      // Prepare order data
      const orderData = prepareOrderData()

      // Log the order data (in a real app, you would send this to your API)
      console.log("Order data:", orderData)

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setSuccess(true)

      // Clear cart after successful order
      setTimeout(() => {
        dispatch(clearCart())
        dispatch(closeCart())
        router.push("/")
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while placing your order")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show success message
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
        <p className="text-muted-foreground mb-6 text-center">Thank you for your order. We'll process it right away.</p>
        <Button onClick={() => router.push("/")}>Continue Shopping</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Contact Information</h2>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="c_name">Full Name *</Label>
            <Input
              id="c_name"
              name="c_name"
              value={formData.c_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="c_phone">Phone Number *</Label>
            <Input
              id="c_phone"
              name="c_phone"
              value={formData.c_phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping Information</h2>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="address">Delivery Address *</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your full address"
              required
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <Label>Courier Service *</Label>
            <RadioGroup
              defaultValue={formData.courier}
              onValueChange={handleCourierChange}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="steadfast" id="steadfast" />
                <Label htmlFor="steadfast" className="cursor-pointer">
                  Steadfast
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pathao" id="pathao" />
                <Label htmlFor="pathao" className="cursor-pointer">
                  Pathao
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="redx" id="redx" />
                <Label htmlFor="redx" className="cursor-pointer">
                  RedX
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Payment Information</h2>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="delivery_charge">Delivery Charge</Label>
            <Input
              id="delivery_charge"
              name="delivery_charge"
              value={formData.delivery_charge}
              onChange={handleChange}
              type="number"
              min="0"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cod_amount">COD Amount</Label>
            <Input
              id="cod_amount"
              name="cod_amount"
              value={formData.cod_amount || defaultCodAmount}
              onChange={handleChange}
              placeholder={defaultCodAmount}
              type="number"
              min="0"
            />
            <p className="text-sm text-muted-foreground">
              Default: Subtotal (${subtotal.toFixed(2)}) + Delivery (${formData.delivery_charge})
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="advance">Advance Payment (Optional)</Label>
            <Input
              id="advance"
              name="advance"
              value={formData.advance}
              onChange={handleChange}
              placeholder="0.00"
              type="number"
              min="0"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="discount_amount">Discount Amount (Optional)</Label>
            <Input
              id="discount_amount"
              name="discount_amount"
              value={formData.discount_amount}
              onChange={handleChange}
              placeholder="0.00"
              type="number"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="w-full md:w-auto" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </Button>
      </div>
    </form>
  )
}
