const filewriter = require('./file').createFile;

module.exports.createPkg = function(name, dependencies){
    let pkg = {
        name,
        version: '1.0.0',
        scripts: {
            start: 'node ./bin/www'
        },
        dependencies
    }

    filewriter(`./${name}/package.json`, JSON.stringify(pkg));
}