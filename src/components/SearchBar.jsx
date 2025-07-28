// SearchBar.jsx
import React, { useState } from "react";
import ModalSearcha from "./ModalSearcha";
import { useUnidad } from "../context/UnidadContext";

export default function SearchBar({ onBuscar }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const { unidad } = useUnidad();

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  const manejarBusqueda = (ciudad) => {
    onBuscar(ciudad); // pasa la ciudad al componente padre si es necesario
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("La geolocalización no está soportada por tu navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          
          const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unidad}&appid=${API_KEY}&lang=es`
          );
          const data = await response.json();

          const ciudadDetectada = {
            name: data.name,
            country: data.sys.country,
            lat: latitude,
            lon: longitude,
          };

          onBuscar(ciudadDetectada);
        } catch (error) {
          console.error("Error al obtener el clima:", error);
        }
      },
      (error) => {
        alert("No se pudo obtener tu ubicación.");
        console.error(error);
      }
    );
  };

  return (
    <>
      <header className="flex justify-around items-end h-16">
        <input
          className="w-44 h-9 bg-[#6E707A] text-[#E7E7EB] text-center"
          placeholder="Search for Places"
          readOnly
          onClick={abrirModal}
        />
        <div className="flex items-center justify-center w-10 h-10 bg-[#ffffff33] rounded-full cursor-pointer"
        onClick={handleGetLocation}
        >
          <img src="location.svg" alt="location icon" className="w-7 h-10" />
        </div>
      </header>
      <ModalSearcha
        open={modalAbierto}
        onClose={cerrarModal}
        onSearch={manejarBusqueda}
      />
    </>
  );
}
