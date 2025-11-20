import { ActivityList, CalorieTracker, Form, Header } from "@/components";
import { useEffect, useReducer } from "react";
import { activityReducer, initialState, type ActivityState } from "@/reducers";
import { initFromLocalStorage } from "./utils";


const App = () => {

  const [state, dispatch] = useReducer(
    activityReducer,
    initialState,
    () => initFromLocalStorage<ActivityState>('activities-storage', initialState));

  useEffect(() => {
    localStorage.setItem('activities-storage', JSON.stringify(state));
  }, [state.activities]);

  return (

    <>
      {/* Header */}
      <Header />
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          {/* Formulario */}
          <Form
            state={state}
            dispatch={dispatch}
          />
        </div>
      </section>

      <section className="bg-gray-800 py-10">

        <div className="max-w-4xl mx-auto">
          <CalorieTracker
            activities={state.activities}
          />
        </div>

      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App;



