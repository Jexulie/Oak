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

module.exports = generate;

let p = {
    appname: "my-api",
    models: [
        {
            name: 'books',
            methods: ['get', 'post', 'patch', 'put', 'delete'],
            schema: [
                {name : 'name', type: 'String', required: true},
                {name : 'author', type: 'String', required: true},
                {name : 'page', type: 'Number', required: true},
                {name : 'createdDate', type: 'Date', default: 'Date.now()'},
            ]
        },
        {
            name: 'movies',
            methods: ['get', 'post', 'patch', 'put', 'delete'],
            schema: [
                {name : 'name', type: 'String', required: true},
                {name : 'genre', type: 'Array', required: true},
                {name : 'rating', type: 'Number', required: true},
                {name : 'createdDate', type: 'Date', default: 'Date.now()'},
            ]
        },
    ]
}

generate(p);