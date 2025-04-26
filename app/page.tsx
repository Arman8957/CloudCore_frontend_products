import ProductGrid from "@/components/product-grid"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Product Showcase</h1>
      <ProductGrid />
    </main>
  )
}
