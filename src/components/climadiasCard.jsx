import React from "react";
import { useUnidad } from "../context/UnidadContext";

export default function ForecastCard({ i, icon, max, min, day }) {
  const {unidad} = useUnidad()
  const dayLabel = i === 0 ? "Tomorrow" : day;
  return (
    <li className="w-[7.5rem] h-40 bg-[#1E213A] flex flex-col items-center justify-center text-[#E7E7EB] text-base font-medium">
      <h3 className="mb-2 capitalize">{dayLabel}</h3>
      <span className="flex items-center justify-center w-14 h-16">
        <img src={`/weather/${icon}.png`} alt="weather icon" />
      </span>
      <div className=" flex gap-2 mt-2">
          <p>
            {max}{unidad === "metric" ? "°C" : "°F"}
          </p>
          <p className="text-[#A09FB1]">{min}{unidad === "metric" ? "°C" : "°F"}</p>
        
      </div>
    </li>
  );
}
