const fs = require('fs');

module.exports.mkdir = function(path){
    if(!fs.existsSync(path)){
        fs.mkdirSync(path);
        if(fs.existsSync(path)){
            console.log(`Created ${path} folder successfully.`);
        }else{
            console.error(`Could not create ${path} folder.`);
        }
    }
}

module.exports.createFile = function(filename, data){
    if(!fs.existsSync(filename)){
        fs.writeFileSync(filename, data);
        if(fs.existsSync(filename)){
            console.log(`Created ${filename} file successfully.`);
        }else{
            console.error(`Could not create ${filename} file.`);
        }
    }
}

module.exports.appendFile = function(filename, data){
    if(!fs.existsSync(filename)){
       console.error(`${filename} file could not found.`);
    }else{
        fs.appendFileSync(filename, data);
        console.log(`data appended to ${filename} file.`);
    }
}


module.exports.createServerTree = function(appName){
    this.mkdir(`./${appName}`);
    const rootPath = './' + appName + '/';
    const stdFolderNames = [
        'bin',
        'config',
        'models',
        'routes'
    ]

    stdFolderNames.forEach(folder => this.mkdir(rootPath+folder));
}