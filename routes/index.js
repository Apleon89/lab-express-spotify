
const express = require('express')
const router = express.Router()
const spotifyApi = require('../app')

router.get('/' , (req, res, next) => {
    res.render('index.hbs')
})

router.get('/artist-search', async (req, res, next) => {
    const artist = req.query.artist
    try {
        const response = await spotifyApi.searchArtists(artist)
        // console.log(response.body.artists.items[0].images)
        res.render('artist-search.hbs', {
            allArtists : response.body.artists.items
        })
    }
    catch (error) {
        next(error)
    }
})

module.exports = router;