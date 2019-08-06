const sanitizer = require('../helpers/index').sanitizeName;

const addImports = function(data, packages){
    packages.forEach(package => {
        let importName = sanitizer(package);
        data += `var ${importName} = require('${package}')`;
    });
    return data;
}


module.exports.generateServer = function(packages){
    let data = ``;
    data = addImports(data, packages);
}