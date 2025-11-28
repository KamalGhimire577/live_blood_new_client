"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Toast from "../../Components/Toast";

import {
  fetchUsers,
  fetchDonors,
  fetchBloodRequests,
  fetchDonations,
  deleteUser,
  deleteDonor,
  completeBloodRequest,
  updateBloodRequestStatus,
  deleteBloodRequest,
  IUser,
  IDonor,
  IBloodRequest,
} from "@/lib/store/admin/adminSlice";

import { Status } from "@/lib/types/type";
import {getProvinceName, getDistrictName } from "@/data/nepalLocations";


import BloodLoader from "@/app/Components/BloodLoader";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const router = useRouter();
  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const showToast = (message: string, type: "success" | "error") =>
    setToast({ message, type });

  // Redirect if not admin
  useEffect(() => {
    if (!token || user.role !== "admin") router.push("/auth/admin/signin");
  }, [token, user.role, router]);

  if (!token || user.role !== "admin") return null;

  const adminName = user.userName || "Admin";

  const handleLogout = () => {
    router.push("/logout");
    setProfileOpen(false);
  };

  const handleUserView = () => {
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
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-md flex flex-col transition-transform duration-300 ease-in-out`}>
        <div className="p-6 font-bold text-red-600 text-2xl border-b border-gray-200 flex items-center justify-between">
          <span>Hi {adminName}</span>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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
        <Header 
          activeSection={activeSection} 
          adminName={adminName} 
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
          setSidebarOpen={setSidebarOpen}
          handleLogout={handleLogout}
          handleUserView={handleUserView}
          user={user}
        />

        <main className="p-6 space-y-6">
          {activeSection === "dashboard" && <DashboardSection />}
          {activeSection === "users" && <UsersSection showToast={showToast} />}
          {activeSection === "donors" && (
            <DonorsSection showToast={showToast} />
          )}
          {activeSection === "requests" && (
            <RequestsSection showToast={showToast} />
          )}
          {activeSection === "donations" && (
            <DonationsSection showToast={showToast} />
          )}
          {activeSection === "settings" && <SettingsSection />}
        </main>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

/* ========================= Header ========================= */
function Header({ activeSection, adminName, profileOpen, setProfileOpen, setSidebarOpen, handleLogout, handleUserView, user }: any) {
  return (
    <header className="bg-white shadow-md p-4 flex items-center sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <h1 className="text-xl font-bold text-red-600 capitalize">
          {activeSection}
        </h1>
      </div>

      {/* Center Search Bar and User View Button */}
      <div className="flex-1 flex justify-center items-center gap-4 mx-4">
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
        
        <button
          onClick={handleUserView}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          User View
        </button>
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
              {adminName[0]}
            </div>
            <svg className={`w-4 h-4 text-gray-600 transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* User Info */}
              <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xl mb-3">
                  {adminName[0]}
                </div>
                <h3 className="font-bold text-gray-900">{user.userName || 'Admin'}</h3>
                <p className="text-gray-600 text-sm">{user.phoneNumber || user.email}</p>
                <p className="text-red-600 font-semibold text-sm">Role: {user.role || 'admin'}</p>
              </div>
              
              {/* Menu Items */}
              <div className="space-y-2">
                <button
                  onClick={handleUserView}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  User View
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm border-t border-gray-200 mt-2 pt-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* ========================= Dashboard Section ========================= */
function DashboardSection() {
  const dispatch = useAppDispatch();
  const { users, donors, bloodRequests, donations, status } = useAppSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchDonors());
    dispatch(fetchBloodRequests());
    dispatch(fetchDonations());
  }, [dispatch]);

  if (status === Status.LOADING) return <BloodLoader />;

  const pendingRequests = bloodRequests.filter((r) => r.status === "pending");

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={users.length.toString()} />
        <StatCard title="Active Donors" value={donors.length.toString()} />
        <StatCard
          title="Pending Requests"
          value={pendingRequests.length.toString()}
        />
        <StatCard
          title="Completed Donations"
          value={donations.length.toString()}
        />
      </div>
    </div>
  );
}

