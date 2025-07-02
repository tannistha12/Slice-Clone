import { useState } from "react";
import { auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }

    const options = {
      key: "rzp_test_ZDwUUwsHwvodlB", // your Razorpay test key
      amount: amount * 100, // Razorpay works in paise
      currency: "INR",
      name: "Slice Clone",
      description: "Payment transaction",
      handler: async function (response) {
        try {
          await addDoc(collection(db, "payments"), {
            email: auth.currentUser?.email || "Anonymous",
            paymentId: response.razorpay_payment_id,
            amount: amount,
            timestamp: serverTimestamp(),
          });
          alert(`Payment successful! ID: ${response.razorpay_payment_id}`);
          navigate("/dashboard");
        } catch (error) {
          alert("Failed to save payment: " + error.message);
        }
      },
      prefill: {
        email: auth.currentUser?.email || "",
      },
      theme: {
        color: "#6366f1",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Enter Amount to Pay</h2>
      <input
        type="number"
        min="1"
        placeholder="Amount in ₹"
        className="border p-2 w-full mb-4 rounded"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={handlePayment}
        className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 transition"
      >
        Pay Now
      </button>
    </div>
  );
}
