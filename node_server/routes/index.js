var express = require('express');
var router = express.Router();

const redis = require('redis');
const client = redis.createClient();

client.on('connect', function() {
  console.log('Connected!');
});

const stripe = require('stripe')('sk_test_51JFN40GiGVLhVoutEne6ab4h7EJQrkQW6YmkPPZtkcrNYLEzOxBZ2VuN4VcLfSZAwa8IBnucgehFRpVk7edZSYF500nu8GV4Nh');

// https://stripe.com/docs/payments/integration-builder

// router.post("/create-payment-intent", async (req, res) => {
//   const { items } = req.body;
//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "usd"
//   });
//   res.send({
//     clientSecret: paymentIntent.client_secret
//   });
// });

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

// app.get('/secret', async (req, res) => {
//   const intent = 
//   res.json({client_secret: intent.client_secret});
// });

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
