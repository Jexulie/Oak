const filewriter = require('./file').createFile;
const foldercreator = require('./file').mkdir;

/**
 * ? move file from node_modules
 * ? or
 * ? create file from scratch
 */

const createData = function(){
    let data = `var greenjay = require('green-jay');\n`
    data += `var logger = {}\n`;
    data += `logger.start = function(){\n\t`
    data += `greenjay.createLogger({\n\t\t`
    data += `outputType: 'json',\n\t\t`
    data += `modifiers: {\n\t\t\t`
    data += `date: {\n\t\t\t\t`
    data += `color: '#069'\n\t\t\t`
    data += `},\n\t\t\t`
    data += `message: {\n\t\t\t\t`
    data += `modify: 'underline'\n\t\t\t`
    data += `}\n\t\t`
    data += `},\n\t\t`
    data += `logs: [\n\t\t\t`
    data += `new greenjay.logger({\n\t\t\t\t`
    data += `filePath: './logs/errors.log',\n\t\t\t\t`
    data += `minLevel: 'error'\n\t\t\t`
    data += `}),\n\t\t\t`
    data += `new greenjay.logger({\n\t\t\t\t`
    data += `filePath:'./logs/info.log',\n\t\t\t\t`
    data += `minLevel: 'info'\n\t\t\t`
    data += `})\n\t\t`
    data += `]\n\t`
    data += `})\n\t`
    data += `return greenjay;\n`
    data += `}\n`
    data += `module.exports = logger;`
    return data;
}

module.exports.generateLogger = function(){
    // create logger.js -> config
    let data = createData();
    filewriter('./config/logger.js', data);
    console.log('config/logger.js created.');
}

this.generateLogger()