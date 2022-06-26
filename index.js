const express = require('express');
const app = express();
const port = 3000; //porta padrão
const mysql = require('mysql2');


function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : '',
    database : 'teste'
  });

  connection.query(sqlQry, (error, results, fields) => {
    if(error) 
       res.json(error);
      // console.log(error);
    else
       res.json(results);
      // console.log(results);
    connection.end();
    console.log('Movimento na toca');
  });

};

app.use(express.json());

//inicia o servidor
app.listen(port);
console.log('A rataria começou');


// app.get('/usuarios', (req, res) => execSQLQuery('SELECT * FROM usuarios', res));

//////////////////////////////// RATOEIRA ///////////////////////////////////

app.get('/usuarios/:id?', (req, res) => {
  let filter = '';
  if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM usuarios' + filter, res);
});

////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// MATA RATO ////////////////////////////////

app.delete('/usuarios/:id', (req, res) =>{
  execSQLQuery('DELETE FROM usuarios WHERE ID=' + parseInt(req.params.id), res);
});

////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////  METE RATO /////////////////////////

app.post('/usuarios', (req, res) => {
  const nome = req.body.nome.substring(0,150);
  const idade = req.body.idade.substring(0,150);
  execSQLQuery(`INSERT INTO usuarios(nome, idade) VALUES('${nome}','${idade}')`, res);
});

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// ATUALIZAÇÃO RATEAL //////////////////////////////

app.patch('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const nome = req.body.nome.substring(0,150);
  const idade = parseInt(req.body.idade);
  execSQLQuery(`UPDATE usuarios SET nome='${nome}', idade='${idade}' WHERE ID=${id}`, res);
});

/////////////////////////////////////////////////////////////////