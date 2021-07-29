var express = require('express');
var router = express.Router();

const stripe = require('stripe')('sk_test_51JFN40GiGVLhVoutEne6ab4h7EJQrkQW6YmkPPZtkcrNYLEzOxBZ2VuN4VcLfSZAwa8IBnucgehFRpVk7edZSYF500nu8GV4Nh');

router.post("/create-payment-intent", async (req, res)=>{
  console.log('value of req.body.amount: ', req.body.amount*100)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount*100,
    currency: "usd"
  });
  res.send({
    client_secret: paymentIntent.client_secret
  });
})

router.post('/bookordered', function(req,res,next){
  var io = req.app.get('socketio')
  io.emit('bookordered', req.body.bookuniqueid)
  res.send({socket: 'book ordered emitted'})
})

router.post('/bookincart', function(req,res,next){
  var io = req.app.get('socketio')
  var payload = {
    bookuniqueid: req.body.bookuniqueid, 
    username: req.body.username,
    time: req.body.time
  }
  console.log('value of payload to emit: ', payload)
  var jsonifiedpayload = JSON.stringify(payload)
  io.emit('bookincart', jsonifiedpayload)
  res.send({socket: 'book in cart emitted'})
})

router.get("/testsocket", function(req,res,next){
  var io = req.app.get('socketio');
  io.emit("socketio functional")
  res.render('index', { title: 'Testing Socket (check console)' });
})

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
    if(reply==null){
      console.log(`
        key not found, reply null setting as null string, "null" to prevent 
        null pointer exception in java - 
        MAKE SURE TO PREVENT NULL BEING PASSED AS STRING IN PRODUCTION
      `)
      reply = "null"
    }
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
