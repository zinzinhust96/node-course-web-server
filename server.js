const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//using middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = now + ': ' + req.method + " " + req.url;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log.');
        }
    });
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

//handlebar helpers - run js code inside handlebar template
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send('<h1>hello express!</h1>');
    // res.send({
    //     name: 'ZinZin',
    //     likes: [
    //         'gaming',
    //         'pokemon'
    //     ]
    // });
    res.render('home.hbs', {
        titlePage: 'Home page',
        welcomeMsg: 'Welcome forks',
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        titlePage: 'About page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad response'
    });
})

app.listen(3000, () => console.log('Server is up in port 3000'));