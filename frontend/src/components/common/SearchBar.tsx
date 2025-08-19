import React from "react";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import LoadingSpinner from "../ui-states/loadingSpinner";
import { TaskInterface } from "../../types/task";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import { fetchSearchResults } from "../../features/tasks/tasksThunks";
import { fetchSingleTaskData } from "../../features/tasks/taskThunks";
import { setCurrentTask } from "../../features/tasks/taskSlice";
import { setTaskOpen } from "../../features/tasks/taskUIslice";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchResults = useSelector(
    (state: RootState) => state.tasks.searchResults
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onOpen = async (id: string) => {
    const response = await dispatch(fetchSingleTaskData(id));
    dispatch(setCurrentTask(response.payload))
    dispatch(setTaskOpen(true));
    navigate(`/${id}`);
  };

  const handleSearchResults = async (searchInput: string) => {
    setIsLoading(true);
    try {
      await dispatch(fetchSearchResults({ searchInput })).unwrap();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearchResults(searchInput);
  }, [searchInput]);

  return (
    <div className="bg-white rounded-xl w-full">
      <label htmlFor="search-navbar"></label>
      <div className="relative w-full">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-coolgray"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>

        <input
          type="search"
          id="search-navbar"
          value={searchInput}
          autoComplete="off"
          onChange={(e) => setSearchInput(e.target.value)}
          className="block w-full p-4 h-10 ps-10 pl-10 text-sm text-darkgray border-none rounded-xl bg-offwhite focus:ring-coolgray focus:border-coolgray placeholder-coolgray"
          placeholder="Search Task..."
        />

        {searchInput.length > 0 && (
          <ul className="absolute bg-white rounded-xl z-30 mt-2 w-full border border-offwhite py-4">
            {isLoading ? (
              <LoadingSpinner />
            ) : searchResults.length === 0 ? (
              <p className="text-base px-10 italic text-center text-darkgray opacity-50">
                No tasks found.
              </p>
            ) : (
              searchResults.map((result:TaskInterface, index) => (
                <li
                  key={index}
                  className="cursor-pointer px-10 hover:bg-offwhite pb-2"
                  onClick={() => onOpen(result._id)}
                >
                  <p className="text-base text-darkgray font-base">
                    {result.title}
                  </p>
                  <span className="text-xs text-coolgray font-bold uppercase">
                    {result.status}
                  </span>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
