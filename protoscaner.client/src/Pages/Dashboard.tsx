import React from 'react';
import ContentGrid from '../components/ContentGrid'; // Asegúrate de importar correctamente

const Dashboard: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <ContentGrid /> {/* Aquí se renderiza el grid */}
        </div>
    );
};

export default Dashboard;
