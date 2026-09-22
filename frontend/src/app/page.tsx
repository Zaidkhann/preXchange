import Hero from "@/components/Hero.jsx"
import CategoryCard from "@/components/Category.jsx"
import GetProducts from "@/components/getAllProducts.jsx"


export default function Home() {
  return (
    <div>
        <Hero/>
        <CategoryCard/>
        <div className="ml-4">
        <GetProducts/>
        </div>

    </div>
  );
}
