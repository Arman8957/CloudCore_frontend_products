import type { Product } from "@/types"

// Mock products data to use when API fails or returns empty
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Leather Jacket",
    short_description: "Genuine leather jacket with premium stitching and comfortable fit",
    description:
      "<p>This premium leather jacket is crafted from the finest genuine leather. Features include durable YKK zippers, multiple pockets, and a comfortable polyester lining. Perfect for casual outings or a night on the town.</p>",
    price: 299.99,
    thumbnail: "mock-leather-jacket.jpg",
    category_name: "Outerwear",
    stock_status: "in_stock",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Wireless Noise-Cancelling Headphones",
    short_description: "High-quality wireless headphones with active noise cancellation",
    description:
      "<p>Experience immersive sound with these wireless noise-cancelling headphones. Features include 30-hour battery life, comfortable over-ear design, and premium audio drivers for exceptional sound quality.</p>",
    price: 199.99,
    thumbnail: "mock-headphones.jpg",
    category_name: "Electronics",
    stock_status: "in_stock",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    short_description: "Soft, breathable organic cotton t-shirt in various colors",
    description:
      "<p>Made from 100% organic cotton, this t-shirt is both environmentally friendly and incredibly comfortable. Available in multiple colors, it features a classic fit and is perfect for everyday wear.</p>",
    price: 29.99,
    thumbnail: "mock-tshirt.jpg",
    category_name: "Clothing",
    stock_status: "in_stock",
    rating: 4.2,
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    short_description: "Vacuum-insulated water bottle that keeps drinks cold for 24 hours",
    description:
      "<p>This double-walled, vacuum-insulated stainless steel water bottle keeps your drinks cold for up to 24 hours or hot for up to 12 hours. BPA-free, leak-proof, and available in multiple colors.</p>",
    price: 34.99,
    thumbnail: "mock-water-bottle.jpg",
    category_name: "Accessories",
    stock_status: "in_stock",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Smart Fitness Tracker",
    short_description: "Advanced fitness tracker with heart rate monitoring and GPS",
    description:
      "<p>Track your fitness goals with this advanced smart fitness tracker. Features include heart rate monitoring, built-in GPS, sleep tracking, and water resistance up to 50 meters. Compatible with iOS and Android.</p>",
    price: 129.99,
    thumbnail: "mock-fitness-tracker.jpg",
    category_name: "Electronics",
    stock_status: "in_stock",
    rating: 4.4,
  },
  {
    id: 6,
    name: "Handcrafted Ceramic Mug",
    short_description: "Artisan-made ceramic mug with unique glazing",
    description:
      "<p>Each of these ceramic mugs is handcrafted by skilled artisans. The unique glazing technique ensures no two mugs are exactly alike. Microwave and dishwasher safe.</p>",
    price: 24.99,
    thumbnail: "mock-ceramic-mug.jpg",
    category_name: "Home",
    stock_status: "in_stock",
    rating: 4.9,
  },
  {
    id: 7,
    name: "Vintage-Style Backpack",
    short_description: "Durable canvas backpack with leather accents",
    description:
      "<p>This vintage-style backpack combines durability with classic aesthetics. Made from heavy-duty canvas with genuine leather accents, it features multiple compartments including a padded laptop sleeve.</p>",
    price: 59.99,
    thumbnail: "mock-backpack.jpg",
    category_name: "Bags",
    stock_status: "in_stock",
    rating: 4.6,
  },
  {
    id: 8,
    name: "Natural Soy Candle",
    short_description: "Hand-poured soy candle with essential oil fragrances",
    description:
      "<p>These natural soy candles are hand-poured and scented with pure essential oils. With a clean-burning cotton wick and approximately 50 hours of burn time, they create a warm, inviting atmosphere in any room.</p>",
    price: 19.99,
    thumbnail: "mock-soy-candle.jpg",
    category_name: "Home",
    stock_status: "in_stock",
    rating: 4.3,
  },
]

// Mock image URLs to use for product thumbnails
export const mockImageUrls: Record<string, string> = {
  "mock-leather-jacket.jpg": "/placeholder.svg?height=300&width=300&text=Leather+Jacket",
  "mock-headphones.jpg": "/placeholder.svg?height=300&width=300&text=Headphones",
  "mock-tshirt.jpg": "/placeholder.svg?height=300&width=300&text=T-Shirt",
  "mock-water-bottle.jpg": "/placeholder.svg?height=300&width=300&text=Water+Bottle",
  "mock-fitness-tracker.jpg": "/placeholder.svg?height=300&width=300&text=Fitness+Tracker",
  "mock-ceramic-mug.jpg": "/placeholder.svg?height=300&width=300&text=Ceramic+Mug",
  "mock-backpack.jpg": "/placeholder.svg?height=300&width=300&text=Backpack",
  "mock-soy-candle.jpg": "/placeholder.svg?height=300&width=300&text=Soy+Candle",
}
