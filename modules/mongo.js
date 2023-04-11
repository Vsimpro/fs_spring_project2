// Imports
require("dotenv").config();
const Mongoose = require("mongoose");

// Might not end up needing this.
const { MongoClient, ServerApiVersion } = require('mongodb');

class Connection {
    constructor() {
        this.data_pool = [];

        this.db_password = process.env.MONGO_PASSWD;
        this.db_username = process.env.MONGO_USERNAME;

        this.uri = "mongodb+srv://" + this.db_username + ":" + this.db_password +  "@fullstackcluster.awpvpm2.mongodb.net/";
        
        try {
            this.connect()
        } catch(error) {
            console.log("[!] [Mongo] Could not connect to the Database while initialising.")
        }
    }

    connect() {
        try {
            Mongoose.connect( this.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            console.log("[+] [Mongo] Connection made. ")

        } catch (error) {
            // TODO: Find out why.
            console.log("[!] [Mongo] Can't connect to MongoDB.")
        }
    }

    // TODO: Get desired data
    fetch() {

    };

    // TODO: Insert desired data
    post() {

    };

    // TODO: Update desired data
    patch() {

    };

    // TODO: Raw Query?
    query(query) {

    };
}

module.exports = Connection
