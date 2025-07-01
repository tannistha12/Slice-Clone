import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const userEmail = auth.currentUser?.email || "anonymous@example.com";

  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${userEmail}`;

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
            name: "PayKaro",
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
                    setTimeout(() => {
                      window.location.href = "/dashboard";
                    }, 1000); // waits 1 second

                } catch (error) {
                    alert("Failed to save payment: " + error.message);
                }
            },
            prefill: {
              name: user?.displayName || user?.email?.split("@")[0] || "Guest",
              email: user?.email || "noemail@guest.com",
              contact: user?.phoneNumber || "9999999999" // fallback if phone not available
            },
            theme: {
                color: "#6366f1"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open(); 
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 to-blue-900 text-white flex flex-col items-center justify-center gap-6 p-6">
      <img
        src={avatarUrl}
        alt="User Avatar"
        className="w-24 h-24 rounded-full shadow-lg border-4 border-white"
      />

      <h1 className="text-2xl font-semibold">
        👋 Welcome back, {userEmail.split("@")[0]}!
      </h1>

      <p className="text-md text-gray-200 italic">
        Ready to make some magic happen 💸
      </p>

      <button
        onClick={() => navigate("/payment")}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md font-medium transition-all shadow-lg"
      >
        Make Payment
      </button>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-all shadow-md"
      >
        Logout
      </button>
    </div>
  );
}