"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  products as initialProducts, 
  Product, 
  loadProductsFromLocalStorage, 
  saveProductsToLocalStorage,
  updateProductStock,
  getInventoryData
} from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Order {
  id: string;
  date: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  customerDetails: {
    name: string;
    phone: string;
    address: string;
  };
  totalAmount: number;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [inventoryJson, setInventoryJson] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Verificar autenticación al cargar la página
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = localStorage.getItem("adminAuthenticated") === "true";
      if (!authenticated) {
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [router]);

  // Load orders and products from localStorage on component mount
  useEffect(() => {
    if (!isAuthenticated) return;

    // Load products from localStorage if available
    const storedProducts = loadProductsFromLocalStorage();
    if (storedProducts) {
      setProducts(storedProducts);
    } else {
      saveProductsToLocalStorage(initialProducts);
    }
    
    // Prepare JSON export
    setInventoryJson(getInventoryData());
    
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, [isAuthenticated]);

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;
    
    const updatedProducts = updateProductStock(
      editingProduct.id, 
      editingProduct.stock, 
      products
    );
    
    setProducts(updatedProducts);
    setEditingProduct(null);
    setInventoryJson(JSON.stringify(updatedProducts, null, 2));
    
    alert(`Producto ${editingProduct.name} actualizado.`);
  };

  const handleExportInventory = () => {
    // Create a download link for the inventory JSON
    const blob = new Blob([inventoryJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    router.push("/admin/login");
  };

  if (!isAuthenticated) {
    return null; // No renderizar nada hasta que se verifique la autenticación
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <Button variant="outline" onClick={handleLogout}>Cerrar Sesión</Button>
      </div>
      
      <Tabs defaultValue="inventory">
        <TabsList className="mb-6">
          <TabsTrigger value="inventory">Inventario</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
        </TabsList>
        
        {/* Inventory Tab */}
        <TabsContent value="inventory">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Inventario de Productos</h2>
              <Button onClick={handleExportInventory}>Exportar Inventario</Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Existencias</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {editingProduct?.id === product.id ? (
                        <Input 
                          type="number" 
                          value={editingProduct.stock} 
                          onChange={(e) => setEditingProduct({
                            ...editingProduct,
                            stock: parseInt(e.target.value) || 0
                          })}
                          className="w-20"
                        />
                      ) : (
                        product.stock
                      )}
                    </TableCell>
                    <TableCell>
                      {editingProduct?.id === product.id ? (
                        <div className="space-x-2">
                          <Button size="sm" onClick={handleSaveEdit}>Guardar</Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingProduct(null)}>Cancelar</Button>
                        </div>
                      ) : (
                        <Button size="sm" onClick={() => handleEditProduct(product)}>Editar Stock</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Datos de Inventario Actuales</h3>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-xs font-mono whitespace-pre overflow-auto max-h-60 p-4 bg-gray-100 rounded">
                    {inventoryJson}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Orders Tab */}
        <TabsContent value="orders">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Pedidos</h2>
            
            {orders.length === 0 ? (
              <Card>
                <CardContent className="py-10">
                  <p className="text-center text-muted-foreground">No hay pedidos aún.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <CardTitle className="flex justify-between">
                        <span>Pedido #{order.id}</span>
                        <span>{new Date(order.date).toLocaleString()}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-medium mb-2">Datos del Cliente</h3>
                          <p>Nombre: {order.customerDetails.name}</p>
                          <p>Teléfono: {order.customerDetails.phone}</p>
                          <p>Dirección: {order.customerDetails.address}</p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Productos</h3>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Producto</TableHead>
                                <TableHead>Cantidad</TableHead>
                                <TableHead>Precio</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.items.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          <div className="text-right mt-4">
                            <p className="font-medium">Total: ${order.totalAmount.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 
