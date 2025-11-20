"use client";
import { useRouter } from "next/navigation";

interface LoginSuccessPopupProps {
  user: {
    userName?: string;
  };
}

export default function LoginSuccessPopup({ user }: LoginSuccessPopupProps) {
  const router = useRouter();

  const handleOk = () => {
    router.push("/");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-sm w-full border-t-8 border-red-700">
        {/* Bloody Red Circle with Tick */}
        <div className="flex justify-center items-center mb-4">
          <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-4xl shadow-lg">
            ✓
          </div>
        </div>

        <h3 className="text-xl font-bold text-red-700 mb-1">Login Successful!</h3>
        <p className="text-gray-700 font-medium">
          Welcome <span className="text-red-600">{user?.userName || "User"}</span>!
        </p>
        <p className="text-gray-500 text-sm mt-3 mb-5">
          You have successfully logged in.
        </p>

        <button
          onClick={handleOk}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold transition-all duration-200 shadow-md"
        >
          OK
        </button>
      </div>
    </div>
  );
}
