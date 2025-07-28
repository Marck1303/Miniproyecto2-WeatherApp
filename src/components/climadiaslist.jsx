import React from "react";
import ForecastCard from "./climadiasCard";
import useForecast from "../hooks/useForeCast";

export default function ForecastList({ ciudad }) {
  const { forecastData, loading } = useForecast(ciudad.name);

  if (loading) {
    return (
      <p className="text-center text-white mt-4">Cargando pronóstico...</p>
    );
  }

  return (
    <section className="w-full md:px-5">
      <ul className="grid grid-cols-2 w-fit mx-auto gap-5 mt-5 md:max-w-2xl md:flex md:flex-row md:flex-wrap md:gap-4 md:w-fit">
        {forecastData.map((day, i) => (
          <ForecastCard
            key={i}
            i={i}
            day={day.day}
            icon={day.icon}
            max={day.temp_max}
            min={day.temp_min}
          />
        ))}
      </ul>
    </section>
  );
}
