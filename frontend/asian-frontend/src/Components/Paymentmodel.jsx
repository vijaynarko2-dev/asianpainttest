import {
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";





const PaymentModal = ({ open, onClose }) => {
    const stripe = useStripe();
    const elements = useElements();

    if (!open) return null; // 👈 IMPORTANT

    const handlePayment = async () => {
        if (!stripe || !elements) return;

        try {
            const { data } = await axios.post(
                "http://localhost:3000/api/payment/v1/payment",
                { offerId: "SPECIAL_OFFER" },
                { withCredentials: true }
            );

            const result = await stripe.confirmCardPayment(
                data.clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                }
            );

            if (result.error) {
                alert(result.error.message);
            } else if (result.paymentIntent.status === "succeeded") {
                alert("Payment Successful 🎉");
                onClose();
            }
        } catch (err) {
            alert("Payment failed");
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-lg font-bold mb-4">Pay ₹750</h2>

                {/* ONLY ONE CardElement */}
                <CardElement />

                <button
                    className="mt-4 w-full bg-orange-500 text-white py-2 rounded"
                    onClick={handlePayment}
                    disabled={!stripe}
                >
                    Confirm Payment
                </button>

                <button
                    className="mt-2 w-full border py-2 rounded"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default PaymentModal;
