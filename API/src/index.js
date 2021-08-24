const express = require('express');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const cors = require('cors');

const parse = require('csv-parse');
const fs = require('fs');
const routes = require('./routes');

const dbSettings = require('../config.json');

const app = express();

// settings
app.set('port', process.env.PORT || 4000);
const port = app.get('port');

// middlewares
app.use(express.json());
app.use(myConnection(mysql, dbSettings, 'single'));
app.use(cors());

// routes
app.use(routes);

// starting the server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`app listening at http://localhost:${port}`);
});

/* --leer archivo csv--*/

const csvData = [];

fs.createReadStream('./peliculas.csv')
  .pipe(
    parse({
      delimiter: ';',
    }),
  )
  .on('data', (dataRow) => {
    csvData.push(dataRow);
  })
  .on('end', () => {
    // insert DATA
    /*
    csvData.map((data) => {
      const connection = mysql.createConnection(dbSettings);
      connection.query(`
INSERT INTO movies (title,description,year)
VALUES ("${data[0]}","${data[1]}",${data[2]})`, (err, rows) => {
        if (err) throw err;
      });

      connection.end();
    }); */
  });
