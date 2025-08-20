import React from "react";
import { NearCoordinates } from "react-three-map/maplibre";

// Ajusta este factor para cambiar qué tan largas son las flechas
const SPEED_TO_LENGTH_FACTOR = 2000;
const ALTITUDE = 5000; // Altura fija sobre el mapa en metros

export default function WindArrow({
  latitude,
  longitude,
  speed,
  directionRad,
}) {
  // La longitud TOTAL de la flecha es proporcional a la velocidad del viento
  // Aseguramos una longitud mínima para que siempre sea visible
  const totalLength = Math.max(2000, speed * SPEED_TO_LENGTH_FACTOR);

  // Definimos las proporciones de nuestra flecha personalizada
  const headLength = totalLength * 0.4; // La punta es el 40% del total
  const headRadius = totalLength * 0.1; // El radio de la base de la punta
  const shaftLength = totalLength - headLength; // El resto es el cuerpo
  const shaftRadius = headRadius / 3; // El cuerpo es más delgado que la punta

  return (
    // NearCoordinates posiciona nuestro objeto 3D en el mapa
    <NearCoordinates
      latitude={latitude}
      longitude={longitude}
      altitude={ALTITUDE}
    >
      {/* Este <group> aplica la rotación principal según la dirección del viento */}
      {/* La rotación en Y corresponde a la dirección azimutal (norte, sur, este, oeste) */}
      <group rotation-y={directionRad}>
        {/* Este <group> contiene las partes de la flecha.
            La construimos apuntando a lo largo del eje +Z. */}
        <group>
          {/* Cuerpo de la flecha (Cilindro) */}
          <mesh position-z={shaftLength / 2} rotation-x={Math.PI / 2}>
            <cylinderGeometry
              args={[shaftRadius, shaftRadius, shaftLength, 8]}
            />
            <meshStandardMaterial
              color="#f5a623"
              emissive="#f5a623"
              emissiveIntensity={0.5}
            />
          </mesh>
          {/* Punta de la flecha (Cono) */}
          <mesh position-z={shaftLength} rotation-x={Math.PI / 2}>
            <coneGeometry args={[headRadius, headLength, 8]} />
            <meshStandardMaterial
              color="#f5a623"
              emissive="#f5a623"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      </group>
    </NearCoordinates>
  );
}
