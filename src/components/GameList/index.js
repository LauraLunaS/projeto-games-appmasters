import React, { useState, useEffect } from 'react';
import { db, auth } from '../../services/firebaseConnection';
import { addDoc, deleteDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import style from './style.module.css';

export default function GameList({ gameId, gameTitle }) {
  const [isLiked, setIsLiked] = useState(false);

  const addToFavorites = async () => {
    console.log('gameId:', gameId);
    
    try {
      const game = {
        title: gameTitle,
        id: gameId
      };

      const favoritesCollection = collection(db, 'fav');
      await setDoc(doc(favoritesCollection, gameTitle), game)
      console.log('Jogo favorito adicionado com sucesso!');
      setIsLiked(true)
    } catch (error) {
      console.log('Deu ruim de novo', error.message);
    }
  }
  
  return (
    <button onClick={addToFavorites} className={style.heartIcon}>
      {isLiked ?  '❤️' : '🤍'}
    </button>
  );
}

