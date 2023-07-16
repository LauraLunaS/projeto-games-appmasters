import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../services/firebaseConnection';
import { deleteDoc, collection, doc, getDoc, setDoc, addDoc, } from 'firebase/firestore';
import styles from './style.module.css';


export default function Rating({ gameId }) {
  const [rating, setRating] = useState(0);
  const [lastClickedRating, setLastClickedRating] = useState(0);
  const [animationActive, setAnimationActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userRating = JSON.parse(localStorage.getItem('userRating')) || {};
    if (userRating.hasOwnProperty(gameId)) {
      setLastClickedRating(userRating[gameId]);
    }
    const isAnimationActive = localStorage.getItem('animationActive');
    setAnimationActive(isAnimationActive === 'true');
  }, [gameId]);

  const handleClick = (value) => {
    if (!auth.currentUser) {
      alert('Faça login/cadastro para avaliar');
      navigate('/auth');
      return;
    }

    setRating(value);
    setLastClickedRating(value);
    console.log('Avaliação:', value);

    const ratingData = {
      id: gameId,
      rating: value,
    };

    handleRating(ratingData);
  };

  const handleRating = async (ratingData) => {
    try {
      const docRef = doc(collection(db, 'ratings'));
      await setDoc(docRef, ratingData);
      console.log('Dados enviados com sucesso! Documento ID:', docRef.id);

      const userRating = JSON.parse(localStorage.getItem('userRating')) || {};
      userRating[gameId] = ratingData.rating;
      localStorage.setItem('userRating', JSON.stringify(userRating));

      localStorage.setItem('animationActive', 'true');
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  return (
    <div className={styles.rating}>
      {[1, 2, 3, 4, 5].map((value) => (
        <div
          key={value}
          className={`${styles.star} ${value <= rating ? styles.active : ''}`}
          onClick={() => handleClick(value)}
        />
      ))}<p className={styles.clickRating}>{lastClickedRating}</p>
    </div>
  );
}




























