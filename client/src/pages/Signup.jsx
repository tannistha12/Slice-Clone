import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom"; 

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center p-6">
      <form 
        onSubmit={handleSignup} 
        className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg p-10 max-w-md w-full text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Create Your Account</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-md mb-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-md mb-6 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 py-3 rounded-md font-semibold shadow-lg transition transform hover:scale-105"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
