import db from "@/db/db";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import CheckoutForm from "./_components/CheckoutForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function PurchasePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });

  if (product == null) return notFound();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.price,
    currency: "INR",
    description: "Software development services",
    customer: "cus_PuYxBe7ETruVQh",
    metadata: { productId: product.id },
  });

  if (paymentIntent.client_secret == null) {
    throw new Error("Failed to create payment intent");
  }

  return (
    <CheckoutForm
      clientSecret={paymentIntent.client_secret}
      product={product}
    />
  );
}
