import React from "react";
import Topbar from "../components/topbar";
import Contact from "../components/contact";

export default function Investing() {
    return (
        <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden">
            <div className="flex-grow">
                <Topbar />
                <div className="mt-[70%] md:mt-[18%] flex flex-col justify-center text-center">
                <h1 className="font-tiempos text-4xl md:text-6xl drop-shadow-lg">
                    Investing
                </h1>
                <h2 className="mt-8 font-tiempos text-2xl md:text-3xl">
                    Coming Soon...
                </h2>
                {/* <h2 className="mt-8 font-tiempos text-2xl">Engineering software at startups (prev. at Amazon)</h2>
                <h3 className="mt-2 font-tiempos text-2xl">CS + Finance @ UWaterloo</h3> */}
                </div>
            </div>

            <div className="absolute bottom-2 w-full">
                <Contact />
            </div>
        </div>
    );
}