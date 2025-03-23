const express = require('express');
const mongo = require('./data');
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 3002;

app
    .use(bodyParser.json())
    .use('/', require('./routes'))
    .use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

mongo.init((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => console.log(`DB live. Listening on port: ${port}`));
    }
})

