import React from 'react';

export const EmptyState: React.FC<{ message: string }> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center h-32 text-gray-500"> {/* Reducimos la altura a h-32 */}
            <i className="pi pi-users text-2xl mb-2"></i> {/* Reducimos el tamaño del icono */}
            <p className="text-md">{message}</p> {/* Ajustamos el tamaño del texto */}
        </div>
    );
};
