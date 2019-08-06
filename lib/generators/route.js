const fileWriter = require('./file').createFile;

const generateRouteFunction = function(type, route){
    return [`router.${type}('${route}', function(req, res, next){\n\t`, `});\n\n`]
}

const createResponseFunction = function(data,){
    data += `function createResponse(res, statusCode, payload){\n\t`;
    data += `res.status(statusCode).json({success: true, payload});\n`;
    data += `}\n`;
    return data;
}

const createErrorResponseFunction = function(data, modelName){
    data += `function createErrorResponse(res, statusCode, error){\n\t`;
    data += `${modelName}Logger.error(error + ' on ${modelName} route')\n\t;`
    data += `res.status(statusCode).json({success: true, error});\n`;
    data += `}\n`;
    return data;
}

/** HTTP CODES - 200 | 404 */
const createGET = function(modelName){
    let [data, end] = generateRouteFunction('get', '/:id');
    data += `var id = req.params.id;\n\t`;
    data += `if(id == null) return createErrorResponse(res, 400, 'id parameter is required');\n\t`;
    data += `${modelName}.get${modelName}byID(id)\n\t\t`;
    data += `.then(resp => {\n\t\t\t`;
    data += `return createResponse(res, 200, resp);\n\t\t`;
    data += `})\n\t\t`;

    data += `.catch(error => {\n\t\t\t`;
    data += `return createErrorResponse(res, 404, error);\n\t\t`;
    data += `})\n`;
    return data + end;
}

/** HTTP CODES - 201 | 4xx|5xx */
const createPOST = function(modelName){
    let [data, end] = generateRouteFunction('post', '/add');
    data += `var body = req.body;\n\t`;
    data += `if(body == null) return createErrorResponse(res, 400, 'there is no body');\n\t`;
    data += `${modelName}.add${modelName}(body)\n\t\t`;
    data += `.then(resp => {\n\t\t\t`;
    data += `return createResponse(res, 201, resp);\n\t\t`;
    data += `})\n\t\t`;

    data += `.catch(error => {\n\t\t\t`;
    data += `return createErrorResponse(res, 400, error);\n\t\t`;
    data += `})\n`;
    return data + end;
}

/** HTTP CODES - 204 | 4xx */
const createPATCH = function(modelName){
    let [data, end] = generateRouteFunction('patch', '/modify/:id');
    data += `var id = req.params.id;\n\t`;
    data += `if(id == null) return createErrorResponse(res, 400, 'id parameter is required');\n\t`;
    data += `var body = req.body;\n\t`;
    data += `if(body == null) return createErrorResponse(res, 400, 'there is no body');\n\t`;
    data += `${modelName}.modify${modelName}(id, body)\n\t\t`;
    data += `.then(resp => {\n\t\t\t`;
    data += `return createResponse(res, 204, resp);\n\t\t`;
    data += `})\n\t\t`;

    data += `.catch(error => {\n\t\t\t`;
    data += `return createErrorResponse(res, 404, error);\n\t\t`;
    data += `})\n`;
    return data + end;
}

/** HTTP CODES - 204 | 4xx */
const createPUT = function(modelName){
    let [data, end] = generateRouteFunction('put', '/update/:id');
    data += `var id = req.params.id;\n\t`;
    data += `if(id == null) return createErrorResponse(res, 400, 'id parameter is required');\n\t`;
    data += `var body = req.body;\n\t`;
    data += `if(body == null) return createErrorResponse(res, 400, 'there is no body');\n\t`;
    data += `${modelName}.update${modelName}(id, body)\n\t\t`;
    data += `.then(resp => {\n\t\t\t`;
    data += `return createResponse(res, 204, resp);\n\t\t`;
    data += `})\n\t\t`;

    data += `.catch(error => {\n\t\t\t`;
    data += `return createErrorResponse(res, 404, error);\n\t\t`;
    data += `})\n`;
    return data + end;
}

/** HTTP CODES - 204 | 4xx */
const createDELETE = function(modelName){
    let [data, end] = generateRouteFunction('delete', '/remove/:id');
    data += `var id = req.params.id;\n\t`;
    data += `if(id == null) return createErrorResponse(res, 400, 'id parameter is required');\n\t`;
    data += `${modelName}.remove${modelName}(id)\n\t\t`;
    data += `.then(resp => {\n\t\t\t`;
    data += `return createResponse(res, 204, resp);\n\t\t`;
    data += `})\n\t\t`;

    data += `.catch(error => {\n\t\t\t`;
    data += `return createErrorResponse(res, 404, error);\n\t\t`;
    data += `})\n`;
    return data + end;
}

/**
 * use for only one model.
 */
const generateRoutes = function(routes, modelName){
    let data = `var express = require('express');\n`;
    data += `var router = express.Router()\n`;
    data += `var ${modelName} = require('../models/${modelName}');\n`;
    data += `\n`;
    data += `var logger = require('../config/logger.js');\n`;
    data += `\n`;
    data += `var ${modelName}Logger = logger.start();\n`;
    data += `\n`;

    data = createResponseFunction(data);
    data += `\n`;
    data = createErrorResponseFunction(data, modelName);
    data += `\n`;

    routes.forEach(r => {
        switch(r){
            case 'get':
                data += createGET(modelName);
                break;
            case 'post':
                data += createPOST(modelName);
                break;
            case 'patch':
                data += createPATCH(modelName);
                break;
            case 'put':
                data += createPUT(modelName);
                break;
            case 'delete':
                data += createDELETE(modelName);
                break;
            default:
                break;
        }
    });

    data += `\n`;
    data += `module.exports = router;`;
    fileWriter(`./routes/${modelName}.js`, data);
}

module.exports = generateRoutes;

// generateRoutes(['get', 'post', 'patch', 'put', 'delete'], 'Book')
// generateRoutes(['get', 'post', 'patch', 'put', 'delete'], 'Movies')
// generateRoutes(['get', 'post', 'put', 'delete'], 'Part')