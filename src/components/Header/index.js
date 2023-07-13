import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import style from './style.module.css';
import logo from '../../assets/logo.png';

import Load from '../Load';

import { getAuth } from 'firebase/auth';

export default function Header({ onFavoritesClick }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleFavoritesClick = () => {
    onFavoritesClick(); // Chama a função passada por prop quando o botão "Favoritos" é clicado
  };

  return (
    <div className={style.header}>
      <img src={logo} className={style.logo} alt="Logo" />
      <div className={style.btns}>
        {!isAuthenticated && (
          <>
            <Link to='/auth' className={style.linkBtn}>
              <button className={style.btnRegister}>SIGN IN</button>
            </Link>
            <Link to='/auth'>
              <button className={style.btnOrRegister}>or</button>
            </Link>
            <Link to='/auth'>
              <button className={style.btnRegister}>REGISTER</button>
            </Link>
          </>
        )}
      </div>
      {isAuthenticated && (
        <div className={style.searchContainer}>
          <button className={style.btnFav} onClick={handleFavoritesClick}>Favoritos</button>
          <Link to='/auth'className={style.linkBtn}>
            <button className={style.btnLogout} >LogOut</button>
          </Link>
        </div>
      )}
    </div>
  );
}
