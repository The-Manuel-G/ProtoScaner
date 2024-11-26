// src/components/ui/StyledDataField.tsx

import React from 'react';
import { FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';

type StyledDataFieldProps = {
    label: string;
    value: string;
};

const StyledDataField: React.FC<StyledDataFieldProps> = ({ label, value }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(value).then(() => {
            toast.success(`${label} copiado al portapapeles`);
        }).catch(() => {
            toast.error(`Error al copiar ${label}`);
        });
    };

    return (
        <div className="flex items-center text-gray-700">
            <span className="font-semibold">{label}:</span>
            <div className="ml-2 px-3 py-1 border border-gray-300 rounded-md bg-gray-100 flex items-center">
                <span>{value}</span>
                <button
                    onClick={handleCopy}
                    className="ml-2 text-gray-500 hover:text-blue-500"
                    title={`Copiar ${label}`}
                    aria-label={`Copiar ${label}`}
                >
                    <FaCopy />
                </button>
            </div>
        </div>
    );
};

export default StyledDataField;
