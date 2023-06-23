import React, { useState } from 'react';
import style from './style.module.css';
import logo from '../../assets/logo.png';

export default function Header({ onSearch, onSearchButtonClick }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
    onSearchButtonClick();
  };

  return (
    <div className={style.header}>
      <img src={logo} className={style.logo} alt="Logo" />
      <p className={style.titleLogo}>GameZone</p>
      <input
        type="text"
        className={style.search}
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick} className={style.btnsearch}>Search</button>
    </div>
  );
}
