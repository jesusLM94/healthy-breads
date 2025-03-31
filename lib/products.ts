export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export const products: Product[] = [
  {
    id: "platano",
    name: "Pan de Plátano",
    description: "Elaborado con plátanos reales para un dulzor natural",
    price: 40,
    stock: 20,
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&q=80"
  },
  {
    id: "datil",
    name: "Pan de Dátil",
    description: "Enriquecido con dátiles para un impulso de energía natural",
    price: 40,
    stock: 20,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80"
  },
  {
    id: "zanahoria",
    name: "Pan de Zanahoria",
    description: "Repleto de zanahorias para una nutrición adicional",
    price: 40,
    stock: 20,
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=400&q=80"
  }
];