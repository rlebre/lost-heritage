const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
const config = require("./config");

const postRoutes = require('./routes/post');
const imageUploadRoutes = require('./routes/image-upload');
const userRoutes = require('./routes/users');

const app = express();

mongoose.connect(`mongodb+srv://${config.DB_USER}:${config.DB_SECRET}@${config.DB_HOST}/${config.DB_NAME}?retryWrites=true&w=majority`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


var allowlist = ['http://localhost:8080', 'https://forgotten-heritage-dev.web.app'];

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));


app.use(bodyParser.json())

app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/image', imageUploadRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(process.env.PORT || 3000, function () {
    console.log("Server running");
});