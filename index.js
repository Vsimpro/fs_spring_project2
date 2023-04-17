/* Imports */
require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');

/* Global Variables */
const app = express();
      app.use(express.json());
      app.use(cookieParser());
      app.use(express.static(__dirname + "/templates/static"))
      

let HOST = process.env.HOST
let PORT = process.env.PORT

// Until authentication is done, keep track of users here:
var USERS = []

// Until storing is done, keep track of comments here:
var COMMENTS = []


/* Functions */
// check_permission : returns true if action is allowed, false if not.
function check_permission(token) {
    // if neither is present in the token, deny access.
    if ( (!token["username"]) && (!token["password"]) ) {
        return false;
    }

    let exists = find_user(token)
    if ((exists != null) || (exists != false)) {
        return true;
    }

    // By default deny access.
    return false;
}

// finds user token
function find_user(token) {
    for (let i = 0; i < USERS.length; i++) {
        let user = USERS[ i ];
        if ((user["username"] == token["username"]) 
         && (user["password"] == token["password"])) {
            
            return user;
        }
    }

    return null;
}

function modify_content(data, id) {
    for (let i = 0; i < COMMENTS.length; i++) {
        let temp = COMMENTS[i]
        if (id == temp["id"]) {
            COMMENTS[i] = {
                "id" : id,
                "message"  : data["message"],
                "username" : temp["username"]
            };
            return true;
        }
    }
    return false
}

function delete_comment(id) {
    for (let i = 0; i < COMMENTS.length; i++) {
        let temp = COMMENTS[i]
        if (id == temp["id"]) {
            COMMENTS[i] = {
                "id" : id,
                "message"  : null,
                "username" : null
            };
            return true;
        }
    }
    return false
}

// is_owner : check if user owns the resource 
function is_owner(token, id) {
    for (let i = 0; i < COMMENTS.length; i++) {
        let temp = COMMENTS[i]
        if ((token["username"] == temp["username"]) && (id == temp["id"])) {
            return true;
        }
    }
    return false
}


/* Routes */
app.listen(PORT, function() { 
    console.log("[+] [Index] Server starting on http://" + HOST + ":" + PORT) 
});

app.get("/", function(request, response) {
    console.log("[>] [Index] GET '/'");
    response.send("200"); 
    return 0; 
});


/* No Auth needed */
// /api/getall : return all the comments. POST
app.get("/api/getall", function(request, response){
    console.log("[>] [api] GET '/api/getall/'");
    try {
        response.send(JSON.stringify(COMMENTS))
    } catch (error) {
        response.send("{success : false, error : 500}")
        return 1
    }
    
    return 0
});

// /api/:id : return comment with this id.
app.get("/api/id/:id", function(request, response){
    let id = request.params.id
    console.log(`[>] [api] GET '/api/${id}'`);

    for (let i = 0; i < COMMENTS.length; i++) {
        let temp = COMMENTS[i];
        if (temp["id"] == id) {
            response.send(JSON.stringify( temp ))
            return 0;
        }
    }
    response.send("{}")
    return 1;
});


// /api/:user : return all comments made by this user.
app.get("/api/user/:user", function(request, response){
    let user_comments = []
    let user = request.params.user
    
    console.log(`[>] [api] GET '/api/${user}'`);

    for (let i = 0; i < COMMENTS.length; i++) {
        let temp = COMMENTS[i];
        if (temp["username"] == user) {
            user_comments.push(temp);
        }
    }
    
    response.send(JSON.stringify( user_comments ))
    return 0;
});


// /api/login  : create access key. POST
app.post("/api/login", function(request, response) {
    console.log("[>] [api] POST '/api/login/'");
    let data = request.body

    console.log(data)
    if ( (!data["username"]) || (!data["password"])) {
        response.send("{success : false}")
        return 1;
    }

    USERS.push(data)
    response.send("{success : true}")
    return 0;
});

// /api/logout : delete access key. 
app.post("/api/logoff", function(request, response) {
    let data = request.body

    console.log(data)
    if ( (!data["username"]) || (!data["password"])) {
        response.send("{success : false}")
        return 1;
    }

    for (let i = 0; i < USERS.length; i++) {
        let user = USERS[ i ];
        if ((user["username"] == token["username"]) 
         && (user["password"] == token["password"])) {
            
            USERS.splice(i, 1);
            response.send("{success : true}")
            return 0;
        }
    }

    response.send("{success : false}")
    return 1;
});


/* Auth Locked */
// /api/add : add a new comment if auth key allows it. POST
app.post("/api/add/", function(request, response) {
    let data = request.body
    let cookies = request.cookies;

    console.log("[>] [api] POST '/api/add/'");

    if (check_permission(cookies)) {
        // TODO: Validation
        COMMENTS.push({
            "id" : COMMENTS.length,
            "message" : data["message"],
            "username" : cookies["username"]
        });

        response.send("{success : true}")
        return 0;
    }
       
    response.send("{success : false}")
    return 1;
});

// /api/update/:id : update earlier made comments. POST
app.post("/api/update/:id", function(request, response) {
    let data = request.body;
    let id = request.params.id;
    let cookies = request.cookies;
    
    console.log(`[>] [api] POST '/api/update/${id}'`);

    if (!is_owner(cookies, id)) {
        response.send("{success : false}")
        return 1;
    }

    if (!modify_content(data, id)) {
        response.send("{success : false}")
        return 1;
    }

    response.send("{success : true}")
    return 0;
});

// /api/delete/:id delete a comment made earlier. POST
app.post("/api/delete/:id", function(request, response) {
    let id = request.params.id
    let data = request.body
    let cookies = request.cookies;

    console.log(`[>] [api] POST '/api/delete/${id}'`);

    if (!is_owner(cookies, id)) {
        response.send("{success : false}")
        return 1;
    }

    if (!delete_comment(id)) {
        response.send("{success : false}")
        return 1;
    }
    
    response.send("{success : true}")
    return 0;
});

// Catch 404
app.get("/*", function(request, response) {
    console.log("[>] [Index] GET '/?'");
    response.send("404"); 
    return 0; 
});