export interface Province {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
  province_id: number;
}

export interface LocalLevel {
  id: number;
  name: string;
  district_id: number;
}
// src/data/nepalLocations.ts

export const getProvinceName = (provinceId: number) => {
  return provinces.find((p) => p.id === provinceId)?.name || "Unknown Province";
};

export const getDistrictName = (districtId: number) => {
  return districts.find((d) => d.id === districtId)?.name || "Unknown District";
};

export const provinces: Province[] = [
  { id: 1, name: "Koshi Province" },
  { id: 2, name: "Madhesh Province" },
  { id: 3, name: "Bagmati Province" },
  { id: 4, name: "Gandaki Province" },
  { id: 5, name: "Lumbini Province" },
  { id: 6, name: "Karnali Province" },
  { id: 7, name: "Sudurpashchim Province" }
];

export const districts: District[] = [
  // Province 1 (Koshi)
  { id: 1, name: "Bhojpur", province_id: 1 },
  { id: 2, name: "Dhankuta", province_id: 1 },
  { id: 3, name: "Ilam", province_id: 1 },
  { id: 4, name: "Jhapa", province_id: 1 },
  { id: 5, name: "Khotang", province_id: 1 },
  { id: 6, name: "Morang", province_id: 1 },
  { id: 7, name: "Okhaldhunga", province_id: 1 },
  { id: 8, name: "Panchthar", province_id: 1 },
  { id: 9, name: "Sankhuwasabha", province_id: 1 },
  { id: 10, name: "Solukhumbu", province_id: 1 },
  { id: 11, name: "Sunsari", province_id: 1 },
  { id: 12, name: "Taplejung", province_id: 1 },
  { id: 13, name: "Terhathum", province_id: 1 },
  { id: 14, name: "Udayapur", province_id: 1 },

  // Province 2 (Madhesh)
  { id: 15, name: "Bara", province_id: 2 },
  { id: 16, name: "Dhanusha", province_id: 2 },
  { id: 17, name: "Mahottari", province_id: 2 },
  { id: 18, name: "Parsa", province_id: 2 },
  { id: 19, name: "Rautahat", province_id: 2 },
  { id: 20, name: "Saptari", province_id: 2 },
  { id: 21, name: "Sarlahi", province_id: 2 },
  { id: 22, name: "Siraha", province_id: 2 },

  // Province 3 (Bagmati)
  { id: 23, name: "Bhaktapur", province_id: 3 },
  { id: 24, name: "Chitwan", province_id: 3 },
  { id: 25, name: "Dhading", province_id: 3 },
  { id: 26, name: "Dolakha", province_id: 3 },
  { id: 27, name: "Kathmandu", province_id: 3 },
  { id: 28, name: "Kavrepalanchok", province_id: 3 },
  { id: 29, name: "Lalitpur", province_id: 3 },
  { id: 30, name: "Makwanpur", province_id: 3 },
  { id: 31, name: "Nuwakot", province_id: 3 },
  { id: 32, name: "Ramechhap", province_id: 3 },
  { id: 33, name: "Rasuwa", province_id: 3 },
  { id: 34, name: "Sindhuli", province_id: 3 },
  { id: 35, name: "Sindhupalchok", province_id: 3 },

  // Province 4 (Gandaki)
  { id: 36, name: "Baglung", province_id: 4 },
  { id: 37, name: "Gorkha", province_id: 4 },
  { id: 38, name: "Kaski", province_id: 4 },
  { id: 39, name: "Lamjung", province_id: 4 },
  { id: 40, name: "Manang", province_id: 4 },
  { id: 41, name: "Mustang", province_id: 4 },
  { id: 42, name: "Myagdi", province_id: 4 },
  { id: 43, name: "Nawalpur", province_id: 4 },
  { id: 44, name: "Parbat", province_id: 4 },
  { id: 45, name: "Syangja", province_id: 4 },
  { id: 46, name: "Tanahun", province_id: 4 },

  // Province 5 (Lumbini)
  { id: 47, name: "Arghakhanchi", province_id: 5 },
  { id: 48, name: "Banke", province_id: 5 },
  { id: 49, name: "Bardiya", province_id: 5 },
  { id: 50, name: "Dang", province_id: 5 },
  { id: 51, name: "Gulmi", province_id: 5 },
  { id: 52, name: "Kapilvastu", province_id: 5 },
  { id: 53, name: "Palpa", province_id: 5 },
  { id: 54, name: "Parasi", province_id: 5 },
  { id: 55, name: "Pyuthan", province_id: 5 },
  { id: 56, name: "Rolpa", province_id: 5 },
  { id: 57, name: "Rukum East", province_id: 5 },
  { id: 58, name: "Rupandehi", province_id: 5 },

  // Province 6 (Karnali)
  { id: 59, name: "Dailekh", province_id: 6 },
  { id: 60, name: "Dolpa", province_id: 6 },
  { id: 61, name: "Humla", province_id: 6 },
  { id: 62, name: "Jajarkot", province_id: 6 },
  { id: 63, name: "Jumla", province_id: 6 },
  { id: 64, name: "Kalikot", province_id: 6 },
  { id: 65, name: "Mugu", province_id: 6 },
  { id: 66, name: "Rukum West", province_id: 6 },
  { id: 67, name: "Salyan", province_id: 6 },
  { id: 68, name: "Surkhet", province_id: 6 },

  // Province 7 (Sudurpashchim)
  { id: 69, name: "Achham", province_id: 7 },
  { id: 70, name: "Baitadi", province_id: 7 },
  { id: 71, name: "Bajhang", province_id: 7 },
  { id: 72, name: "Bajura", province_id: 7 },
  { id: 73, name: "Dadeldhura", province_id: 7 },
  { id: 74, name: "Darchula", province_id: 7 },
  { id: 75, name: "Doti", province_id: 7 },
  { id: 76, name: "Kailali", province_id: 7 },
  { id: 77, name: "Kanchanpur", province_id: 7 }
];

