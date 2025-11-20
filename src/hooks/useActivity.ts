import type { Activity } from "@/interfaces";
import type { ActivityActions } from "@/reducers";
import { useState, type ChangeEvent, type Dispatch, type FormEvent } from "react";
import { v4 as uuid } from "uuid";


interface Props {
    dispatch: Dispatch<ActivityActions>
    initialState?: Activity;
}


export const useActivity = ({
    dispatch,
    initialState = { id: uuid(), calories: 0, category: 1, name: '' }
}: Props) => {

    const [activity, setActivity] = useState<Activity>(initialState);

    const handleChage = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {

        const { id, value } = event.target;

        const isNumberField = ["calories", "category"].includes(id);

        setActivity({
            ...activity,
            [id]: isNumberField ? +value : value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity;
        return name.trim() !== '' && calories > 0;
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch({ type: 'save-activity', payload: { newActivity: activity } });
        setActivity({
            ...initialState,
            id: uuid()
        });
    }

    return {
        handleChage,
        handleSubmit,
        isValidActivity,
        activity,
        setActivity
    }
}