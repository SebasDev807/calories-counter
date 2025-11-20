import { categories } from "@/data";
import type { Activity } from "@/interfaces";
import { FaAppleAlt as FoodIcon } from "react-icons/fa";
import { IoIosFitness as ExerciseIcon } from "react-icons/io";
import { BsPencilSquare, BsTrash3 } from "react-icons/bs";
import type { ActivityActions } from "@/reducers";
import { useMemo, type ActionDispatch } from "react";
import { ToolTip } from "./ToolTip";

interface ActivityListProps {
    activities: Activity[];
    dispatch: ActionDispatch<[action: ActivityActions]>

}

export const ActivityList = ({ activities, dispatch }: ActivityListProps) => {

    const categoryName = (category: Activity['category']) =>
        categories.find(cat => cat.id === category)?.name || "";

    const handleSelectCategoryToEdit = (id: Activity['id']) => {
        dispatch({ type: 'set-active-id', payload: { id } })
    }

    const handleDeleteCategory = (id: Activity['id']) => {
        dispatch({ type: 'delete-activity', payload: { id } })
    }

    const handleDeleteAll = () => {
        dispatch({ type: 'restart-app' })
    }


    const hasActivities = useMemo(() => (activities.length > 0), [activities])

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

    return (
        <>

            <div className="flex justify-between items-center">
                <h2 className="text-4xl font-bold text-slate-700 text-center mb-6">
                    Comida y Actividades
                </h2>

                <button
                    onClick={handleDeleteAll}
                    className="flex items-center gap-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed bg-gray-800 enabled:hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer"
                    disabled={!hasActivities}
                >
                    <BsTrash3 />
                    Eliminar Todo
                </button>
            </div>

            {isEmptyActivities ? (
                <h3 className="text-center mt-5 text-slate-500">
                    No tienes actividades hasta ahora
                </h3>
            ) : (
                <ul className="space-y-6">
                    {activities.map(activity => (
                        <li
                            key={`activity-${activity.id}`}
                            className="px-5 py-8 bg-white rounded-2xl shadow-md flex justify-between items-center"
                        >
                            <div className="space-y-2 relative">

                                {/* Badge de categoría */}
                                <span
                                    className={`px-4 py-1 text-sm font-bold uppercase rounded-full flex items-center gap-2 text-white shadow-md
                                        ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}
                                    `}
                                >
                                    {activity.category === 1 ? (
                                        <FoodIcon size={18} />
                                    ) : (
                                        <ExerciseIcon size={18} />
                                    )}
                                    {categoryName(activity.category)}
                                </span>

                                {/* Nombre */}
                                <p className="text-2xl font-semibold text-slate-700 pt-4">
                                    {activity.name}
                                </p>

                                {/* Calorías */}
                                <p className="font-black text-4xl text-lime-600">
                                    {activity.calories}
                                    <span className="text-lg ml-1 text-slate-500 font-medium">
                                        Calorías
                                    </span>
                                </p>
                            </div>

                            {/* Botón de editar y eliminar */}

                            <div className="flex gap-5 items-center">
                                <button
                                    onClick={() => handleSelectCategoryToEdit(activity.id)}
                                    className="group relative cursor-pointer p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition shadow-sm"
                                >
                                    <BsPencilSquare
                                        size={20}
                                        className="text-slate-600"
                                    />

                                    <ToolTip title="Editar Actividad" />

                                </button>
                                <button
                                    className="group relative cursor-pointer p-3 rounded-xl bg-red-100 hover:bg-red-200 transition shadow-sm"
                                    onClick={() => handleDeleteCategory(activity.id)}
                                >
                                    <BsTrash3
                                        size={20}
                                        className="text-red-600" />
                                    <ToolTip title="Eliminar Actividad" />

                                </button>

                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};
