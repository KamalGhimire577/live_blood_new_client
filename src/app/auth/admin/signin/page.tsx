"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/store/auth/authSlice";
import { RootState, AppDispatch } from "@/lib/store/store";
import { Status } from "@/lib/types/type";
import BloodLoader from "../../../Components/BloodLoader";


interface LoginFormData {
  email: string;
  password: string;

}

export default function Page() {
  const [formData, setFormData] = useState<LoginFormData>({ email: "", password: ""});
  const [error, setError] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { status } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    if (status === Status.SUCCESS) {
      setIsRedirecting(true);
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1500);
    }
  }, [status, router]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!formData.email || !formData.password ) {
      setError("Please fill in all fields");
      return;
    }
    
    dispatch(loginAdmin(formData));
  };
  
  useEffect(() => {
    if (status === Status.ERROR) {
      setError("Login failed. Please check your credentials.");
    }
  }, [status]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };
  if (isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-rose-100 via-red-100 to-red-200">
        <div className="text-center">
          <BloodLoader />
          <p className="mt-4 text-red-600 font-semibold">Redirecting to Admin Dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-rose-100 via-red-100 to-red-200 px-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10">
        {/* Glowing accents */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-400 rounded-full blur-2xl opacity-30" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-400 rounded-full blur-2xl opacity-30" />

        <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          {/* Error Message */}
          {(error || status === Status.ERROR) && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error || "Login failed. Please try again."}
            </div>
          )}
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-red-500"
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all 
                peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-red-600"
            >
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-red-500"
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all 
                peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-red-600"
            >
              Password
            </label>
          </div>

         
          {/* Submit */}
          <button
            type="submit"
            disabled={status === Status.LOADING}
            className="w-full bg-linear-to-r from-red-600 to-rose-500 text-white font-semibold py-2.5 rounded-lg shadow-md 
            hover:from-rose-500 hover:to-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === Status.LOADING ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
