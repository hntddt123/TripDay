import { useState } from 'react';

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button className='button bg-slate-100 dark:bg-slate-800 p-2' onClick={toggleDarkMode}>
      {darkMode ? '🌙' : '🌞'}
    </button>
  );
}

export default DarkModeToggle;
