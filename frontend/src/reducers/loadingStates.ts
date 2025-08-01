import { LoadingAction, LoadingSate } from "../types/state";

export const initialState = {
    loadingTodoTab: false,
    loadingInProgressTab: false,
    loadingCompletedTab: false,
    loadingTaskModal: false,

}

export const reducer = (state: LoadingSate, action: LoadingAction) => {
    switch (action.type) {
        case 'SET_LOADING_TODOTAB':
            return {...state, loadingTodoTab: true };
            case 'UNSET_LOADING_TODOTAB':
            return {...state, loadingTodoTab: false };
        case 'SET_LOADING_INPOGRESSTAB':
            return {...state, loadingInProgressTab: true };
            case 'UNSET_LOADING_INPOGRESSTAB':
            return {...state, loadingInProgressTab: false };
        case 'SET_LOADING_COMPLETEDTAB':
            return {...state, loadingCompletedTab: true };
            case 'UNSET_LOADING_COMPLETEDTAB':
            return {...state, loadingCompletedTab: false };
        case 'SET_LOADING_TASKMODAL':
            return {...state, loadingTaskModal: true };
            case 'UNSET_LOADING_TASKMODAL':
            return {...state, loadingTaskModal: false };
        default:
            return state;
    }
}