export type LoadingSate = {
  loadingTodoTab: boolean;
  loadingInProgressTab: boolean;
  loadingCompletedTab: boolean;
  loadingTaskModal: boolean;
};

export type LoadingAction =
  | { type: "SET_LOADING_TODOTAB" }
  | { type: "UNSET_LOADING_TODOTAB" }
  | { type: "SET_LOADING_INPOGRESSTAB" }
  | { type: "UNSET_LOADING_INPOGRESSTAB" }
  | { type: "SET_LOADING_COMPLETEDTAB" }
  | { type: "UNSET_LOADING_COMPLETEDTAB" }
  | { type: "SET_LOADING_TASKMODAL" }
  | { type: "UNSET_LOADING_TASKMODAL" };
