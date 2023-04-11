// Imports
require("dotenv").config();
const express = require("express");

/* Global Variables */
const app = express();
      app.use(express.json());
      app.use(express.static(__dirname + "/templates/static"))

let HOST = process.env.HOST
let PORT = process.env.PORT

app.listen(PORT, function() { 
    console.log("[+] [Index] Server starting on http://" + HOST + ":" + PORT) 
});

// TODO: The App itself. Use single page design.
app.get("/", function(request, response) {
    console.log("[>] [Index] GET '/'");
    response.send("200"); 
    return 0; 
});

app.get("/*", function(request, response) {
    console.log("[>] [Index] GET '/?'");
    response.send("404"); 
    return 0; 
});


// TODO: 
// Get Auth: (maybe use JWT?)
// /api/login  : create access key. POST

// /api/logout : delete access key. GET (?)

// No auth:
// /api/getall : return all the comments. POST

// /api/:id : return all the comments made by one user POST


// Needs auth:
// /api/add : add a new comment if auth key allows it. POST

// /api/update/:id : update earlier made comments. POST

// /api/delete/:id delete a comment made earlier. POST