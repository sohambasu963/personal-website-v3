import Link from "next/link";
import Image from "next/image";

export default function Topbar() {
  return (
    <div className="z-50 flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-2">
        <span className="text-xl">👋</span>
        <span className="text-lg">Hello</span>
      </div>

      <div className="space-x-8">
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
      </div>

      <div className="flex space-x-4">
        <a
          href="https://github.com/sohambasu963"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transform transition duration-200"
        >
          <Image
            src="/images/github-logo.svg"
            alt="GitHub Logo"
            width={32}
            height={32}
          />
        </a>
        <a
          href="https://github.com/sohambasu963"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transform transition duration-200"
        >
          <Image
            src="/images/linkedin-logo.svg"
            alt="LinkedIn Logo"
            width={32}
            height={32}
          />
        </a>
        <a
          href="https://x.com/sohambasu963"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transform transition duration-200"
        >
          <Image src="/images/x-logo.svg" alt="X Logo" width={32} height={32} />
        </a>
      </div>
    </div>
  );
}
