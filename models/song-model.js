const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

const Artist = require('./artist-model');
const Genre = require('./genre-model');

//////////
// YOUR CODE HERE:
//////////
const Song = sequelizeConnection.define('song', {
  title: {
    type: Sequelize.STRING,
    validate: {
      len: [1, 250]
    }
  },
  // date_released: {type: Sequelize.STRING},
  // name_of_album: {type: Sequelize.STRING},
  youtube_url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
      len: [1, 50]
    }
  }
})

//With song being the source, and artist being the target,
//the below method adds an artistId to the song table.
Song.belongsTo(Artist)

///////////////////////////////////////////////////////////
// When performing the belongsToMany method, methods to  //
// leading in the direction(s) of the association should //
// be listed in the same file.                           //
///////////////////////////////////////////////////////////
Genre.belongsToMany(Song, {through: 'songGenre', foreignKey: 'genreId'});
Song.belongsToMany(Genre, {through: 'songGenre', foreignKey: 'songId'});

module.exports = Song;
