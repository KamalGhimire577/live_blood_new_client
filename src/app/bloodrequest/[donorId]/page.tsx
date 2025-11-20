"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addBloodRequest, setStatus } from "@/lib/store/bloodrequest/bloodrequestSlice";
import { IBloodRequestData } from "@/lib/store/bloodrequest/bloodrequestSlice.types";
import { Status } from "@/lib/types/type";

export default function BloodRequestForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const donorId = params.donorId as string;
  const donorName = searchParams.get('name');
  const donorBloodGroup = searchParams.get('bloodGroup');
  const { status } = useAppSelector((state) => state.bloodrequest);
  const { user, token } = useAppSelector((state) => state.auth);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<IBloodRequestData>({
    donor_id: "",
    requestor_id: "",
    requester_name: "",
    requester_phone: "",
    requester_address: "",
    urgent: false,
    blood_group: "",
    status: "",
  });

  // Check authentication and auto-fill user data
  useEffect(() => {
    // Wait a moment for auth state to initialize from localStorage
    const timer = setTimeout(() => {
      if (!token) {
        router.push("/auth/signin");
        return;
      }
      
      if (donorId) {
        setFormData(prev => ({
          ...prev,
          donor_id: donorId,
          requester_name: user.userName || "",
          requester_phone: user.phoneNumber || "",
          requestor_id: user.id || "",
          blood_group: donorBloodGroup || "",
        }));
      } else {
        console.error("No donorId found in URL params");
      }
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [donorId, donorBloodGroup, user, token, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      router.push("/auth/signin");
      return;
    }
    
    if (!formData.donor_id) {
      setErrorMessage("Donor ID is missing. Please try again.");
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3000);
      return;
    }
    
    const userId = user.id 
    const userName = user.userName  
    
    if (!userId || !userName) {
      setErrorMessage("User information is incomplete. Please login again.");
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3000);
      return;
    }
    
    console.log("Submitting with token:", token ? "Present" : "Missing");
    console.log("User data:", { id: userId, userName: userName, role: user.role });
    
    dispatch(addBloodRequest(formData));
  };

  useEffect(() => {
    if (status === Status.SUCCESS) {
      setShowSuccessPopup(true);
      setTimeout(() => {
        setFormData({
          donor_id: donorId,
          requestor_id: "",
          requester_name: "",
          requester_phone: "",
          requester_address: "",
          urgent: false,
          blood_group: "",
          status: "",
        });
        dispatch(setStatus(Status.IDLE));
        router.push("/");
      }, 2000);
    } else if (status === Status.ERROR) {
      setErrorMessage("Failed to submit blood request. Please try again.");
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
        dispatch(setStatus(Status.IDLE));
      }, 3000);
    }
  }, [status, router, dispatch, donorId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Request Submitted!
            </h3>
            <p className="text-gray-600">Check response on your dashboard from donor</p>
          </div>
        </div>
      )}
      
      {showErrorPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-red-500 text-4xl mb-4">✗</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Request Failed!
            </h3>
            <p className="text-gray-600">{errorMessage}</p>
          </div>
        </div>
      )}
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-100 to-rose-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-rose-600 mb-6">
          🩸 Blood Request Form
        </h2>
        {donorName && (
          <div className="text-center mb-4">
            <span className="text-sm text-gray-600">Requesting from: </span>
            <span className="font-semibold text-gray-800">{donorName}</span>
          </div>
        )}

        {/* Requester Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Requester Name
          </label>
          <input
            type="text"
            value={formData.requester_name}
            onChange={(e) =>
              setFormData({ ...formData, requester_name: e.target.value })
            }
            placeholder="Enter your full name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            value={formData.requester_phone}
            onChange={(e) =>
              setFormData({ ...formData, requester_phone: e.target.value })
            }
            placeholder={user.phoneNumber ? user.phoneNumber : "98XXXXXXXX"}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
        </div>
        
        {status === Status.ERROR && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-600">Failed to submit request. Please check your connection and try again.</p>
          </div>
        )}

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            value={formData.requester_address}
            onChange={(e) =>
              setFormData({ ...formData, requester_address: e.target.value })
            }
            placeholder="Enter your address"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
        </div>

        {/* Blood Group Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Requested Blood Group
          </label>
          <div className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50">
            <span className="text-lg font-semibold text-rose-600">
              {formData.blood_group || "Loading..."}
            </span>
          </div>
        </div>

        {/* Urgent Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.urgent}
            onChange={(e) =>
              setFormData({ ...formData, urgent: e.target.checked })
            }
            className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
          />
          <label className="text-sm text-gray-700">Mark as Urgent</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === Status.LOADING}
          className={`w-full rounded-md bg-linear-to-r from-red-600 to-rose-500 px-4 py-2.5 text-white font-semibold transition-all duration-200 ${
            status === Status.LOADING
              ? "opacity-60 cursor-not-allowed"
              : "hover:from-rose-500 hover:to-red-600"
          }`}
        >
          {status === Status.LOADING ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
    </>
  );
}
