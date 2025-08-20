import React, { useRef } from "react";
import { NearCoordinates } from "react-three-map/maplibre";

// Factores de escala para que cada tipo de dato tenga un impacto visual diferente.
// Siéntete libre de ajustarlos para que se vean mejor.
const SCALE_FACTORS = {
  "Viento Fuerte": 1000, // El viento fuerte ahora tendrá su propia escala
  Lluvia: 20000, // La precipitación suele ser un valor bajo, así que necesita una escala mayor
  Calor: 1500,
  Frío: 1500,
  Templado: 1500,
};

function MapMarker({ latitude, longitude, dato }) {
  const meshRef = useRef();

  // 1. Calculamos la altura y el radio del cono basados en el valor del dato
  const scale = SCALE_FACTORS[dato.legend] || 1000;
  const height = dato.valor * scale;
  const radius = height / 4; // Hacemos el radio proporcional a la altura

  // Mostramos en consola la información que se está renderizando para este marcador.
  console.log(
    `Marcador para ${dato.legend}: valor=${dato.valor}, altura calculada=${height}`
  );

  return (
    // Usamos NearCoordinates para posicionar el objeto.
    // La altitud levanta el cubo para que su base quede sobre el mapa.
    <NearCoordinates
      latitude={latitude}
      longitude={longitude}
      altitude={height / 2} // Levantamos el cono para que su base quede en el mapa
    >
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        rotation-x={Math.PI} // Rotamos el cono 180 grados para que apunte hacia abajo
      >
        {/* 2. Usamos la altura y radio dinámicos */}
        <coneGeometry args={[radius, height, 8]} />
        <meshStandardMaterial color={dato.color} />
      </mesh>
    </NearCoordinates>
  );
}

export default MapMarker;
