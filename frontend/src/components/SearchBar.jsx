import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const SearchBar = () => {
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
      <input
        type='text'
        id='search-navbar'
        value={searchInput}
        autocomplete='off'
        onChange={(e) => setSearchInput(e.target.value)}
        className='block p-2 pl-4 w-full h-1/3 text-gray-900 bg-lightgray rounded-lg border border-gray-300 sm:text-sm focus:ring-lightgray focus:border-brightblue  '
        placeholder='Search Task...'
      />
      {searchResults.length > 0 && searchInput.length > 0 && (
        <ul className='fixed bg-white py-3 px-7 rounded-lg h-fit z-50 top-24 right-32 ml-4 w-1/3 drop-shadow-md'>
          {searchResults.map((result) => (
            <li
              key={result._id}
              className=' border-b border-solid  border-gray-400 pb-3 pt-3'
            >
              <p className='text-sm text-darkblue font-bold'>{result.title}</p>
              <span className='text-xs text-grey pb-4'>in {result.status}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchBar;
