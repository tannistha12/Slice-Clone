import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center gap-6">
      <h1 className="text-3xl font-bold text-purple-700">🎉 Welcome to Your Dashboard!</h1>
      <p className="text-lg text-gray-600">Here’s where the payment magic will happen 💸</p>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
