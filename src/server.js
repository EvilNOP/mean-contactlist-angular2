const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;

const CONTACTS_COLLECTION = 'contacts';

const app = express();

app.use(bodyParser.json());

/**
 * Create a database variable outside of the database connection callback
 * to reuse the connection pool in your app.
 */
let db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, (error, database) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;

  console.log('Database connection ready');

  // Initialize the app.
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;

    console.log('App now running on port', port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(response, reason, message, code) {
  console.log('ERROR: ' + reason);
  
  response.status(code || 500).json({ 'error': message });
}

/*  /api/contacts
 *  GET: finds all contacts
 *  POST: creates a new contact
 */

app.get('/api/contacts', (request, response) => {
  db.collection(CONTACTS_COLLECTION).find({}).toArray((error, docs) => {
    if (error) {
      handleError(res, error.message, 'Failed to get contacts.');
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post('/api/contacts', (request, response) => {
  const newContact = request.body;
  
  if (!request.body.name) {
    handleError(response, 'Invalid user input', 'Must provide a name.', 400);
  }

  db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(response, err.message, 'Failed to create new contact.');
    } else {
      response.status(201).json(doc.ops[0]);
    }
  });
});

/*  /api/contacts/:id
 *  GET: find contact by id
 *  PUT: update contact by id
 *  DELETE: deletes contact by id
 */

app.get('/api/contacts/:id', (request, response) => {

});

app.put('/api/contacts/:id', (request, response) => {

});

app.delete('/api/contacts/:id', (request, response) => {
  
});
