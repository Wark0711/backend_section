const express = require('express')
const cors = require('cors')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config() 

require('./db/config')

const instaData = require('./db/Insta')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, resp) => {
    resp.send('Hello')
})

app.get('/facebook/:username', (req, resp) => {
    let result = fetch(`https://graph.facebook.com/v16.0/${process.env.ID}?fields=business_discovery.username(${req.params.username}){id,biography,username,profile_picture_url,name,followers_count,media_count, follows_count}&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`)
    .then(res => res.json())
    .then(response => resp.send(response)) 
})

app.post('/fb/submit', async (req, resp) => {
    let user = new instaData(req.body)
    let result = await user.save()
    resp.send(result)
})

app.listen(5000, () => console.log('Listening on 5000'))