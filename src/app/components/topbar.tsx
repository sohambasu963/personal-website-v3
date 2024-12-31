import Link from "next/link";
import Image from "next/image";

export default function Topbar() {
  return (
    <div className="z-50 flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-2">
        <span className="text-xl">👋</span>
        <span className="text-lg">Hello</span>
      </div>

      {/* <div className="space-x-8">
        <Link
          href="#about"
          className="text-gray-700 hover:text-blue-500 font-medium"
        >
          About
        </Link>
        <Link
          href="#projects"
          className="text-gray-700 hover:text-blue-500 font-medium"
        >
          Projects
        </Link>
        <Link
          href="#contact"
          className="text-gray-700 hover:text-blue-500 font-medium"
        >
          Contact
        </Link>
      </div> */}
      <p>WATERLOO 09:41 2°C</p>

      <p>Dark Mode</p>
    </div>
  );
}
