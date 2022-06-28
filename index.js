const express = require('express');
const app = express();
const port = 3000; //porta padrão
const mysql = require('mysql2');

const logo = String.raw`                                                            
                                                                                        
                         (((((((((((((                      
                  ((((((((((((((((((((((((((                
              ((((((((((((((((((((((((((((((((((            
            ((#########(((((((((((((((#########(((          
         (((############(((((((((((((############((((       
       ((#############%%%((((((((((%%%%#############(((     
     (((##########%%%%%%%%%(((((((%%%%%%%%%##########((((   
    (((##########%%%%%%%%%%%(((((%%%%%%%%%%%##########((((  
    (((##########%%%%%%%%%%%%%%%%%%%%%%%%%%%##########((((  
   (((((((((######%%%%%%%%%%%%%%%%%%%%%%%%%######(((((((((( 
   ((((((((((((((#####%%%%%%%%%%%%%%%%%#####((((((((((((((( 
   (((((((((((((((((%%%%&&&&%%%%%&&&&%%%((((((((((((((((((( 
   (((((((((((((((((((%%%&&&&%%%&&&%%%%(((((((((((((((((((( 
   ((((((((((((((((((((%%%%%%%%%%%%%%%((((((((((((((((((((( 
    ((((((((((((((((((((%%%%%%%%%%%%%(((((((((((((((((((((  
     ((((((((((((((((((####%%%%%%%####(((((((((((((((((((   
       (((((((((((((########%%%%%#######(((((((((((((((     
        ((((((((((#########################(((((((((((      
          ((((((((#########################(((((((((        
             ((((((((((###############(((((((((((           
               ((((((((((((((((((((((((((((((((             
                    ((((((((((((((((((((((        
                      A RATARIA COMEÇOU          
                                                                                                       
`;


function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : '',
    database : 'bookplay'
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

console.log(logo);

app.use(express.json());

//inicia o servidor
app.listen(port);
console.log('Toca liberada');


// app.get('/usuarios', (req, res) => execSQLQuery('SELECT * FROM usuarios', res));

//////////////////////////////// RATOEIRA ///////////////////////////////////

app.get('/usuarios/:id?', (req, res) => {
  let filter = '';
  if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM usuario' + filter, res);
});

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// LOGAR RATO ////////////////////////////////////////

app.get('/logar/:email?', (req, res) => {
  let filter = '';
  if(req.params.email) filter = ' WHERE email=' + req.params.email.substring(0,180);;
  execSQLQuery('SELECT * FROM usuario' + filter, res);
});

////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// MATA RATO ////////////////////////////////

app.delete('/usuarios/:id', (req, res) =>{
  execSQLQuery('DELETE FROM usuario WHERE id_usuario=' + parseInt(req.params.id), res);
});

////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////  METE RATO /////////////////////////

app.post('/usuarios', (req, res) => {
  const nome = req.body.nome.substring(0,150);
  const nasc = req.body.nasc.substring(0,150);
  const genero = req.body.genero.substring(0,150);
  const nick = req.body.nick.substring(0,150);
  const tel = req.body.tel.substring(0,150);
  const email = req.body.email.substring(0,180);
  const senha = req.body.senha.substring(0,150);
  execSQLQuery(`INSERT INTO usuario(nome, nasc, genero, nick, tel, email, senha) VALUES('${nome}', ${nasc}, '${genero}', '${nick}', ${tel}, '${email}', '${senha}')`, res);
});

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// ATUALIZAÇÃO RATEAL //////////////////////////////

app.patch('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const nome = req.body.nome.substring(0,150);
  const nasc = req.body.nasc.substring(0,150);
  const genero = req.body.genero.substring(0,150);
  const nick = req.body.nick.substring(0,150);
  const tel = req.body.tel.substring(0,150);
  const email = req.body.email.substring(0,180);
  const senha = req.body.senha.substring(0,150);
  execSQLQuery(`UPDATE usuario SET nome='${nome}', nasc=${nasc}, genero='${genero}', nick='${nick}', tel=${tel}, email='${email}', senha='${senha}' WHERE id_usuario=${id}`, res);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////