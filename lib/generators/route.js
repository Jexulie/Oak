const fileWriter = require('./file').createFile;

const generateRouteFunction = function(type, route){
    return [`router.${type}('/${route}', function(req, res){\n`, `})`]
}

const createGET = function(route, model, isAuth){
    const START, END = generateRouteFunction('get', route, model);
}

const createPOST = function(route, model, isAuth){
    const START, END = generateRouteFunction('post', route, model);
}

const createPATCH = function(route, model, isAuth){
    const START, END = generateRouteFunction('patch', route, model);
}

const createPUT = function(route, model, isAuth){
    const START, END = generateRouteFunction('put', route, model);
}

const createDELETE = function(route, model, isAuth){
    const START, END = generateRouteFunction('delete', route, model);
}

/**
 * User Auth Creators
 */
const createLOGIN = function(){
    
}

const createLOGOFF = function(){
    
}

const createSIGNUP = function(){

}

/**
 * use for only one model.
 */
module.exports.generateRoutes = function(routes, model, authType=null){
    let data = `var express = require('express');\nvar router = express.Router()\n`;

    /**
     * TODO AUTH [complicates things atm...]
     */

    // if(authType != null){
    //     data += `var passport = require('passport');\n`;
    //     switch(authType){
    //         case 'local':
    //             //! create local strategy file and local strat auth.
    //         case 'twitter':
    //             //! create twitter strategy file and twitter strat auth.
    //         case 'facebook':
    //             //! create facebook strategy file and facebook strat auth.
    //         default:
    //             throw 'Invalid auth type';
    //     }
    // }

    data += `var ${model} = require('../models/${model}');\n`

    routes.forEach(r => {
        switch(r.type){
            case 'get':
                data += createGET(r.route, model);
            case 'post':
                data += createPOST(r.route, model);
            case 'patch':
                data += createPATCH(r.route, model);
            case 'put':
                data += createPUT(r.route, model);
            case 'delete':
                data += createDELETE(r.route, model);
            default:
                return;
        }
    });

    data += `module.exports = router`;
    fileWriter(`./routes/${r.model}.js`, data);
    console.log(`created routes/${r.model} route.`);
}

// {
//     type: 'get',
//     route: '/user/:id'
// }