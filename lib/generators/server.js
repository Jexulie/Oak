const sanitizer = require('../helpers/index').sanitizeName;
const filewriter = require('./file').createFile;

const addImports = function(data, packages){
    packages.forEach(package => {
        let importName = sanitizer(package);
        data += `var ${importName} = require('${package}')\n`;
    });
    return data;
}

const addRouteImports = function(data, routes){
    routes.forEach(route => {
        data += `var ${route}Router = require('./routes/${route}')\n`;
    });
    return data;
}

const addSTDMiddlewares = function(data){
    /**
     * bodyparser.json
     * bodyparser.urlencoded
     * cors
     * express.static
     * redjay
     * greenjay (logger)
     */
    data += ``
}

const addRoutes = function(data, routes){
    routes.forEach(route => {
        data += `app.use('/${route}', ${route}Router)\n`;
    });
    return data;
}

// var exRoutes = [
//     'movies',
//     'users',
//     'shoplist'
// ]

const generateServer = function(packages, routes){
    let data = ``;
    data = addImports(data, packages);
    data += '\n';
    data = addRouteImports(data, routes);
    data += '\n';
    data += `var app = express();\n`;
    data += '\n';
    data = addSTDMiddlewares(data);
    data += '\n';
    data = addRoutes(data, routes);
    data += '\n';
    // TODO '*'/else routes handler.



    data += `module.exports = app;`
    filewriter('./app.js', data);
    console.log(`app.js created.`)
}

module.exports = generateServer;