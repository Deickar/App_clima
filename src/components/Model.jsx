import React from "react";
import { useGLTF } from "@react-three/drei";

// Es una buena práctica precargar el modelo para que esté disponible
// cuando el componente se monte, evitando un parpadeo.
useGLTF.preload("/Departamentos.glb");

// El componente original tenía algunos errores de sintaxis.
// 1. Debe ser una función de React (empezando con mayúscula).
// 2. El hook `useGLTF` debe llamarse dentro del cuerpo de la función del componente.
// 3. El `return` debe estar dentro de la función.
//
// Esta versión corregida ahora puede renderizar CUALQUIER municipio de tu archivo GLB.
export default function MeshMunicipio({ nombreMunicipio, color, ...props }) {
  // Carga el archivo GLB que contiene todos los municipios una sola vez.
  const { nodes, materials } = useGLTF("/Edificio.glb");

  // Buscamos el nodo (la malla) que corresponde al municipio deseado.
  // Es CRUCIAL que en Blender hayas nombrado cada objeto de malla
  // de forma que coincida con lo que esperas aquí.
  // Por ejemplo, si `nombreMunicipio` es "Guatemala", en Blender
  // el objeto debería llamarse "Guatemala".
  const municipioNode = nodes[nombreMunicipio];

  // Si no encontramos la malla para el municipio, no renderizamos nada
  // y mostramos un aviso en la consola.
  if (!municipioNode) {
    console.warn(
      `No se encontró la malla para el municipio: ${nombreMunicipio}`
    );
    return null;
  }

  return (
    // Usamos un <group> para poder pasar props como position, rotation, scale.
    <group {...props}>
      <mesh geometry={municipioNode.geometry} castShadow receiveShadow>
        {/* Usamos un material propio para poder cambiar el color dinámicamente */}
        <meshStandardMaterial color={color || "white"} />
      </mesh>
    </group>
  );
}
