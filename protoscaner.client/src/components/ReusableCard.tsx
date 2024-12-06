import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
import { Skeleton } from "primereact/skeleton"; // Usaremos PrimeReact Skeleton para los esqueletos

type CardProps = {
    title: string;
    value?: string | number;
    icon?: React.ReactNode;
    isLoading?: boolean;
    color?: string; // Para personalizar colores
    extraInfo?: string; // Información adicional
};

const ReusableCard: React.FC<CardProps> = ({
    title,
    value,
    icon = <FaInfoCircle className="text-2xl text-gray-500" />,
    isLoading = false,
    color = "blue",
    extraInfo,
}) => {
    return (
        <motion.div
            className={`p-4 rounded-lg shadow-lg border bg-gray-900 text-gray-300 border-gray-800`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center justify-between">
                <div>
                    <span className="block text-gray-400 font-medium mb-1">{title}</span>
                    {isLoading ? (
                        <Skeleton width="80px" height="20px" />
                    ) : (
                        <motion.div
                            key={value} // Clave para animaciones al cambiar valores
                            className={`text-2xl font-extrabold text-${color}-400`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {value}
                        </motion.div>
                    )}
                </div>
                <div
                    className={`p-2 rounded-full bg-${color}-200 flex items-center justify-center`}
                >
                    {icon}
                </div>
            </div>
            {extraInfo && (
                <div className="mt-2 text-sm text-gray-400">
                    <span>{extraInfo}</span>
                </div>
            )}
        </motion.div>
    );
};

export default ReusableCard;
