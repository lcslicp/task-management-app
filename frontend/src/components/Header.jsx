import SearchBar from './SearchBar';

const Header = ({firstName, handleTaskOpen}) => {
  const options = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  };

  const now = new Date().toLocaleDateString('default', options);

  const links = [
    { id: 1, href: '/', label: 'About' },
    { id: 2, href: 'https://github.com/lcslicp/task-management-app', label: 'Github' },
    { id: 3, href: '/', label: 'Help' },
  ];

  return (
    <header className='flex flex-col pt-8 pl-80 pr-8 bg-white fixed w-full border-4 border-white z-20 '>
      <nav className='bg-white border-lightgray px-8 sm:px-4 py-2.5 rounded'>
        <div className='container flex flex-row justify-between items-center mx-auto'>
          <div>
            <p className='text-2xl font-semibold whitespace-nowrap text-black'>
              Hi, {firstName}!
            </p>
            <p className='text-xs opacity-50 pt-2'>Today is {now}.</p>
          </div>
          <div className='flex flex-row items-center justify-end w-3/4'>
            <ul className='flex mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium pr-20'>
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className='block py-2 pr-4 pl-3 text-black font-semibold hover:text-brightblue md:p-0'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <SearchBar handleTaskOpen={handleTaskOpen} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
