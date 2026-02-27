export const dynamic = 'force-dynamic';
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          About <span className="text-orange-600">RevoShop</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">
          RevoShop is a modern e-commerce platform designed for simplicity and quality. 
          We offer carefully curated products with great prices and excellent customer service.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div className="rounded-lg bg-gray-50 p-8 border border-gray-200">
          <h3 className="text-orange-600 text-2xl font-bold">100%</h3>
          <p className="mt-2 text-gray-700 font-medium">Quality Products</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-8 border border-gray-200">
          <h3 className="text-orange-600 text-2xl font-bold">Fast</h3>
          <p className="mt-2 text-gray-700 font-medium">Shipping</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-8 border border-gray-200">
          <h3 className="text-orange-600 text-2xl font-bold">Secure</h3>
          <p className="mt-2 text-gray-700 font-medium">Checkout</p>
        </div>
      </div>
    </div>
  );
}