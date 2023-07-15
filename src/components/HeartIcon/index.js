import React, { useState, useEffect } from 'react';
import { db, auth } from '../../services/firebaseConnection';
import { addDoc, deleteDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import style from './style.module.css';

export default function GameList({ gameId, gameTitle}) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkFavorite();
    checkAuthentication();
  });

  const checkFavorite = async () => {
    const favoritesCollection = collection(db, 'fav');
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

  const showAlertMessage = (message) => {
    setShowAlert(true);
    console.log(message); 
  };
  
  const addToFavorites = async () => {
    console.log('gameId:', gameId);
    
    if (isAuthenticated) { 
      try {
      if (!isFavorited) {
      const game = {
        title: gameTitle,
        id: gameId
      };

      const favoritesCollection = collection(db, 'fav');
      await setDoc(doc(favoritesCollection, gameTitle), game)
      console.log('Jogo favorito adicionado com sucesso!')
      showAlertMessage('Jogo favorito adicionado com sucesso')
      setIsFavorited(true)
      } else {
      const favoritesCollection = collection(db, 'fav');
      await deleteDoc(doc(favoritesCollection, gameTitle));
      console.log('Jogo removido dos favoritos com sucesso!');
      setIsFavorited(false);
    }
      } catch (error) {
        console.error('Erro ao gerenciar jogo favorito:', error);
      }
      } else {
        alert('Por favor, faça login para adicionar/remover o jogo dos favoritos.');
        navigate('/auth');
      }
  }
  
  return (

    <button onClick={addToFavorites} className={style.heartIcon}>
      {isFavorited ? '❤️' : '🤍'}
    </button>
  
  );
}

