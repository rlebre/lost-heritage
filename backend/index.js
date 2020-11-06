const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require("./config");

const postRoutes = require('./routes/post');
const imageUploadRoutes = require('./routes/image-upload');

const app = express();

mongoose.connect(`mongodb+srv://${config.DB_USER}:${config.DB_SECRET}@${config.DB_HOST}/${config.DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.json())

app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/image-upload', imageUploadRoutes);

app.listen(process.env.PORT || 3000, function () {
    console.log("Server running");
});