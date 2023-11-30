import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
//TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  return (
    <div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
