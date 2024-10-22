import React from 'react';
import ContentGrid from '../components/ContentGrid'; // Aseg�rate de importar correctamente

const Dashboard: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <ContentGrid /> {/* Aqu� se renderiza el grid */}
        </div>
    );
};

export default Dashboard;
