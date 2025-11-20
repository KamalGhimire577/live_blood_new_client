"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/lib/store/hooks";

const getMenuItems = (role: string) => {
  const baseItems = [
    {
      title: "Your Requests",
      icon: "M9 12h6m2 8H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z",
      href: "/requests"
    },
    {
      title: "Logout",
      icon: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
      href: "/logout"
    }
  ];

  if (role === "donor") {
    return [
      {
        title: "Donor Dashboard",
        icon: "M3 3h7v7H3V3zm11 0h7v7h-7V3zm-11 11h7v7H3v-7zm11 0h7v7h-7v-7z",
        href: "/donor/dashboard"
      },
      ...baseItems
    ];
  }

  if (role === "admin") {
    return [
      {
        title: "Admin Dashboard",
        icon: "M3 3h7v7H3V3zm11 0h7v7h-7V3zm-11 11h7v7H3v-7zm11 0h7v7h-7v-7z",
        href: "/admin/dashboard"
      },
      ...baseItems
    ];
  }

  return baseItems;
};

export default function Navbar() {
  const { user, token } = useAppSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const menuItems = getMenuItems(user.role || "user");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle outside click to close sidebar and profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const menuButton = document.getElementById('menu-button');
      const profileDropdown = document.getElementById('profile-dropdown');
      const profileButton = document.getElementById('profile-button');
      
      if (menuOpen && sidebar && !sidebar.contains(event.target as Node) && !menuButton?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      
      if (profileOpen && profileDropdown && !profileDropdown.contains(event.target as Node) && !profileButton?.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    if (menuOpen || profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen, profileOpen]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (!search.trim()) return;
    alert(`Searching for "${search}"...`);
    setSearch("");
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md transition-all duration-300 ease-in-out ${
        scrolled ? "py-3" : "py-2"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-10 gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={60}
              height={45}
              className="object-contain bg-transparent"
            />
          </Link>
        </div>
        
        {/* Center Search Bar - Desktop and Mobile */}
        <form
          onSubmit={handleSearch}
          className="flex flex-1 justify-center max-w-xs mx-4"
        >
          <div className="relative w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search donors..."
              className="w-full rounded-full border border-slate-300 py-1 pl-4 pr-9 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-4">
          {["Home", "Live Donors", "About Us", "Contact Us"].map((item, i) => (
            <li key={i}>
              <Link
                href={
                  item === "Home"
                    ? "/"
                    : item === "Live Donors"
                    ? "/livedonor"
                    : item === "About Us"
                    ? "/about"
                    : "/contact"
                }
                className="text-sm font-medium text-slate-700 hover:text-red-500"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {!token && (
            <>
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-slate-700 hover:text-red-500"
              >
                Sign In
              </Link>
              <Link
                href="/auth/donorsignup"
                className="rounded-md bg-linear-to-br from-red-400 to-red-500 px-3 py-1 text-sm font-medium text-white shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.03]"
              >
                Become a Donor
              </Link>
            </>
          )}

          {token && (
            <div className="relative">
              <div
                id="profile-button"
                className="w-10 h-10 rounded-full border-2 border-blue-500 bg-red-400 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              
              {profileOpen && (
                <div 
                  id="profile-dropdown"
                  className="fixed top-16 right-4 w-64 bg-linear-to-b from-red-900 to-blue-500 text-white rounded-lg shadow-xl p-5 z-50"
                >
                  {/* Close Button */}
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={() => setProfileOpen(false)}
                      className="p-1 rounded-full hover:bg-red-800 transition-colors"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full border-2 border-red-700 bg-red-700 flex items-center justify-center mb-3">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <h2 className="text-lg font-bold text-red-100">{user.userName || 'User'}</h2>
                    <p className="text-red-200 text-sm">{user.phoneNumber}</p>
                    <p className="text-red-300 font-semibold text-sm">Role: {user.role || 'user'}</p>
                  </div>
                  
                  <nav className="flex flex-col gap-2">
                    {menuItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg border border-red-700 text-red-300 hover:bg-red-800 hover:text-white transition-all text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          id="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          className="md:hidden flex items-center justify-center p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-6 w-6 text-slate-900"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Popup Menu */}
      {menuOpen && (
        <div 
          id="mobile-sidebar"
          className="fixed top-0 right-0 h-full w-1/3 min-w-[280px] bg-white z-10000 md:hidden border-l-4 border-red-500 shadow-2xl"
        >
            {/* Header with Close Button */}
            <div className="flex justify-between items-center p-4 border-b bg-red-50">
              <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1 rounded-full hover:bg-red-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col h-full bg-white">
              {token && (
                /* User Info */
                <div className="p-4 bg-linear-to-r from-red-400 to-red-500 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">{user.userName || 'User'}</p>
                      <p className="text-sm opacity-90">{user.role || 'user'}</p>
                    </div>
                  </div>
                  
                  {/* Role-based Menu Items */}
                  <div className="space-y-2">
                    {menuItems.filter(item => item.title !== 'Logout').map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="flex-1 p-4 bg-white">
                <nav className="space-y-3">
                  {["Home", "Live Donors", "About Us", "Contact Us"].map((item, i) => (
                    <Link
                      key={i}
                      href={
                        item === "Home"
                          ? "/"
                          : item === "Live Donors"
                          ? "/livedonor"
                          : item === "About Us"
                          ? "/about"
                          : "/contact"
                      }
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 px-4 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium"
                    >
                      {item}
                    </Link>
                  ))}
                  
                  {/* Auth Links in Navigation */}
                  {!token && (
                    <>
                      <Link
                        href="/auth/signin"
                        onClick={() => setMenuOpen(false)}
                        className="block py-3 px-4 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/auth/donorsignup"
                        onClick={() => setMenuOpen(false)}
                        className="block py-3 px-4 text-white bg-linear-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 rounded-lg transition-colors font-medium"
                      >
                        Become a Donor
                      </Link>
                    </>
                  )}
                </nav>
              </div>

              {/* Logout Button */}
              {token && (
                <div className="p-4 border-t bg-white">
                  <Link
                    href="/logout"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full text-center py-3 px-4 text-white bg-linear-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 rounded-lg transition-colors font-medium"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
        </div>
      )}
    </header>
  );
}
