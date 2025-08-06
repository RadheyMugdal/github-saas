"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { auth } from "./auth";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export async function createCheckoutSession(credits: number) {
  const userSession = await auth.api.getSession({ headers: await headers() })
  if (!userSession?.user) throw new Error("User not found");
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${credits} DevSage credits`,
          },
          unit_amount: Math.round((credits / 50) * 100),
        },
        quantity: 1,
      },
    ],
    customer_creation: "always",
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/create`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
    client_reference_id: userSession.user.id,
    metadata: {
      credits,
    },
  });
  return redirect(session.url!);
}
