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
          className="hover:scale-110 transform transition duration-200 dark:invert"
        >
          <Image src="/images/x-logo.svg" alt="X Logo" width={32} height={32} />
        </a>
      </div>

      <div className="text-right">
        <a
          href="mailto:hello@sohambasu.com"
          className="font-tiempos text-lg md:text-2xl text-black dark:text-cream hover:underline"
        >
          hello@sohambasu.com
        </a>
      </div>
    </div>
  );
}
