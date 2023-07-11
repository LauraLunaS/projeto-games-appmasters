import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import { auth } from '../../services/firebaseConnection';

export default function Rating({ onRatingChange }) {
  const [selectedStar, setSelectedStar] = useState(null);
  const [starCount, setStarCount] = useState(0);
  const starsRef = useRef([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = () => {
    auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user); 
    });
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    const handleStarClick = (index) => {
      setSelectedStar(index + 1);
    };

    const stars = starsRef.current;
    stars.forEach((star, index) => {
      star.addEventListener('click', () => handleStarClick(index));
    });

    return () => {
      stars.forEach((star, index) => {
        star.removeEventListener('click', () => handleStarClick(index));
      });
    };
  }, []);

 
  useEffect(() => {
    if (selectedStar !== null) {
      setStarCount(selectedStar);
      starsRef.current.forEach((star, index) => {
        if (index <= selectedStar - 1) {
          star.classList.add(styles.ativo);
        } else {
          star.classList.remove(styles.ativo);
        }
      });
  
      if (!isAuthenticated) {
        alert('Por favor, faça login para adicionar/remover o jogo dos favoritos.');
        setSelectedStar(null); 
        starsRef.current.forEach((star) => {
          star.classList.remove(styles.ativo); 
        });
      } else if (typeof onRatingChange === 'function') {
        onRatingChange(selectedStar);
      }
    }
  }, [selectedStar, onRatingChange, isAuthenticated]);  
  


  return (
    <div className={styles.Container}>
      <span className={`${styles.starIcon}`} ref={(ref) => (starsRef.current[0] = ref)} data-avaliacao="1"></span>
      <span className={`${styles.starIcon}`} ref={(ref) => (starsRef.current[1] = ref)} data-avaliacao="2"></span>
      <span className={`${styles.starIcon}`} ref={(ref) => (starsRef.current[2] = ref)} data-avaliacao="3"></span>
      <span className={`${styles.starIcon}`} ref={(ref) => (starsRef.current[3] = ref)} data-avaliacao="4"></span>
      <span className={`${styles.starIcon}`} ref={(ref) => (starsRef.current[4] = ref)} data-avaliacao="5"></span>
      <br></br>
      <p className={styles.starCount}>{starCount}.0</p>
    </div>
  );
}

