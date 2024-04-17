import { NextRequest, NextResponse } from 'next/server';

import Stripe from 'stripe';

export async function GET(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    typescript: true,
    apiVersion: '2024-04-10',
  });

  const products = await stripe.prices.list({
    limit: 3,
  });

  return NextResponse.json(products.data);
}
