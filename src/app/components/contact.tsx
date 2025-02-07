import Image from "next/image";

export default function Contact() {
  return (
    <div className="flex justify-between items-center w-full px-4">
      <div className="flex items-center space-x-2 md:space-x-6">
        <a
          href="https://github.com/sohambasu963"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transform transition duration-200 dark:invert"
        >
          <Image
            src="/images/github-logo.svg"
            alt="GitHub Logo"
            width={32}
            height={32}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/sohambasu963"
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
          className="hover:scale-110 transform transition duration-200 dark:invert mt-[2px]"
        >
          <Image src="/images/x-logo.svg" alt="X Logo" width={20} height={20} />
        </a>
      </div>

      <div className="text-right">
        <a
          href="mailto:hello@sohambasu.com"
          className="font-mono text-md md:text-lg text-black dark:text-cream hover:underline"
        >
          <span className="text-lg font-mono">hello@sohambas
            <span className="tracking-[-0.2em]">u.</span>
            com
          </span>
        </a>
      </div>
    </div>
  );
}
