"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ISignupData } from "./signup.types";
import { registerUser, setStatus } from "@/lib/store/auth/authSlice";
import { Status } from "@/lib/types/type";
import BloodLoader from "./../../Components/BloodLoader";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export default function SignUp() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status } = useAppSelector((state) => state.auth);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState<ISignupData>({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (status === Status.SUCCESS) {
      setShowSuccessPopup(true);
      setTimeout(() => {
        setFormData({
          userName: "",
          email: "",
          phoneNumber: "",
          password: "",
        });
        dispatch(setStatus(Status.IDLE));
        router.push("/auth/signin");
      }, 2000);
    }
  }, [status, router, dispatch]);

  if (status === Status.LOADING) {
    <div className="flex min-h-screen items-center justify-center bg-white">
      return <BloodLoader />;
    </div>;
  }

  return (
    <>
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12 lg:px-8">
        {showSuccessPopup && (

          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-green-500 text-4xl mb-4">✓</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Registration Successful!
              </h3>
              <p className="text-gray-600">Redirecting to sign in...</p>
            </div>
          </div>
        )}
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
                  Create your account
                </h2>
              </div>

              <form onSubmit={handleSignup} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="mt-2 w-full rounded-md border border-red-400 bg-white px-3.5 py-2 text-base text-gray-900 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-blue-100 transition-all duration-200 placeholder:text-gray-400 sm:text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="mt-2 w-full rounded-md border border-red-400 bg-white px-3.5 py-2 text-base text-gray-900 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-blue-100 transition-all duration-200 placeholder:text-gray-400 sm:text-sm"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="98XXXXXXXX"
                    pattern="^(98|97)\d{8}$"
                    required
                    className="mt-2 w-full rounded-md border border-red-400 bg-white px-3.5 py-2 text-base text-gray-900 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-blue-100 transition-all duration-200 placeholder:text-gray-400 sm:text-sm"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                    className="mt-2 w-full rounded-md border border-red-400 bg-white px-3.5 py-2 text-base text-gray-900 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-blue-100 transition-all duration-200 placeholder:text-gray-400 sm:text-sm"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className={`w-full rounded-md bg-linear-to-r from-red-600 to-rose-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200`}
                >Sign Up</button>
              </form>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="font-semibold text-red-500 hover:text-red-400"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
