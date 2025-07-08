import { useNavigate } from "react-router-dom";
import "./App.css";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-700 to-indigo-900 flex flex-col items-center justify-center text-white px-6 py-12 overflow-hidden">
      {/* Animated wave background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-20 animate-wave" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
          Welcome to <span className="text-yellow-300">PayKaro</span>
        </h1>
        <p className="text-center text-lg md:text-xl max-w-xl mb-10 text-blue-100">
          Fast, Secure, and Effortless Payments in just a few clicks. Join now
          and experience the new wave of transactions!
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-lg font-semibold shadow-lg"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 transition px-8 py-3 rounded-lg font-semibold shadow-lg"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
