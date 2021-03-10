const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const jwt = require('jsonwebtoken')
//secret key (use any big text)
let secretKey = 'MySuperSecretKey'


app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


//database in the cliud
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/blogg', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => err ? console.error('error!' + err) : {})


const Post = require('./model/post')
const User = require('./model/user')

const router = express.Router()

app.use('/', express.static(__dirname + '/'))

router.use((req, res, next) => {
    console.warn(req.method + ' ' + req.url + " with " + JSON.stringify(req.body))
    next()
})

const auth = (req, res, next) => {
    console.log(req.body)
    let token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).send({
                    success: false,
                    message: 'Acess denied'
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        //console.log(req.query)
        return res.status(403).send({
            success: false,
            message: 'Acess denied'
        })
    }
}

router.get('/', (req, res) => {
    res.json({ message: 'hello World!' })
})

router.route('/users')
    .get(auth, (req, res) => {
        console.log(req.body)
        User.find((err, users) => {
            if (err)
                res.send(err)
            res.json(users)
        })
    })
    .post((req, res) => {
        let user = new User()
        user.name = req.body.name
        user.login = req.body.login
        user.password = req.body.password
        user.save((err) => {
            if (err)
                res.send(err)
            res.json(user)
        })
    })

router.route('/login').post((req, res) => {
    console.log(req.body)
    if (req.body.isNew) {
        User.findOne({ login: req.body.login }, 'name')
            .exec((err, user) => {
                if (err) res.send(err)
                if (user != null) {
                    res.status(400).send('Login existente')
                } else {
                    const newUser = new User()
                    newUser.name = req.body.name
                    newUser.login = req.body.login
                    newUser.password = req.body.password
                    newUser.save((err) => {
                        if (err) res.send(err)
                        let token = jwt.sign(newUser, secretKey, {
                            expiresIn: '1 day'
                        })
                        res.json({ user: newUser, token: token })
                    })
                }
            })
    } else {
        User.findOne({
            login: req.body.login,
            password: req.body.password
        }, 'name')
            .exec((err, user) => {
                if (err) res.send(err)
                if (user != null) {
                    let token = jwt.sign(user.toJSON(), secretKey, {
                        expiresIn: '1 day'
                    })
                    res.json({ user: user, token: token })
                } else {
                    res.status(400).send('Login/Senha incorretas')
                }
            })
    }
})

router.route('/posts/:post_id?')
    .get((req, res) => {
        Post
            .find()
            .sort([['data', 'descending']])
            .populate('user', 'name')
            .exec((err, posts) => {
                if (err)
                    res.send(err)
                res.json(posts)
            })
    })
    .post(auth, (req, res) => {
        const post = new Post()
        post.title = req.body.title
        post.text = req.body.text
        post.user = req.body.user._id
        if (post.title == null)
            res.status(400).send('Titulo não pode ser nulo')
        post.save((err) => {
            if (err)
                res.send(err)
            res.json(post)
        })
    })
    .delete(auth, (req, res) => {
        console.log(req.body)
        Post.remove({
            _id: req.params.post_id
        }, (err, post) => {
            if (err) res.send(err)
            res.json({ messafe: 'Sicesso ao deletar' })
        })
    })

app.use('/api', router)

const port = process.env.PORT || 8080

app.listen(port)
console.log('Listen' + port)