import React, { useState, useEffect } from 'react';
import { db, auth } from '../../services/firebaseConnection';
import { deleteDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import style from './style.module.css';

export default function GameList({ gameId, gameTitle }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkFavorite();
  }, [gameTitle]);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const user = auth.currentUser;
      setIsAuthenticated(!!user);
    };

    checkUserAuthentication();
  }, []);

  const checkFavorite = async () => {
    const favoritesCollection = collection(db, 'favorites');
    const gameDoc = doc(favoritesCollection, gameTitle);
    const docSnapshot = await getDoc(gameDoc);

    if (docSnapshot.exists()) {
      setIsFavorited(true);
    } else {
      setIsFavorited(false);
    }
  };

  const addToFavorites = async () => {
    if (isAuthenticated) {
      try {
        if (!isFavorited) {
          const game = {
            title: gameTitle,
            id: gameId
          };

          const favoritesCollection = collection(db, 'favorites');
          await setDoc(doc(favoritesCollection, gameTitle), game);
          console.log('Jogo favorito adicionado com sucesso!');
          alert('Jogo favorito adicionado com sucesso');
          setIsFavorited(true);
        } else {
          const favoritesCollection = collection(db, 'favorites');
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
    <button onClick={addToFavorites} className={style.heartIcon}>
      {isFavorited ? '❤️' : '🤍'}
    </button>
  );
}

