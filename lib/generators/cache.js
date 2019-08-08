const filewriter = require('./file').createFile;

/**
 * ? move file from node_modules
 * ? or
 * ? create file from scratch
 */

const createData = function(){
    let data = `var nodeCache = require('node-cache');\n`
    data += '\n';
    data += `function Cache(ttlSeconds){\n\t`;
    data += 'this.cache = new nodeCache({\n\t\t';
    data += 'stdTTL: ttlSeconds,\n\t\t';
    data += 'checkperiod: ttlSeconds * 2,\n\t\t';
    data += 'useClones: false\n\t';
    data += '});\n';
    data += '}\n';
    data += '\n';
    data += `Cache.prototype.get = function(key, storeFunction){\n\t`;
    data += 'var value = this.cache.get(key);\n\t';
    data += 'if(value) return Promise.resolve(value);\n\t';
    data += 'return storeFunction()\n\t\t';
    data += '.then(res => {\n\t\t\t';
    data += 'this.cache.set(key, res);\n\t\t\t';
    data += 'return res;\n\t\t';
    data += '});\n';
    data += '}\n';
    data += '\n';
    data += `Cache.prototype.del = function(keys){\n\t`;
    data += 'this.cache.del(keys);\n';
    data += '}\n';
    data += '\n';
    data += `Cache.prototype.delStartWith = function(startStr=''){\n\t`;
    data += 'if(!startStr) return;\n\t';
    data += 'const keys = this.cache.keys();\n';
    data += '\n\t';
    data += 'for(var key of keys){\n\t\t';
    data += 'if(key.indexOf(startStr) === 0){\n\t\t\t';
    data += 'this.del(key);\n\t\t';
    data += '}\n\t';
    data += '}\n';
    data += '}\n';
    data += '\n';
    data += `Cache.prototype.flush = function(){\n\t`;
    data += 'this.cache.flushAll();\n';
    data += '}\n';
    data += '\n';
    data += `module.exports = Cache;`
    return data;
}

const generateCache = function(appName){
    // create logger.js -> config
    let data = createData();
    filewriter(`./${appName}/config/cache.js`, data);
}

module.exports = generateCache;