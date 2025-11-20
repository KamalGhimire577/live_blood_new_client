"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ISignInData } from "./signin.type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { loginUser } from "@/lib/store/auth/authSlice";
import { Status } from "@/lib/types/type";
import BloodLoader from "./../../Components/BloodLoader";
import LoginSuccessPopup from "./../../Components/LoginSuccessPopup";

export default function SignIn() {

  const dispatch = useAppDispatch()
  const router = useRouter()
  const {user, status} = useAppSelector((store=>store.auth))
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  
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
      dispatch (loginUser(formData))
    };

    useEffect(() => {
      if (status === Status.SUCCESS) {
        setShowSuccessPopup(true)
      }
    }, [status]);

    if(status === Status.LOADING){
      return <BloodLoader />
    }

  return (
    <>
      {showSuccessPopup && <LoginSuccessPopup user={user} />}
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-sm space-y-8 p-6 rounded-xl shadow-lg border border-gray-200">
          {/* Logo + Header */}
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

          {/* Form */}
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
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="mt-2 w-full rounded-md border-0 bg-white px-3.5 py-2 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 sm:text-sm"
                />
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
