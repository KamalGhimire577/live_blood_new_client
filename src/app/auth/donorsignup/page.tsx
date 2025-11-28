"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  provinces,
  districts,
  localLevels,
  District,
  LocalLevel,
} from "@/data/nepalLocations";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setStatus,
  registerDonor,
  resetDonorState,
} from "@/lib/store/donor/donorSlice";
import { Status } from "@/lib/types/type";
import BloodLoader from "../../Components/BloodLoader";

interface FormDataType {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  province: string;
  district: string;
  city: string;
  bloodgroup: string;
  dob: string;
  lastDonation: string;
  confirmEligibility: boolean;
}

interface ErrorType {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
  province?: string;
  district?: string;
  city?: string;
  bloodgroup?: string;
  dob?: string;
  lastDonation?: string;
  confirmEligibility?: string;
}

export default function DonorForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status } = useAppSelector((state) => state.donorauth);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);
  const [filteredCities, setFilteredCities] = useState<LocalLevel[]>([]);
  const [errors, setErrors] = useState<ErrorType>({});
  const [ageError, setAgeError] = useState<string>("");
  const [donationDateError, setDonationDateError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  // Prevent cached success/error when returning to page
  useEffect(() => {
    dispatch(resetDonorState());
  }, [dispatch]);

  // Date restrictions
  const today = new Date().toISOString().split("T")[0];
  const minAge = new Date();
  minAge.setFullYear(minAge.getFullYear() - 60);
  const maxAge = new Date();
  maxAge.setFullYear(maxAge.getFullYear() - 18);
  const minDob = minAge.toISOString().split("T")[0];
  const maxDob = maxAge.toISOString().split("T")[0];

  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    province: "",
    district: "",
    city: "",
    bloodgroup: "",
    dob: "",
    lastDonation: "",
    confirmEligibility: false,
  });

  // Filter districts
  useEffect(() => {
    if (!formData.province) {
      setFilteredDistricts([]);
      setFormData((prev) => ({ ...prev, district: "", city: "" }));
      return;
    }
    const filtered = districts.filter(
      (d) => d.province_id === Number(formData.province)
    );
    setFilteredDistricts(filtered);
    setFormData((prev) => ({ ...prev, district: "", city: "" }));
  }, [formData.province]);

  // Filter cities
  useEffect(() => {
    if (!formData.district) {
      setFilteredCities([]);
      setFormData((prev) => ({ ...prev, city: "" }));
      return;
    }
    const filtered = localLevels.filter(
      (c) => c.district_id === Number(formData.district)
    );
    setFilteredCities(filtered);
    setFormData((prev) => ({ ...prev, city: "" }));
  }, [formData.district]);

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });

    if (name === "dob") {
      const dob = new Date(value);
      const now = new Date();
      const age = now.getFullYear() - dob.getFullYear();
      if (age < 18) setAgeError("Must be at least 18 years old.");
      else if (age > 60) setAgeError("Must be under 60 years old.");
      else setAgeError("");
    }

    if (name === "lastDonation") {
      const donationDate = new Date(value);
      const now = new Date();
      if (donationDate > now)
        setDonationDateError("Cannot select future date.");
      else setDonationDateError("");
    }
  };

  // Submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newErrors: ErrorType = {};

    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.province) newErrors.province = "Select a province";
    if (!formData.district) newErrors.district = "Select a district";
    if (!formData.city) newErrors.city = "Select a city";
    if (!formData.bloodgroup) newErrors.bloodgroup = "Select blood group";
    if (ageError) newErrors.dob = ageError;
    if (donationDateError) newErrors.lastDonation = donationDateError;
    if (!formData.confirmEligibility)
      newErrors.confirmEligibility = "You must confirm eligibility";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    dispatch(
      registerDonor({
        username: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phone,
        password: formData.password,
        bloodGroup: formData.bloodgroup,
        province: formData.province,
        district: formData.district,
        city: formData.city,
        dateofbirth: formData.dob,
        last_donation_date: formData.lastDonation || null,
      })
    );
  };

  // Success popup and redirect
  useEffect(() => {
    if (status === Status.SUCCESS) {
      setShowSuccessPopup(true);
      const timer = setTimeout(() => {
        router.push("/auth/signin");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(resetDonorState());
    };
  }, [dispatch]);

  // Loader
  if (status === Status.LOADING) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <BloodLoader />
      </div>
    );
  }

  return (
    <>
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-sm mx-4">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Donor Registration Successful!
            </h3>
            <p className="text-gray-600">Redirecting to sign in...</p>
            <div className="mt-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500 mx-auto"></div>
            </div>
          </div>
        </div>
      )}

      {/* FORM */}
      <div className="flex justify-center items-center min-h-screen bg-[#fef7f7] py-12">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg border border-red-200 p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-red-700">
            🩸 Blood Donor Registration
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                name="fullName"
                className="w-full border border-red-400 rounded p-2 text-red-400"
                onChange={handleChange}
                value={formData.fullName}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>
            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                className="w-full border border-red-400 rounded p-2 text-red-400"
                onChange={handleChange}
                value={formData.email}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            {/* Phone */}
            <div>
              <label className="text-sm font-medium">Phone</label>
              <input
                name="phone"
                className="w-full border border-red-400 rounded p-2 text-red-400"
                onChange={handleChange}
                value={formData.phone}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-red-400 rounded p-2 pr-10 text-red-400"
                  onChange={handleChange}
                  value={formData.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            {/* Address */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Address</h3>
              {/* Province */}
              <label className="text-sm font-medium">Province</label>
              <select
                name="province"
                className="w-full border border-red-400 rounded p-2 mb-2 text-red-400"
                value={formData.province}
                onChange={handleChange}
              >
                <option value="">Select Province</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              {errors.province && (
                <p className="text-red-500 text-sm">{errors.province}</p>
              )}
              {/* District */}
              <label className="text-sm font-medium">District</label>
              <select
                name="district"
                className="w-full border border-red-400 rounded p-2 mb-2 text-red-400"
                value={formData.district}
                onChange={handleChange}
              >
                <option value="">Select District</option>
                {filteredDistricts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="text-red-500 text-sm">{errors.district}</p>
              )}
              {/* City */}
              <label className="text-sm font-medium">City / Local Level</label>
              <input
                name="city"
                type="text"
                className="w-full border border-red-400 rounded p-2 mb-1 text-red-400"
                placeholder="Search city..."
                value={formData.city}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, city: value });
                  if (value && formData.district) {
                    const list = localLevels.filter(
                      (c) =>
                        c.district_id === Number(formData.district) &&
                        c.name.toLowerCase().includes(value.toLowerCase())
                    );
                    setFilteredCities(list);
                  } else {
                    setFilteredCities([]);
                  }
                }}
              />
              {filteredCities.length > 0 && (
                <ul className="border rounded bg-white shadow max-h-40 overflow-y-auto mb-2">
                  {filteredCities.map((c) => (
                    <li
                      key={c.id}
                      className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setFormData({ ...formData, city: c.name });
                        setFilteredCities([]);
                      }}
                    >
                      {c.name}
                    </li>
                  ))}
                </ul>
              )}
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>
            {/* Blood Group */}
            <div>
              <label className="text-sm font-medium">Blood Group</label>
              <select
                name="bloodgroup"
                className="w-full border border-red-400 rounded p-2 text-red-400"
                onChange={handleChange}
                value={formData.bloodgroup}
              >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
              {errors.bloodgroup && (
                <p className="text-red-500 text-sm">{errors.bloodgroup}</p>
              )}
            </div>
            {/* DOB */}
            <div>
              <label className="text-sm font-medium">
                Date of Birth (18-60 years)
              </label>
              <input
                name="dob"
                type="date"
                min={minDob}
                max={maxDob}
                className="w-full border border-red-400 rounded p-2 text-red-400"
                onChange={handleChange}
                value={formData.dob}
              />
              {ageError && <p className="text-red-500 text-sm">{ageError}</p>}
            </div>
            {/* Last Donation */}
            <div>
              <label className="text-sm font-medium">
                Last Donation Date (Optional)
              </label>
              <input
                name="lastDonation"
                type="date"
                max={today}
                className="w-full border border-red-400 rounded p-2 text-red-400"
                onChange={handleChange}
                value={formData.lastDonation}
              />
              {donationDateError && (
                <p className="text-red-500 text-sm">{donationDateError}</p>
              )}
            </div>
            {/* Eligibility Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="confirmEligibility"
                onChange={handleChange}
                checked={formData.confirmEligibility}
              />
              <label className="text-sm">I confirm I am eligible.</label>
            </div>
            {errors.confirmEligibility && (
              <p className="text-red-500 text-sm">
                {errors.confirmEligibility}
              </p>
            )}
            <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold">
              Register as Donor
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
