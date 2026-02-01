const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
    try {

        console.log("Request body:", req.body)
        const { offerId } = req.body;

        // 🔒 Calculate price in backend only
        let amount;
        if (offerId === "SPECIAL_OFFER") {
            amount = 750; // ₹750
        } else {
            return res.status(400).json({ message: "Invalid offer" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // paise
            currency: "inr",
            automatic_payment_methods: { enabled: true },
            metadata: { offerId },
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPaymentIntent };
