import React, { useEffect, useState } from "react";
import useData from "../hooks/useData";

export default function ModalSearcha({ open, onClose, onSearch }) {
  const [ciudadInput, setCiudadInput] = useState("");
  const [resultados, setResultados] = useState([]);

  const { data: ciudades, loading, error } = useData("/cities.json");

  useEffect(() => {
    if (!ciudadInput || !ciudades) {
      setResultados([]);
      return;
    }

    const texto = ciudadInput.toLowerCase();
    const filtrados = ciudades.filter(
      (city) =>
        city.name.toLowerCase()=== texto ||
        city.country.toLowerCase().includes(texto) ||
        city.country_code.toLowerCase().includes(texto)
    );

    setResultados(filtrados);
  }, [ciudadInput, ciudades]);

  if (!open) return null;

  if (loading)
    return <div className="text-white p-4">Cargando ciudades...</div>;
  if (error)
    return <div className="text-red-500 p-4">Error al cargar datos</div>;
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && ciudadInput.trim() !== "") {
      onSearch(ciudadInput.trim());
      setCiudadInput("");
      onClose();
    }
  };
  return (
    <>
      <section className="w-screen h-screen max-h-screen bg-[#1E213A] absolute top-0 left-0 md:w-[30vw] md:min-w-[380px] z-100">
        <nav
          className="w-full h-24 flex items-end justify-around"
          onClick={handleModalClick}
        >
          <span
            className="absolute right-10 top-6 cursor-pointer"
            onClick={onClose}
          >
            <img
              src="/close.svg"
              alt=""
              className="w-[25px] h-[25]  hover:w-7 hover:h-7"
            />
          </span>
          <div className="flex items-center w-[55%] max-w-[270px] h-9 bg-transparent border border-[#E7E7EB]  font-medium text-base text-[#616475]">
            <img src="/search.svg" alt="" className="mx-2 w-[24px] h-[24px]" />
            <input
              type="text"
              className="bg-transparent outline-none w-[233px] h-8 pr-1 "
              placeholder="Search Location"
              value={ciudadInput}
              onChange={(e) => setCiudadInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
          <button
            className=" w-20 h-9 bg-[#3C47E9] px-1 font-semibold text-base text-[#E7E7EB] hover:text-[#def341]"
            onClick={() => {
              if (ciudadInput.trim() !== "") {
                onSearch(ciudadInput.trim());
                setCiudadInput("");
                onClose();
              }
            }}
          >
            Buscar
          </button>
        </nav>
      
      <ul className="bg-[#1E213A] w-[55%] max-w-[268px] flex flex-col gap-6 mx-auto mt-3 rounded text-[#E7E7EB] max-h-60 overflow-auto z-100">
        {resultados.slice(0,10).map((ciudad) => (
          <li
            key={ciudad.id}
            className="cursor-pointer p-2 hover:bg-[#3C47E9] text-xl"
            onClick={() => {
             onSearch(ciudad);
              setCiudadInput("");
              onClose();
            }}
          >
            {ciudad.name},&nbsp;&nbsp;&nbsp;&nbsp;{ciudad.country_code}
          </li>
        ))}
        {resultados.length === 0 && ciudadInput !== "" && (
          <li className="p-2 text-sm italic text-gray-400">
            No se encontraron coincidencias
          </li>
        )}
      </ul>
      </section>
    </>
  );
}
