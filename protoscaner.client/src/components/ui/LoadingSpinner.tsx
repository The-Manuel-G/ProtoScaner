// src/components/ui/LoadingSpinner.tsx

import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface LoadingSpinnerProps {
    size?: number;
    color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 50, color = "#123abc" }) => {
    return (
        <div className="flex justify-center items-center h-full">
            <ClipLoader size={size} color={color} loading={true} />
        </div>
    );
};

export default LoadingSpinner;
