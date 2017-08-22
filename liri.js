//Twitter API Code
var keys = require("./keys.js")

var Twitter = require("twitter");

var twitterKeys = keys.twitterKeys;

var client = new Twitter(twitterKeys);

var params = {screen_name: 'MyjimmyJake'};

if(process.argv[2] == "my-tweets"){
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(i = 0; i < tweets.length; i++){
      console.log(tweets[i].text);

      console.log(tweets[i].created_at);
    }
  }
});
}
//OMDB Code
var request = require("request");

var movieName = process.argv[3];

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

if(process.argv[2] == "movie-this"){
request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    console.log("Title:"+ JSON.parse(body).Title +"\nRelease Year:"+ JSON.parse(body).Year + "\nIMDB Rating:" + JSON.parse(body).imdbRating + "\n" + JSON.parse(body).Ratings[1].Source + ":" + JSON.parse(body).Ratings[1].Value + "\nPlot:" + JSON.parse(body).Plot + "\nActors:" + JSON.parse(body).Actors);

  }
});
}
//Spotify API Code
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: "f72ffb1fe2fc452f95b7c22700e89f12",
  secret: "2721d71974cd4a7ab7062ad8b1edde71"
});

if(process.argv[2] == "spotify-this-song"){
spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

  console.log("Artist:" + data.tracks.items[0].artists[0].name + "\nSong Name:" + data.tracks.items[0].name + "\nPreview Link:" + data.tracks.items[0].external_urls.spotify + "\nAlbum Name:" + data.tracks.items[0].album.name);

});
}

//do-what-it-says Code
var fs = require("fs");

if(process.argv[2] == "do-what-it-says"){
fs.readFile("random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }

  var dataArr = data.split(",");

  spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log("Artist:" + data.tracks.items[0].artists[0].name + "\nSong Name:" + data.tracks.items[0].name + "\nPreview Link:" + data.tracks.items[0].external_urls.spotify + "\nAlbum Name:" + data.tracks.items[0].album.name);

  });

});
}
