const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require ('cors');

const produtoRoute = require('./routes/produtos');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requrested-With, Content-Type, Accept, Authorization, XMLHttpRequest'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    app.use(cors());
    next();
});

app.use(bodyParser.json());

app.use("/produtos", produtoRoute);

module.exports = app;