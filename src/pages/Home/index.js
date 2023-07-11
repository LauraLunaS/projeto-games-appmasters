import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './style.module.css';

import Header from '../../components/Header';
import Thumb from '../../components/Thumb';
import Load from '../../components/Load';
import Error from "../Error";
import Rating from "../../components/Rating"
import GameList from '../../components/GameList'
import iconGroup from '../../assets/iconGroup.png'

export default function Home() {
  const [games, setGames] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [filteredGames, setFilteredGames] = useState([]);

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

  const handleSearch = () => {
    const filtered = filteredGames.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    setFilteredGames(filtered);
    setNoResults(filtered.length === 0);
  };
  
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };
  

  return (
    <div>
      {!errorMessage ? (
        <>
          <div className={style.containerSelectGenre}>
          <img src={iconGroup} className={style.iconGroup}></img>
          <p className={style.titleCategory}>
            {selectedGenre ? `JOGOS DE ${selectedGenre.toUpperCase()}` : 'TODOS OS JOGOS'}
          </p>
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
          </div>
          {isLoadingData ? (
            <Load />
          ) : noResults ? (
            <>
            <p className={style.noResultsMessage}>Nenhum jogo encontrado.</p>
            </>
          ) : (
            <ul className={style.columnContainer}>
              {Array.isArray(filteredGames) ? (
                filteredGames.map((game) => (
                  <li key={game.id} className={style.columnItem}>
                    <div className={style.cardGame}>
                      <GameList gameTitle={game.title} genre={game.genre} thumbnail={game.thumbnail} />
                      <img src={game.thumbnail} alt={game.title} className={style.thumb} />
                      <h5 className={style.genreGame}>{game.genre}</h5>
                      <h2 className={style.titleGame}>{game.title}</h2>
                      <div className={style.linha}></div>
                      <h5 className={style.descGame}>Aqui irá ter pequena descrição do jogo que será colocada para cada game</h5>
                      <Rating />
                    </div>
                  </li>
                ))
              ) : (
                <div>Erro ao obter a lista de jogos.</div>
              )}
            </ul>
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



