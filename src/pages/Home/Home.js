import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './style.module.css';

import Header from '../../components/Header/Header';
import Category from '../../components/Category/Category';
import Thumb from "../../components/Thumb/Thumb"
import Error from "../Error/Error"

function Home() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const source = axios.CancelToken.source();

    const timeoutId = setTimeout(() => {
      if (isMounted) {
        source.cancel('Timeout');
        setErrorMessage('O servidor demorou para responder, tente mais tarde.');
        setIsLoading(false);
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
            setGames(response.data);
            setIsLoading(false);
            console.log(response.data);
            const uniqueGenres = [...new Set(response.data.flatMap(game => game.genre))];
            setGenres(uniqueGenres);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);

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
              setErrorMessage(
                'O servidor falhou em responder. Tente recarregar a página.'
              );
            }
          } else {
            if (isMounted && !errorMessage) {
              setErrorMessage(
                'O servidor não conseguirá responder por agora. Tente voltar novamente mais tarde.'
              );
            }
          }
        } else {
          if (isMounted && !errorMessage) {
            setErrorMessage(
              'Ocorreu um erro ao obter os dados. Verifique sua conexão com a internet.'
            );
          }
        }
      });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      source.cancel('Componente desmontado');
    };
  }, [errorMessage]);

  const handleSearch = () => {
    const filtered = games.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setGames(filtered);
    setNoResults(filtered.length === 0);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const filteredGames = selectedGenre
    ? games.filter((game) => game.genre === selectedGenre && game.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : games.filter((game) => game.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <>
          {!errorMessage ? (
            <>
              <Header onSearch={setSearchTerm} onSearchButtonClick={handleSearch} />
              <Thumb />
              <div className={style.containerSelectGenre}>
                <label htmlFor="genreSelect" className={style.categories}></label>
                <select 
                id="genreSelect" 
                value={selectedGenre} 
                onChange={handleGenreChange} 
                className={style.selectGenre}>
                  <option value="">Todos</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
              <p className={style.titleCategory}>{selectedGenre ? `JOGOS DE ${selectedGenre.toUpperCase()}` : 'TODOS OS JOGOS'}</p>
              {noResults ? (
                <p className={style.noResultsMessage}>Nenhum jogo encontrado.</p>
              ) : (
                <ul className={style.columnContainer}>
                  {Array.isArray(filteredGames) ? (
                    filteredGames.map((game) => (
                      <li key={game.id} className={style.columnItem}>
                        <div className={style.cardfilm}>
                          <img src={game.thumbnail} alt={game.title} className={style.thumb} />
                          <h5 className={style.genre}>{game.genre}</h5>
                          <h2 className={style.title}>{game.title}</h2>
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
        </>
      )}
    </div>
  );
}

export default Home;