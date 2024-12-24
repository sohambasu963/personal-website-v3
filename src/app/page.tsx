import Image from "next/image";
import Topbar from "./components/topbar";
import ThreeDShapes from "./components/3d-shapes";

export default function Home() {
  return (
    <div className="min-h-screen">
      <ThreeDShapes />
      <Topbar />
      <div className="flex justify-center">
        <h1 className="mt-[20%]">Hello</h1>
      </div>
    </div>
  );
}
