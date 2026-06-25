import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

const priceMap = {
  comedian: {
    monthly: process.env.STRIPE_COMEDIAN_MONTHLY_PRICE_ID,
    annual: process.env.STRIPE_COMEDIAN_ANNUAL_PRICE_ID,
  },
  booker: {
    monthly: process.env.STRIPE_BOOKER_MONTHLY_PRICE_ID,
    annual: process.env.STRIPE_BOOKER_ANNUAL_PRICE_ID,
  },
  studio: {
    monthly: process.env.STRIPE_STUDIO_MONTHLY_PRICE_ID,
    annual: process.env.STRIPE_STUDIO_ANNUAL_PRICE_ID,
  },
};

export default async function handler(req) {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json(
      { error: "Missing STRIPE_SECRET_KEY. Add it to .env.local and Netlify environment variables." },
      { status: 500 }
    );
  }

  try {
    const { plan, billing = "monthly" } = await req.json();
    const priceId = priceMap?.[plan]?.[billing];

    if (!priceId) {
      return Response.json(
        { error: `Missing Stripe price ID for ${plan} ${billing}.` },
        { status: 400 }
      );
    }

    const origin = req.headers.get("origin") || "http://localhost:8888";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/?checkout=success&plan=${plan}&billing=${billing}`,
      cancel_url: `${origin}/?checkout=cancelled`,
      metadata: {
        plan,
        billing,
        app: "jokeflow",
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to create checkout session." },
      { status: 500 }
    );
  }
}
