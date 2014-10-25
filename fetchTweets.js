var Twit = require('twit')
var MongoClient = require('mongodb').MongoClient
var analyze = require('Sentimental').analyze
var sentiment = require('sentiment')

var T = new Twit({
    consumer_key:         'nacarcJpWnfg0hvX7HdoTMMu9'
  , consumer_secret:      'rU5Fb3jltmf7yvRJXIElLR70p2tXGjLpynkc9r1zr8JndkRI16'
  , access_token:         '2761822677-wJbrgcfNMCA0qOgnK2QZpeiQqFhhCy98RIw9p3S'
  , access_token_secret:  'EzjqOGpqq7FNjNmwlAGlxkOdas3xa0qtWYGpb2PJaWsQF'
})

MongoClient.connect('mongodb://127.0.0.1:27017/coinleach', function(err, db) {
    if(err) throw err;

    var tweets = db.collection('tweets');
    //fetchByTag(tweets, 'bitcoin');
    streamTweets(tweets, 'bitcoin')
    streamTweets(tweets, 'cryptocurrency')
});

function streamTweets(collection, hashTag) {
    var stream = T.stream('statuses/filter', { track: '#' + hashTag});

    stream.on('tweet', function (tweet) {
        var sentiment1 = analyze(tweet['text']);
        var sentiment2 = sentiment(tweet['text']);
        console.log("text:" + tweet['text'] + " Sentiment: score: " + sentiment1.score + " comparative: " + sentiment1.comparative + " score2:" + sentiment2.score + " comparative2: " + sentiment2.comparative );
        tweet['sentiment1'] = sentiment1;
        tweet['sentiment2'] = sentiment2;
        collection.insert(tweet, function(err, docs) {
            if(err) throw err;
            console.log("inserted documents: %j" + docs);
        });
    })
}

function fetchByUser(collection, user) {
    T.get('statuses/user_timeline', { screen_name: user }, function(err, data, response) {
        if(err) throw err;

        console.log("data: %j", data);

        collection.insert(data, function(err, docs) {
            if(err) throw err;
            console.log("inserted documents:" + docs);
        });
    })
}

function fetchByTag(collection, hashTag) {
    T.get('search/tweets', { q: "#" + hashTag, count: 1, cursor: -1}, function(err, data, response) {
        if(err) throw err;

        console.log("data: %j", data);

        collection.insert(data.statuses, function(err, docs) {
            if(err) throw err;
            console.log("inserted documents:" + docs);
        });
    })
}

