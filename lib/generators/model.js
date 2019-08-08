const filewriter = require('./file').createFile;
const upperFirstLetter = require('../helpers/index').upperFirstLetter;

// TODO loggers

/**
 * NoSQL Models
 */

const generateSchemaItem = function(name, type, isRequired, defaultValue=undefined){
    let row =  `${name}: {type: ${type}`;

    if(isRequired) row += `, required: ${isRequired.toString()}`;
    if(defaultValue) row += `, default: ${defaultValue}`;

    row += `}`;
    return row;
}

const generateSchema = function(model){
    let schema = `var ${model.name}Schema = new Schema({\n`;
    model.schema.forEach(row => {
        schema += '\t';
        schema += generateSchemaItem(row.name, row.type, row.required, row.default) + ', \n';
    });
    return schema += '});\n';
}

/**
 * NoSQL Function Generators
 */
const generateGetByID = function(model){
    let data = ``;
    let modelName = upperFirstLetter(model);
    data += `module.exports.get${modelName}byID = function(id){\n\t`;
    data += `return new Promise(function(resolve, reject){\n\t\t`;
    data += `var cacheKey = \`get${modelName}ByID_\${id}\`;\n\t\t`;

    data += `cache.get(cacheKey, () => {\n\t\t\t`;
    data += `return ${modelName}.findById(id)\n\t\t\t\t`;
    data += `.then(resp => {\n\t\t\t\t\t`;
    data += `resolve(resp);\n\t\t\t\t`;
    data += `})\n\t\t\t\t`;

    data += `.catch(error => {\n\t\t\t\t\t`;
    data += `${modelName}Logger.error('get${modelName}byID Error: ' + error);\n\t\t\t\t\t`;
    data += `reject(error);\n\t\t\t\t`;
    data += `}).then(cacheResp => {\n\t\t\t\t\t`;
    data += 'resolve(cacheResp);\n\t\t\t\t';
    data += '});\n\t\t';
    data += `});\n\t`;
    data += `});\n`;
    data += `}\n`;
    data += '\n';
    return data;
}

const generateAdd = function(model){
    let data = ``;
    let modelName = upperFirstLetter(model);
    data += `module.exports.add${modelName} = function(${model}){\n\t`;
    data += `return new Promise(function(resolve, reject){\n\t\t`;

    data += `var new${modelName} = new ${modelName}(${model});\n\t\t`;
    data += `new${modelName}.save()\n\t\t\t`;

    data += `.then(resp => {\n\t\t\t\t`;
    data += `resolve(resp);\n\t\t\t`;
    data += `})\n\t\t\t`;

    data += `.catch(error => {\n\t\t\t\t`;
    data += `${modelName}Logger.error('add${modelName} Error: ' + error);\n\t\t\t\t`;
    data += `reject(error);\n\t\t\t`;

    data += `});\n\t\t`;
    data += `});\n`;
    data += `}\n`;
    data += '\n';
    return data;
}

const generateModify = function(model){
    let data = ``;
    let modelName = upperFirstLetter(model);
    data += `module.exports.modify${modelName} = function(id, modified${modelName}){\n\t`;
    data += `return new Promise(function(resolve, reject){\n\t\t`;
    data += `var cacheKey = \`get${modelName}ByID_\${id}\`;\n\t\t`;
    data += `${modelName}.findOneAndUpdate({_id: id}, modified${modelName}, {new : true})\n\t\t\t`;

    data += `.then(resp => {\n\t\t\t\t`;
    data += `cache.del([cacheKey]);\n\t\t\t\t`;
    data += `resolve(resp);\n\t\t\t`;
    data += `})\n\t\t\t`;

    data += `.catch(error => {\n\t\t\t\t`;
    data += `${modelName}Logger.error('modify${modelName} Error: ' + error);\n\t\t\t\t`;
    data += `reject(error);\n\t\t\t`;

    data += `});\n\t\t`;
    data += `});\n`;
    data += `}\n`;
    data += '\n';
    return data;
}

const generateUpdate = function(model){
    let data = ``;
    let modelName = upperFirstLetter(model);
    data += `module.exports.update${modelName} = function(id, updated${modelName}){\n\t`;
    data += `return new Promise(function(resolve, reject){\n\t\t`;
    data += `var cacheKey = \`get${modelName}ByID_\${id}\`;\n\t\t`;
    data += `${modelName}.findOneAndUpdate({_id: id}, updated${modelName}, {new : true})\n\t\t\t`;

    data += `.then(resp => {\n\t\t\t\t`;
    data += `cache.del([cacheKey]);\n\t\t\t\t`;
    data += `resolve(resp);\n\t\t\t`;
    data += `})\n\t\t\t`;

    data += `.catch(error => {\n\t\t\t\t`;
    data += `${modelName}Logger.error('update${modelName} Error: ' + error);\n\t\t\t\t`;
    data += `reject(error);\n\t\t\t`;

    data += `});\n\t\t`;
    data += `});\n`;
    data += `}\n`;
    data += '\n';
    return data;
}

