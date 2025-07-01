import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/dashboard"); // redirect after login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-indigo-800 via-blue-800 to-blue-600 flex items-center justify-center p-6">
      <form 
        onSubmit={handleLogin} 
        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl p-10 max-w-md w-full text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-md mb-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-md mb-6 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-blue-700 hover:to-indigo-700 py-3 rounded-md font-semibold shadow-lg transition transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
}