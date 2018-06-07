// ./server.js

const express = require('express')
const bodyParsher = require('body-parser')
const cors = require ('cors')
const Chatkit = require ('pusher-chatkit-server')

const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:660404d4-3b36-4539-9c7a-38cf1adf8930'
    key: '571c2d7d-3454-4a0f-a89e-1a6dd48f34a9:37NZG04QFzkk8EB0lZ2Yo/akSsY6tklhTAD+jjgGxis='
})

const app = express()

app.use(bodyParsher.urlencoded({ extended:false }))
app.use(bodyParsher.json())
app.use(cors())

app.post('/users', (req, res) => {
    const { username } = req.body
    const user = { name: username, id: username }
    chatkit
        .createUser(user)
        .then(() => {
            console.log('Created user ', user.name)
            res.status(201).jason(user)
        })
        .catch(error => {
            if (error.error === 'services/chatkit/user_already_exists') {
                console.log('User already exists ', user.name)
                res.status(201).jason(user)
            } else {
                console.error(error)
                res.status(error.status).jason(error)
            }
        })
})

app.listen(3001)
console.log('running on port 3001')