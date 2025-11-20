import type { Activity } from "@/interfaces"

export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-active-id', payload: { id: Activity['id'] } } |
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'restart-app' };


export interface ActivityState {
    activities: Activity[];
    activeId: Activity['id'];
}

export const initialState: ActivityState = {
    activities: [],
    activeId: '',
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
): ActivityState => {

    let updatedActivities: Activity[] = [];

    switch (action.type) {

        case 'save-activity':


            if (state.activeId) {
                updatedActivities = state.activities.map(activity => (
                    activity.id === state.activeId ? action.payload.newActivity : activity
                ))
            } else {
                updatedActivities = [...state.activities, action.payload.newActivity]
            }

            return {
                ...state,
                activities: updatedActivities,
                activeId: ''
            };

        case 'set-active-id':
            return {
                ...state,
                activeId: action.payload.id
            };

        case 'delete-activity':

            updatedActivities = state.activities.filter(activity => (
                activity.id !== action.payload.id
            ))

            return {
                // ...state,
                activities: updatedActivities,
                activeId: ''
            }

        case 'restart-app':
            return {
            
                activities: [],
                activeId: '',
            }

        default:
            return state;
    }

}
