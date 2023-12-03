import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Payment from "./Payment";
import Confetti from "react-confetti";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useBooking from "../../../hooks/useBooking";
// import Confetti from "react-confetti";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const CheckOutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [booking, refetch] = useBooking();
  const navigate = useNavigate();
  const totalPrice = booking.reduce((total, item) => total + item.price, 0);
  console.log(totalPrice);
  const [showConfetti, setShowConfetti] = useState(false);
  const axiosPublic = useAxiosPublic();
  console.log("showConfetti:", showConfetti);

  const yourWidthValue = 800;
  const yourHeightValue = 800;
  useEffect(() => {
    if (totalPrice > 0) {
      axiosPublic
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);
  console.log(booking);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
    }

    //confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        setShowConfetti(true);

        //now save the payment to the database
        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(), //utc date convert.use moment js to convert
          bookingIds: booking.map((item) => item._id),
          bookingItemIds: booking.map((item) => item._id),
          status: "pending",
        };
        const res = await axiosSecure.post("/payments", payment);
        console.log("Payment Saved", res.data);
        refetch();
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            title: "Payment success",
            text: "Thank you for sir for believing us.",
            icon: "success",
          });
          navigate("/dashboard/paymentHistory");
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      ></CardElement>
      <button
        className="btn btn-primary btn-sm my-6"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      {showConfetti && (
        <Confetti width={yourWidthValue} height={yourHeightValue} />
      )}
      <p className="text-red-500">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your transaction id:{transactionId}</p>
      )}
    </form>
  );
};

export default CheckOutForm;
