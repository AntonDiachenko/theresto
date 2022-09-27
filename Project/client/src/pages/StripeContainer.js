import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
// import PaymentForm from "./Cart";
import "../Stripe.css";

const PUBLIC_KEY =
  "pk_test_51LmLNaJbu7K0OjLDGX7ChQYAGcYfZcMYA4Bx22FIDAcA5HLHsg5TP8T5b1V8Owxb8CAhySd7267gKrI1QcDQz8jb00xSL9mtK8";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}

export default StripeContainer;
