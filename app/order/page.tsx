"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

interface OrderItem {
  id: string;
  quantity: number;
}

interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
}

export default function OrderPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuantityChange = (id: string, quantity: number) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, { id, quantity: 1 }]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const totalAmount = selectedItems.reduce((total, item) => {
    const product = products.find((p) => p.id === item.id);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      //call api to send email
      const response = await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({
          items: selectedItems,
          customerDetails,
          totalAmount,
        }),
      });
      console.log(response);
      setIsSubmitting(true);
      try {
        /* Commented for now
        const orderItems = selectedItems.map(item => {
          const product = products.find(p => p.id === item.id)!;
          return {
            ...item,
            name: product.name,
            price: product.price
          };
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-order-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            items: orderItems,
            customerDetails,
            totalAmount,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al enviar el pedido');
        }
        */

        alert("¡Pedido enviado exitosamente!");
        // Reset form
        setSelectedItems([]);
        setCustomerDetails({ name: "", phone: "", address: "" });
        setStep(1);
      } catch (error) {
        alert("Error al procesar el pedido. Por favor, intente nuevamente.");
        console.error('Error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-8">Realizar Pedido</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover w-full h-48 mb-4"
                  />
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={product.id}
                        checked={selectedItems.some((item) => item.id === product.id)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(product.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={product.id}>{product.name}</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                    <p className="text-sm">Disponibles: {product.stock}</p>
                    <p className="font-semibold">${product.price.toFixed(2)}</p>
                    {selectedItems.some((item) => item.id === product.id) && (
                      <div className="space-y-2">
                        <Label htmlFor={`quantity-${product.id}`}>Cantidad:</Label>
                        <Input
                          id={`quantity-${product.id}`}
                          type="number"
                          min="1"
                          max={product.stock}
                          value={
                            selectedItems.find((item) => item.id === product.id)
                              ?.quantity || 1
                          }
                          onChange={(e) =>
                            handleQuantityChange(
                              product.id,
                              parseInt(e.target.value) || 0
                            )
                          }
                        />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-right">
              <p className="text-lg font-semibold mb-4">
                Total: ${totalAmount.toFixed(2)}
              </p>
              <Button
                type="submit"
                disabled={selectedItems.length === 0}
              >
                Continuar a Detalles de Entrega
              </Button>
            </div>
          </div>
        ) : (
          <Card className="p-6 max-w-md mx-auto">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  required
                  value={customerDetails.name}
                  onChange={(e) =>
                    setCustomerDetails((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={customerDetails.phone}
                  onChange={(e) =>
                    setCustomerDetails((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="address">Dirección de Entrega</Label>
                <Input
                  id="address"
                  required
                  value={customerDetails.address}
                  onChange={(e) =>
                    setCustomerDetails((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="pt-4 space-x-4">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Regresar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Realizar Pedido"}
                </Button>
              </div>
            </div>
          </Card>
        )}
      </form>
    </div>
  );
}
