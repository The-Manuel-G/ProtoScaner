import React from 'react';

export const EmptyState: React.FC<{ message: string }> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center h-40 w-full max-w-md p-6 bg-gray-800 text-gray-400 rounded-lg shadow-lg border border-gray-700">
            <i className="pi pi-users text-4xl text-gray-600 mb-3"></i> {/* Icono m�s grande y tono gris */}
            <p className="text-lg font-semibold">{message}</p> {/* Texto en tama�o moderado y m�s grueso */}
        </div>
    );
};
