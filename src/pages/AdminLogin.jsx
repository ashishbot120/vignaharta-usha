import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../lib/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/api/admin/login", { email, password });
      localStorage.setItem("admin_token", res.data.token);
      setAuthToken(res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white rounded-2xl shadow p-5 sm:p-6 border"
      >
        <h1 className="text-xl font-bold">Admin Login</h1>
        <p className="text-xs text-gray-500 mt-1">Use admin credentials to manage content.</p>

        <div className="mt-4">
          <label className="text-sm">Email</label>
          <input
            className="mt-1 w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-black/20"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-3">
          <label className="text-sm">Password</label>
          <input
            className="mt-1 w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-black/20"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="mt-3 text-red-600 text-sm">{error}</div>}

        <button className="mt-5 w-full bg-black text-white rounded-lg py-2 font-semibold active:scale-[0.99]">
          Login
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-3 w-full border rounded-lg py-2 font-semibold hover:bg-gray-50"
        >
          Back to Website
        </button>
      </form>
    </div>
  );
}
