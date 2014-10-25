var Twit = require('twit')
var MongoClient = require('mongodb').MongoClient

var T = new Twit({
    consumer_key:         'nacarcJpWnfg0hvX7HdoTMMu9'
  , consumer_secret:      'rU5Fb3jltmf7yvRJXIElLR70p2tXGjLpynkc9r1zr8JndkRI16'
  , access_token:         '2761822677-wJbrgcfNMCA0qOgnK2QZpeiQqFhhCy98RIw9p3S'
  , access_token_secret:  'EzjqOGpqq7FNjNmwlAGlxkOdas3xa0qtWYGpb2PJaWsQF'
})

MongoClient.connect('mongodb://127.0.0.1:27017/coinleach', function(err, db) {
    if(err) throw err;

    var tweets = db.collection('tweets');
    fetchBatch(tweets, -1);
    db.close();
});


function fetchBatch(collection, cursor) {
    
    T.get('statuses/user_timeline', { screen_name: 'Bitcoin' }, function(err, data, response) {
        if(err) throw err;

        console.log("data: %j", data);

        //collection.insert(data, function(err, docs) {
        //    if(err) throw err;
        //    console.log("inserted documents:" + docs);
        //    db.close();
        //});
    })
}
