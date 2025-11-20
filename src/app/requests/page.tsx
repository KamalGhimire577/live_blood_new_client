"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchUserRequests } from "@/lib/store/userRequests/userRequestsSlice";
import { Status } from "@/lib/types/type";

export default function RequestsPage() {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { requests, status, error } = useAppSelector(
    (state) => state.userRequests
  );

  // Fetch on mount
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserRequests());
    }
  }, [dispatch, user.id]);

  // UI Loading/Error states
  if (status === Status.LOADING)
    return <div className="p-8 text-center">Loading...</div>;

  if (status === Status.ERROR)
    return (
      <div className="p-8 text-center text-red-500">
        Error: {error || "Something went wrong"}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Your Blood Requests
        </h1>

        {requests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No blood requests found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {requests.map((request) => (
              <div
                key={request.request_id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Request Details */}
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      Request Details
                    </h3>
                    <p>
                      <span className="font-medium">Blood Group:</span>{" "}
                      {request.blood_group}
                    </p>

                    <p>
                      <span className="font-medium">Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded text-sm ${
                          request.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : request.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {request.status}
                      </span>
                    </p>

                    <p>
                      <span className="font-medium">Request Date:</span>{" "}
                      {new Date(request.request_date).toLocaleDateString()}
                    </p>

                    {request.urgent && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                        Urgent
                      </span>
                    )}
                  </div>

                  {/* Donor Details */}
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      Donor Information
                    </h3>

                    {request.donor_username ? (
                      <>
                        <p>
                          <span className="font-medium">Name:</span>{" "}
                          {request.donor_username}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span>{" "}
                          {request.donor_phone}
                        </p>
                        <p>
                          <span className="font-medium">Address:</span>{" "}
                          {request.donor_full_address}
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-500">No donor assigned yet</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
