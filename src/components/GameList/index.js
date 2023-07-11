import React, { useState, useEffect } from 'react';
import { db, auth } from '../../services/firebaseConnection';
import { addDoc, deleteDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import style from './style.module.css';

export default function GameList({ gameTitle, genre, thumbnail }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkFavorite();
    checkAuthentication();
  }, []);

  const checkFavorite = async () => {
    const favoritesCollection = collection(db, 'favoritos');
    const gameDoc = doc(favoritesCollection, gameTitle);
    const docSnapshot = await getDoc(gameDoc);

    if (docSnapshot.exists()) {
      setIsFavorited(true);
    } else {
      setIsFavorited(false);
    }
  };

  const checkAuthentication = () => {
    auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });
  };

  const handleFavorite = async () => {
    if (isAuthenticated) {
      try {
        if (!isFavorited) {
          const game = {
            title: gameTitle,
            genre: genre,
            thumbnail: thumbnail, 
            isFavorited: true,
          };

          const favoritesCollection = collection(db, 'favoritos');
          await setDoc(doc(favoritesCollection, gameTitle), game);
          console.log('Jogo favorito adicionado com sucesso!');
          alert('Jogo favorito adicionado com sucesso!');
          setIsFavorited(true);
        } else {
          const favoritesCollection = collection(db, 'favoritos');
          await deleteDoc(doc(favoritesCollection, gameTitle));
          console.log('Jogo removido dos favoritos com sucesso!');
          alert('Jogo removido dos favoritos com sucesso!');
          setIsFavorited(false);
        }
      } catch (error) {
        console.error('Erro ao gerenciar jogo favorito:', error);
      }
    } else {
      alert('Por favor, faça login para adicionar/remover o jogo dos favoritos.');
      navigate('/auth');
    }
  };

  return (
    <button onClick={handleFavorite} className={style.heartIcon}>
      {isFavorited ? '❤️' : '🤍'}
    </button>
  );
}



