// src/components/ui/chart/ChartContainer.tsx
import React from 'react'

export interface ChartConfig {
    desktop: {
        label: string;
        color: string;
    };
    mobile: {
        label: string;
        color: string;
    };
    label: {
        color: string;
    };
}

interface ChartContainerProps {
    config: ChartConfig;
    children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ config, children }) => {
    return (
        <div className="p-4 bg-gray-800 rounded-lg">
            <div className="text-white" style={{ color: config.label.color }}>
                {children}
            </div>
        </div>
    )
}
