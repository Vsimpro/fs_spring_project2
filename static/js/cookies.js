function check_cookies() {
    var uname = null
    var pword = null

    var cookies = document.cookie.split(";");
    if (cookies.length == 2) {
        if (cookies[0].split("=")[0] == "password") {
            pword = cookies[0].split("=")[1];
            uname = cookies[1].split("=")[1];
        }

        if (cookies[0].split("=")[0] == "username") {
            pword = cookies[1].split("=")[1];
            uname = cookies[0].split("=")[1];
        }
    }

    return {
        username : uname,
        password : pword
    }
}