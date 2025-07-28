import React from "react";
import useData from "../hooks/useData";
import { useUnidad } from "../context/UnidadContext";

export default function Highlights({ ciudad }) {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const { unidad } = useUnidad();
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ciudad.lat}&lon=${ciudad.lon}&units=${unidad}&appid=${API_KEY}&lang=es`;
  const { data } = useData(url);

  const visibilityKm = unidad === "metric"
  ? (data?.visibility / 1000).toFixed(2)
  : (data?.visibility / 1609.344).toFixed(2); // metros a millas

  function getWindDirection(deg) {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  }

  return (
    <div className="w-full flex flex-col items-center md:grid md:grid-cols-2  gap-5 md:gap-6 md:max-w-2xl">
      <div className="w-full max-w-[328px] h-48 bg-[#1E213A] flex flex-col items-center justify-center">
        <h2 className="text-medium text-base text-center text-[#E7E7EB]">
          Wind status
        </h2>
        <div className="flex items-end h-20 mb-4">
          <h3 className="text-[#E7E7EB] text-6xl font-bold">
            {data?.wind?.speed?.toFixed(1)}
          </h3>
          <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1">{unidad === "metric" ? "ms" : "mph"}</h4>
        </div>
        <div className="flex items-center text-[#E7E7EB] text-sm">
          <span className="flex justify-center items-center w-8 h-8 m-3 rounded-full bg-[#ffffff4d]">
            <img alt="Navigation Icon" src="/navigation.svg" width="18" height="18" className="bg-transparent"
                style={{
                  transform: `rotate(${data?.wind?.deg}deg)`,
                  transition: "transform 0.3s ease-in-out",
                }}
            />
          </span>
          {getWindDirection(data?.wind?.deg)}
        </div>
      </div>
      <div className="w-full  max-w-[328px] h-48 bg-[#1E213A] flex flex-col items-center justify-center">
        <h2 className="text-medium text-base text-center text-[#E7E7EB]">
          Humidity
        </h2>
        <div className="flex items-end h-20 mb-4">
          <h3 className=" text-[#E7E7EB] text-6xl font-bold">
            {data?.main?.humidity}
          </h3>
          <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1 text-right">%</h4>
        </div>
        <div className=" w-[70%] font-bold text-xs flex justify-between text-[#A09FB1]">
          <p>0</p>
          <p>50</p>
          <p>100</p>
        </div>
        <div className="flex items-center w-[70%] h-2 bg-[#E7E7EB] rounded-3xl">
          <div
            className="h-2 bg-[#FFEC65] rounded-3xl m-0 p-0"
            style={{ width: `${data?.main?.humidity}%` }}
          ></div>
        </div>
        <div className="w-[70%] text-right font-bold text-[#A09FB1]">%</div>
      </div>
      <div className=" w-full max-w-[328px] flex flex-col items-center justify-center bg-[#1E213A] py-4">
        <h2 className="text-medium text-base text-center text-[#E7E7EB]">
          Visibility
        </h2>
        <div className="flex items-end h-20 mb-4">
          <h3 className="text-[#E7E7EB] text-6xl font-bold">
            {visibilityKm}
          </h3>
          <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1">{unidad === "metric" ? "Km" : "miles"}</h4>
        </div>
      </div>
      <div className="w-full max-w-[328px] flex flex-col items-center justify-center bg-[#1E213A] p-4">
        <h2 className="text-medium text-base text-center text-[#E7E7EB]">
          Air Pressure
        </h2>
        <div className="flex items-end h-20 mb-4">
          <h3 className="text-[#E7E7EB] text-6xl font-bold">
            {data?.main?.pressure}
          </h3>
          <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1">mb</h4>
        </div>
      </div>
    </div>
  );
}
