"use client";

import { useEffect, useState } from "react";

interface Province {
  id: number;
  title: string;
}

interface District {
  id: number;
  title: string;
  province_id: number;
}

export default function NepalLocationSelector() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);

  const [cities, setCities] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Major cities by district
  const majorCities: Record<string, string[]> = {
    Kathmandu: [
      "Kathmandu",
      "Kirtipur",
      "Tokha",
      "Chandragiri",
      "Budhanilkantha",
    ],
    Lalitpur: ["Lalitpur", "Godawari", "Mahalaxmi"],
    Bhaktapur: ["Bhaktapur", "Madhyapur Thimi", "Suryabinayak"],
    Morang: ["Biratnagar", "Belbari", "Urlabari"],
    Sunsari: ["Itahari", "Dharan", "Inaruwa"],
    Jhapa: ["Birtamode", "Damak", "Mechinagar"],
    Chitwan: ["Bharatpur", "Ratnanagar", "Khairahani"],
    Rupandehi: ["Butwal", "Siddharthanagar", "Devdaha"],
    Kaski: ["Pokhara", "Lekhnath"],
    Dang: ["Ghorahi", "Tulsipur"],
    Banke: ["Nepalgunj", "Kohalpur"],
    Kailali: ["Dhangadhi", "Tikapur", "Lamki"],
    // Add more districts as needed
  };

  // Fetch Province + District data
  useEffect(() => {
    async function loadData() {
      const provRes = await fetch(
        "https://raw.githubusercontent.com/sandipbgt/nepal-location-api/master/api/v1/provinces.json"
      );
      const distRes = await fetch(
        "https://raw.githubusercontent.com/sandipbgt/nepal-location-api/master/api/v1/districts.json"
      );

      setProvinces(await provRes.json());
      setDistricts(await distRes.json());
    }
    loadData();
  }, []);

  // When province changes → filter districts
  useEffect(() => {
    if (selectedProvince) {
      setFilteredDistricts(
        districts.filter((d) => d.province_id === Number(selectedProvince))
      );
    }
  }, [selectedProvince, districts]);

  // When district changes → filter major cities
  useEffect(() => {
    if (selectedDistrict) {
      const citiesList = majorCities[selectedDistrict] || [];
      setFilteredCities(citiesList);
    }
  }, [selectedDistrict]);

  return (
    <div className="space-y-6">
      {/* Province */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Province
        </label>
        <select
          className="w-full rounded-lg border px-3 py-2"
          value={selectedProvince}
          onChange={(e) => {
            setSelectedProvince(e.target.value);
            setSelectedDistrict("");
            setSelectedCity("");
          }}
        >
          <option value="">Select Province</option>
          {provinces.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {/* District */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          District
        </label>
        <select
          className="w-full rounded-lg border px-3 py-2"
          value={selectedDistrict}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            setSelectedCity("");
          }}
          disabled={!selectedProvince}
        >
          <option value="">Select District</option>
          {filteredDistricts.map((d) => (
            <option key={d.id} value={d.title}>
              {d.title}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Major City
        </label>
        <select
          className="w-full rounded-lg border px-3 py-2"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedDistrict}
        >
          <option value="">Select City</option>
          {filteredCities.map((city, idx) => (
            <option key={idx} value={city}>
              {city}
            </option>
          ))}
        </select>

        {filteredCities.length === 0 && selectedDistrict && (
          <p className="text-xs text-gray-500 mt-1">
            No major cities listed for this district.
          </p>
        )}
      </div>
    </div>
  );
}
