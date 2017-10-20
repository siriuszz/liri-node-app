var twitterKeys = require("./keys");
var twitter = require('twitter');
var spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");


// User inputs
var action = process.argv[2];
var selection = process.argv[3];
var myTweets = "";


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

    for (var key in twitterKeys) {
        var client = new twitter({
            consumer_key: twitterKeys.consumer_key,
            consumer_secret: twitterKeys.consumer_secret,
            access_token_key: twitterKeys.access_token_key,
            access_token_secret: twitterKeys.access_token_secret
        });
    }

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
function getSong() {

    var spotifySong = new spotify;
    spotifySong.search({ type: 'track', query: selection }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            console.log(data);
        }

    });
}


getInput();