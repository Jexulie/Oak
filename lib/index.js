const meow = require('meow');
const listr = require('listr');
const fs = require('fs');

const binCreator = require('./generators/bin');
const configCreator = require('./generators/config');
const documentationCreator = require('./generators/documentation');
const loggerCreator = require('./generators/logger');
const fileCreator = require('./generators/file');
const modelCreator = require('./generators/model');
const pkgCreator = require('./generators/pkg');
const routeCreator = require('./generators/route');
const serverCreator = require('./generators/server');

//- Fix this seperate stdpackages.
const STDPACKAGES = [
    'express',
    'body-parser',
    'cors',
    'green-jay',
    'red-jay',
    'mongoose' //future for now, remove after adding database selecting.
]
/**
 * 1 - create folders
 * 2 - create package.json
 * 3 - create config
 * 4 - create logger
 * 5 - create server
 * 6 - create models
 * 7 - create routes
 * 8 - create app
*/

function generate(opts){

    let models = opts.models;
    let appName = opts.appname;
    let routes = opts.models.map(model => model.name);

    console.log("Starting to Create CRUD API Boilerplate...");
    console.log("Creating Server Folders...");
    fileCreator.createServerTree(appName);


    console.log("Creating 'package.json' ...");
    pkgCreator(appName);


    console.log("Creating Config Files ...");
    configCreator(appName);


    console.log("Creating Logger Files ...");
    loggerCreator(appName);

    
    console.log("Creating Server Files ...");
    binCreator(appName);


    console.log("Creating Model Files ...");
    modelCreator(appName, models);


    console.log("Creating Route Files ...");
    routeCreator(appName, models);


    console.log("Creating App File ...");
    serverCreator(appName, STDPACKAGES, routes);


    console.log("Done !");
}

const CLI = meow(`
    - OAK CRUD API Generator -

    Generates a CRUD API server, including MongoDB connection, models, routes, logger...

    Flags:
        -f [required] - target a json model file.
        or
        -q for quick start, generates from template model.json. 

    model.json format:
        {
            "appname" : "my-api",
            "models" : [{
                "name" : "books",
                "methods" : ["get", "post", "patch", "put", "delete"],
                "schema": [{
                    "name": "name",
                    "type": "String",
                    "required": true
                },
                {
                    "name": "createdDate",
                    "type": "Date",
                    "default": "Date.now()"
                }]
            }]
        }
    `, {
        flags: {
            filePath: {type: 'string', alias: 'f'},
            quickStart: {type: 'boolean', alias: 'q'}
        },
        autoHelp: true,
        version: "1.0.0",
        booleanDefault: false,
});

let quickStart = CLI.flags.quickStart;
let inputFilePath = CLI.flags.filePath;

if(quickStart === true){
    opts = require('./templates/example.json');
}else{
    if(inputFilePath == null || inputFilePath.length < 1){
        console.error('Invalid File Path');
        process.exit(1);
    }

    let rawData = fs.readFileSync(inputFilePath);
    opts = JSON.parse(rawData);
}

let models = opts.models;
let appName = opts.appname;
let routes = opts.models.map(model => model.name);

let tasks = [
    {
        title: 'Creating Server Folders...',
        task: () => {
            fileCreator.createServerTree(appName);
        }
    },
    {
        title: 'Creating package.json...',
        task: () => {
            pkgCreator(appName);
        }
    },
    {
        title: 'Creating Config Files ...',
        task: () => {
            configCreator(appName);
        }
    },
    {
        title: 'Creating Logger Files ...',
        task: () => {
            loggerCreator(appName);
        }
    },
    {
        title: 'Creating Server Files ...',
        task: () => {
            binCreator(appName);
        }
    },
    {
        title: 'Creating Model Files ...',
        task: () => {
            modelCreator(appName, models);
        }
    },
    {
        title: 'Creating Route Files ...',
        task: () => {
            routeCreator(appName, models);
        }
    },
    {
        title: 'Creating App File ...',
        task: () => {
            serverCreator(appName, STDPACKAGES, routes);
        }
    }
];

function startCLI(){
    console.log("Starting to Create CRUD API Boilerplate...\n");
    
    const taskList = new listr(tasks);    
    taskList.run().catch(console.error);
}

module.exports = {
    generate,
    startCLI
};
