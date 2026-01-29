import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ id, title, price, image, category }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group">
      <div className="bg-white border rounded-xl p-4 h-full flex flex-col hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full mb-4">
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-contain group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <p className="text-xs text-blue-600 font-bold uppercase">{category}</p>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mt-1 mb-2">
            {title}
          </h3>
          <p className="mt-auto font-bold text-gray-900">${price}</p>
        </div>
      </div>
    </Link>
  );
}