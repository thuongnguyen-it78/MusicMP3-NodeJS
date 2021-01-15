const User = require('../models/user.model')
const Song = require('../models/song.model')
const shortid = require('shortid')


class MeController {
    // giả sử ở middleware trước, đã verify ra user thuonnguyen.it78
    // shirt + alt + up/down

    async getFavoriteAll(req, res, next) {
        // 0. declare something
        let result = {data: []}
        // 1. get user from middleware before
        const user =  req.user
        // 2. get all list songs from listFavoriteSongs and return

        try {
            const listFavoriteSongs = await Song.find({_id: { $in : user.listFavoriteSongs} } )
            result.data = listFavoriteSongs
            res.json(result)

        } catch (error) {
            res.json(result)    
           
        }

    }

    async postFavoriteOne(req, res, next) {
        const { songID } = req.body

        if(typeof songID !== 'string') {
            res.json({data: false})
            return;
        } 

        const user =  req.user
        
        user.listFavoriteSongs.push(songID)

        try {
            await user.save()
            res.json({data: true})
        } catch (error) {
            res.json({data: false})
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
            res.json({data: true})
        } catch (error) {
            res.json({data: false})
        }

    }


    async getPlaylistAll(req, res, next) {
        // 0. declare something
        let result = {data: []}
        // 1. get user from middleware before
        const user =  req.user

        const length = user.listPlaylists.length

        if(length === 0) {
            res.json(result)
        }

        let title = ''
        let listSongs = []
        let id
        try {
            for(let i = 0; i < length; i++) {
                id = user.listPlaylists[i].id
                title = user.listPlaylists[i].title
                listSongs = await Song.find({_id: { $in : user.listPlaylists[i].listSongs} })
                result.data.push({id, title, listSongs})
            }
            res.json(result)
        
        } catch (error) {
            res.json(result)
        }
       
    }
    async getPlaylistOne(req, res, next) {
        const playlistID = req.params.id

        const user = req.user

        let result = user.listPlaylists.find((playlist) => {
            return playlist.id === playlistID
        })

        if(!result) result = {}

        res.json({data: result})


    }
    async postPlaylistOne(req, res, next) {
        const { playlistName } = req.body

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
                res.json({data: false})
            } else {
                console.log(result)
                res.json({data: true})
            }
        })


    }
    async patchPlaylistOne(req, res, next) {
        const playlistID = req.params.id
        const { newPlaylistName } = req.body
        
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
                res.json({data: false})
            } else {
                console.log(result);
                res.json({data: true})
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
                res.json({data: false})
            } else {
                console.log(result);
                res.json({data: true})
            }
        })
        

    }
    async postSongFromPlaylist(req, res, next) {
        const playlistID = req.params.id
        const { songID } = req.body

        const user = req.user

        user.listPlaylists = user.listPlaylists.map((playlist) => {
            if(playlist.id === playlistID) playlist.listSongs.push(songID)
            return playlist
        })

        user.save((err, result) => {
            if(err) {
                res.json({data: false})
            } else {
                res.json({data: true})
            }
        })

    }
    async deleteSongFromPlaylist(req, res, next) {
        const playlistID = req.params.id
        const { songID } = req.body

        const user = req.user

        user.listPlaylists = user.listPlaylists.map((playlist) => {
            if(playlist.id === playlistID) {
                const index = playlist.listSongs.indexOf(songID)
                playlist.listSongs.splice(index, 1)
            }
            return playlist
        })

        user.save((err, result) => {
            if(err) {
                res.json({data: false})
            } else {
                res.json({data: true})
            }
        })
    }
}

module.exports = new MeController()