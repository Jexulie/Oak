const filewriter = require('./file').createFile;
const sanitizer = require('../helpers/index').sanitizeName;

const generateConfigJSON = function(appName){
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
    let indents = 4;
    let sanitizedName = sanitizer(appName);

    let data = {
        server: {
            port: "6666",
            host: "127.0.0.1",
        },
        databaseNOSQL:{
            connString: `mongodb://localhost/${sanitizedName}`,
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

    filewriter(`./${appName}/config/config.json`, JSON.stringify(data, null, indents));
}

module.exports = generateConfigJSON;