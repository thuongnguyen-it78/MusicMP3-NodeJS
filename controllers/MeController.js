const ObjectId = require('mongoose').Types.ObjectId;

const User = require('../models/user.model')
const Song = require('../models/song.model')
const shortid = require('shortid')


class MeController {
    // giả sử ở middleware trước, đã verify ra user thuonnguyen.it78
    // shirt + alt + up/down

    async getFavoriteAll(req, res, next) {

        const user =  req.user

        try {
            const listFavoriteSongs = await Song.find({_id: { $in : user.listFavoriteSongs}})
            res.status(200).json({flag: true, data: listFavoriteSongs})

        } catch (error) {
            res.status(500).json({flag: false, data: [], status: "Server error"})

        }

    }

    async postFavoriteOne(req, res, next) {
        const { songID } = req.body

        if(typeof songID !== 'string') {
            res.status(401).json({flag: false, status: "songID is string"})
            return
        } 

        const user =  req.user
        
        user.listFavoriteSongs.push(songID)

        try {
            await user.save()
            res.status(200).json({flag: true})
        } catch (error) {
            res.status(500).json({flag: false, status: "Server error"})
        }
        

    }
    // delete song from list favorite
    async patchFavoriteOne(req, res, next) {
        const { songID } = req.body

        const user =  req.user

        user.listFavoriteSongs = user.listFavoriteSongs.filter((id) => {
            return id !== songID
        })

        try {
            await user.save()
            res.status(200).json({flag: true})
        } catch (error) {
            res.status(500).json({flag: false, status: "Server error"})
        }

    }


    async getPlaylistAll(req, res, next) {

        // 1. get user from middleware before
        const user =  req.user

        const length = user.listPlaylists.length

        if(length === 0) {
            return res.status(200).json({flag: true, data: [], status: "Playlist or user is empty"})
        }
        const data = []
        let title = ''
        let listSongs = []
        let id
        try {
            console.log(length, user);
            for(let i = 0; i < length; i++) {
                id = user.listPlaylists[i].id
                title = user.listPlaylists[i].title
                listSongs = await Song.find({_id: { $in : user.listPlaylists[i].listSongs} })
                console.log(listSongs);
                data.push({id, title, listSongs})
            }
            res.status(200).json({flag: true, data})
        
        } catch (error) {
            console.log(error);
            res.status(500).json({flag: false, data: [], status: "Server error"})
        }
       
    }
    async getPlaylistOne(req, res, next) {
        const playlistID = req.params.id

        const user = req.user

        let result = user.listPlaylists.find((playlist) => {
            return playlist.id === playlistID
        })

        res.status(200).json({flag: true, data: [result]})

    }
    async postPlaylistOne(req, res, next) {
        const { playlistName } = req.body

        if(!playlistName) return res.status(400).json({flag: false, status: "Must have playlistName"})

        const user = req.user

        const newPlaylist = {
            id: shortid.generate(),
            title: playlistName,
            listSongs: []

        }

        user.listPlaylists.push(newPlaylist)

        user.save((err, result) => {
            if(err) {
                console.log(err);
                res.status(200).json({flag: false, status: "Server error"})
            } else {
                console.log(result)
                res.status(500).json({flag: true})
            }
        })


    }
    async patchPlaylistOne(req, res, next) {
        const playlistID = req.params.id
        const { newPlaylistName } = req.body
        
        if(newPlaylistName.length > 30) {
            return res.status(200).json({flag: false, status: "Playlist is less than 30 characters"})
        }

        // thằng này là đối tượng user, truyền từ middleware trước
        const user = req.user

        user.listPlaylists = user.listPlaylists.map((playlist) => {
            if(playlist.id === playlistID) {
                playlist.title = newPlaylistName
            }
            return playlist
        })

        user.markModified('listPlaylists')
        user.save((err, result) => {
            if(err) {
                res.status(200).json({flag: false, status: "Server error"})
            } else {
                console.log(result);
                res.status(500).json({flag: true})
            }
        })

    }
    async deletePlaylistOne(req, res, next) {
        const playlistID = req.params.id

        const user = req.user


        user.listPlaylists = user.listPlaylists.filter((playlist) => {
            return playlist.id !== playlistID   
        })

        user.save((err, result) => {
            if(err) {
                res.status(200).json({flag: false, status: "Server error"})
            } else {
                console.log(result);
                res.status(500).json({flag: true})
            }
        })
        

    }
    async postSongFromPlaylist(req, res, next) {
        const playlistID = req.params.id
        const { songID } = req.body

        if(!ObjectId.isValid(songID))
            return res.status(200).json({flag: false, status: "SongID valid"})

        const user = req.user

        user.listPlaylists = user.listPlaylists.map((playlist) => {
            if(playlist.id === playlistID) playlist.listSongs.push(songID)
            return playlist
        })

        user.markModified('listPlaylists')
        user.save((err, result) => {
            if(err) {
                res.status(200).json({flag: false, status: "Server error"})
            } else {
                console.log(result.listPlaylists);
                res.status(500).json({flag: true})
            }
        })

    }
    async deleteSongFromPlaylist(req, res, next) {
        const playlistID = req.params.id
        const { songID } = req.body

        if(!ObjectId.isValid(songID))
            return res.status(200).json({flag: false, status: "SongID valid"})

        const user = req.user

        user.listPlaylists = user.listPlaylists.map((playlist) => {
            if(playlist.id === playlistID) {
                const index = playlist.listSongs.indexOf(songID)
                playlist.listSongs.splice(index, 1)
            }
            return playlist
        })

        user.markModified('listPlaylists')
        user.save((err, result) => {
            if(err) {
                res.status(200).json({flag: false, status: "Server error"})
            } else {
                console.log(result.listPlaylists);
                res.status(500).json({flag: true})
            }
        })
    }
}

module.exports = new MeController()