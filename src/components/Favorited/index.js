import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';

export default function Favorited() {
    const [favoriteGames, setFavoriteGames] = useState([]);
  
    const handleFavoritesClick = async () => {
      try {
        console.log('Obtendo jogos favoritos...');
        const favoritesCollection = collection(db, 'fav');
        const querySnapshot = await getDocs(favoritesCollection);
  
        const favoriteGamesData = [];
        querySnapshot.forEach((doc) => {
          const game = doc.data();
          favoriteGamesData.push(game);
        });
  
        console.log('Jogos favoritos:', favoriteGamesData);
  
        setFavoriteGames(favoriteGamesData);
      } catch (error) {
        console.log('Erro ao recuperar jogos favoritos:', error);
      }
    };
  
    return (
      <div>
        <button onClick={handleFavoritesClick}>Favoritos</button>
        {favoriteGames.map((game) => (
          <div key={game.id}>{game.title}</div>
        ))}
      </div>
    );
  }
  