/* ========================= Users Section ========================= */
function UsersSection({ showToast }: any) {
  const dispatch = useAppDispatch();
  const { users, status } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await dispatch(deleteUser(id));
      showToast("User deleted successfully", "success");
    } catch {
      showToast("Failed to delete user", "error");
    }
  };

  if (status === Status.LOADING) return <BloodLoader />;

  const tableData = users.map((user: IUser, index) => ({
    sn: index + 1,
    userName: user.userName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    actions: (
      <button
        className="text-red-600 hover:text-red-900"
        onClick={() => handleDeleteUser(user.id)}
      >
        Delete
      </button>
    ),
  }));

  return (
    <SectionTable
      title="Users"
      columns={["SN", "User Name", "Email", "Phone", "Role", "Actions"]}
      data={tableData}
    />
  );
}
///------------donor-------------section--------////
export function DonorsSection({ showToast }: any) {
  const dispatch = useAppDispatch();
  const { donors, status } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDonors());
  }, [dispatch]);

  console.log("Donors from Redux:", donors);
  console.log("Status:", status);

  // Handle Delete Donor
  const handleDeleteDonor = async (id: string) => {
    if (!confirm("Delete donor?")) return;

    try {
      await dispatch(deleteDonor(id));
      showToast("Donor deleted successfully", "success");
    } catch {
      showToast("Failed to delete donor", "error");
    }
  };

  if (status === Status.LOADING) return <BloodLoader />;

  // Prepare Table Data
  const tableData = donors.map((donor: IDonor, index: number) => ({
    sn: index + 1,
    userName: donor.userName,
    email: donor.email,
    phoneNumber: donor.phoneNumber,
    bloodgroup: donor.bloodgroup,
    dob: donor.dob ? new Date(donor.dob).toLocaleDateString() : "N/A",
    lastDonation: donor.last_donation_date
      ? new Date(donor.last_donation_date).toLocaleDateString()
      : "N/A",
    nextEligible: donor.next_eligible_date
      ? new Date(donor.next_eligible_date).toLocaleDateString()
      : "N/A",
    address: `${donor.city ?? ""}, ${getDistrictName(
      Number(donor.district)
    )}, ${getProvinceName(Number(donor.province))}`,
    actions: (
      <button
        className="text-red-600 hover:text-red-900"
        onClick={() => handleDeleteDonor(donor.id)}
      >
        Delete
      </button>
    ),
  }));

  return (
    <SectionTable
      title="Donors"
      columns={[
        "SN",
        "User Name",
        "Email",
        "Phone",
        "Blood Group",
        "DOB",
        "Last Donation",
        "Next Eligible",
        "Address",
        "Actions",
      ]}
      data={tableData}
    />
  );
}

/* ========================= Requests Section ========================= */
function RequestsSection({ showToast }: any) {
  const dispatch = useAppDispatch();
  const { bloodRequests, status } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchBloodRequests());
  }, [dispatch]);

  const pendingRequests = bloodRequests.filter((r) => r.status !== "completed");

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await dispatch(updateBloodRequestStatus(id, newStatus));
      showToast(`Status updated to ${newStatus}`, "success");
    } catch {
      showToast("Failed to update status", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete request?")) return;

    try {
      await dispatch(deleteBloodRequest(id));
      showToast("Request deleted successfully", "success");
    } catch {
      showToast("Failed to delete request", "error");
    }
  };

  if (status === Status.LOADING) return <BloodLoader />;

  const tableData = pendingRequests.map((req: IBloodRequest, index) => ({
    sn: index + 1,
    requester: req.requester_name,
    phone: req.requester_phone,
    address: req.requester_address,
    donor: req.donorUserName || 'N/A',
    donoremail: req.donorEmail || 'N/A',
    donorphone: req.donorPhoneNumber || 'N/A',
    donoraddress: req.donorCity ? `${req.donorCity ?? ""}, ${getDistrictName(
      Number(req.donorDistrict)
    )}, ${getProvinceName(Number(req.donorProvince))}` : 'N/A',
    bloodgroup: req.blood_group,
    status: req.status,
    urgent: req.urgent ? (
      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
        URGENT
      </span>
    ) : (
      "Normal"
    ),
    date: req.request_date ? new Date(req.request_date).toLocaleDateString() : 'N/A',
    actions: (
      <div className="flex gap-2">
        <button
          className="text-green-600 text-xs px-2 py-1 border border-green-600 rounded hover:bg-green-50"
          onClick={() => handleStatusChange(req.id, "completed")}
        >
          Complete
        </button>
        <button
          className="text-red-600 text-xs px-2 py-1 border border-red-600 rounded hover:bg-red-50"
          onClick={() => handleDelete(req.id)}
        >
          Delete
        </button>
      </div>
    ),
  }));

  return (
    <SectionTable
      title="Blood Requests"
      columns={[
        "SN",
        "Requester",
        "Phone",
        "Address",
        "Donor",
        "Donor Email",
        "Donor Phone",
        "Donor Address",
        "Blood Group",
        "Status",
        "Urgent",
        "Date",
        "Actions",
      ]}
      data={tableData}
    />
  );
}

