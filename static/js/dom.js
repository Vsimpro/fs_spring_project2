function create_card(id, username, message) {
    let owner = document.createElement("p");
    let card  = document.createElement("div");
    let content = document.createElement("p");
    let update  = document.createElement("button");
    let delete_button  = document.createElement("button");

    card.id = id
    card.className = "card"

    update.className = "update"
    update.innerText = "update"

    delete_button.className = "delete_bttn"
    delete_button.innerText = "delete"
    
    owner.innerText = username;
    owner.className = "username"

    content.innerText = message;
    content.className = "message"
    
    card.appendChild(owner)

    if (username == virtual_cookie.username) {
        card.appendChild(update)
        card.appendChild(delete_button)

        delete_button.addEventListener("click", function () {
            let comment_id = this.parentElement.id
            delete_comment(comment_id)
            location.reload();
        });

        update.addEventListener("click", function () {
            let comment_id = this.parentElement.id
            let updated_value = "" 
            alert("Not yet implemented. It is in the backend, though.")
        });
    }
    card.appendChild(content)

    document.getElementById("comment_list").appendChild(card)
}
