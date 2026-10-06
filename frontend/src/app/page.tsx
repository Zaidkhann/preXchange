import Hero from "@/components/Hero.jsx"
import CategoryCard from "@/components/Category.jsx"
import GetProducts from "@/components/getAllProducts.jsx"
import Link from "next/link";
import { Plus } from "lucide-react"

export const metadata = {
  title: "PreXchange - Buy & Sell Used Products",
  description:
    "Buy and sell used mobiles, cars, bikes, electronics, properties and more on PreXchange.",
}

export default function Home() {
  return (
    <div>
      <Hero />
      <CategoryCard />
      <GetProducts />
      <Link
        href="/post"
        className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 sm:static sm:translate-x-0"
      >
        <button className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 lg:hidden group flex h-12 items-center gap-2 rounded-full bg-[#0891B2] px-6 text-sm font-semibold text-white shadow-lg shadow-cyan-200/50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#07819e] hover:shadow-xl hover:shadow-cyan-200/60 active:translate-y-0 active:scale-[0.98]  sm:h-11 sm:rounded-xl sm:px-4.5 sm:shadow-sm">
          <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
          <span>Sell</span>
        </button>
      </Link>



    </div>
  );
}
