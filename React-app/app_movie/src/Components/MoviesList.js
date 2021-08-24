import React, { useState, useEffect } from 'react';

const MoviesList = ({
  movie, movies, setMovie, setMoviesListUpdated,
}) => {
  const handleDelete = (id) => {
    // consulta
    const requestInit = {
      method: 'DELETE',
    };
    fetch(`http://localhost:4000/movies/${id}`, requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));

    setMoviesListUpdated(true);
  };

  let { title, description, year } = movie;
  const handleEdit = (id) => {
    year = parseInt(year, 10);
    // validacion de los datos
    if (title === '' || description === '' || year <= 0) {
      alert('Revise los campos');
      return;
    }
    // consulta
    const requestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    };
    fetch(`http://localhost:4000/movies/${id}`, requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));

    // reiniciando el estado
    setMovie({
      title: '',
      description: '',
      year: 0,
    });

    setMoviesListUpdated(true);
  };

  // search bar

  const [searchTerm, setSearchTerm] = useState('');

  // pagination

  const [page, setPage] = useState(1);
  const MOVIES_PER_PAGE = 5;

  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  const selectedMovies = movies.slice(startIndex, startIndex + MOVIES_PER_PAGE);

  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    setTotalPages(Math.ceil(movies.length / MOVIES_PER_PAGE));
  }, [movies.length]);

  const pages = [...Array(totalPages).keys()].map((number) => number + 1);

  const handleClick = (number) => {
    setPage(number);
  };

  if (searchTerm === '') {
    var searching = false;
  } else {
    searching = true;
  }
  return (
    <div>
      <div className="searchBar">
        <input
          type="text"
          className="textField"
          placeholder="Search..."
          onChange={(e) => { setSearchTerm(e.target.value); }}
        />
      </div>
      <h2 className="center">Lista de pelis</h2>
      <p>
        Página:
        {page}
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Año</th>
          </tr>
        </thead>
        <tbody>
          { searching ? movies.filter(((movie) => {
            if (searchTerm === '') {
              return movie;
            } if (movie.title.toLowerCase().includes(searchTerm.toLowerCase())) {
              return movie;
            }
          })).map((movie) => (
            <tr key={movie.title}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.description}</td>
              <td>{movie.year}</td>
              <td>
                <div className="mb-3">
                  <button onClick={() => handleDelete(movie.id)} className="btn btn-danger">Eliminar</button>
                </div>
                <div className="mb-3">
                  <button onClick={() => handleEdit(movie.id)} className="btn btn-warning">Editar</button>
                </div>
              </td>
            </tr>
          ))

            : selectedMovies.filter(((movie) => {
              if (searchTerm === '') {
                return movie;
              } if (movie.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return movie;
              }
            })).map((movie) => (
              <tr key={movie.title}>
                <td>{movie.id}</td>
                <td>{movie.title}</td>
                <td>{movie.description}</td>
                <td>{movie.year}</td>
                <td>
                  <div className="mb-3">
                    <button onClick={() => handleDelete(movie.id)} className="btn btn-danger">Eliminar</button>
                  </div>
                  <div className="mb-3">
                    <button onClick={() => handleEdit(movie.id)} className="btn btn-warning">Editar</button>
                  </div>
                </td>
              </tr>
            ))}

        </tbody>
      </table>

      <div>
        {
          pages.map((number) => (
            <button
              className="btn btn-secondary mx-2"
              key={number}
              onClick={() => handleClick(number)}
            >
              {number}
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default MoviesList;
