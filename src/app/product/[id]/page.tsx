import { notFound } from 'next/navigation';
import { Star } from 'lucide-react';
import { getAllProducts, getProductById, getRelatedProducts } from '@/lib/products';
import { formatCurrency, getDiscountPercentage } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductSpecs } from '@/components/product/ProductSpecs';
import { ProductActions } from '@/components/product/ProductActions';
import { ProductCard } from '@/components/product/ProductCard';

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  // Note: we can't await in generateMetadata directly in some Next versions,
  // but with static params this works fine at build time
  return {
    title: 'Samsung Store - Product',
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <span className="hover:text-samsung-blue cursor-pointer">Home</span>
        <span className="mx-2">/</span>
        <span className="hover:text-samsung-blue cursor-pointer capitalize">
          {product.category}
        </span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Product detail layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Left: Gallery */}
        <ProductGallery product={product} />

        {/* Right: Info + Actions */}
        <div className="space-y-6">
          {/* Badges */}
          <div className="flex gap-2">
            {product.isNew && <Badge variant="new">New</Badge>}
            {product.originalPrice && (
              <Badge variant="sale">
                Save {getDiscountPercentage(product.originalPrice, product.price)}%
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Actions (color selector, quantity, add to cart) */}
          <ProductActions product={product} />
        </div>
      </div>

      {/* Specs */}
      <div className="mb-16">
        <ProductSpecs specs={product.specs} />
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-6">You May Also Like</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {related.map((p) => (
              <div key={p.id} className="min-w-[220px] max-w-[260px]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
