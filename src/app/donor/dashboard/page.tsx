"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchDonorRequests, updateRequestStatusThunk, deleteRequestThunk, fetchDonorProfile } from "@/lib/store/donorRequests/donorRequestsSlice";

export default function Page() {
  const [activeSection, setActiveSection] = useState("profile");
  const { user } = useAppSelector((state) => state.auth);
  const donorName: string = user.userName || "User";

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 font-bold text-red-600 text-2xl border-b border-gray-200">
          Your Profile
        </div>

        

        <nav className="mt-4 flex-1">
          {[
            { name: "Profile ", key: "profile" },
            { name: "Booking Requests", key: "requests" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`block w-full text-left py-3 px-6 text-gray-700 hover:bg-red-100 transition-all ${
                activeSection === item.key
                  ? "bg-red-500 text-white font-semibold"
                  : ""
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-bold text-red-600 capitalize">
            {activeSection === "profile" ? "My Profile" : "Booking Requests"}
          </h1>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
              {donorName[0]}
            </div>
          </div>
        </header>

        {/* Section Content */}
        <main className="p-6 space-y-6">
          {activeSection === "profile" && <ProfileSection />}
          {activeSection === "requests" && <BookingRequestSection />}
        </main>
      </div>
    </div>
  );
}

/* ------------------- SECTIONS ------------------- */

function ProfileSection() {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.donorRequests);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDonorProfile());
  }, [dispatch]);

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Donor Profile
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600">Full Name</p>
            <p className="font-semibold text-gray-900">{user.userName || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-semibold text-gray-900">{user.email || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600">Phone Number</p>
            <p className="font-semibold text-gray-900">{user.phoneNumber || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600">City</p>
            <p className="font-semibold text-gray-900">{profile?.city || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600">Blood Group</p>
            <p className="font-semibold text-gray-900">{profile?.bloodgroup || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600">Date of Birth</p>
            <p className="font-semibold text-gray-900">{profile?.dob ? new Date(profile.dob).toLocaleDateString() : 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600">Last Donation</p>
            <p className="font-semibold text-gray-900">{profile?.last_donation_date ? new Date(profile.last_donation_date).toLocaleDateString() : 'Never'}</p>
          </div>
          <div>
            <p className="text-gray-600">Next Eligible Date</p>
            <p className="font-semibold text-gray-900">{profile?.next_eligible_date ? new Date(profile.next_eligible_date).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>

        <button className="mt-6 px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

function BookingRequestSection() {
  const dispatch = useAppDispatch();
  const { requests, loading, error } = useAppSelector((state) => state.donorRequests);

  useEffect(() => {
    dispatch(fetchDonorRequests());
  }, [dispatch]);

  const handleComplete = (requestId: number) => {
    dispatch(updateRequestStatusThunk(requestId));
  };

  const handleDelete = (requestId: number) => {
    if (confirm("Are you sure you want to delete this request?")) {
      dispatch(deleteRequestThunk(requestId));
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Blood Requests ({requests.length})
      </h2>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-full">
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="py-3 px-4">S.N</th>
              <th className="py-3 px-4">Requester Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Address</th>
              <th className="py-3 px-4">Blood Group</th>
              <th className="py-3 px-4">Urgent</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Update Status</th>
              <th className="py-3 px-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-gray-500">
                  No blood requests found...
                </td>
              </tr>
            ) : (
              requests.map((req, index) => (
                <tr
                  key={req.id}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{req.requester_name}</td>
                  <td className="py-3 px-4">{req.requester_phone}</td>
                  <td className="py-3 px-4 max-w-xs truncate" title={req.requester_address}>
                    {req.requester_address}
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">
                      {req.blood_group}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {req.urgent ? (
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        URGENT
                      </span>
                    ) : (
                      <span className="text-gray-500 text-sm">Normal</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        req.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : req.status === "accepted"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {req.status !== "completed" ? (
                      <button
                        onClick={() => handleComplete(req.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                      >
                        Complete
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">Completed</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(req.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
