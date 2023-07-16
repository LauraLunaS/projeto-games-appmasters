import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import style from './style.module.css';
import logo from '../../assets/logo.png';

import AuthenticationChecker from '../AuthenticationChecker';

export default function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/auth');
  };
  

    return (
      <AuthenticationChecker>
        {(isAuthenticated) => (
          <div className={style.header}>
              <img src={logo} className={style.logo} alt="Logo"/>
            <div className={style.btns}>
              {!isAuthenticated ? (
                <div className={style.Containerbtn}>
                  <button className={style.btnRegister} onClick={handleClick}>SIGN IN</button>
                  <button className={style.btnOrRegister}>or</button>
                  <button className={style.btnRegister} onClick={handleClick}>REGISTER</button>
                </div>
              ) : (
                <div className={style.searchContainer}>
                </div>
              )}
            </div>
          </div>
        )}
      </AuthenticationChecker>
    );
}

