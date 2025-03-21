const swaggerAutogen = require('swagger-autogen');

const public = {
    info: {
        title: 'Degree Planner',
        description: 'Track and Plan Classes'
    },
    host: 'cse341-degree-tracker.onrender.com',
    schemes: ['https'],
};

const dev = {
    info: {
        title: 'Degree Planner',
        description: 'Track and Plan Classes'
    },
    host: 'localhost:3002',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, public);
