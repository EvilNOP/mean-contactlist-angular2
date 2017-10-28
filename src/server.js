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

  console.log("Database connection ready");

  // Initialize the app.
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;

    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW