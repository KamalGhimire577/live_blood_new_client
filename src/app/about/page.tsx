"use client";

import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white text-gray-900">
        {/* Hero */}
        <section className="relative flex items-center justify-center py-20 px-6 sm:px-8 lg:px-16">
          <div className="max-w-4xl text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-rose-500 shadow-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-12 w-12 text-white"
                fill="currentColor"
              >
                <path d="M12 2.5c-.7 1-3 4.1-3 7.5 0 3.9 3.1 7 3 11 0 0 .2-3 0-4.5 0-2.9-3-4.5-3-8 0-3.6 2.9-6.5 3-6.5s3 2.9 3 6.5c0 3.5-3 5.1-3 8 0 1.5.1 4.5.1 4.5-.2-4 3-7.1 3-11 0-3.4-2.3-6.5-3-7.5z" />
              </svg>
            </div>

            <h1 className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              Bloody Good People. Brighter Lives.
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-700">
              Welcome to{" "}
              <span className="font-semibold text-red-600">
               Live Blood Bank
              </span>{" "}
              — where courage meets compassion. We’re a community of donors,
              volunteers and medical partners turning simple moments of kindness
              into lifesaving action. Think bold, think positive, think blood
              that brings people back to the moments they love.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/auth/donorsignup"
                className="inline-flex items-center justify-center rounded-md bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-red-700"
              >
                Donate Blood
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center rounded-md border border-red-600 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Join as Volunteer
              </Link>
            </div>
          </div>
        </section>

        {/* Mission + Stats */}
        <div className="py-12 px-6 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
              <p className="mb-4 text-gray-700">
                We exist to make blood donation simple, safe, and celebrated. By
                creating reliable channels between donors and hospitals, running
                community drives, and educating the public, we make sure every
                drop counts — and every donor feels proud.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>• Promote regular voluntary blood donation</li>
                <li>• Maintain safe and transparent transfusion practices</li>
                <li>• Support hospitals with timely, curated blood supplies</li>
              </ul>
            </div>

            <div className="rounded-xl border border-red-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Units Donated</p>
                  <p className="mt-2 text-3xl font-bold text-red-600">
                    12,487+
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lives Impacted</p>
                  <p className="mt-2 text-3xl font-bold text-rose-500">
                    8,742+
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
