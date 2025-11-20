"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  fetchUsers,
  fetchDonors,
  fetchBloodRequests,
  fetchDonations,
  deleteUser,
  deleteDonor,
  updateBloodRequestStatus
} from '../../../lib/store/admin/adminSlice';

export default function Page() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const adminName:string = "Admin";

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 font-bold text-red-600 text-2xl border-b border-gray-200">
          LiveBlood Admin
        </div>

        <div className="p-4 text-gray-600 text-sm border-b border-gray-100">
          Logged in as:
          <span className="block text-gray-900 font-semibold">{adminName}</span>
        </div>

        <nav className="mt-4 flex-1">
          {[
            { name: "Dashboard", key: "dashboard" },
            { name: "Users", key: "users" },
            { name: "Donors", key: "donors" },
            { name: "Blood Requests", key: "requests" },
            { name: "Donations List", key: "donations" },
            { name: "Settings", key: "settings" },
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
          <button className="w-full bg-red-500 text-red py-2 rounded-md hover:bg-red-600 transition-all">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-bold text-red-600 capitalize">
            {activeSection.replace(/([A-Z])/g, " $1")}
          </h1>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
              {adminName[0]}
            </div>
          </div>
        </header>

        {/* Section Content */}
        <main className="p-6 space-y-6">
          {activeSection === "dashboard" && <DashboardSection />}
          {activeSection === "users" && <UsersSection />}
          {activeSection === "donors" && <DonorsSection />}
          {activeSection === "requests" && <RequestsSection />}
          {activeSection === "donations" && <DonationsSection />}
          {activeSection === "settings" && <SettingsSection />}
        </main>
      </div>
    </div>
  );
}

/* ------------------- SECTIONS ------------------- */

function DashboardSection() {
  const dispatch = useAppDispatch();
  const { users, donors, bloodRequests } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchDonors());
    dispatch(fetchBloodRequests());
  }, [dispatch]);

  const pendingRequests = bloodRequests.filter(r => r.status === 'pending').length;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={users.length.toString()} />
        <StatCard title="Active Donors" value={donors.length.toString()} />
        <StatCard title="Pending Requests" value={pendingRequests.toString()} />
      </div>
    </div>
  );
}

function UsersSection() {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user: any) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DonorsSection() {
  const dispatch = useAppDispatch();
  const { donors, loading } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDonors());
  }, [dispatch]);

  const handleDeleteDonor = (id: string) => {
    if (confirm('Are you sure you want to delete this donor?')) {
      dispatch(deleteDonor(id));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Donors</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blood Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {donors.map((donor: any) => (
              <tr key={donor.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donor.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donor.blood_type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donor.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDeleteDonor(donor.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RequestsSection() {
  const dispatch = useAppDispatch();
  const { bloodRequests, loading } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchBloodRequests());
  }, [dispatch]);

  const handleUpdateStatus = (id: string, status: string) => {
    dispatch(updateBloodRequestStatus({ id, status }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Blood Requests</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blood Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bloodRequests.map((request: any) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.blood_type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    request.status === 'completed' ? 'bg-green-100 text-green-800' :
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {request.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(request.id, 'approved')}
                        className="text-green-600 hover:text-green-900"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(request.id, 'rejected')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {request.status === 'approved' && (
                    <button
                      onClick={() => handleUpdateStatus(request.id, 'completed')}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DonationsSection() {
  const dispatch = useAppDispatch();
  const { donations, loading } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDonations());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Completed Donations</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blood Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donor ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requestor ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {donations.map((donation: any) => (
              <tr key={donation.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.blood_type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.donor_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.requestor_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(donation.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h2>
      <p className="text-gray-600">
        Manage admin profile or system preferences.
      </p>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center border-t-4 border-red-500">
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-red-600 mt-2">{value}</p>
    </div>
  );
}
