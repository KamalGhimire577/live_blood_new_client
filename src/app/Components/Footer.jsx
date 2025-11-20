import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="pt-12 pb-6 text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/footer.png')",
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-6 bg-black/50 rounded-xl p-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Logo & About */}
          <div className="md:w-1/3">
            <div className="flex items-center gap-2 mb-3">
              <Image
                src="/logo.png"
                alt="Live Blood Bank Logo"
                width={80}
                height={80}
                className="object-contain"
              />
              <h1 className="text-3xl font-extrabold">
                <span className="text-white">Live</span>
                <span className="text-red-400">Blood</span>
                <span className="text-white">Bank</span>
              </h1>
            </div>
            <p className="text-red-300 text-sm leading-relaxed">
              A platform connecting <strong>live blood donors</strong> and{" "}
              <strong>requesters</strong> in real-time. Save lives by donating
              or requesting blood instantly with verified donors.
            </p>

            <div className="mt-5 flex gap-4">
              <a
                href="#"
                target="_blank"
                className="hover:scale-110 transition-transform"
              >
                <FaFacebook size={28} />
              </a>
              <a
                href="#"
                target="_blank"
                className="hover:scale-110 transition-transform"
              >
                <FaLinkedin size={28} />
              </a>
              <a
                href="#"
                target="_blank"
                className="hover:scale-110 transition-transform"
              >
                <FaInstagram size={28} />
              </a>
              <a
                href="#"
                target="_blank"
                className="hover:scale-110 transition-transform"
              >
                <FaTwitter size={28} />
              </a>
              <a
                href="#"
                target="_blank"
                className="hover:scale-110 transition-transform"
              >
                <FaYoutube size={28} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:w-1/3">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4 text-red-300">
              <div>
                <p className="font-medium">📞 +977 9800000000</p>
                <p className="text-sm">Support Number</p>
              </div>
              <div>
                <p className="font-medium">📧 help@livebloodbank.com</p>
                <p className="text-sm">Support Email</p>
              </div>
              <div>
                <p className="font-medium">📍 Kathmandu, Nepal – 44600</p>
                <p className="text-sm">Main Office</p>
              </div>
            </div>
          </div>

          {/* Quick Links & Download */}
          <div className="md:w-1/3">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-3 text-red-300">
              <li>
                <Link href="/" className="hover:text-yellow-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/donors" className="hover:text-yellow-200">
                  Live Donors
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-yellow-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-yellow-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-yellow-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <div className="mt-6">
              <p className="font-semibold mb-3">Download Our App</p>
              <div className="flex gap-3 flex-wrap">
                <Image
                  src="https://www.englishyaari.com/img/google-store.svg"
                  alt="Google Play"
                  width={150}
                  height={50}
                />
                <Image
                  src="https://www.englishyaari.com/img/apple-store.svg"
                  alt="App Store"
                  width={150}
                  height={50}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <hr className="mt-10 border-white/30" />
        <div className="text-center text-sm text-white/80 mt-4">
          © {new Date().getFullYear()} Live Blood Bank. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
