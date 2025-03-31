import * as React from 'react';

interface OrderItem {
  id: string;
  quantity: number;
  name?: string;
  price?: number;
}

interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
}

interface EmailTemplateProps {
  firstName: string;
  orderDetails?: {
    items: OrderItem[];
    customerDetails: CustomerDetails;
    totalAmount: number;
  };
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  orderDetails,
}) => (
  <div>
    <h1>Nuevo Pedido de {firstName}</h1>
    {orderDetails && (
      <div>
        <h2>Detalles del Pedido:</h2>
        <p>Cliente: {orderDetails.customerDetails.name}</p>
        <p>Teléfono: {orderDetails.customerDetails.phone}</p>
        <p>Dirección: {orderDetails.customerDetails.address}</p>
        
        <h3>Productos:</h3>
        <ul>
          {orderDetails.items.map((item) => (
            <li key={item.id}>
              ID: {item.id} - Cantidad: {item.quantity}
            </li>
          ))}
        </ul>
        
        <p><strong>Total: ${orderDetails.totalAmount.toFixed(2)}</strong></p>
      </div>
    )}
  </div>
); 
