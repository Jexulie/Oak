const filewriter = require('./file').createFile;

const generateConfigJSON = function(){
    /**
     * server: port
     * server: host
     * 
     * databaseNOSQL: connstring
     * 
     * databaseSQL: host
     * databaseSQL: port
     * databaseSQL: username
     * databaseSQL: password
     * databaseSQL: sid
     * 
     * twitter: consumerKey
     * twitter: consumerSecret
     * 
     * facebook: clientID
     * facebook: clientSecret
     */

    let data = {
        server: {
            port: "6666",
            host: "127.0.0.1",
        },
        databaseNOSQL:{
            connstring: "",
        },
        databaseSQL: {
            host: "",
            port: "",
            username: "",
            password: "",
            sid: "",
        },
        twitter: {
            consumerKey: "",
            consumerSecret: ""
        },
        facebook: {
            clientID: "",
            clientSecret: ""
        }
    }

    filewriter('./config/config.json', JSON.stringify(data));
}

module.exports = generateConfigJSON;