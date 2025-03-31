import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const notificationEmail = process.env.NOTIFICATION_EMAIL || 'j.lizarraga23@gmail.com';
const senderEmail = process.env.SENDER_EMAIL || 'Healthy Breads <onboarding@resend.dev>';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customerDetails, totalAmount } = body;

    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: [notificationEmail],
      subject: 'Nuevo Pedido de Pan',
      react: EmailTemplate({ 
        firstName: customerDetails.name,
        orderDetails: { items, customerDetails, totalAmount }
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Email sending error:', error);
    return Response.json({ error }, { status: 500 });
  }
}
