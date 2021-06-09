const { response } = require('express');
const express = require('express');
const app = express();

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '46.38.249.171',
    user     : 'k140427_matyChat',
    password : 'ilsA927$U!t2l7n8',
    database : 'k140427_matyChat'
});
connection.connect();

app.get('/ruok', function (req, res) {
  res.send('Im Fine!');
});


app.get('/api/v1/user', function (req, res) {
  if(req.query.id){
    getUser(req.query.id, function (error, results, fields) {
      if (error) console.log(error);
      res.json(results);
    });
  }
});
function getUser(id, callback){
  connection.query('SELECT * FROM tUser WHERE kUser = ?', [id], callback);
}




app.get('/api/v1/message', function (req, res) {
  if(req.query.id){
    getMessage(req.query.id, function (error, results, fields) {
      if (error) console.log(error);
      res.json(results);
    });
  }
});

app.post('/api/v1/message', function (req, res) {
  //if(req.query.id){
    postMessage(req.query.userId, req.query.chatId, req.query.created, req.query.message, function (error, results, fields) {
      if (error) console.log(error);
      res.json(results);
    });
  //}
});

function getMessage(id, callback){
  connection.query('SELECT * FROM tMessage WHERE kReceivingChat = ?', [id], callback);
}

function postMessage(userId, chatId, created, message, callback){
  // TODO : hier muss noch Content gehandelt werden
  let cContentPath = "";
  connection.query(
    'INSERT INTO tMessage (kSendingUser, kReceivingChat, dReceivedByServer, dCreated, cContentPath, cContentText) VALUES(?, ?, NOW(), ?, ?, ?) ',
    [userId, chatId, created, cContentPath, message], callback
  );
}

app.listen(3000);