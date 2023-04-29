function update_comment(id) {
    console.log(id)
    console.log(document.getElementById(id))
}


function set_cookie(name_, password_) {
    document.cookie =  `username=${name_}`
    document.cookie =  `password=${password_}`
}


function update_comment(id, message) {
    var xhr = new XMLHttpRequest();
    var url = `http://localhost:4321/api/delete/${id}`;
    xhr.open("POST", url, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
        if ((xhr.status != 401) && 
            (xhr.status != 403) && 
            (xhr.status != 418) ) {
            action_disallowed("something went wrong when updating a comment")
        }
    }
    
    console.log(message)
    //xhr.send();
}


async function post_comment(message_) {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:4321/api/add";
    xhr.open("POST", url, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
        if ((xhr.status != 401) && 
            (xhr.status != 403) && 
            (xhr.status != 418) ) {
            action_disallowed("something went wrong when adding a new comment")
        }
    }
    
    var data = JSON.stringify({
        "message" : message_
    });

    xhr.send(data);
}


async function post_register(name_, password_) {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:4321/api/register";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
        console.log(xhr.statusText)
        if ((xhr.status != 401) && 
            (xhr.status != 403) && 
            (xhr.status != 418) ) {
            
            
            set_cookie(name_, password_)

            return 0;
        }

        // TODO: Trigger Error in front;
        action_disallowed("something went wrong when registering.")
    }
    
    var data = JSON.stringify({
        "username" : name_,
        "password" : password_
    });

    xhr.send(data);
}


async function post_login(name_, password_) {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:4321/api/login";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
        if ((xhr.status != 401) && 
            (xhr.status != 403) && 
            (xhr.status != 418) ) {
        
            set_cookie(name_, password_)

            return 0;
        }

        // TODO: Trigger Error in front;
        action_disallowed("something went wrong when logging in.")
        return null
    }
    
    var data = JSON.stringify({
        "username" : name_,
        "password" : password_
    });

    xhr.send(data);
}

function delete_comment(id) {
    var xhr = new XMLHttpRequest();
    var url = `http://localhost:4321/api/delete/${id}`;
    xhr.open("POST", url, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
        if ((xhr.status != 401) && 
            (xhr.status != 403) && 
            (xhr.status != 418) ) {

            action_disallowed("something went wrong when deleting a comment")
        }
    }
    
    xhr.send();
}

function action_disallowed(reason) {
    alert(reason)
}

function get_comments() {
    // Clear all the previous comments.
    document.getElementById("comment_list").innerHTML = ""

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:4321/api/getall');
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            for (let i = 0; i < data.length; i++) {
                create_card(
                    data[i]["id"], 
                    data[i]["username"], 
                    data[i]["message"]);
            };
        };
    }
    xhr.send();
}