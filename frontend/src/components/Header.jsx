import SearchBar from './SearchBar';

const Header = ({ firstName, lastName, userImage, handleTaskOpen }) => {
  const options = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  };

  const now = new Date().toLocaleDateString('default', options);

  const initials = firstName[0] + lastName[0]

  return (
    <header className='flex items-center justify-between px-10 pt-10'>
      <div className='flex flex-col'>
      <h2 className='text-3xl font-semibold text-gray'>Your Task Hub</h2>
      <p className='text-gray opacity-50'>Today is {now}.</p>
      </div>
     
     <div className='flex flex-row w-[60%] items-center gap-5 justify-end'>
      <SearchBar className='flex-grow' handleTaskOpen={handleTaskOpen} />
      <div className='flex flex-row flex-shrink-0 items-center gap-3'>
        {userImage ? <img src={userImage} alt='profile image' className='w-6 h-6 border-2 rounded-lg' /> : <span className='w-10 h-10 bg-green-400 text-white rounded-full border-2 border-green-200 flex items-center justify-center text-xs font-bold'> {initials}</span> }
      
        <p className='font-medium text-togglegray text-lg'>{firstName} {lastName}</p>
      </div>

     </div>
    </header>
  );
};

export default Header;
