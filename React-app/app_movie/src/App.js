import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import MoviesList from './Components/MoviesList';
import Form from './Components/Form';

function App() {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    year: 0,
  });

  const [movies, setMovies] = useState([]);

  const [moviesListUpdated, setMoviesListUpdated] = useState(false);

  useEffect(() => {
    const getMovies = () => {
      fetch('http://localhost:4000/movies')
        .then((res) => res.json())
        .then((res) => setMovies(res));
    };
    getMovies();
    setMoviesListUpdated(false);
  }, [moviesListUpdated]);

  return (
    <>
      <Navbar brand="app Movies" />
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <MoviesList movie={movie} movies={movies} setMovie={setMovie} setMoviesListUpdated={setMoviesListUpdated} />

          </div>
          <div className="col-md-5">
            <h2 className="center">Formulario</h2>
            <Form movie={movie} setMovie={setMovie} setMoviesListUpdated={setMoviesListUpdated} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
