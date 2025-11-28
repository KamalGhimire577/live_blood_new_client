"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchAllEligibleDonors } from "@/lib/store/donor/donorSlice";
import { Status } from "@/lib/types/type";
import BloodLoader from "./BloodLoader";
import { provinces, districts, localLevels } from "@/data/nepalLocations";

export default function DonorCard() {
  const dispatch = useAppDispatch();
  const { donors, status } = useAppSelector((state) => state.donorauth);
  const { user } = useAppSelector((state) => state.auth);

  // Filter out current user from donors list
  const filteredDonors = user.id ? donors.filter(donor => donor.userId !== user.id) : donors;

  // Function to get full address
  const getFullAddress = (provinceId: string, districtId: string, cityName: string) => {
    const province = provinces.find(p => p.id === Number(provinceId));
    const district = districts.find(d => d.id === Number(districtId));
    return `${cityName}, ${district?.name || districtId}, ${province?.name || provinceId}`;
  };

  useEffect(() => {
    dispatch(fetchAllEligibleDonors());
  }, [dispatch]);

  if (status === Status.LOADING) {
    return (
      <div className="flex justify-center items-center py-12">
        <BloodLoader />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {filteredDonors.map((donor, index) => (
        <div
          key={index}
          className="w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100"
        >
          {/* Header Image */}
          <div className="relative w-full h-32 bg-linear-to-r from-red-500 to-blue-500 rounded-t-xl flex items-center justify-center">
            <Image
              src="/donor.jpeg"
              alt="Donor Image"
              width={60}
              height={60}
              className="rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>

          {/* Donor Info */}
          <div className="p-4 text-center">
            <h2 className="text-lg font-bold text-gray-900">
              {donor.donorName}
            </h2>

            {/* Blood Group */}
            <div className="mt-4 flex justify-center">
              <span className="text-sm font-semibold bg-linear-to-r from-red-500 to-blue-500 text-white px-3 py-1 rounded-full shadow-md">
                Blood Group:{" "}
                <span className="font-bold ml-1">{donor.bloodgroup}</span>
              </span>
            </div>

            {/* Contact Info */}
            <div className="mt-3 text-gray-700 space-y-1 text-sm">
              <p>
                <span className="font-semibold">📞 Contact:</span>{" "}
                {donor.phoneNumber}
              </p>
            </div>
            <p className="text-sm text-gray-600">
              {getFullAddress(donor.province, donor.district, donor.city)}
            </p>

            {/* Divider */}
            <div className="my-4 border-t border-gray-200"></div>

            {/* Make Request Button */}
            <Link
              href={`/bloodrequest/${donor.donorId}?name=${encodeURIComponent(donor.donorName)}&bloodGroup=${donor.bloodgroup}`}
              className="inline-block w-full rounded-lg bg-linear-to-r from-red-500 to-blue-500 text-white font-semibold py-2 text-sm hover:from-blue-600 hover:to-red-600 transition-all shadow-md"
            >
              Make Request
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
