import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from './../../../actions/moviesActions';
function Home(props) {
  useEffect(() => {
    props.fetchMovies();
  }, []);
  return (
    <div>
      <h1>welcome!</h1>
    </div>
  );
}

export default connect(null, { fetchMovies })(Home);
