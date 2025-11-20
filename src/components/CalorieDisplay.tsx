import { type ReactNode } from "react";

interface CalorieDisplayProps {
    calories: number;
    text: string;
    icon: ReactNode;
}

export const CalorieDisplay = ({ calories, text, icon }: CalorieDisplayProps) => {
    return (
        <div className="
            flex flex-col items-center justify-center
            bg-white/10 backdrop-blur-sm
            px-6 py-5 rounded-2xl
            shadow-md border border-white/20 
            w-full text-center
        ">
            {/* Icono */}
            <div className="mb-3">
                {icon}
            </div>

            {/* Cantidad */}
            <span className="text-5xl font-extrabold text-white drop-shadow-sm">
                {calories}
            </span>

            {/* Texto */}
            <span className="text-[14px] font-semibold text-white/90 mt-1">
                {text}
            </span>
        </div>
    );
};
