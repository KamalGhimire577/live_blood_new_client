// pages/auth/signin.tsx (or wherever your component is)
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ISignInData } from "./signin.type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { loginUser, resetAuthStatus } from "@/lib/store/auth/authSlice";
import { Status } from "@/lib/types/type";
import BloodLoader from "./../../Components/BloodLoader";
import LoginSuccessPopup from "./../../Components/LoginSuccessPopup";
import ErrorPopup from "./../../Components/ErrorPopup";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user, status, errorMessage } = useAppSelector((store) => store.auth);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<ISignInData>({
    userName: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      loginUser({
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      })
    );
  };

  // Handle success
  useEffect(() => {
    if (status === Status.SUCCESS) {
      setShowSuccessPopup(true);
      // optionally redirect after a short delay
      const t = setTimeout(() => {
        setShowSuccessPopup(false);
        // redirect to home or dashboard
        router.push("/"); // change path if needed
        dispatch(resetAuthStatus());
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [status]);

  // Handle error: show popup for 2 seconds, clear password field & reset status
  useEffect(() => {
    if (status === Status.ERROR && errorMessage) {
      setShowError(true);
      // clear sensitive fields (password) so user must re-enter
      setFormData((prev) => ({ ...prev, password: "" }));

      const t = setTimeout(() => {
        setShowError(false);
        dispatch(resetAuthStatus());
      }, 2000);

      return () => clearTimeout(t);
    }
  }, [status, errorMessage, dispatch]);

  if (status === Status.LOADING) {
    return <BloodLoader />;
  }

  return (
    <>
      {showSuccessPopup && <LoginSuccessPopup user={user} />}
      {showError && <ErrorPopup message={errorMessage} />}

      <div className="flex min-h-screen flex-col bg-white">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
          <div className="w-full max-w-sm space-y-8 p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="text-center">
              <Image
                src="/logo.png"
                alt="App Logo"
                width={80}
                height={80}
                className="mx-auto"
              />
              <h2 className="mt-6 text-2xl font-semibold text-gray-900 sm:text-3xl">
                Login to your account
              </h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    className="mt-2 w-full rounded-md border-0 bg-white px-3.5 py-2 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="mt-2 w-full rounded-md border-0 bg-white px-3.5 py-2 pr-10 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 mt-1 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-x-2.5 text-sm text-gray-900">
                  <input
                    type="checkbox"
                    name="remember-me"
                    className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-2 focus:ring-red-400"
                  />
                  Remember me
                </label>
                <Link
                  href="/auth/forgotpassword"
                  className="text-sm font-semibold text-red-500 hover:text-red-400"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-linear-to-r from-red-500 to-rose-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-rose-500 hover:to-red-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-500"
              >
                Sign In
              </button>
            </form>

            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-semibold text-red-500 hover:text-red-400"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
