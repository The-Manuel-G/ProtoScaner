// src/components/ui/chart/ChartTooltip.tsx
import React from 'react'
import { TooltipProps } from 'recharts'

interface ChartTooltipProps extends TooltipProps {
    cursor: boolean;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({ active, payload, label, cursor }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 rounded-lg shadow-lg">
                <h4>{label}</h4>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        )
    }

    return null
}
