import { createContext, useContext, useState } from "react";

const UnidadContext = createContext();

export function UnidadProvider({ children }) {
  const [unidad, setUnidad] = useState("metric"); // °C por defecto

  const toggleUnidad = () => {
    setUnidad((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  return (
    <UnidadContext.Provider value={{ unidad,setUnidad, toggleUnidad }}>
      {children}
    </UnidadContext.Provider>
  );
}

export function useUnidad() {
  return useContext(UnidadContext);
}
