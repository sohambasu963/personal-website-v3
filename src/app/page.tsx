import Image from "next/image";
import Topbar from "./components/topbar";
import ThreeDShapes from "./components/3d-shapes";

export default function Home() {
  return (
    <div>
      <ThreeDShapes />
      <Topbar />
    </div>
  );
}
