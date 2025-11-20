import type { Activity } from "@/interfaces";
import { CalorieDisplay } from "./CalorieDisplay";

import { GiRoastChicken } from "react-icons/gi";
import { BsFire } from "react-icons/bs";
import { useCalories } from "@/hooks";

interface CalorieTrackerProps {
    activities: Activity[];
}

export const CalorieTracker = ({ activities }: CalorieTrackerProps) => {

    const {
        balanceInfo,
        caloriesBurned,
        caloriesConsumed,
        netCalories } = useCalories(activities);

    return (
        <>
            <h2 className="text-4xl font-semibold text-white text-center">
                Resumen de Calorías
            </h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                    icon={<GiRoastChicken size={40} className="text-orange-600" />}
                />
                <CalorieDisplay
                    calories={caloriesBurned}
                    text="Quemadas"
                    icon={<BsFire size={40} className="text-orange-300" />}
                />

                <CalorieDisplay

                    calories={netCalories}
                    text={balanceInfo.text}
                    icon={balanceInfo.icon}

                />

            </div>

        </>
    );
}