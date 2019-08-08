const filewriter = require('./file').createFile;
const sanitizer = require('../helpers/index').sanitizeName;

const STDPACKAGES = [
    { name:'express', version: "^4.17.1"},
    { name:'body-parser', version: "^1.19.0"},
    { name:'cors', version: "^2.8.5"},
    { name:'green-jay', version: "^1.0.3"},
    { name:'red-jay', version: "^1.0.4"},
    { name: 'node-cache', version: "^4.2.1"},
    { name:'mongoose', version: "^5.6.8"} //future for now, remove after adding database selecting.
]

const createPkg = function(name, additionalDeps=null){
    let indents = 4;
    let appName = sanitizer(name);
    let pkg = {
        name: appName,
        version: '1.0.0',
        scripts: {
            start: 'node ./bin/www'
        },
        description: "",
        repository: "",
        licence: "",
        dependencies: {}
    }

    STDPACKAGES.forEach(package => pkg.dependencies[package.name] = package.version);

    if(additionalDeps != null){
        additionalDeps.forEach(package => pkg.dependencies[package.name] = package.version);
    }

    filewriter(`./${name}/package.json`, JSON.stringify(pkg, null, indents));
}

module.exports = createPkg;