import { Product } from '@/types';
import productsData from '@/data/products.json';

const allProducts = productsData as unknown as Product[];

export function getAllProducts(): Product[] {
  return allProducts;
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getProductsByIds(ids: string[]): Product[] {
  return allProducts.filter((p) => ids.includes(p.id));
}

export function getRelatedProducts(product: Product, limit = 8): Product[] {
  return allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}
