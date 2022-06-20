import React from 'react';

const Header = () => {
  const options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const now = new Date().toLocaleTimeString('en-us', options);
  return (
    <header>
      <div>
        <p>Hi, firstName</p>
        <p>{now}</p>
      </div>

      <nav>
        <a href="">How It Works </a>
        <a href="">Support </a>
        <a href="">Help</a>
      </nav>
      <input type="search" placeholder="Search..." />
    </header>
  );
};

export default Header;
