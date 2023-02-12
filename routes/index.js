
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
        res.render('artist-search.hbs', {
            allArtists : response.body.artists.items
        })
    }
    catch (error) {
        next(error)
    }
})

router.get('/albums/:artistId', async (req, res, next) => {

    try {
        const response = await spotifyApi.getArtistAlbums(req.params.artistId)
        const artistName = await spotifyApi.getArtist(req.params.artistId)
        res.render('albums.hbs', {
            allAlbums: response.body.items,
            artistName: artistName.body.name
        })
    }
    catch (error) {
        next(error)
    }
})

router.get('/tracks/:albumId', async (req, res, next) => {

    try {
        const response = await spotifyApi.getAlbumTracks(req.params.albumId)
        res.render('tracks.hbs', {
            allTracks : response.body.items
        })
    }
    catch (error) {
        next(error)
    }
})

module.exports = router;