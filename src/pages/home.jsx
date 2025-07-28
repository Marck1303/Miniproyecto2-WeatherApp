import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ForecastList from "../components/climadiaslist";
import Highlights from "../components/Highlights";
import DatosClima from "../components/DatosClima";
import { useUnidad } from "../context/UnidadContext";

export default function Home() {
  const [ciudad, setCiudad] = useState({
    name: "Lima",
    country: "PE",
    lat: -12.0432,
    lon: -77.0282,
  });
  const { unidad, setUnidad } = useUnidad();

  

  return (
    <div className="bg-[#1E213A] w-screen  min-h-screen flex flex-col items-center md:flex-row">
      <section className="bg-[#1E213A] flex flex-col w-screen h-screen overflow-hidden md:w-[30%] md:min-w-[380px] md:m-auto">
        <SearchBar onBuscar={setCiudad} />
        <DatosClima ciudad={ciudad} unidad={unidad} />
      </section>
      <div className="w-full h-fit min-h-screen flex flex-col items-center bg-[#100E1D] md:w-[70%] md:min-w-[580px] md:max-h-screen">
        <div className="flex justify-end items-end h-20 w-64 gap-5 md:max-w-2xl md:w-full">
          <button
            onClick={() => setUnidad("metric")}
            className={`w-10 h-10 pr-1 pt-1 text-center text-xl font-bold rounded-full ${
              unidad === "metric"
                ? "bg-[#E7E7EB] text-[#110E3C]"
                : "bg-[#585676] text-[#E7E7EB]"
            }`}
          >
            °C
          </button>
          <button
            onClick={() => setUnidad("imperial")}
            className={`w-10 h-10 pr-1 pt-1 text-center text-xl font-bold rounded-full ${
              unidad === "imperial"
                ? "bg-[#E7E7EB] text-[#110E3C]"
                : "bg-[#585676] text-[#E7E7EB]"
            }`}
          >
            °F
          </button>
        </div>
        <ForecastList ciudad={ciudad} unidad={unidad}   />
        <div className=" w-full max-w-sm px-5 mt-12 md:w-full md:max-w-none md:m-auto md:flex md:flex-col md:items-center md:justify-center ">
          <h2 className=" h-7 text-[#E7E7EB] text-2xl font-bold my-5 md:w-full md:max-w-2xl md:text-left">
            Today`s Hightlights
          </h2>
          <Highlights ciudad={ciudad} unidad={unidad} />
          <footer className="  py-5 w-full flex flex-row justify-center items-center text-[#A09FB1] ">
            <h4 className=" text-sm font-medium text-center">Created by</h4>
            <h2 className=" font-bold text-sm text-center mx-1">
              Marco Abraham -
            </h2>
            <h3 className=" font-semibold text-sm text-center">
              Funval Proyectos
            </h3>
          </footer>
        </div>
      </div>
    </div>
  );
}
