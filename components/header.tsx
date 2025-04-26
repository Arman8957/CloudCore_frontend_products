"use client"

import Link from "next/link"
import { ShoppingBag, Menu, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { toggleCart } from "@/lib/redux/slices/cartSlice"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleCartToggle = () => {
    dispatch(toggleCart())
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <ShoppingBag className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl">RefabryShop</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Categories
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            New Arrivals
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative" onClick={handleCartToggle}>
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                {totalItems}
              </Badge>
            )}
          </Button>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                    <ShoppingBag className="h-6 w-6 text-primary mr-2" />
                    <span className="font-bold text-xl">RefabryShop</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4 mt-6">
                  <Link
                    href="/"
                    className="px-2 py-1 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="#"
                    className="px-2 py-1 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Categories
                  </Link>
                  <Link
                    href="#"
                    className="px-2 py-1 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    New Arrivals
                  </Link>
                  <Link
                    href="#"
                    className="px-2 py-1 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
