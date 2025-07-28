import React from "react";
import { useUnidad } from "../context/UnidadContext";

export default function WeatherCard({ weather, loading }) {
  const { unidad } = useUnidad();

  if (!weather) return <p className="text-red-500">No hay datos</p>;

  const {
    main: { temp },
    name,
    weather: w,
    sys: { country },
  } = weather;

  const { description, icon } = w[0];

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-[45%] relative overflow-hidden after:bg-clouds-bg after:absolute after:w-full after:h-full after:bg-[length:150%_110%] after:bg-no-repeat after:opacity-5 after:bg-[bottom_center]">
        <img
          src="others/Cloud-background.png"
          className="absolute inset-0 w-full h-full object-cover filter grayscale opacity-10 z-0"
          alt=""
        />
        <div className="flex items-center justify-center w-2/5 absolute z-10 ">
          <img
            src={`/weather/${icon}.png`}
            alt={description}
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <h2 className="font-medium text-9xl text-[#E7E7EB] my-8">
          {Math.round(temp)}
        </h2>
        <h2 className="font-medium text-6xl text-[#acacb5] my-8"> {unidad === "metric" ? "°C" : "°F"}</h2>
      </div>

      <h2 className="capitalize pt-6 pb-12 text-3xl text-[#A09FB1] font-semibold">
        {description}
      </h2>

      <p className="text-sm text-[#88869D] font-medium mb-6">
        Today .{" "}
        {new Date().toLocaleDateString("en", {
          weekday: "short",
          day: "numeric",
          month: "short",
        })}
      </p>

      <div className="flex items-center gap-2 text-sm text-[#88869D] h-10 bottom-0 font-semibold mb-2">
        <img src="location_on.svg" alt="icono" />
        {name}, {country}
      </div>
    </>
  );
}
