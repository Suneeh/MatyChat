const { response } = require("express");
const express = require("express");


const app = express();

const db = require('./helper/database.js');



app.get("/ruok", function (req, res) {
  res.send("Im Fine!");
});



/*
  * ================================================================================================
  * USER
  * ================================================================================================
*/
app.get("/api/v1/user", function (req, res) {
  if (req.query.kUser) {
    db.getUser(
      req.query.kUser, 
      function (error, results, fields) {
      if (error) {
        console.log(error);
      }
      res.json(results);
    });
  }
});

app.post("/api/v1/user", function (req, res) {
    db.postUser(
      req.query.cUsername,
      req.query.cMail,
      req.query.cPasswort,
      function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});




/*
  * ================================================================================================
  * MESSAGE
  * ================================================================================================
*/

/*
  * takes the kReceivingChat 
  * @returns all messages in the Chat
*/
app.get('/api/v1/message', function (req, res) {
  if (req.query.kReceivingChat) {
      db.getMessage(
        req.query.kReceivingChat, 
        function (error, results, fields) {
          if (error) {
            console.log(error);
          }
          res.json(results);
      });
  } else {
      res.json({ "message": "Try giving me an ID!"});
  }
});

/*
  * takes UserID 
  * takes ChatID 
  * takes Crated Time 
  * takes Message
  * @returns rows affected
*/
app.post('/api/v1/message', function (req, res) {
  db.postMessage(
    req.query.kSendingUser, 
    req.query.kReceivingChat, 
    req.query.dCreated, 
    req.query.message, 
    function (error, results, fields) {
      if (error) {
        console.log(error);
      }
      res.json(results);
  });
});


/*
  * ================================================================================================
  * Chat
  * ================================================================================================
*/

/*
  * 
  * @returns
*/
app.get('/api/v1/chat', function (req, res) {
  
});

/*
  * 
  * 
  * 
  * 
  * @returns 
*/
app.post('/api/v1/chat', function (req, res) {
  db.postChat(
    req.query.cName,
    req.query.cDescription,
    function(error, results, fields){
      if (error) console.log(error);
      res.json(results);
    }
  )
});

app.listen(187);