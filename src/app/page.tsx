import Image from "next/image";
import Topbar from "./components/topbar";
import ThreeDShapes from "./components/3d-shapes";
import Contact from "./components/contact";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between">

      <div className="flex-grow">
        <ThreeDShapes />
        <Topbar />
        <div className="flex justify-center">
          <h1 className="mt-[20%]">Hello</h1>
        </div>
      </div>

      <div className="absolute bottom-2 w-full">
        <Contact />
      </div>
    </div>
  );
}

