import React from "react";
import { useControls, folder, monitor } from "leva";
import { DEPARTAMENTOS } from "../utils/Departamentos";

// Este componente ahora maneja toda la lógica de la interfaz de Leva.
export default function WeatherUI({ selectedDept, onDeptChange, weatherData }) {
  useControls(
    () => ({
      "Datos del Clima": folder(
        {
          departamento: {
            value: selectedDept.nombre,
            options: DEPARTAMENTOS.map((d) => d.nombre),
            label: "Departamento",
            // Cuando el valor cambia, llamamos a la función que nos pasaron por props.
            onChange: (nombre) => {
              onDeptChange(DEPARTAMENTOS.find((d) => d.nombre === nombre));
            },
          },
          temperatura: monitor(
            () =>
              weatherData ? `${weatherData.temperature_2m}°C` : "Cargando...",
            { label: "Temperatura" }
          ),
          humedad: monitor(
            () =>
              weatherData
                ? `${weatherData.relative_humidity_2m}%`
                : "Cargando...",
            { label: "Humedad" }
          ),
          precipitacion: monitor(
            () =>
              weatherData ? `${weatherData.precipitation}mm` : "Cargando...",
            { label: "Precipitación" }
          ),
          viento: monitor(
            () =>
              weatherData
                ? `${weatherData.wind_speed_10m} km/h`
                : "Cargando...",
            { label: "Viento" }
          ),
        },
        { collapsed: false }
      ),
    }),
    [selectedDept, onDeptChange, weatherData]
  );

  // El componente no renderiza nada directamente, Leva se encarga de eso.
  return null;
}
