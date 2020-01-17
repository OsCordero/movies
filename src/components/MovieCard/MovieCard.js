import React from 'react';
import './moviecard.scss';
const MovieCard = ({ movie }) => {
  return (
    <div className='card'>
      <img
        className='movie-image'
        src={`${process.env.REACT_APP_IMAGE_URL}${movie.poster_path}`}
        alt='Avatar'
      />
      <div className='card-content'>
        <h3>
          <b>{movie.original_title}</b>
        </h3>
        <p className='movie-description'>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
