import React, { useEffect, useState } from 'react';
import { db } from '../../services/firebaseConnection';
import { collection, getDocs, query, where } from 'firebase/firestore';

import style from './style.module.css';
import GameList from '../../components/GameList'

export default function Favorites() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  const fetchGenres = async () => {
    try {
      const gamesCollection = collection(db, 'favoritos');
      const snapshot = await getDocs(gamesCollection);
      const genresData = Array.from(new Set(snapshot.docs.map((doc) => doc.data().genre)));
      setGenres(genresData);
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const gamesCollection = collection(db, 'favoritos');
        let gamesQuery = query(gamesCollection);

        if (searchTitle) {
          const caseInsensitiveSearchTitle = searchTitle.toLowerCase();
          gamesQuery = query(gamesCollection, where('title', '>=', caseInsensitiveSearchTitle));
        }

        if (selectedGenre) {
          gamesQuery = query(gamesCollection, where('genre', '==', selectedGenre));
        }

        const snapshot = await getDocs(gamesQuery);
        const gameData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setGames(gameData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar jogos:', error);
      }
    };

    fetchGames();
  }, [searchTitle, selectedGenre]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1 className={style.title}>Jogos Favoritos</h1>
      <div className={style.containerFilter}>
        {/* Input de filtro */}
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Filtrar por título"
          className={style.input}
        />

        {/* Select de gêneros */}
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className={style.select}
        >
          <option value="">Todos os gêneros</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {games.length === 0 ? (
        <div>Nenhum jogo correspondente à busca.</div>
      ) : (
        <ul className={style.container}>
          {games.map((game) => (
            <li key={game.id} className={style.cardGame}>
              <GameList gameTitle={game.title} genre={game.genre} thumbnail={game.thumbnail} />
              {game.thumbnail && (
                <img src={game.thumbnail} alt="Thumbnail" className={style.thumbnail} />
              )}
              <p className={style.genre}>{game.genre}</p>
              <h2 className={style.titleGame}>{game.title}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}




