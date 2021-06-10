const mysql = require("mysql");
var connection = mysql.createConnection({
  host: "46.38.249.171",
  user: "k140427_matyChat",
  password: "ilsA927$U!t2l7n8",
  database: "k140427_matyChat",
});
connection.connect();




function getUser(kUser, callback) {
  connection.query("SELECT * FROM tUser WHERE kUser = ?", 
    [kUser], 
    callback
  );
}
function postUser(cUsername, cMail, cPasswort, callback){
  connection.query(
    "INSERT INTO tUser (cUsername, cMail, bConfirmed, cPassword, dLastActive, cDescription, cProfilePicturePath) VALUES(?, ?, 0, ?, NOW(), '', '')",
    [cUsername, cMail, cPasswort],
    callback
  );
}



function getMessage(kReceivingChat, callback) {
  connection.query(
    "SELECT * FROM tMessage WHERE kReceivingChat = ?",
    [kReceivingChat],
    callback
  );
}
function postMessage(kSendingUser, kReceivingChat, dCreated, message, callback) {
  // TODO : hier muss noch Content gehandelt werden
  let cContentPath = "";
  let cContentText = message;
  connection.query(
    "INSERT INTO tMessage (kSendingUser, kReceivingChat, dReceivedByServer, dCreated, cContentPath, cContentText) VALUES(?, ?, NOW(), ?, ?, ?) ",
    [kSendingUser, kReceivingChat, dCreated, cContentPath, cContentText],
    callback
  );
}


function getChat(userId, callback) {
  connection.query(
    "SELECT tChat.* FROM tChat JOIN tChatUser ON tChat.kChat = tChatUser.kChat WHERE tChatUser.kUser = ?",
    [userId],
    callback
  );
}
function postChat(cName, cDescription, callback) {
  
  let x = connection.query(
    "INSERT INTO tChat (cName, cDescription, cPicturePath, dErstellt) VALUES(?, ?, '', NOW())",
    [cName, cDescription],
    function (error, results, fields) {
      // connection.query(
      //   "INSERT INTO tChatUser (kChat, kUser) VALUES(?, ?)",
      //   [x.ID],
      //   callback
      // );


      // TODO : in dem log hier steht die ID des Chats, die muss jetzt noch in ChatUser richtig hinterlegt werden. 
      // dazu muss der Chat aber ein array an nutzern übergeben bekommen
      console.log(results);
      callback(error, results, fields);
    }
  );
}


module.exports = {getUser, postUser, getMessage, postMessage, getChat, postChat}