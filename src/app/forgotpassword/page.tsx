
"use client";
import Link from "next/link";
import { useState, FormEvent } from "react";

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!phoneNumber) {
      setError("Please enter your registered phone number.");
      return;
    }

    // Optional: basic validation for Nepal phone numbers (start with 98 or 97)
    if (!/^(98|97)\d{8}$/.test(phoneNumber)) {
      setError("Enter a valid Nepali phone number (starts with 98 or 97).");
      return;
    }

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Something went wrong.");
      } else {
        setSuccess(
          "Password reset instructions have been sent to your phone number."
        );
        setPhoneNumber("");
      }
    } catch (err) {
      setError("Failed to send reset instructions. Try again later.");
    }
  };

  return (
    <main className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-red-400">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot Your Blood Bank Password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?{" "}
              <Link
                href="/signin"
                className="text-red-600 decoration-2 hover:underline font-medium"
              >
                Sign In here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Registered Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-red-500 focus:ring-red-500 shadow-sm"
                      placeholder="98XXXXXXXX"
                      required
                    />
                  </div>
                  {error && (
                    <p className="text-xs text-red-600 mt-2">{error}</p>
                  )}
                  {success && (
                    <p className="text-xs text-green-600 mt-2">{success}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <p className="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
        <a
          className="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-red-600 dark:text-gray-500 dark:hover:text-gray-200"
          href="https://github.com/YourRepo"
          target="_blank"
        >
          View Github
        </a>
        <a
          className="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-red-600 dark:text-gray-500 dark:hover:text-gray-200"
          href="/contact"
        >
          Contact Us
        </a>
      </p>
    </main>
  );
};

export default ForgotPassword;