/* ========================= Donations Section ========================= */
function DonationsSection({ showToast }: any) {
  const dispatch = useAppDispatch();
  const { donations, status } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDonations());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete donation?")) return;

    try {
      await dispatch(deleteBloodRequest(id));
      showToast("Donation deleted successfully", "success");
    } catch {
      showToast("Failed to delete donation", "error");
    }
  };

  if (status === Status.LOADING) return <BloodLoader />;

  const tableData = donations.map((item: IBloodRequest, index) => ({
    sn: index + 1,
    requester: item.requester_name,
    phone: item.requester_phone,
    address: item.requester_address,
    donor: item.donorUserName || 'N/A',
    donoremail: item.donorEmail || 'N/A',
    donorphone: item.donorPhoneNumber || 'N/A',
    donoraddress: `${item.donorCity ?? ""}, ${getDistrictName(
      Number(item.donorDistrict)
    )}, ${getProvinceName(Number(item.donorProvince))}`,
    bloodgroup: item.blood_group,
    urgent: item.urgent ? "URGENT" : "Normal",
    status: item.status,
    completeddate: item.completed_date
      ? new Date(item.completed_date).toLocaleDateString()
      : "N/A",
    actions: (
      <button
        className="text-red-600 hover:text-red-900"
        onClick={() => handleDelete(item.id)}
      >
        Delete
      </button>
    ),
  }));

  return (
    <SectionTable
      title="Completed Donations"
      columns={[
        "SN",
        "Requester",
        "Phone",
        "Address",
        "Donor",
        "Donor Email",
        "Donor Phone",
        "Donor Address",
        "Blood Group",
        "Urgent",
        "Status",
        "Completed Date",
        "Actions",
      ]}
      data={tableData}
    />
  );
}

/* ========================= Settings Section ========================= */
function SettingsSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <p className="text-gray-600">Manage admin preferences.</p>
    </div>
  );
}

/* ========================= Stat Card ========================= */
function StatCard({ title, value }: any) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center border-t-4 border-red-500">
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-red-600 mt-2">{value}</p>
    </div>
  );
}

/* ========================= Fixed SectionTable ========================= */

const columnKeyMap: Record<string, string> = {
  SN: "sn",
  "User Name": "userName",
  Email: "email",
  Phone: "phoneNumber",
  Role: "role",
  Requester: "requester",
  Donor: "donor",
  "Donor Email": "donoremail",
  "Donor Phone": "donorphone",
  "Donor Address": "donoraddress",
  "Blood Group": "bloodgroup",

  DOB: "dob",
  "Last Donation": "lastDonation",
  "Next Eligible": "nextEligible",
  Address: "address",
  Urgent: "urgent",
  Date: "date",
  Status: "status",
  "Completed Date": "completeddate",
  Actions: "actions",
};

function SectionTable({
  title,
  columns,
  data,
}: {
  title: string;
  columns: string[];
  data: any[];
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-4 py-3">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx}>
                  {columns.map((col, cIdx) => {
                    const key = columnKeyMap[col];
                    return (
                      <td key={cIdx} className="px-4 py-4">
                        {row[key] ?? ""}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
