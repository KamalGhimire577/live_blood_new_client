"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginAdmin, resetAuthStatus } from "@/lib/store/auth/authSlice";
import { RootState, AppDispatch } from "@/lib/store/store";
import { Status } from "@/lib/types/type";
import BloodLoader from "../../../Components/BloodLoader";
import ErrorPopup from "../../../Components/ErrorPopup";

interface AdminLoginData {
  email: string;
  password: string;
}

export default function Page() {
  const [formData, setFormData] = useState<AdminLoginData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const [showError, setShowError] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Handle redirect when SUCCESS
  useEffect(() => {
    if (status === Status.SUCCESS) {
      setIsRedirecting(true);
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1500);
    }
  }, [status]);

  // Show popup when ERROR
  useEffect(() => {
    if (status === Status.ERROR) {
      setShowError(true);

      const t = setTimeout(() => {
        setShowError(false);
        dispatch(resetAuthStatus());
      }, 2000);

      return () => clearTimeout(t);
    }
  }, [status, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    dispatch(loginAdmin(formData));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Loader screen during redirecting
  if (isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-rose-100 via-red-100 to-red-200">
        <div className="text-center">
          <BloodLoader />
          <p className="mt-4 text-red-600 font-semibold">
            Redirecting to Admin Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-rose-100 via-red-100 to-red-200 px-4">
      {showError && <ErrorPopup message={errorMessage || "Login failed"} />}

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-400 rounded-full blur-2xl opacity-30" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-400 rounded-full blur-2xl opacity-30" />

        <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-gray-900 placeholder-transparent 
              focus:outline-none focus:border-red-500"
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
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 pr-10 text-gray-900 placeholder-transparent 
              focus:outline-none focus:border-red-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
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
