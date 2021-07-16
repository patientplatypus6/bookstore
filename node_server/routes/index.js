var express = require('express');
var router = express.Router();

const redis = require('redis');
const client = redis.createClient();

client.on('connect', function() {
  console.log('Connected!');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/test", function(req, res, next){
  console.log('in get /test')
  res.send({reply: 'reply'})
})

router.post("/retrieve", function(req, res, next){
  console.log('in get /retrieve')
  console.log('and value of key: ', req.body.key)
  client.get(req.body.key, function(err, reply) {
    console.log(reply); // ReactJS
    res.send({reply})
  });
})

router.post("/store", function(req, res, next){
  console.log('value of req.body in post /store: ', req.body)
  client.set(req.body.key, req.body.value, function(err, reply) {
    console.log(reply); // OK
    res.send({reply})
  });
})

module.exports = router;
