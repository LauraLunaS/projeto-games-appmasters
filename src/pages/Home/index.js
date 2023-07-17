import React, { useState, useEffect } from 'react';
import { db, auth } from '../../services/firebaseConnection';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import axios from 'axios';
import style from './style.module.css';

import Header from '../../components/Header';
import Load from '../../components/Load';
import Error from "../Error";
import Rating from "../../components/Rating"
import GameList from '../../components/HeartIcon'
import Thumb from '../../components/Thumb'
import iconGroup from '../../assets/iconGroup.png'

import AuthenticationChecker from '../../components/AuthenticationChecker';

export default function Home() {
  const [games, setGames] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [filteredGames, setFilteredGames] = useState([]);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [ratedGames, setRatedGames] = useState([]);
  const [selectedStars, setSelectedStars] = useState('');
  const [ascendingOrder, setAscendingOrder] = useState(null);


  useEffect(() => {
    let isMounted = true;

    const source = axios.CancelToken.source();

    const timeoutId = setTimeout(() => {
      if (isMounted) {
        source.cancel('Timeout');
        setErrorMessage('O servidor demorou para responder, tente mais tarde.');
        setIsLoadingData(false);
      }
    }, 5000);

    axios
      .get('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/', {
        cancelToken: source.token,
        headers: {
          'dev-email-address': 'lauraluna.siqueira@hotmail.com',
        },
      })
      .then((response) => {
        clearTimeout(timeoutId);
        if (isMounted) {
          if (!axios.isCancel(response)) {
            console.log(response.data);
            setGames(response.data);
            const uniqueGenres = [...new Set(response.data.flatMap((game) => game.genre))];
            setGenres(uniqueGenres);
            setIsLoadingData(false);
          }
        }
      })
      .catch((error) => {
        console.error(error);

        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else if (error.response) {
          const { status } = error.response;
          if (
            status === 500 ||
            status === 502 ||
            status === 503 ||
            status === 504 ||
            status === 507 ||
            status === 508 ||
            status === 509
          ) {
            if (isMounted) {
              setErrorMessage('O servidor falhou em responder. Tente recarregar a página.');
              setIsLoadingData(false);
            }
          } else {
            if (isMounted && !errorMessage) {
              setErrorMessage('O servidor não conseguirá responder por agora. Tente voltar novamente mais tarde.');
              setIsLoadingData(false);
            }
          }
        } else {
          if (isMounted && !errorMessage) {
            setErrorMessage('Ocorreu um erro ao obter os dados. Verifique sua conexão com a internet.');
            setIsLoadingData(false);
          }
        }
      });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      source.cancel('Componente desmontado');
    };
  }, [errorMessage]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = games;

      if (selectedGenre) {
        filtered = filtered.filter((game) => game.genre === selectedGenre);
      }

      if (searchTerm) {
        filtered = filtered.filter((game) =>
          game.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredGames(filtered);
      setNoResults(filtered.length === 0);
    };

    applyFilters();
  }, [games, selectedGenre, searchTerm]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };


  function truncateDescription(description, maxLength) {
    if (description.length <= maxLength) {
      return description;
    } else {
      const lastSpaceIndex = description.lastIndexOf(' ', maxLength);
      const truncatedDescription = description.substring(0, lastSpaceIndex) + '...';
      return truncatedDescription;
    }
  }

  const fetchFavoriteGames = async () => {
    const querySnapshot = await getDocs(collection(db, 'favorites'));
    const favoriteGamesData = querySnapshot.docs.map((doc) => doc.data());
    setFavoriteGames(favoriteGamesData);
  };
  
  useEffect(() => {
    fetchFavoriteGames();
  }, []);
  
  const handleFavoritesButtonClick = async () => {
    await fetchFavoriteGames(); 
    const filteredGames = games.filter((game) => {
      return favoriteGames.some(
        (favoriteGame) =>
          favoriteGame.id === game.id && favoriteGame.title === game.title
      );
    });
    setGames(filteredGames);
  };

  const fetchRatedGames = async () => {
    const q = query(collection(db, 'ratings'), orderBy('rating', ascendingOrder ? 'asc' : 'desc'));
    const querySnapshot = await getDocs(q);
    const ratedGamesData = querySnapshot.docs.map((doc) => doc.data());
    setRatedGames(ratedGamesData);
  };
  
  useEffect(() => {
    fetchRatedGames();
  }, );
  
  const handleStarClick = async () => {
    await fetchRatedGames();
    const filteredGames = games.filter((game) => {
      return ratedGames.some(
        (ratedGame) =>
          ratedGame.id === game.id 
      );
    });
    setGames(filteredGames);
    setAscendingOrder(!ascendingOrder);
  };
  

  return (
    <div>
      {!errorMessage ? (
        <>
          <Header showFavoriteGames={true}/>
          <Thumb />
          <div className={style.containerSelectGenre}>
            <img src={iconGroup} className={style.iconGroup} alt="Icon Group" />
            <p className={style.titleCategory}>
              {selectedGenre ? `JOGOS DE ${selectedGenre.toUpperCase()}` : 'TODOS OS JOGOS'}
            </p>
            <div className={style.searchContainer}>
              <input type="text" className={style.searchInput} value={searchTerm} onChange={handleSearch} />
              <div className={style.containerStar}>
              <button onClick={handleStarClick} className={style.selectStar}>⭐</button>
            </div>
            </div>
            <label htmlFor="genreSelect" className={style.categories}></label>
            <select
              id="genreSelect"
              value={selectedGenre}
              onChange={handleGenreChange}
              className={style.selectGenre}
            >
              <option value="">Todos</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <AuthenticationChecker>
            {(isLoggedIn) => (
              <div className={style.containerHeart}>
                {isLoggedIn ? <button onClick={handleFavoritesButtonClick} className={style.hearticon}>🤍</button> : <p></p>}
              </div>
            )}
          </AuthenticationChecker>
          </div>
          {isLoadingData ? (
            <Load />
          ) : noResults ? (
            <p className={style.noResultsMessage}>Nenhum jogo encontrado.</p>
          ) : (
            <>
            <ul className={style.columnContainer}>
              {Array.isArray(filteredGames) ? (
                filteredGames.map((game) => (
                  <li key={game.id} className={style.columnItem}>
                    <div className={style.cardGame}>
                      <GameList gameId={game.id} gameTitle={game.title} />
                      <img src={game.thumbnail} alt={game.title} className={style.thumb} />
                      <h5 className={style.genreGame}>{game.genre}</h5>
                      <h2 className={style.titleGame}>{game.title}</h2>
                      <div className={style.linha}></div>
                      <h5 className={style.descGame}>{truncateDescription(game.short_description, 106)}</h5>
                      <Rating gameId={game.id}/>
                    </div>
                  </li>
                ))
              ) : (
                <div>Erro ao obter a lista de jogos.</div>
              )}
            </ul>  
            </>
          )}
        </>
      ) : (
        <>
          <Error errorMessage={errorMessage} />
        </>
      )}
    </div>
  );
}








