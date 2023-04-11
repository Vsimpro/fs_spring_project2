require("dotenv").config();

class Connection {
    constructor() {
        this.data_pool = [];

        this.db_password = process.env.MONGO_PASSWD;
        this.db_username = process.env.MONGO_USERNAME;
        
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