const generateRemove = function(model){
    let data = ``;
    let modelName = upperFirstLetter(model);
    data += `module.exports.remove${modelName} = function(id){\n\t`;
    data += `var cacheKey = \`get${modelName}ByID_\${id}\`;\n\t\t`;
    data += `return new Promise(function(resolve, reject){\n\t\t`;
    data += `${modelName}.findOneAndRemove({_id: id})\n\t\t\t`;

    data += `.then(resp => {\n\t\t\t\t`;
    data += `cache.del([cacheKey]);\n\t\t\t\t`;
    data += `resolve(true);\n\t\t\t`;
    data += `})\n\t\t\t`;

    data += `.catch(error => {\n\t\t\t\t`;
    data += `${modelName}Logger.error('remove${modelName} Error: ' + error);\n\t\t\t\t`;
    data += `reject(error);\n\t\t\t`;

    data += `});\n\t\t`;
    data += `});\n`;
    data += `}\n`;
    data += '\n';
    return data;
}

const generateMethod = function(method, modelName){
    let data;

    switch(method){
        case 'get':
            data = generateGetByID(modelName);
            return data;
        case 'post':
            data = generateAdd(modelName);
            return data;
        case 'patch':
            data = generateModify(modelName);
            return data;
        case 'put':
            data = generateUpdate(modelName);
            return data;
        case 'delete':
            data = generateRemove(modelName);
            return data;
        default:
            return '';
    }
}

const generateNoSQL = function(model){
    let data = ``;
    let modelName = upperFirstLetter(model.name);

    data += `var mongoose = require('mongoose');\n`;
    data += `var Schema = mongoose.Schema;\n`;
    data += `var logger = require('../config/logger.js');\n`
    data += `\n`;
    data += `var ${modelName}Logger = logger.start();\n`;
    data += `\n`;
    data += generateSchema(model);
    data += `\n`;
    data += `var ${modelName} = mongoose.model('${modelName}', ${model.name}Schema);\n`;
    /** Configure Cache */
    data += '\n';
    data += "var CacheService = require('../config/cache');\n";
    data += 'var TTL = 60 * 60 * 1; // 1 hour cache time.\n';
    data += 'var cache = new CacheService(TTL);\n';
    data += '\n';

    data += `\n`;
    data += `module.exports = ${modelName};\n`;
    data += `\n`;

    model.methods.forEach(method => {
        data += generateMethod(method, model.name);
    });
    return data;
}
/**
 * SQL Models
 */
const generateTable = function(tableName, fields){

}

/**
 * SQL Function Generators
 */

const generateSQL = function(){
    
}
 /**
  * Main Entry Point
  */

const generateModels = function(appName, models){
    models.forEach(model => {
        let data;
        if(!model.isSQL){
            data = generateNoSQL(model);
            filewriter(`./${appName}/models/${model.name}.js`, data);
        }else{
            data = generateSQL(model);
            filewriter(`./${appName}/models/${model.name}.js`, data);
        }
    });
}


module.exports = generateModels;

// let models = [
//     {
//         name: 'books',
//         isSQL: false,
//         methods: ['post', 'get', 'patch', 'put', 'delete'],
//         schema: [
//             { name: 'genres', type: 'Array' },
//             { name: 'title', type: 'String', required: 'true'},
//             { name: 'createdDate', type: 'Date', default: 'Date.now()'}
//         ]
//     },
//     {
//         name: 'movies',
//         isSQL: false,
//         methods: ['post', 'get', 'put', 'delete'],
//         schema: [
//             { name: 'genres', type: 'Array' },
//             { name: 'title', type: 'String', required: 'true'}, //! may change this to normal true -> .toString() it.
//             { name: 'createdDate', type: 'Date', default: 'Date.now()'}
//         ]
//     },
//     {
//         name: 'lights',
//         isSQL: false,
//         methods: ['post', 'get', 'patch', 'put', 'delete'],
//         schema: [
//             { name: 'color', type: 'String', required: 'true'},
//             { name: 'R', type: 'Number'},
//             { name: 'G', type: 'Number'},
//             { name: 'B', type: 'Number'},
//         ]
//     }
// ]

// generateModels(models);