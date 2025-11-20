import type { Activity, Balance } from "@/interfaces";
import { useMemo, type JSX } from "react";
import { CalorieDisplay } from "./CalorieDisplay";

import { GiRoastChicken } from "react-icons/gi";
import { BsArrowDownCircle, BsArrowUpCircle, BsCheckCircle, BsFire } from "react-icons/bs";

interface CalorieTrackerProps {
    activities: Activity[];
}

export const CalorieTracker = ({ activities }: CalorieTrackerProps) => {

    //Contadores
    const caloriesConsumed = useMemo(() =>
        (activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0)),
        [activities])

    const caloriesBurned = useMemo(() =>
        (activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0)),
        [activities])

    const netCalories = useMemo(() => (caloriesConsumed - caloriesBurned), [activities])

    const calorieBalance: Record<Balance, { text: string, icon: JSX.Element }> = {
        superavit: {
            text: 'Superavit Calorico - Ganas Peso',
            icon: <BsArrowUpCircle size={40} className="text-lime-300" />
        },
        deficit: {
            text: 'Deficit Calorico - Pierdes Peso',
            icon: <BsArrowDownCircle size={40} className="text-lime-300" />
        },
        neutro: {
            text: 'Peso estable',
            icon: <BsCheckCircle size={40} className="text-lime-300" />
        },
    }

    const balanceKey: Balance = netCalories > 0 ? 'superavit' : netCalories < 0
        ? 'deficit'
        : 'neutro'

    const balanceInfo = calorieBalance[balanceKey];

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