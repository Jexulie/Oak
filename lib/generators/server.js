const sanitizer = require('../helpers/index').sanitizeName;
const filewriter = require('./file').createFile;

const addImports = function(data, packages){
    packages.forEach(package => {
        let importName = sanitizer(package);
        data += `var ${importName} = require('${package}');\n`;
    });
    return data;
}

const addRouteImports = function(data, routes){
    routes.forEach(route => {
        data += `var ${route}Router = require('./routes/${route}');\n`;
    });
    return data;
}

const addFileImports = function(){
    let data = ``;
    const files = [
        {name: 'config', path: './config/config.json'},
        // {name: 'logger', path: './config/logger.js'}
    ];
    files.forEach(f => data += `var ${f.name} = require('${f.path}');\n`);
    return data;
}

const addSTDMiddlewares = function(data){
    /**
     * bodyparser.json
     * bodyparser.urlencoded
     * cors
     * express.static
     * redjay (logger)
     */
    data += `app.use(cors());\n`;
    data += `app.use(bodyparser.json());\n`;
    data += `app.use(bodyparser.urlencoded({extended: false}));\n`;
    data += `app.use(redjay.dev);\n`;
    return data;
}

const addRoutes = function(data, routes){
    routes.forEach(route => {
        data += `app.use('/${route}', ${route}Router)\n`;
    });
    return data;
}

const addDatabaseConn = function(data){
    data += `mongoose.connect(config.databaseNOSQL.connString, {useNewUrlParser: true, useCreateIndex: true});\n`;
    data += `mongoose.Promise = Promise;\n`;
    return data;
}

const generateServer = function(appName, packages, routes){
    let data = ``;
    data = addImports(data, packages);
    data += '\n';
    data += addFileImports();
    data += '\n';
    data = addRouteImports(data, routes);
    data += '\n';
    data += `var app = express();\n`;
    data += '\n';
    data = addDatabaseConn(data); //future database selection...
    data += '\n';
    data = addSTDMiddlewares(data);
    data += '\n';
    data = addRoutes(data, routes);
    data += '\n';

    data += `app.all('/*', (req, res, next) => {\n\t`;
    data += `res.status(404).json({success: false, msg: "Wrong Endpoint"});\n`;
    data += `});\n`;

    data += `module.exports = app;`;
    filewriter(`./${appName}/app.js`, data);
}

module.exports = generateServer;
