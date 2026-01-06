import ProductList from "@/components/shared/products/product-list";
import sampleData from "@/db/sample-data";

export default function Home() {
  return (
    <div>
      <ProductList data={sampleData.products} title="Newest Arrivals" limit={4}/>
    </div>
  );
}
