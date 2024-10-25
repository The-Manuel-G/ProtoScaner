import React from 'react';
import ContentGrid from '../components/ContentGrid'; // Asegúrate de que la ruta sea correcta

// Función Dashboard que renderiza el título y el componente ContentGrid
export function Dashboard() {
  return (
    <div className="p-4">
      {/* Título del dashboard */}
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {/* Grid de contenido */}
      <ContentGrid />
    </div>
  );
}
