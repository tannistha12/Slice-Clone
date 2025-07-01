import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-center bg-gradient-to-br from-indigo-500 to-purple-700 text-white px-6">
      {/* Animated Waves */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg
          className="relative block w-[200%] h-40 animate-wave"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.59,22,103.78,37.84,172,38.53,86.45.88,175.28-23.83,261-32.64C617.42,42,705.65,54.5,792,66.56s177.19,26,268,8.41V0Z"
            fill="rgba(255,255,255,0.15)"
          ></path>
        </svg>
      </div>

      {/* Content */}
      <div className="z-10 space-y-6">
        <h1 className="text-5xl font-extrabold drop-shadow-xl">Welcome to PayKaro 💳</h1>
        <p className="text-xl text-white/80">Your seamless payment journey starts here 🚀</p>

        <div className="flex gap-6 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:scale-105 shadow-lg transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-yellow-300 text-indigo-900 font-semibold px-6 py-3 rounded-lg hover:scale-105 shadow-lg transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
