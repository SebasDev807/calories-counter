import type { Activity, Balance } from "@/interfaces"
import { useMemo, type JSX } from "react"
import { BsArrowUpCircle, BsArrowDownCircle, BsCheckCircle } from "react-icons/bs"

export const useCalories = (activities: Activity[]) => {

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

    return {
        caloriesConsumed,
        caloriesBurned,
        netCalories,
        balanceInfo
    }
}

