import { Resend } from 'resend';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderItem {
  id: string;
  quantity: number;
  name: string;
  price: number;
}

interface OrderDetails {
  items: OrderItem[];
  customerDetails: {
    name: string;
    phone: string;
    address: string;
  };
  totalAmount: number;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    const { items, customerDetails, totalAmount }: OrderDetails = await req.json();

    const itemsList = items.map(item => 
      `- ${item.name} (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const emailContent = `
Nuevo Pedido de Healthy Breads

Cliente:
- Nombre: ${customerDetails.name}
- Teléfono: ${customerDetails.phone}
- Dirección: ${customerDetails.address}

Productos:
${itemsList}

Total: $${totalAmount.toFixed(2)}
    `;

    const { data, error } = await resend.emails.send({
      from: 'Healthy Breads <orders@healthybreads.com>',
      to: ['your-email@example.com'], // Replace with your email
      subject: `Nuevo Pedido de ${customerDetails.name}`,
      text: emailContent,
    });

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});