import SearchBar from './SearchBar';

const Header = ({ firstName, handleTaskOpen }) => {
  const options = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  };

  const now = new Date().toLocaleDateString('default', options);

  return (
    <header className=''>
      <nav className=''>
        <div className='container flex flex-row justify-between items-center mx-auto'>
          <div>
            <p className='text-2xl font-semibold whitespace-nowrap text-black'>
              Hi, {firstName}!
            </p>
            <p className='text-xs opacity-50 pt-2'>Today is {now}.</p>
          </div>
          <div className='flex flex-row items-center justify-end w-3/4'>
            <SearchBar handleTaskOpen={handleTaskOpen} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
