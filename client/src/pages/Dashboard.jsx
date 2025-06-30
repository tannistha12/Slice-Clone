import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

    const handlePayment = () => {
        const options = {
            key: "rzp_test_ZDwUUwsHwvodlB", // 🔑 Replace this with your Razorpay Key ID
            amount: 50000, // Amount in paise = ₹500.00
            currency: "INR",
            name: "Slice Clone",
            description: "Test Transaction",
            handler: async function (response) {
                try {
                    // Save payment info to Firestore
                    await addDoc(collection(db, "payments"), {
                        email: auth.currentUser?.email || "Anonymous",
                        paymentId: response.razorpay_payment_id,
                        amount: 500,
                        timestamp: serverTimestamp()
                    });

                    alert(`Payment successful! ID: ${response.razorpay_payment_id}`);
                } catch (error) {
                    alert("Failed to save payment: " + error.message);
                }
            },
            prefill: {
              name: "Tan",
              email: "tan@example.com",
              contact: "9999999999"
            },
            theme: {
                color: "#6366f1"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open(); 
    };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center gap-6">
      <h1 className="text-3xl font-bold text-purple-700">🎉 Welcome to Your Dashboard!</h1>
      <p className="text-lg text-gray-600">Here’s where the payment magic will happen 💸</p>
      
      <button
        onClick={handlePayment}
        className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 transition"
      >
        Pay ₹500
      </button>
      
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
