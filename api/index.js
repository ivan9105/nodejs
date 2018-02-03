let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let app = express();

let mongoose = require('mongoose');
let winston = require('winston');
let nconf = require('nconf');

nconf.argv()
    .env()
    .file({file: './config.json'});

module.exports = nconf;

mongoose.connect(nconf.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    winston.log('info', 'Connection error:', err.message);
});
db.once('open', function callback() {
    winston.log('info', "Connected to DB!");
});

//create schema
let Schema = mongoose.Schema;

let Images = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail'],
        required: true
    },
    url: {type: String, required: true}
});

let Article = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    images: [Images],
    modified: {type: Date, default: Date.now}
});

Article.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

let ArticleModel = mongoose.model('Article', Article);

module.exports.ArticleModel = ArticleModel;

//configure server
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

app.use(function (err, req, res, next) {
    res.status(500);
    console.log('Internal error(%d): %s', res.statusCode, err.message);
    res.send({error: err.message});
});

//base api
app.get('/api', function (req, res) {
    res.send('API is running');
});

app.get('/ErrorExample', function (req, res, next) {
    next(new Error('Random error!'));
});

// crud api
app.get('/api/articles', function(req, res) {
    return ArticleModel.find(function (err, articles) {
        if (!err) {
            return res.send(articles);
        } else {
            res.statusCode = 500;
            winston.log('info', 'Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.post('/api/articles', function(req, res) {
    var article = new ArticleModel({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        images: req.body.images
    });

    article.save(function (err) {
        if (!err) {
            winston.log('info', "article created");
            return res.send({ status: 'OK', article:article });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            winston.log('error','Internal error(%d): %s',res.statusCode,err.message);
        }
    });
});

app.get('/api/articles/:id', function(req, res) {
    return ArticleModel.findById(req.params.id, function (err, article) {
        if(!article) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', article:article });
        } else {
            res.statusCode = 500;
            winston.log('error','Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.put('/api/articles/:id', function (req, res){
    return ArticleModel.findById(req.params.id, function (err, article) {
        if(!article) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }

        article.title = req.body.title;
        article.description = req.body.description;
        article.author = req.body.author;
        article.images = req.body.images;
        return article.save(function (err) {
            if (!err) {
                winston.log('info',"article updated");
                return res.send({ status: 'OK', article:article });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                winston.log('error','Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });
});

app.delete('/api/articles/:id', function (req, res){
    return ArticleModel.findById(req.params.id, function (err, article) {
        if(!article) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return article.remove(function (err) {
            if (!err) {
                winston.log('info',"article removed");
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                winston.log('error','Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });
});

//run server
app.listen(nconf.get('port'), function () {
    console.log('Express server listening on port 1337');
});
