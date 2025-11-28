"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchDonorRequests, updateRequestStatusThunk, deleteRequestThunk, fetchDonorProfile } from "@/lib/store/donorRequests/donorRequestsSlice";

import BloodLoader from "@/app/Components/BloodLoader";
export default function Page() {
  const [activeSection, setActiveSection] = useState("profile");
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!token || user.role !== "donor") {
      router.push("/auth/donorsignin");
    }
  }, [token, user.role, router]);

  if (!token || user.role !== "donor") {
    return null;
  }
  const donorName: string = user.userName || "User";

  const handleLogout = () => {
    router.push("/logout");
    setProfileOpen(false);
  };

  const handleBack = () => {
    router.push("/");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const profileDropdown = document.getElementById('profile-dropdown');
      const profileButton = document.getElementById('profile-button');
      
      if (profileOpen && profileDropdown && !profileDropdown.contains(event.target as Node) && !profileButton?.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileOpen]);

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-md flex flex-col transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 font-bold text-red-600 text-2xl border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-red-100 transition-all duration-300 group"
            title="Back to Home"
          >
            <div className="w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center group-hover:bg-red-500 transition-all duration-300">
              <svg
                className="w-4 h-4 text-red-500 group-hover:text-white transition-colors duration-300 transform group-hover:-translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
          </button>
          <span>Hi {donorName}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-full hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
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
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white shadow-md p-4 flex items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <h1 className="text-xl font-bold text-red-600 capitalize">
              {activeSection === "profile" ? "My Profile" : "Booking Requests"}
            </h1>
          </div>

          {/* Center Search Bar */}
          <div className="flex-1 flex justify-center mx-4">
            <div className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-4">

            {/* Profile Dropdown */}
            <div className="relative">
              <div
                id="profile-button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                  {donorName[0]}
                </div>
                <svg
                  className={`w-4 h-4 text-gray-600 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {profileOpen && (
                <div
                  id="profile-dropdown"
                  className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50"
                >
                  {/* Close Button */}
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={() => setProfileOpen(false)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* User Info */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xl mb-3">
                      {donorName[0]}
                    </div>
                    <h3 className="font-bold text-gray-900">
                      {user.userName || "User"}
                    </h3>
                    <p className="text-gray-600 text-sm">{user.phoneNumber}</p>
                    <p className="text-red-600 font-semibold text-sm">
                      Role: {user.role || "donor"}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setActiveSection("profile");
                        setProfileOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                      My Profile
                    </button>

                    <button
                      onClick={() => {
                        setActiveSection("requests");
                        setProfileOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m2 8H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z"
                        />
                      </svg>
                      Booking Requests
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm border-t border-gray-200 mt-2 pt-3"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Section Content */}
        <main className="p-4 sm:p-6 space-y-6">
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

  if (loading) return <BloodLoader />;
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
            <p className="text-gray-600">Address</p>
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
