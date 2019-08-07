# OAK CRUD API Generator

### Generates a CRUD API server, including MongoDB connection, models, routes, logger...

### Installing:
```bash
    npm install -g oak-crud
```

### Usage:
```bash
    oak -f model.json
    
    cd my-api
    
    npm install

    npm run start
```

or use quick start

```bash
    oak -q
```


### model.json format

```json
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
```