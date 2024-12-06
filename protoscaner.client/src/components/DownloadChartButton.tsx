// src/components/DownloadChartButton.tsx
import React from 'react';
import { FaDownload } from 'react-icons/fa';
import html2canvas from 'html2canvas';

interface DownloadChartButtonProps {
    chartRef: React.RefObject<HTMLElement>; // Referencia al gráfico
}

const DownloadChartButton: React.FC<DownloadChartButtonProps> = ({ chartRef }) => {
    const handleDownload = () => {
        if (chartRef.current) {
            html2canvas(chartRef.current).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL(); // Convierte la imagen del canvas a un URL de datos
                link.download = 'grafico.png'; // Nombre del archivo de descarga
                link.click(); // Simula el clic para descargar
            });
        }
    };

    return (
        <Button
            icon={<FaDownload />}
            className="p-button-rounded p-button-outlined"
            onClick={handleDownload}
            title="Descargar Gráfico"
        />
    );
};

export default DownloadChartButton;
