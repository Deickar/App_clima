import React, { useState, useEffect } from "react";
import Map, { Source, Layer } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import Maplibre from "maplibre-gl";
import { Canvas as ThreeMapCanvas } from "react-three-map/maplibre";
import WeatherUI from "./WeatherUI";
import MapMarker from "./MapMarker"; // Importamos el marcador de cono
import { DEPARTAMENTOS } from "../utils/Departamentos"; // Importamos los datos

const INITIAL_VIEW_STATE = {
  latitude: 15.5, // Centrado en Guatemala
  longitude: -90.2,
  zoom: 6.5,
  pitch: 30,
  bearing: 0,
};

// Definimos los límites geográficos de Guatemala para restringir el mapa.
const GUATEMALA_LIMITES = [
  [-92.5, 13.5], // Esquina Suroeste (longitud, latitud)
  [-88.0, 18.0], // Esquina Noreste (longitud, latitud)
];

export default function Home() {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [selectedDept, setSelectedDept] = useState(DEPARTAMENTOS[0]);
  const [weatherData, setWeatherData] = useState(null); // Estado para los datos del clima

  // Se ejecuta cada vez que el departamento seleccionado cambia
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedDept) return;

      // Actualizamos el estado de la vista para que el mapa se mueva.
      setViewState((vs) => ({
        ...vs,
        longitude: selectedDept.longitude,
        latitude: selectedDept.latitude,
        zoom: 8,
        transitionDuration: 2000,
      }));

      // Hacemos la petición a la API de Open-Meteo
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedDept.latitude}&longitude=${selectedDept.longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m`
      );
      const data = await res.json();
      console.log(`Clima para ${selectedDept.nombre}:`, data.current);
      setWeatherData(data.current);
    };

    fetchData();
  }, [selectedDept]);

  // Clasificamos el clima para obtener una leyenda y un color para el cono
  const classifyWeather = (weather) => {
    if (!weather) return null;

    // Damos prioridad al viento si es fuerte (ej: más de 20 km/h)
    if (weather.wind_speed_10m > 20) {
      return {
        legend: "Viento Fuerte",
        color: "purple",
        valor: weather.wind_speed_10m,
      };
    }
    if (weather.precipitation > 0.5) {
      return { legend: "Lluvia", color: "blue", valor: weather.precipitation };
    }
    if (weather.temperature_2m > 25) {
      return { legend: "Calor", color: "red", valor: weather.temperature_2m };
    }
    if (weather.temperature_2m < 15) {
      return { legend: "Frío", color: "cyan", valor: weather.temperature_2m };
    }
    return {
      legend: "Templado",
      color: "green",
      valor: weather.temperature_2m,
    };
  };

  const classifiedWeather = classifyWeather(weatherData);

  return (
    <>
      {/* El componente de la UI ahora vive aquí, y le pasamos los datos y callbacks */}
      <WeatherUI
        selectedDept={selectedDept}
        onDeptChange={setSelectedDept}
        weatherData={weatherData}
      />
      <div style={{ width: "100vw", height: "100vh" }}>
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapLibre={Maplibre}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          // Añadimos estas props para limitar el movimiento del mapa
          maxBounds={GUATEMALA_LIMITES}
          minZoom={5}
        >
          {/* Añadimos la capa de viento de Windy.com */}
          <Source
            id="windy-wind"
            type="raster"
            tiles={[
              "https://tiles.windy.com/tiles/v11.10.0/wind/{z}/{x}/{y}.png",
            ]}
            tileSize={256}
            attribution='<a href="https://www.windy.com/">Windy.com</a>'
          >
            <Layer
              id="windy-wind-layer"
              type="raster"
              source="windy-wind"
              paint={{ "raster-opacity": 0.6 }}
            />
          </Source>
          {/* El canvas 3D ahora usa el mismo `viewState` que el mapa,
              por lo que siempre estarán sincronizados. */}
          <ThreeMapCanvas {...viewState}>
            <ambientLight intensity={0.7} />
            <directionalLight
              position={[0, 10000, 10000]}
              intensity={Math.PI}
            />
            {/* Solo renderizamos el marcador si tenemos datos clasificados */}
            {classifiedWeather && (
              <MapMarker
                key={selectedDept.nombre}
                latitude={selectedDept.latitude}
                longitude={selectedDept.longitude}
                dato={classifiedWeather}
              />
            )}
          </ThreeMapCanvas>
        </Map>
      </div>
    </>
  );
}
