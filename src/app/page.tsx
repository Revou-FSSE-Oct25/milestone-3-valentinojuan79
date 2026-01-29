import ProductCard from '@/components/ProductCard';

async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) throw new Error('Gagal mengambil data produk');
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      <div className="text-center py-10">
        <h1 className="text-4xl font-extrabold text-gray-900">RevoShop Collections</h1>
        <p className="text-gray-500 mt-2">Temukan produk impianmu dengan harga terbaik.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <ProductCard 
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
}