console.log('May Node Be with you')
const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient



// Make sure you place body-parser before your CRUD handlers!



// app.get('/', (req, res)=>{
//   res.sendFile( __dirname + 'index.html')
// })
/* The get method is directing you to the ENDPOINT of main page aka the route || domain , follwoiing after it is the paramater of a callback arrow function with the objects req & res inside that function is the res obect with the sendFile() method inside that we tikd EXPRESS to SERVE a index.html file that can be foun in the __dirname   */
// All your handlers here...

MongoClient.connect('mongodb+srv://carlaH:username@cluster0.aaqxq.mongodb.net/?retryWrites=true&w=majority', {
  useUnifiedTopology: true
}) //connect to DB database
.then( client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    // created database is 'star-wars-quotes'
    const quotesCollection = db.collection('quotes')

  app.set('view engine', 'ejs') // Middlewares and other routes here... 
  app.use(bodyParser.urlencoded({ extended: true }))
  // app.get('/', (req, res)=>{
  //   res.sendFile( __dirname + '/index.html')
  // })
  app.use(express.static('public')) //tell Express to make this public folder accessible to the public by using a built-in middleware called express.static

  app.use(bodyParser.json()) //server doesn’t accept JSON data yet so you have to use middle ware bodyParser.json

  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray() //find returns an object toArray to convert the data into an array.
      .then(results => {
        console.log(results)
        res.render('index.ejs', { quotes: results }) //render this index.ejs file. with the quotes collection of results
      })
      .catch(error => console.error(error))
      
  })

  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body) //use the insertOne method to add items into a MongoDB collection.
      .then(result => {                   //target req.body for OBJECt appedming after
        console.log(result)
        res.redirect('/')
      })
      
      .catch(error => console.error(error))
  })
  // app.put('/quotes', (req, res) => {
  //   console.log(req.body)
  // })
    
  
  
  app.put('/quotes', (req, res) => {
      console.log(req.body)
      quotesCollection.findOneAndUpdate( 
        { name: 'yoda'},
      //findOneAndUpdate.  method lets us find and change 1 item in the db
       //query lets us filter the collection with key-value pairs name =yoda


      {
        $set: { //update, tells MongoDB what to change. It uses MongoDB’s update operators like $set, $inc and $push.
          name: req.body.name,
          quote: req.body.quote
        }
      },
      {
        upsert: true
        }
      )
        .then(result => {
          res.json('Success')
        })
        .catch(error => console.error(error))
    })

    app.delete('/quotes', (req, res) => { //delete methhod
      console.log(req.body)
      quotesCollection.deleteOne(
        { name: req.body.name }
        )//query works like query in findOneAndUpdate. It lets us filter the collection to the entries we’re searching for
       // method called deleteOne. It lets us remove a document from the database. It takes in two parameters: query and options.
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json(`Deleted Darth Vadar's quote`)
        })
        .catch(error => console.error(error))
    })
  /*You should be able to see values from the <form> element inside req.body now. Try doing a console.log*/


  //where the browser is being hosted
    app.listen(7000, function() {
      console.log('listening on 7000')
    })
  })
    .catch(error => console.error(error))



  

  
  //handle the PUT request with a put method. You should be able to see the values we send from the fetch request from the MAIN JS
  // Browsers can only perform a CREATE operation if they send POST request to the server. This POST request can be triggered through JavaScript or through a <form> element.

//   (READ operation)
// We need to do two things to show quotes from MongoDB Atlas to our users.

// Get quotes from MongoDB Atlas.
// Rendering the quotes in HTML with a template engine
//We use the UPDATE operation when we want to change something. It can be triggered with a PUT request. Like POST, PUT can be triggered either through JavaScript or through a <form> element.

// MongoClient.connect(/* ... */)
//   .then(client => {
//     // ...
//     const db = client.db('star-wars-quotes')
//     app.use(/* ... */)
//     app.get(/* ... */)
//     app.post(/* ... */)
//     app.listen(/* ... */)
//   })
//   .catch(console.error)

// quotesCollection.findOneAndUpdate(
//  ** query=> *** query lets us filter the collection with key-value pairs. If we want to filter quotes to those written by Yoda, we can set { name: 'Yoda' } as the query.
//   ***update*** => // update, tells MongoDB what to change. Mgdb update operators like *** $set, $inc and $push.*** 
//  ** options ***=>options tells MongoDB to define additional options for this update request.
// upsert means: Insert a document if no documents can be updated.
// )
//   .then(result => {/* ... */})
//   .catch(error => console.error(error))