import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import { auth, db } from '../../services/firebaseConnection';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Rating({ gameId, onRatingChange }) {
  const [selectedStar, setSelectedStar] = useState(null);
  const [starCount, setStarCount] = useState(0);
  const starsRef = useRef([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const navigate = useNavigate();

  const checkAuthentication = () => {
    auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    const stars = starsRef.current;

    const handleClick = (index) => {
      if (!isAuthenticated) {
        setSelectedStar(null);
        setStarCount(0);
        return;
      }

      stars.forEach((star, i) => {
        if (i === index) {
          star.classList.add(styles.rotating);
        } else {
          star.classList.remove(styles.rotating);
        }
      });

      setSelectedStar(index + 1);
    };

    stars.forEach((star, index) => {
      star.addEventListener('click', () => handleClick(index));

      return () => {
        if (star) {
          star.removeEventListener('click', () => handleClick(index));
        }
      };
    });
  }, [isAuthenticated]);

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

      if (isAuthenticated) {
        starsRef.current.forEach((star) => {
          star.classList.remove(styles.rotating);
        });

        localStorage.setItem(`rating_${gameId}`, selectedStar.toString());

        addDoc(collection(db, 'avaliacoes'), {
          gameId: gameId,
          valor: selectedStar,
        })
          .then(() => {
            console.log('Avaliação adicionada com sucesso!');
            if (typeof onRatingChange === 'function') {
              onRatingChange(selectedStar);
            }
          })
          .catch((error) => {
            console.error('Erro ao adicionar avaliação: ', error);
          });
      }
    }
  }, [selectedStar, onRatingChange, isAuthenticated, gameId]);

  const handleStarClick = () => {
    if (!isAuthenticated) {
      alert('Por favor, faça login para adicionar/remover o jogo dos favoritos.');
      navigate('/auth');
      return;
    }

    setIsRotating(true);
  };

  useEffect(() => {
    const storedRating = localStorage.getItem(`rating_${gameId}`);
    if (storedRating) {
      const parsedRating = parseInt(storedRating, 10);
      setSelectedStar(parsedRating);
      setStarCount(parsedRating);
    }
  }, [gameId]);

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
          onClick={handleStarClick}
        />
      ))}
      <br />
      <p className={styles.starCount}>{isAuthenticated ? starCount : '0'}.0</p>
    </div>
  );
}










