const path = require('path');
let express = require('express');
let methodOverride = require('method-override')
let app = express();
let { v4: uuid } = require('uuid'); 


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))


//Starting comments:

let tweets = [
    {
        id: uuid(),
        username: "Batman",
        tweet: "No suit, I'm out of here"
    },
    {
        id: uuid(),
        username: "Robin",
        tweet: "I like yellow icecream and icecream cones"
    },
    {
        id: uuid(),
        username: "Superman",
        tweet: "It's all your fault green goblin!!"
    },
    {
        id: uuid(),
        username: "Ironman",
        tweet: "No suit, I'm gonna buy a new boat"
    },
    {
        id: uuid(),
        username: "Spiderman",
        tweet: "I like spiderwebs, I do them with my hands"
    }
]

//Main index:
app.get('/tweets', (req, res) => {
    res.render('tweets/index', { tweets });
})

//New Form
app.get('/tweets/new', (req, res) => {
    res.render('tweets/new')
})

//Create
app.post('/tweets', (req, res) => {
    let { username, tweet } = req.body;
    tweets.unshift({ username, tweet, id: uuid()});
    res.redirect('/tweets');
})

//Show details
app.get('/tweets/:id', (req, res) => {
    let { id } = req.params;
    const tweet = tweets.find(t => t.id === id);
    res.render('tweets/show', { tweet });
})

//Edit
app.get('/tweets/:id/edit', (req, res) => {
    let { id } = req.params;
    const tweet = tweets.find(t => t.id === id);
    res.render('tweets/edit', { tweet });
})

//Update
app.patch('/tweets/:id', (req, res) => {
    let { id } = req.params;
    const foundTweet = tweets.find(t => t.id === id);
    const newTweetText = req.body.tweet;
    foundTweet.tweet = newTweetText;
    res.redirect('/tweets')
})

//Destroy 
app.delete('/tweets/:id', (req, res) => {
    let { id } = req.params;
    tweets = tweets.filter(t => t.id !== id);
    res.redirect('/tweets');
})


app.listen(3000, () => {
    console.log("Listening on 3000!");
})

