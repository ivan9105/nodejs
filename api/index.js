let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let app = express();

let mongoose = require('mongoose');
let mongoUrl = "mongodb://localhost:27017/express";
let winston = require('winston');
mongoose.connect(mongoUrl);
var db = mongoose.connection;

db.on('error', function (err) {
    winston.log('info', 'Connection error:', err.message);
});
db.once('open', function callback () {
    winston.log('info', "Connected to DB!");
});

let Schema = mongoose.Schema;

let Images = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail'],
        required: true
    },
    url: { type: String, required: true }
});

let Article = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    images: [Images],
    modified: { type: Date, default: Date.now }
});

Article.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

let ArticleModel = mongoose.model('Article', Article);

module.exports.ArticleModel = ArticleModel;

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
    res.status(404);
    console.log('Not found URL: %s', req.url);
    res.send({error: 'Not found'});
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log('Internal error(%d): %s', res.statusCode, err.message);
    res.send({error: err.message});
});

app.get('/api', function (req, res) {
    res.send('API is running');
});

app.get('/ErrorExample', function (req, res, next) {
    next(new Error('Random error!'));
});

app.listen(1337, function () {
    console.log('Express server listening on port 1337');
});
