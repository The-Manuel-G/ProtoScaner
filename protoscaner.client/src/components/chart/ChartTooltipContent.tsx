// src/components/ui/chart/ChartTooltipContent.tsx
import React from 'react'

interface ChartTooltipContentProps {
    indicator: string;
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({ indicator }) => {
    return (
        <div className="flex flex-col">
            <p>{indicator}</p>
        </div>
    )
}
