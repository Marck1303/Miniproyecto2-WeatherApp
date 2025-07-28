import React from "react";
import WeatherCard from "./ClimaCard";
import useData from "../hooks/useData";
import { useUnidad } from "../context/UnidadContext";

export default function DatosClima({ciudad}) {
    const { unidad } = useUnidad();
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ciudad.lat}&lon=${ciudad.lon}&units=${unidad}&appid=${API_KEY}&lang=es`;
  const { data, loading } = useData(url);



  return (
    <div className="flex flex-col items-center w-full h-[90vh] ">
      <WeatherCard 
      weather={data} 
      loading={loading}/>
    </div>
  );
}
