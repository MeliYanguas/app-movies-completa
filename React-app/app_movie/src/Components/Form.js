import React from 'react';

const Form = ({ movie, setMovie, setMoviesListUpdated }) => {
  const handleInputChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  let { title, description, year } = movie;

  const sendData = () => {
    year = parseInt(year, 10);
    // validacion de los datos
    if (title === '' || description === '' || year <= 0) {
      alert('Revise los campos');
      return;
    }

    // consulta
    const requestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    };
    fetch('http://localhost:4000/movies', requestInit)
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

  return (
    <form onSubmit={sendData}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Título</label>
        <input name="title" onChange={handleInputChange} value={title} type="text" id="title" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Descripción</label>
        <input name="description" onChange={handleInputChange} value={description} type="text" id="description" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="year" className="form-label">Año</label>
        <input name="year" onChange={handleInputChange} value={year} type="number" id="year" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary form-control">Enviar</button>
    </form>
  );
};

export default Form;
