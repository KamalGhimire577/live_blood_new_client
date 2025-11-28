"use client";

import BloodLoader from "./BloodLoader";

interface ErrorPopupProps {
  message: string;
}

export default function ErrorPopup({ message }: ErrorPopupProps) {
  return (
    <> <BloodLoader />
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full mx-4">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
           
            <p className="text-gray-600">{message}</p>
          </div>
        </div>
      </div>
    </>
  );
}