export const localLevels: LocalLevel[] = [
  // Kathmandu District
  { id: 1, name: "Kathmandu", district_id: 27 },
  { id: 2, name: "Budhanilkantha", district_id: 27 },
  { id: 3, name: "Chandragiri", district_id: 27 },
  { id: 4, name: "Dakshinkali", district_id: 27 },
  { id: 5, name: "Gokarneshwar", district_id: 27 },
  { id: 6, name: "Kageshwari Manohara", district_id: 27 },
  { id: 7, name: "Kirtipur", district_id: 27 },
  { id: 8, name: "Nagarjun", district_id: 27 },
  { id: 9, name: "Shankharapur", district_id: 27 },
  { id: 10, name: "Tarakeshwar", district_id: 27 },
  { id: 11, name: "Tokha", district_id: 27 },

  // Lalitpur District
  { id: 12, name: "Lalitpur", district_id: 29 },
  { id: 13, name: "Godawari", district_id: 29 },
  { id: 14, name: "Mahalaxmi", district_id: 29 },

  // Bhaktapur District
  { id: 15, name: "Bhaktapur", district_id: 23 },
  { id: 16, name: "Changunarayan", district_id: 23 },
  { id: 17, name: "Madhyapur Thimi", district_id: 23 },
  { id: 18, name: "Suryabinayak", district_id: 23 },

  // Kaski District
  { id: 19, name: "Pokhara", district_id: 38 },
  { id: 20, name: "Annapurna", district_id: 38 },
  { id: 21, name: "Machhapuchchhre", district_id: 38 },
  { id: 22, name: "Madi", district_id: 38 },
  { id: 23, name: "Rupa", district_id: 38 },

  // Chitwan District
  { id: 24, name: "Bharatpur", district_id: 24 },
  { id: 25, name: "Kalika", district_id: 24 },
  { id: 26, name: "Khairahani", district_id: 24 },
  { id: 27, name: "Madi", district_id: 24 },
  { id: 28, name: "Ratnanagar", district_id: 24 },
  { id: 29, name: "Rapti", district_id: 24 },
  { id: 30, name: "Ichchhakamana", district_id: 24 },

  // Morang District
  { id: 31, name: "Biratnagar", district_id: 6 },
  { id: 36, name: "Ramdhuni", district_id: 6 },
  { id: 38, name: "Dhanpalthan", district_id: 6 },
  { id: 39, name: "Gramthan", district_id: 6 },
  { id: 40, name: "Jahada", district_id: 6 },
  { id: 41, name: "Katahari", district_id: 6 },
  { id: 42, name: "Kerabari", district_id: 6 },
  { id: 43, name: "Letang", district_id: 6 },
  { id: 44, name: "Miklajung", district_id: 6 },
  { id: 45, name: "Patahri", district_id: 6 },
  { id: 46, name: "Rangeli", district_id: 6 },
  { id: 47, name: "Ratuwamai", district_id: 6 },
  { id: 48, name: "Sundarharaicha", district_id: 6 },
  { id: 49, name: "Uralabari", district_id: 6 },
  { id: 50, name: "Urlabari", district_id: 6 },

  // Sunsari District
  { id: 32, name: "Itahari", district_id: 11 },
  { id: 33, name: "Dharan", district_id: 11 },
  { id: 34, name: "Inaruwa", district_id: 11 },
  { id: 35, name: "Duhabi", district_id: 11 },
  { id: 37, name: "Barahachhetra", district_id: 11 },
  { id: 101, name: "Gadhi", district_id: 11 },
  { id: 102, name: "Barju", district_id: 11 },
  { id: 103, name: "Bhokraha Narsingh", district_id: 11 },
  { id: 104, name: "Harinagara", district_id: 11 },
  { id: 105, name: "Koshi", district_id: 11 },
  { id: 106, name: "Ramdhuni Bhasi", district_id: 11 },
  { id: 107, name: "Dewanganj", district_id: 11 },

  // Jhapa District
  { id: 51, name: "Mechinagar", district_id: 4 },
  { id: 52, name: "Damak", district_id: 4 },
  { id: 53, name: "Kankai", district_id: 4 },
  { id: 54, name: "Shivasatakshi", district_id: 4 },
  { id: 55, name: "Gauradaha", district_id: 4 },
  { id: 56, name: "Birtamod", district_id: 4 },
  { id: 57, name: "Kamal", district_id: 4 },
  { id: 58, name: "Jhapa", district_id: 4 },
  { id: 59, name: "Buddhashanti", district_id: 4 },
  { id: 60, name: "Haldibari", district_id: 4 },
  { id: 61, name: "Kachankawal", district_id: 4 },
  { id: 62, name: "Barhadashi", district_id: 4 },
  { id: 63, name: "Bhadrapur", district_id: 4 },
  { id: 64, name: "Arjundhara", district_id: 4 },
  { id: 65, name: "Pathari Sanischare", district_id: 4 },

  // Dhanusha District
  { id: 66, name: "Janakpur", district_id: 16 },
  { id: 67, name: "Chhireshwarnath", district_id: 16 },
  { id: 68, name: "Ganeshman Charnath", district_id: 16 },
  { id: 69, name: "Dhanushadham", district_id: 16 },
  { id: 70, name: "Nagarain", district_id: 16 },
  { id: 71, name: "Bideha", district_id: 16 },
  { id: 72, name: "Mithila", district_id: 16 },
  { id: 73, name: "Hansapur", district_id: 16 },
  { id: 74, name: "Shahidnagar", district_id: 16 },
  { id: 75, name: "Sabaila", district_id: 16 },
  { id: 76, name: "Janaknandani", district_id: 16 },
  { id: 77, name: "Bateshwar", district_id: 16 },
  { id: 78, name: "Mukhiyapatti Musaharmiya", district_id: 16 },
  { id: 79, name: "Lakshminya", district_id: 16 },
  { id: 80, name: "Aurahi", district_id: 16 },
  { id: 81, name: "Dhanauji", district_id: 16 },
  { id: 82, name: "Kamala", district_id: 16 },
  { id: 83, name: "Mithila Bihari", district_id: 16 },

  // Siraha District
  { id: 84, name: "Lahan", district_id: 22 },
  { id: 85, name: "Dhangadhimai", district_id: 22 },
  { id: 86, name: "Siraha", district_id: 22 },
  { id: 87, name: "Golbazar", district_id: 22 },
  { id: 88, name: "Mirchaiya", district_id: 22 },
  { id: 89, name: "Kalyanpur", district_id: 22 },
  { id: 90, name: "Karjanha", district_id: 22 },
  { id: 91, name: "Sukhipur", district_id: 22 },
  { id: 92, name: "Bhagwanpur", district_id: 22 },
  { id: 93, name: "Aurahi", district_id: 22 },
  { id: 94, name: "Bishnupur", district_id: 22 },
  { id: 95, name: "Bariyarpatti", district_id: 22 },
  { id: 96, name: "Lakshmipur Patari", district_id: 22 },
  { id: 97, name: "Naraha", district_id: 22 },
  { id: 98, name: "Sakhuwanankarkatti", district_id: 22 },
  { id: 99, name: "Arnama", district_id: 22 },
  { id: 100, name: "Navarajpur", district_id: 22 }
];

