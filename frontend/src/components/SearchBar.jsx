import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import LoadingSpinner from './ui-states/loadingSmall';

const SearchBar = ({ handleTaskOpen }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchSearchResults = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/search?title=${searchInput}`, config);
      setSearchResults(response.data.slice(0, 3));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchInput]);

  return (
    <>
    <label htmlFor='search-navbar'></label>
    <div className='relative w-full max-w-sm'>
      <svg
        className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-coolgray'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 20 20'
      >
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
        />
      </svg>

      <input
        type='search'
        id='search-navbar'
        value={searchInput}
        autoComplete='off'
        onChange={(e) => setSearchInput(e.target.value)}
        className='block w-full p-4 h-10 ps-10 pl-10 text-sm text-darkgray border-none rounded-xl bg-offwhite focus:ring-coolgray focus:border-coolgray placeholder-coolgray'
        placeholder='Search Task...'
      />
    </div>


      {searchInput.length > 0 && (
        <ul className='fixed bg-white px-7 rounded-lg z-50 top-24 right-96 mr-3 w-1/3 drop-shadow-md'>
          {isLoading ? (
              <LoadingSpinner className='w-1 h-1' />
            ) : searchResults.length === 0 ? (<p className='text-sm text-darkblue italic py-5'>
            No tasks found.
          </p>) : (
              searchResults.map((result) =>
              <li
                key={result._id}
                className=' border-b border-solid  border-gray-400 pb-3 pt-3 cursor-pointer'
                on
                onClick={() => handleTaskOpen(result._id)}
              >
                <p className='text-sm text-darkblue font-bold'>
                  {result.title}
                </p>
                <span className='text-xs text-grey pb-4'>
                  in {result.status}
                </span>
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
};

export default SearchBar;
