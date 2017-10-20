var twitterKeys = require("./keys");
var spotifyKeys = require("./spotKey");
var twitter = require('twitter');
var spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");


// User inputs
var action = process.argv[2];
var selection = process.argv[3];
var movie = "";


// Use input to determine which action to take
function getInput() {
    if (action === "my-tweets") {
        getTweets();
    } else if (action === "spotify-this-song") {
        getSong();
    } else if (action === "movie-this") {
        getMovie();
    } else if (action === "do-what-it-says") {
        getText();
    }
};



// Retrieve tweets from Twitter
function getTweets() {

    var client = new twitter({
        consumer_key: twitterKeys.consumer_key,
        consumer_secret: twitterKeys.consumer_secret,
        access_token_key: twitterKeys.access_token_key,
        access_token_secret: twitterKeys.access_token_secret
    });



    var params = {screen_name: 'jutahfbi', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            console.log(error)
        } else if (!error) {
            for (i=0; i<tweets.length; i++) {
                var tweetData = tweets[i].created_at + ": " + tweets[i].text;
                console.log(tweetData);
            }
        }
    });
}



// Retrieve song info from Spotify
// =============== not working ===================
function getSong() {

    var spotifySong = new spotify({
        id: spotifyKeys.id,
        secret: spotifyKeys.secret
    });

    spotifySong.search({ type: 'track', query: selection, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            console.log(data.tracks.items[0].name + data.tracks.items[0].name);
        }

    });
}


// Retrieve movie info from OMDB
function getMovie() {
    var queryUrl = "http://www.omdbapi.com/?t=" + selection + "&y=&plot=short&apikey=40e9cece";

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title +
            "\nRelease Year: " + JSON.parse(body).Year +
            "\nRating: " + JSON.parse(body).Rated +
            "\nCountry: " + JSON.parse(body).Country +
            "\nLanguage: " + JSON.parse(body).Language +
            "\nPlot: " + JSON.parse(body).Plot +
            "\nActors: " + JSON.parse(body).Actors)
        }
    });
}


// Get text from random.txt
//=======================not working==============================
function getText() {
    fs.readFile("random.text", "utf-8", function (error, data) {
        if(error) {
            console.log(error);
        } else {
            var fromFile = data.split(", ");
            action = fromFile[0];
            selection = fromFile[1];
        }
    })
}

getInput();