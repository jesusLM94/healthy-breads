import devProducts from '@/data/products-dev.json';
import prodProducts from '@/data/products-prod.json';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

// Determinar si estamos en producción o desarrollo
const isProd = process.env.NODE_ENV === 'production';

// Cargar productos según el entorno
export const products: Product[] = isProd ? prodProducts : devProducts;

// Función para guardar productos en localStorage
export function saveProductsToLocalStorage(updatedProducts: Product[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  }
}

// Función para cargar productos desde localStorage (si existen)
export function loadProductsFromLocalStorage(): Product[] | null {
  if (typeof window !== 'undefined') {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      return JSON.parse(storedProducts);
    }
  }
  return null;
}

// Función para actualizar el stock de un producto
export function updateProductStock(productId: string, newStock: number, currentProducts: Product[]): Product[] {
  const updatedProducts = currentProducts.map(product =>
    product.id === productId ? { ...product, stock: newStock } : product
  );
  
  saveProductsToLocalStorage(updatedProducts);
  return updatedProducts;
}

// Función para exportar el inventario actual a un archivo (solo para fines administrativos)
export function getInventoryData(): string {
  if (typeof window !== 'undefined') {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      return storedProducts;
    }
  }
  return JSON.stringify(products, null, 2);
}