// Search function for locations
export const searchLocations = (query: string) => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase();
  const results: Array<{type: 'province' | 'district' | 'city', name: string, id: number, parent?: string}> = [];
  
  // Search provinces
  provinces.forEach(p => {
    if (p.name.toLowerCase().includes(searchTerm)) {
      results.push({type: 'province', name: p.name, id: p.id});
    }
  });
  
  // Search districts
  districts.forEach(d => {
    if (d.name.toLowerCase().includes(searchTerm)) {
      const province = provinces.find(p => p.id === d.province_id);
      results.push({type: 'district', name: d.name, id: d.id, parent: province?.name});
    }
  });
  
  // Search cities
  localLevels.forEach(l => {
    if (l.name.toLowerCase().includes(searchTerm)) {
      const district = districts.find(d => d.id === l.district_id);
      results.push({type: 'city', name: l.name, id: l.id, parent: district?.name});
    }
  });
  
  return results.slice(0, 20); // Limit results
};

// Advanced search with filters
export const searchLocationsByType = (query: string, type: 'province' | 'district' | 'city') => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase();
  
  switch (type) {
    case 'province':
      return provinces.filter(p => p.name.toLowerCase().includes(searchTerm));
    case 'district':
      return districts.filter(d => d.name.toLowerCase().includes(searchTerm));
    case 'city':
      return localLevels.filter(l => l.name.toLowerCase().includes(searchTerm));
    default:
      return [];
  }
};

// Get location hierarchy
export const getLocationHierarchy = (cityId: number) => {
  const city = localLevels.find(l => l.id === cityId);
  if (!city) return null;
  
  const district = districts.find(d => d.id === city.district_id);
  if (!district) return null;
  
  const province = provinces.find(p => p.id === district.province_id);
  if (!province) return null;
  
  return {
    city: city.name,
    district: district.name,
    province: province.name
  };
};

// Get all cities in a district
export const getCitiesByDistrict = (districtId: number) => {
  return localLevels.filter(l => l.district_id === districtId);
};

// Get all districts in a province
export const getDistrictsByProvince = (provinceId: number) => {
  return districts.filter(d => d.province_id === provinceId);
};