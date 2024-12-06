// src/components/ui/ErrorMessage.tsx

import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="flex justify-center items-center h-full">
            <p className="text-center text-red-500">{message}</p>
        </div>
    );
};

export default ErrorMessage;
