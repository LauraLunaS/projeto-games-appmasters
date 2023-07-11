import React, { useState } from 'react';
import style from './style.module.css';
import logo from '../../assets/logo.png';

import Load from '../Load';

export default function Header({ onSearch, onSearchButtonClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchTerm('');
    setIsLoading(true);

    if (searchTerm.trim() !== '') {
      onSearch(searchTerm);
      onSearchButtonClick();
    } else {
      window.location.reload();
    }

    setIsLoading(false);
  };

  return (
    <div className={style.header}>
        <img src={logo} className={style.logo} alt="Logo" />
        <p className={style.titleLogo}>GameZone</p>
      <div className={style.searchContainer}>
        <input
          type="text"
          className={style.search}
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearchClick} className={style.btnsearch}>
          {isLoading ? <Load /> : 'Search'}
        </button>
      </div>
    </div>
  );
}