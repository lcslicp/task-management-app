import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setStatusDisplay } from "../../features/tasks/taskUIslice";

const StatusPopup = ({ statusMsg }: { statusMsg: string }) => {
  const { statusDisplay, statusColor } = useSelector(
    (state: RootState) => state.statusUI
  );
  const dispatch = useDispatch();

  const backgroundColor = "bg-" + statusColor[1];
  const borderColor = "border-" + statusColor[0];
  const textColor = "text-" + statusColor[0];

  return (
    <div className={`${statusDisplay ? "block" : "hidden"} z-40`}>
      <div
        id="alert-1"
        className={`flex items-center p-4 mb-4 ${textColor} rounded-lg fixed top-8 left-64 w-[70%] border ${borderColor} ${backgroundColor}`}
        role="alert"
      >
        {statusColor[0] === "statusgreen" ? (
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
        )}

        <div className="ms-3 text-sm font-medium">
          <p>{statusMsg}</p>
        </div>
        <button
          type="button"
          className={`ms-auto -mx-1.5 -my-1.5 bg-white ${textColor} rounded-lg p-1.5 border boder-white hover:${borderColor} inline-flex items-center justify-center h-8 w-8`}
          data-dismiss-target="#alert-1"
          aria-label="Close"
          onClick={() => dispatch(setStatusDisplay(false))}
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StatusPopup;
