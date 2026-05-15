const express = require('express')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000;

MongoClient.connect(process.env.MONGO_URI)
  .then(client => {
    console.log('Connected to MongoDB')
    
    const db = client.db('quotes')
    const quotesCollection = db.collection('quotes')

    app.listen(PORT, function () {
      console.log('Server running on port ' + PORT)
    })

    app.get('/', (req, res) => {
      quotesCollection
        .find()
        .toArray()
        .then(results => {
          res.render('index.ejs', { quotes: results })
        })
        .catch(error => {
          console.error(error)
          res.status(500).send("Error fetching quotes")
        })
    })

    app.post('/quotes', (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then(result => {
          res.redirect('/');
        })
        .catch(error => console.error(error));
    })

    app.put('/quotes', (req, res) => {
      quotesCollection
        .findOneAndUpdate(
          { name: req.body.name },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          {
            upsert: false,
          }
        )
        .then(result => {
          res.json('Success')
        })
        .catch(error => console.error(error))
    })

    app.delete('/quotes', (req, res) => {
      quotesCollection
        .deleteOne({ name: req.body.name })
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json(`Deleted quote`)
        })
        .catch(error => console.error(error))
    })
  })
  .catch(function (err) {
    console.log(err)
  })