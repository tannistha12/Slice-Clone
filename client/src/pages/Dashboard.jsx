import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy } from "firebase/firestore";

export default function Dashboard() {
  const navigate = useNavigate();
  const userEmail = auth.currentUser?.email || "anonymous@example.com";
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${userEmail}`;

  const [payments, setPayments] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔄 Fetch user’s payment history
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const q = query(
          collection(db, "payments"),
          where("email", "==", auth.currentUser?.email),
          orderBy("timestamp", "desc")
        );

        const querySnapshot = await getDocs(q);
        const fetchedPayments = querySnapshot.docs.map(doc => doc.data());

        setPayments(fetchedPayments);

        // 🧮 Calculate total
        const total = fetchedPayments.reduce((sum, p) => sum + Number(p.amount), 0);
        setTotalAmount(total);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  fetchPayments();
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 to-blue-900 text-white p-8">
      <div className="flex flex-col items-center gap-4 mb-8">
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-24 h-24 rounded-full shadow-lg border-4 border-white"
        />
        <h1 className="text-2xl font-semibold">
           Welcome back, {userEmail.split("@")[0]}!
        </h1>
        <p className="text-md text-gray-200 italic">
          Ready to make some magic happen 
        </p>

        <div className="flex gap-4">
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
      </div>

      <div className="flex flex-col items-center justify-center">
        {/* Your Total Amount Box */}
        <div className="flex justify-center w-full">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xl font-semibold px-6 py-4 rounded shadow-lg mb-6 w-full max-w-xl text-center">
             Total Transacted: ₹{totalAmount}
          </div>
        </div>
      </div>


      {/* 💳 Transaction History */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center"> Your Payment History</h2>
        {payments.length === 0 ? (
          <p className="text-center text-gray-300">No transactions yet.</p>
        ) : (
          <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {payments.map((payment) => (
              <li
                key={payment.id}
                className="bg-white bg-opacity-10 rounded p-4 shadow-md"
              >
                <p><strong>ID:</strong> {payment.paymentId}</p>
                <p><strong>Amount:</strong> ₹{payment.amount}</p>
                <p><strong>Date:</strong> {payment.timestamp?.toDate().toLocaleString() || "N/A"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
