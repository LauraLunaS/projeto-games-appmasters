import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import { auth, db } from '../../services/firebaseConnection';
import { addDoc, collection } from 'firebase/firestore';

export default function Rating({ gameId, onRatingChange }) {
  const [selectedStar, setSelectedStar] = useState(null);
  const [starCount, setStarCount] = useState(0);
  const starsRef = useRef([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const checkAuthentication = () => {
    auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const handleStarClick = (index) => {
    setIsRotating(true);
    setSelectedStar(index + 1);
  };

  useEffect(() => {
    const stars = starsRef.current;
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        handleStarClick(index);
        star.classList.add(styles.rotating);
      });

      return () => {
        if (star) {
          star.removeEventListener('click', () => handleStarClick(index));
        }
      };
    });
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
        star.classList.remove(styles.rotating);
      });

      console.log('Avaliação =', selectedStar);

      if (!isAuthenticated) {
        alert('Por favor, faça login para adicionar/remover o jogo dos favoritos.');
        setSelectedStar(null);
        starsRef.current.forEach((star) => {
          star.classList.remove(styles.ativo);
        });
      } else if (typeof onRatingChange === 'function') {
        onRatingChange(selectedStar);

        const enviarAvaliacao = async () => {
          try {
            await addDoc(collection(db, 'avaliacoes'), {
              idJogo: gameId,
              avaliacao: selectedStar,
            });

            console.log('Avaliação enviada com sucesso!');
          } catch (error) {
            console.error('Erro ao enviar avaliação:', error);
          }
        };

        enviarAvaliacao();
      }
    }
  }, [selectedStar, onRatingChange, isAuthenticated, gameId]);

  return (
    <div className={styles.Container}>
      {[1, 2, 3, 4, 5].map((number, i) => (
        <span
          className={`${styles.starIcon} ${i === 0 ? styles.current : ''} ${
            isRotating ? styles.rotating : ''
          }`}
          ref={(ref) => (starsRef.current[i] = ref)}
          data-avaliacao={number}
          key={i}
        />
      ))}
      <br />
      <p className={styles.starCount}>{starCount}.0</p>
    </div>
  );
}





