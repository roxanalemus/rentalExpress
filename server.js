const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://demo:demo@cluster0-q2ojb.mongodb.net/test?retryWrites=true";
const dbName = "demo";

app.listen(4050, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  
  console.log('input:' + req.body.age)

  let canRentCar = req.body.age >= 21 ? " - Here are the car keys. Enjoy your trip!": " - Sorry, you are not old enough to rent a car at this time."

  db.collection('messages').insertOne({ age: req.body.age, rentCar: canRentCar}
  
    , (err, result) => {

    if (err) return console.log(err)

    console.log('saved to database')
    
    res.redirect('/')
  })
})

app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({age: req.body.age}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})