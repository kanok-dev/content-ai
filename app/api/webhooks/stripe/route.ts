/**
 * Stripe Webhook Handler
 *
 * Processes Stripe webhooks for payments, subscriptions, and credit purchases
 */

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { creditManager } from '@/server/services/credits/credit-manager';
import { prisma } from '@/server/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❌ Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

/**
 * Handle successful checkout session (one-time credit purchase)
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const credits = parseInt(session.metadata?.credits || '0');
  const packageName = session.metadata?.packageName;

  if (!userId || !credits) {
    console.error('Missing userId or credits in session metadata');
    return;
  }

  console.log(`✅ Checkout completed: ${credits} credits for user ${userId}`);

  // Grant credits to user
  await creditManager.grantCredits({
    userId,
    amount: credits,
    type: 'PURCHASE',
    description: `Purchased ${packageName || 'credits package'}: ${credits} credits`,
    metadata: {
      stripeSessionId: session.id,
      stripeCustomerId: session.customer,
      amount: session.amount_total,
      currency: session.currency,
      packageName,
    },
  });

  // TODO: Send confirmation email
  // await sendCreditPurchaseEmail(userId, credits);
}

/**
 * Handle subscription creation/update
 */
async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;

  if (!userId) {
    console.error('Missing userId in subscription metadata');
    return;
  }

  console.log(`✅ Subscription updated for user ${userId}: ${subscription.status}`);

  // Update user's subscription status
  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionStatus: subscription.status,
      subscriptionId: subscription.id,
      subscriptionPriceId: subscription.items.data[0]?.price.id,
      subscriptionCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      stripeCustomerId: subscription.customer as string,
    },
  });

  // Grant monthly credits if subscription is active
  if (subscription.status === 'active') {
    const priceId = subscription.items.data[0]?.price.id;
    const planCredits = await getSubscriptionPlanCredits(priceId);

    if (planCredits > 0) {
      await creditManager.grantCredits({
        userId,
        amount: planCredits,
        type: 'SUBSCRIPTION',
        description: `Monthly subscription credits (${planCredits})`,
        metadata: {
          subscriptionId: subscription.id,
          priceId,
          periodStart: subscription.current_period_start,
          periodEnd: subscription.current_period_end,
        },
      });
    }
  }
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;

  if (!userId) {
    console.error('Missing userId in subscription metadata');
    return;
  }

  console.log(`❌ Subscription canceled for user ${userId}`);

  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionStatus: 'canceled',
      subscriptionCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });

  // TODO: Send cancellation email
}

/**
 * Handle successful payment (recurring)
 */
async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log(`✅ Payment succeeded for invoice: ${invoice.id}`);

  // If this is a subscription renewal, grant monthly credits
  if (invoice.subscription && invoice.billing_reason === 'subscription_cycle') {
    const subscription = await stripe.subscriptions.retrieve(
      invoice.subscription as string
    );
    const userId = subscription.metadata?.userId;

    if (userId) {
      const priceId = subscription.items.data[0]?.price.id;
      const planCredits = await getSubscriptionPlanCredits(priceId);

      if (planCredits > 0) {
        await creditManager.grantCredits({
          userId,
          amount: planCredits,
          type: 'SUBSCRIPTION',
          description: `Monthly subscription credits renewal`,
          metadata: {
            invoiceId: invoice.id,
            subscriptionId: subscription.id,
            priceId,
          },
        });
      }
    }
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log(`❌ Payment failed for invoice: ${invoice.id}`);

  // TODO: Send payment failed email to user
  // TODO: Update subscription status if needed
}

/**
 * Get subscription plan credits from database
 */
async function getSubscriptionPlanCredits(priceId: string | undefined): Promise<number> {
  if (!priceId) return 0;

  const plan = await prisma.subscriptionPlan.findUnique({
    where: { stripePriceId: priceId },
  });

  return plan?.monthlyCredits || 0;
}
