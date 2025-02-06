const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        version: "1.0.0",
        title: "API",
        description: "API"
    },
    host: "localhost:4000",
    basePath: "/api/v1",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    
}   

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/*'];

swaggerAutogen(outputFile, endpointsFiles, doc);