import { categories } from "@/data"
import { useActivity } from "@/hooks";
import type { Activity } from "@/interfaces";
import type { ActivityActions, ActivityState } from "@/reducers";
import { useEffect, type Dispatch } from "react"
import { v4 as uuid } from "uuid";

interface FormProps {
  dispatch: Dispatch<ActivityActions>
  state: ActivityState;
}

const initialState: Activity = {
  id: uuid(),
  name: '',
  category: 1,
  calories: 0
}

export const Form = ({ dispatch, state }: FormProps) => {

  const {
    activity,
    handleChage,
    handleSubmit,
    isValidActivity,
    setActivity,
  } = useActivity({ dispatch, initialState });

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity =
        state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId])

  useEffect(() => {
    if (state.activeId.length === 0) {
      setActivity(initialState);
    }
  }, [state.activeId])


  return (
    <form 
  className="space-y-7 bg-white shadow-xl p-10 rounded-2xl border border-slate-200"
  onSubmit={handleSubmit}
>

  {/* CATEGORÍA */}
  <div className="flex flex-col gap-2">
    <label 
      htmlFor="category" 
      className="font-semibold text-slate-700 text-lg"
    >
      Categoría
    </label>

    <select
      id="category"
      onChange={handleChage}
      value={activity.category}
      className="
        border border-slate-300 px-4 py-2.5 rounded-xl bg-white
        focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500
        transition-all duration-300 cursor-pointer
      "
    >
      {categories.map(category => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  </div>

  {/* ACTIVIDAD */}
  <div className="flex flex-col gap-2">
    <label 
      htmlFor="name" 
      className="font-semibold text-slate-700 text-lg"
    >
      Actividad
    </label>

    <input
      id="name"
      type="text"
      onChange={handleChage}
      value={activity.name}
      placeholder="Ej. Ensalada, Pesas, Bicicleta..."
      className="
        border border-slate-300 px-4 py-2.5 rounded-xl bg-white
        focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500
        transition-all duration-300
      "
    />
  </div>

  {/* CALORÍAS */}
  <div className="flex flex-col gap-2">
    <label 
      htmlFor="calories" 
      className="font-semibold text-slate-700 text-lg"
    >
      Calorías
    </label>

    <input
      id="calories"
      type="number"
      min={0}
      onChange={handleChage}
      value={activity.calories}
      placeholder="Ej. 300, 500"
      className="
        border border-slate-300 px-4 py-2.5 rounded-xl bg-white
        focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500
        transition-all duration-300
      "
    />
  </div>

  {/* BOTÓN */}
  <button
    type="submit"
    disabled={!isValidActivity()}
    className="
      w-full py-3 rounded-xl font-bold uppercase tracking-wide
      bg-gray-900 text-white 
      disabled:opacity-50 disabled:cursor-not-allowed
      hover:bg-black transition-all duration-300
    "
  >
    {activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
  </button>

</form>

  )
}
