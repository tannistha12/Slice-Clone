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
    <form onSubmit={handleLogin} className="flex flex-col gap-4 p-6 max-w-sm mx-auto mt-10">
      <input
        type="email"
        placeholder="Email"
        className="border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">
        Log In
      </button>
    </form>
  );
}
