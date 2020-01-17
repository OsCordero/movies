import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from './../../../actions/moviesActions';
import './home.scss';
import MovieCard from './../../MovieCard/MovieCard';
function Home(props) {
  useEffect(() => {
    props.fetchMovies();
  });

  const showMovies = props.movies.length > 0 ? true : false;
  return (
    <div className='home'>
      {showMovies &&
        props.movies.map(movie => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
    </div>
  );
}

const mapStateToProps = state => {
  return { movies: state.movies.moviesList };
};
export default connect(mapStateToProps, { fetchMovies })(Home);
