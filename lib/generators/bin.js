const filewriter = require('./file').createFile;

function addNormalizePort(data){
    data += `function normalizePort(val){\n\t`;
    data += `var port = parseInt(val, 10);\n\t`;
    data += `if(isNaN(port)) return val;\n\t`;
    data += `if(port >= 0) return port;\n\t`;
    data += `return false;\n`;
    data += `}\n`;
    return data;
}

function addHandleError(data){
    data += `function handleError(error){\n\t`;
    data += `if(error.syscall !== 'listen') throw error;\n\t`;
    data += `var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;\n\t`;
    data += `switch(error.code){\n\t\t`;
    data += `case 'EACCES':\n\t\t\t`;
    data += `serverLogger.error(bind + ' requires elevated privileges', 'Server');\n\t\t\t`;
    data += `process.exit(1);\n\t\t\t`;
    data += `break;\n\t\t`;
    data += `case 'EADDRINUSE':\n\t\t\t`;
    data += `serverLogger.error(bind + ' is already in use', 'Server');\n\t\t\t`;
    data += `process.exit(1);\n\t\t\t`;
    data += `break;\n\t\t`;
    data += `default:\n\t\t\t`;
    data += `throw error;\n\t`;
    data += `}\n`;
    data += `}\n`;
    return data;
}

function addHandleListening(data){
    data += `function handleListen(){\n\t`;
    data += `var addr = server.address();\n\t`;
    data += `var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;\n\t`;
    data += `serverLogger.info('Listening on ' + bind, 'Server');\n`;
    data += `}\n`;
    return data;
}

const generateWWW = function(){
    let data = ``;
    data += `var config = require('../config/config.json');\n`;
    data += `var logger = require('../config/logger.js');\n`;
    data += `\n`;
    data += `var serverLogger = logger.start();\n`;
    data += `\n`;
    data += `var app = require('../app');\n`;
    data += `var http = require('http');\n`;
    data += `\n`;
    data += `var port = normalizePort(process.env.PORT || config.server.port);\n`;
    data += `\n`;
    data += `var server = http.createServer(app);\n`;
    data += `server.listen(port);\n`;
    data += `server.on('error', handleError);\n`;
    data += `server.on('listening', handleListen);\n`;
    data += `\n`;
    data = addNormalizePort(data);
    data += `\n`;
    data = addHandleError(data);
    data += `\n`;
    data = addHandleListening(data);


    filewriter('./bin/www', data);
}

module.exports = generateWWW;