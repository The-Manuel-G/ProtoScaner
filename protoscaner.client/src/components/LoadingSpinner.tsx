// src/components/LoadingSpinner.tsx
import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex justify-center mt-6">
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        </div>
    );
};

export default LoadingSpinner;
