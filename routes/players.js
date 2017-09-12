var express = require('express');
var router = express.Router();

// const Datastore = require('nedb');

// const db = new Datastore({
//     filename:
//       '/usr/src/app/node_modules/players.db'
//   , autoload: true
// });

var db = undefined;

// db.loadDatabase(err => {
//   if (err) {
//     console.log("players db err");

//     throw err;
//   }
// });

// GET players
router.get('/', function(req, res, next) {

  if (db === undefined || db === null) {
    res.send('no db');

    return;
  }
  
  db.find({ team: 5 }, (err, teams) => {
    if (err) {
      res.send('db error');

      throw err;
    }

    if (teams.length === 0) {
      res.send("no info found");
    }

    const team = teams[0];

    console.log("returning players", team);

    team.players.forEach(player => {
      console.log("player from db", player);
    });

    // res.send(players);
    res.jsonp(team.players);
  });

});

module.exports = {
  router: router,
  setDb: function (newDb) {
    db = newDb;
  }
};
