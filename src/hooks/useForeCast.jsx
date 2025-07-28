import { useEffect, useState } from "react";
import axios from "axios";
import { useUnidad } from "../context/UnidadContext";

export default function useForecast(ciudad) {
  const [forecastData, setForecastData] = useState([]);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [errorForecast, setErrorForecast] = useState(null);
  const { unidad } = useUnidad();

  useEffect(() => {
    if (!ciudad) return;

    const fetchForecast = async () => {
      setLoadingForecast(true);
      setErrorForecast(null);

      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&units=${unidad}&lang=es&appid=${apiKey}`;
        const { data } = await axios.get(url);

        if (!data || !data.list) throw new Error("Datos del pronóstico no válidos");

        const groupedByDate = {};

        // Agrupar por fecha y calcular min/max
        data.list.forEach((item) => {
          const [date] = item.dt_txt.split(" ");
          if (!groupedByDate[date]) {
            groupedByDate[date] = [];
          }
          groupedByDate[date].push(item);
        });

        const forecastList = Object.entries(groupedByDate).slice(0, 5).map(([date, items], index) => {
  const noonItem = items.find((i) => i.dt_txt.includes("12:00:00")) || items[0];

  const temps = items.map(i => i.main.temp);
  const min = Math.min(...temps);
  const max = Math.max(...temps);

  const currentDate = new Date(`${date}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  let label;
 if (currentDate.toDateString() === tomorrow.toDateString() && index === 0) {
  label = "Tomorrow";
} else {
  label = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

  return {
    day: label,
    icon: noonItem.weather[0].icon,
    temp_min: Math.round(min),
    temp_max: Math.round(max),
    isDay: noonItem.weather[0].icon.includes("d"),
  };
});

        setForecastData(forecastList);
      } catch (error) {
        console.error("Error obteniendo pronóstico:", error);
        setErrorForecast(error.message || "Error desconocido");
      } finally {
        setLoadingForecast(false);
      }
    };

    fetchForecast();
 }, [ciudad, unidad]);


  return {
    forecastData,
    loadingForecast,
    errorForecast,
  };
}
