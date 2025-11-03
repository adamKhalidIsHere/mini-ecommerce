import { config } from "dotenv";
import Stripe from "stripe";
config();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
