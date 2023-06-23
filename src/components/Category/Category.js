import React from 'react';
import style from "./style.module.css"

export default function Category({ genres, onGenreChange }) {
  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    console.log('Selected genre:', selectedGenre);
    onGenreChange(selectedGenre);
  };

  return (
    <>
      <h2>Categorias</h2>
      <div className={style.containerCateogry}>
        <select onChange={handleGenreChange}>
          <option value="">Todos</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

